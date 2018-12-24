import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'fc-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  tiles: Tile[];
  numCols: Observable<number>;

  constructor(
      private observableMedia: ObservableMedia
  ) { }

  ngOnInit() {
    const grid = new Map([
      ['xs', 2], ['sm', 2],
      ['md', 4],
      ['lg', 6], ['xl', 6]
    ]);

    let start: number;
    grid.forEach((cols, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start = cols;
      }
    });

    this.numCols = this.observableMedia.asObservable().pipe(
      map((change: any) => grid.get(change.mqAlias)),
      startWith(start)
    );

    this.tiles = [
        { name: '\'321 Launch\' from USA Today',
            url: 'https://play.google.com/store/apps/details?id=com.usatoday.spacear&hl=af',
            thumbnail: '/assets/img/media/321launch.png' },
        { name: 'ZLSA Infographics',
            url: 'https://zlsadesign.com/tags/flight-club/',
            thumbnail: '/assets/img/media/zlsadesign.png' },
        { name: 'Falcon Heavy Test Flight',
            url: '//youtu.be/R0w-BzDrWww',
            thumbnail: '/assets/img/media/spacex_fh-test-flight.png' }, //
        { name: 'SpaceX Iridium-2',
            url: '//youtu.be/CGL2FEMxDE0',
            thumbnail: '/assets/img/media/spacex_iridium-1.png' }, //
        { name: 'TMRO Interview',
            url: '//www.tmro.tv/2016/10/16/beautiful-data-rocket-launches/',
            thumbnail: '/assets/img/media/tmro_interview.png' }, //
        { name: 'The Economist',
            url: '//www.economist.com/technology-quarterly/2016-25-08/space-2016',
            thumbnail: '/assets/img/media/the_economist.png' }, //
        { name: 'Twitter Mentions',
            url: 'https://goo.gl/7x4c3z',
            thumbnail: '/assets/img/media/twitter_mentions.png' }, //
        { name: 'SpaceX CRS-9',
            url: '//youtu.be/NT50R2dLht8',
            thumbnail: '/assets/img/media/spacex_crs-9.png' }, //
        { name: 'Cesium Showcase',
            url: '//cesiumjs.org/demos/FlightClub/',
            thumbnail: '/assets/img/media/cesium_showcase.png' }, //
        { name: 'SpaceX CRS-8',
            url: '//youtu.be/ibv6vcNrxzA',
            thumbnail: '/assets/img/media/spacex_crs-8.png' }, //
        { name: 'SpaceX JCSAT-14',
            url: '//youtu.be/ui2H8aV99I4',
            thumbnail: '/assets/img/media/spacex_jcsat-14.png' }, //
        { name: 'Orbital Mechanics Interview',
            url: '//theorbitalmechanics.com/show-notes/psas',
            thumbnail: '/assets/img/media/orbital_mechanics_interview.png' }, //
        { name: 'SpaceX SES-9',
            url: '//youtu.be/wkMZbL-CzB0',
            thumbnail: '/assets/img/media/spacex_ses-9.png' }, //
        { name: 'SpaceX Jason-3',
            url: '//youtu.be/bpVNV9FzHqI',
            thumbnail: '/assets/img/media/spacex_jason-3.png' }, //
        { name: 'SpaceX Orbcomm OG2',
            url: '//youtu.be/RKJBV5vcel8',
            thumbnail: '/assets/img/media/spacex_orbcomm_og2.png' }, // assets/img.youtube.com/vi/RKJBV5vcel8/hqdefault.png
        { name: 'Popular Mechanics Article',
            url: '//www.popularmechanics.com/space/rockets/a18289/choose-your-own-spacex-adventure-with-this-website/',
            thumbnail: '/assets/img/media/popular_mechanics_article.png' }
    ];
  }

  private goExternal(url: string): void {
    window.location.href = url;
  }

}

interface Tile {
  name: string;
  url: string;
  thumbnail: string;
}
