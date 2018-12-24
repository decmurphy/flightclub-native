import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Simulation } from '@shared/interfaces';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CesiumService {

  entities: any[];
  entitiesCache: any[];
  offset: any;
  simulation: Simulation;
  trackedStage: number;
  viewer: any;
  viewerClock: any;
  launchTime: Date;

  constructor() {

    Cesium.BingMapsApi.defaultKey = environment.cesium.bingMapsApiDefaultKey;
    Cesium.Ion.defaultAccessToken = environment.cesium.ionAccessToken;

    this.entities = [];
    this.entitiesCache = [];
    this.setReferenceFrame('inertial');

  }

  addAllEntities() {

    this.viewer.entities.removeAll();

    // check if in cache first
    if (this.entitiesCache[this.offset.key]) {
      this.entitiesCache[this.offset.key].forEach(entity => {
        this.viewer.entities.add(entity);
      });
    } else {
      this.entitiesCache[this.offset.key] = [];
      this.addHazardZones(this.simulation);

      this.simulation.data.simulations.forEach(sim => {
        sim.stageTrajectories.forEach(stageTrajectory => {
          this.addTrajectory(this.simulation.mission, stageTrajectory.stageNumber, stageTrajectory);
        });
      });

      // build a cache of created entity groups where the cache key is the offset.
      // there may be a more appropriate key, but this does just fine
      // this.entitiesCache[this.offset.key] = this.viewer.entities;

      const target = {
        longitude: this.simulation.mission.launchpad.longitude,
        latitude: this.simulation.mission.launchpad.latitude
      };

      const simLat = this.simulation.options.latitude;
      const simLon = this.simulation.options.longitude;
      if (simLat && simLon) {
        const cameraTools = {
          origin: {
            longitude: simLon[0],
            latitude: simLat[0],
            elevation: this.simulation.options.elevation ? this.simulation.options.elevation[0] : 10.0
          },
          fieldOfView: Math.PI / 2.0
        };
        this.setGroundCameraLookingAt(target, cameraTools);
      } else {
        this.setSpaceCameraLookingAt(target);
      }

    }
  }

  addHazardZones(simulation) {
    simulation.data.hazardZones
        .map(zone => this.createHazardZonePolygon(zone))
        .forEach(hazardZone => {
          this.viewer.entities.add(hazardZone);
          this.entitiesCache[this.offset.key].push(hazardZone);
        });

  }

  createHazardZonePolygon(zone: any) {
    const array = zone.vertices.reduce((acc, vertex) => acc.concat([vertex.latitude, vertex.longitude, 1]), []);
    return {
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(array),
        extrudedHeight: 0,
        material: Cesium.Color.RED.withAlpha(0.2)
      }
    };
  }

  addTrajectory(mission: any, stageId: number, stageData: any) {

    const trajectoryData = stageData.telemetry;
    const focusPoints = stageData.events;

    if (trajectoryData === undefined) {
      return;
    }

    const p_stage = new Cesium.SampledPositionProperty();
    const o_stage = new Cesium.SampledProperty(Cesium.Quaternion);
    let trajectory = new Cesium.SampledPositionProperty();

    const start = Cesium.JulianDate.fromDate(this.launchTime);
    const stop = Cesium.JulianDate.addSeconds(start, 600000, new Cesium.JulianDate());

    let burningPrev = false;

    for (let i = 0; i < trajectoryData.time.length; i++) {

      let focus = false;
      const burningNow = trajectoryData.throttle[i] > 0.0;
      if (burningPrev !== burningNow) {
        focus = true;
      }

      const t = parseInt(trajectoryData.time[i], 10);
      if (Number.isNaN(t)) {
        continue;
      }

      if (!focus
          && trajectoryData.time[i] > 1000
          && i % 100 !== 0
          && i !== trajectoryData.time.length - 1) {
        continue;
      }

      const x = parseFloat(trajectoryData[this.offset.val[0]][i]);
      const y = parseFloat(trajectoryData[this.offset.val[1]][i]);
      const z = parseFloat(trajectoryData[this.offset.val[2]][i]);
      const lat = 180 * Math.atan(z / Math.sqrt(x * x + y * y)) / Math.PI;
      const lon = 180 * Math.atan2(y, x) / Math.PI;

      const h = parseFloat(trajectoryData.altitude[i]) * 1e3;

      const time = Cesium.JulianDate.addSeconds(start, t, new Cesium.JulianDate());
      const position = Cesium.Cartesian3.fromDegrees(lon, lat, h);
      trajectory.addSample(time, position);
      p_stage.addSample(time, position);
      o_stage.addSample(time, Cesium.Transforms.headingPitchRollQuaternion(
        position,
        new Cesium.HeadingPitchRoll(-1 * trajectoryData.azimuth * Math.PI / 180.0, trajectoryData.elevation * Math.PI / 180.0, 0)
      ));

      if (focus && !this.isTest()) {
        const color = burningPrev ? Cesium.Color.RED : Cesium.Color.DARKCYAN;
        this.addTrajectorySegment(start, stop, trajectory, color);

        trajectory = new Cesium.SampledPositionProperty();
        trajectory.addSample(time, position);
      }

      burningPrev = burningNow;
    }

    if (!this.isTest()) {
      const color = burningPrev ? Cesium.Color.RED : Cesium.Color.DARKCYAN;
      this.addTrajectorySegment(start, stop, trajectory, color);
    }

    // Need to add stage marker entities if watching live
    if (this.simulation.options.w) {

      let entity;
      if (this.isTest()) {
        entity = {

          // Export .blend as .obj
          // use http://www.greentoken.de/onlineconv to convert .obj+.mtl to .dae
          // convert .dae to .gltf using COLLADA2GLTF
          // can use gltf2glb if desired for .glb

          name: 'Falcon9',
          model: {
            uri: '../f9r.gltf',
            minimumPixelSize: 8192,
            maximumScale: 1
          },
          position: p_stage,
          orientation: o_stage,
          path: {
            resolution: 1,
            material: new Cesium.PolylineGlowMaterialProperty({
              glowPower: 0.1,
              color: Cesium.Color.TRANSPARENT
            }),
            width: 1
          }
        };

      } else {

        // create the svg image string
        const svgDataDeclare = 'data:image/svg+xml;base64,';
        let svgString =
          '<svg xmlns="http://www.w3.org/2000/svg" width="144.8px" height="19.9px" xmlns:xlink="http://www.w3.org/1999/xlink">'
          + '<defs><circle id="a" r="47.5" fill="#ccac55" stroke="#000" stroke-width="5"/>'
          + '<path id="c" fill="#ccac55" stroke="#000" stroke-width="5" d="M38.7 77.5L60 50 38.7 22.5"/>'
          + '<path id="b" fill="#ccac55" d="M60 50L38.7 22.5v55z"/></defs>'
          + ' <use width="100%" height="100%" x="50" y="50" xlink:href="#a" transform="scale(.19943)"/>'
          + '<use width="100%" height="100%" x="300" y="50" xlink:href="#a" transform="scale(.19943)"/>'
          + '<use width="100%" height="100%" x="300" xlink:href="#b" transform="scale(.19943)"/>'
          + '<use width="100%" height="100%" x="300" xlink:href="#c" transform="scale(.19943)"/>'
          + '<path fill="#ccac55" d="M10 0h50v20H10z"/><path stroke="#000" d="M10 .5h50m-50 19h50"/>'
          + '<text x="34.9" fill="#000" dy="14.5" font-size="13" text-anchor="middle">REPLACE</text></svg>';

        const stageName = mission.vehicle.stages.find(stage => stage.stageNumber === stageId).displayName;
        svgString = svgString.split('REPLACE').join(stageName.toUpperCase());

        // create the cesium entity
        const svgEntityImage = svgDataDeclare + window.btoa(svgString);

        const image = new Image();

        entity = {
          availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({ start: start, stop: stop })]),
          position: p_stage,
          billboard: new Cesium.BillboardGraphics({
            image: image,
            eyeOffset: new Cesium.Cartesian3(0, 0, -200)
          })
        };

        entity.position.setInterpolationOptions({
          interpolationDegree: 5,
          interpolationAlgorithm: Cesium.LagrangePolynomialApproximation
        });

        image.onload = () => {
          this.entities[stageId] = this.viewer.entities.add(entity);
          this.entitiesCache[this.offset.key].push(this.entities[stageId]);
        };

        image.src = svgEntityImage;

      }

    }

  }

  addTrajectorySegment(start, stop, trajectory, color) {
    const e = this.viewer.entities.add({
      availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({ start: start, stop: stop })]),
      position: trajectory,
      path: { resolution: 1, width: 8, material: new Cesium.PolylineGlowMaterialProperty({ glowPower: 0.1, color: color }) }
    });
    e.position.setInterpolationOptions({ interpolationDegree: 5, interpolationAlgorithm: Cesium.LagrangePolynomialApproximation });
    this.entitiesCache[this.offset.key].push(e);
  }

  trackEntity(stage) {

    if (stage === null) {
      this.viewer.trackedEntity = null;
      return;
    }
    if (this.viewer.trackedEntity !== this.entities[stage]) {
      this.trackedStage = stage;
      this.viewer.trackedEntity = this.entities[stage];
    }
  }

  viewLaunchsite() {

    const lat1 = this.simulation.mission.launchpad.latitude * Math.PI / 180.0;
    const lon1 = this.simulation.mission.launchpad.longitude * Math.PI / 180.0;
    const lat2 = (this.simulation.mission.launchpad.latitude - 1) * Math.PI / 180.0;
    const lon2 = lon1;

    const y = Math.sin(lon1 - lon2) * Math.cos(lat1);
    const x = Math.cos(lat2) * Math.sin(lat1) - Math.sin(lat2) * Math.cos(lat1) * Math.cos(lon1 - lon2);
    const brng = Math.atan2(y, x) * 180 / Math.PI;

    this.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(
        this.simulation.mission.launchpad.longitude,
        this.simulation.mission.launchpad.latitude - 0.03, // dA
        1e3 // z
      ),
      orientation: {
        heading: Cesium.Math.toRadians(brng),
        pitch: Cesium.Math.toRadians(-10), // = atan(z / (6378137 * dA * pi/180)) and look up a bit
        roll: Cesium.Math.toRadians(0)
      }
    });


  }

  getTrackedStage(): number {
    return this.trackedStage;
  }

  setContainer(element: any, skybox: boolean): void {
    const options: any = {
      requestRenderMode: true,
      timeline: true,
      animation: true,
      fullscreenButton: false,
      homeButton: false,
      geocoder: false,
      baseLayerPicker: false
    };

    if (skybox) {
      options.skyBox = new Cesium.SkyBox({
        sources: {
          positiveY: 'assets/img/skybox/all/0004.png',
          positiveX: 'assets/img/skybox/all/0001.png',
          negativeY: 'assets/img/skybox/all/0002.png',
          negativeX: 'assets/img/skybox/all/0003.png',
          negativeZ: 'assets/img/skybox/all/0005.png',
          positiveZ: 'assets/img/skybox/all/0006.png'
        }
      });
    }

    this.viewer = new Cesium.Viewer(element, options);
    this.viewer.terrainProvider = Cesium.createWorldTerrain();
    this.viewer.scene.globe.enableLighting = true;

    if (this.viewerClock) {
      this.setClock(this.viewerClock);
    }
  }

  setSimulation(sim) {
    this.simulation = sim;
    this.launchTime = new Date(this.simulation.mission.datetime);
  }

  getClock() {
    return moment(Cesium.JulianDate.toDate(this.viewer.clockViewModel.currentTime)).utc();
  }

  setClock(clock): void {
    // if viewer hasn't been initialsied yet, just hand onto the clock parameter and then call this function again with it after viewer init
    if (this.viewer) {
      this.viewer.clockViewModel.currentTime = clock.currentTime;
      this.viewer.clockViewModel.startTime = clock.startTime;
      this.viewer.clockViewModel.stopTime = clock.stopTime;
      this.viewer.clockViewModel.clockRange = clock.clockRange;
      this.viewer.clockViewModel.clockStep = clock.clockStep;
      this.viewer.clockViewModel.shouldAnimate = clock.shouldAnimate;

      this.viewer.timeline.updateFromClock();
      this.viewer.timeline.zoomTo(this.viewer.clock.startTime, this.viewer.clock.stopTime);
    } else {
      this.viewerClock = clock;
    }
  }

  isTest() {
    return this.simulation.options.test !== undefined;
  }

  setSpaceCameraLookingAt(target) {
    // Focus 20° East of launch-site (assuming vehicle launches east here)
    // And halfway between launch-site and equator
    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(target.longitude + 20, target.latitude / 2.0, 17e6),
      orientation: {
        heading: Cesium.Math.toRadians(0), // North is up
        pitch: Cesium.Math.toRadians(-90), // Looking straight down
        roll: Cesium.Math.toRadians(0)
      }
    });
  }

  setGroundCameraLookingAt(target, cameraTools) {

    const lat1 = target.latitude * Math.PI / 180.0;
    const lon1 = target.longitude * Math.PI / 180.0;
    const lat2 = cameraTools.origin.latitude * Math.PI / 180.0;
    const lon2 = cameraTools.origin.longitude * Math.PI / 180.0;

    const y = Math.sin(lon1 - lon2) * Math.cos(lat1);
    const x = Math.cos(lat2) * Math.sin(lat1) - Math.sin(lat2) * Math.cos(lat1) * Math.cos(lon1 - lon2);
    const brng = Math.atan2(y, x) * 180 / Math.PI;

    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(
        cameraTools.origin.longitude,
        cameraTools.origin.latitude,
        cameraTools.origin.elevation
      ),
      orientation: {
        heading: Cesium.Math.toRadians(brng),
        pitch: Cesium.Math.toRadians(0),
        roll: Cesium.Math.toRadians(0)
      }
    });

    if (cameraTools.fieldOfView) {
      this.viewer.camera.frustum.fov = cameraTools.fieldOfView;
    }
    if (cameraTools.aspectRatio) {
      this.viewer.camera.frustum.aspectRatio = cameraTools.aspectRatio;
    }

    this.trackEntity(null);

  }

  setReferenceFrame(rf: string) {
    this.offset = rf === 'fixed' ?
    {
      key: 0,
      val: [
        'xfixedRF', 'yfixedRF', 'zfixedRF'
      ]
    } : {
      key: 1,
      val: [
        'xinertialRF', 'yinertialRF', 'zinertialRF'
      ]
    };
  }

}
