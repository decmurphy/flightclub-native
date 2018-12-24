import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import {
  SidenavService
} from '@shared/services';

import { PhotographerSettingsDlgComponent } from './photographer-settings-dlg/photographer-settings-dlg.component';
import { CesiumService } from './cesium.service';
import { UserService } from '@components/user/user.service';

@Component({
  selector: 'fc-cesium',
  templateUrl: './cesium.component.html',
  styleUrls: ['./cesium.component.scss']
})
export class CesiumComponent implements OnInit, AfterViewInit {

  containerWidth: string;
  containerHeight: string;

  @ViewChild('cesiumContainer') cesiumContainer: ElementRef;

  @Input() simulation: any;
  @Input() page: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private cesiumService: CesiumService,
    private sidenavService: SidenavService,
    public userService: UserService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cesiumService.setContainer(this.cesiumContainer.nativeElement, this.page === 'result');
    this.cesiumService.setSimulation(this.simulation);
    this.cesiumService.setReferenceFrame(this.route.snapshot.queryParams.rf);
    this.cesiumService.addAllEntities();
  }

  toggleNav(id: string) {
    this.sidenavService.toggleNav(id);
  }

  setViewOffset() {

    const currentRefFrame = this.route.snapshot.queryParams.rf || '';
    let refFrame;

    switch (currentRefFrame) {
      case 'fixed':
        refFrame = 'inertial';
        this.cesiumService.setReferenceFrame(refFrame);
        break;
      case 'inertial':
      default:
        refFrame = 'fixed';
        this.cesiumService.setReferenceFrame(refFrame);
        break;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.route.snapshot.queryParams,
        rf: refFrame,
      }
    });
    this.cesiumService.addAllEntities();

  }

    openPadViewPointEditDialog() {

      const photographerSettings = {
        origin: {
          latitude: parseFloat(this.route.snapshot.queryParams.latitude),
          longitude: parseFloat(this.route.snapshot.queryParams.longitude),
          elevation: parseFloat(this.route.snapshot.queryParams.elevation)
        },
        fieldOfView: parseFloat(this.route.snapshot.queryParams.fieldOfView),
        aspectRatio: parseFloat(this.route.snapshot.queryParams.aspectRatio)
      };

      const dialogRef = this.dialog.open(PhotographerSettingsDlgComponent, {
          data: {
            site: this.simulation.launchSite,
            photographerSettings: photographerSettings
          }
      });

      dialogRef.afterClosed().subscribe(result => {

          if (result) {

            const aspectRatio = parseFloat(this.route.snapshot.queryParams.aspectRatio);
            const arWindow = this.cesiumContainer.nativeElement.clientWidth / this.cesiumContainer.nativeElement.clientHeight;

            if (!aspectRatio) {
              this.containerWidth = undefined;
              this.containerHeight = undefined;
            } else if (arWindow > aspectRatio) {
              this.containerWidth = this.cesiumContainer.nativeElement.clientHeight * aspectRatio + 'px';
              this.containerHeight = this.cesiumContainer.nativeElement.clientHeight + 'px';
            } else {
              this.containerWidth = this.cesiumContainer.nativeElement.clientWidth + 'px';
              this.containerHeight = this.cesiumContainer.nativeElement.clientWidth / aspectRatio + 'px';
            }
          }

      });

    }

}
