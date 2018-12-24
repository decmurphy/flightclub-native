import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import * as utilsModule from 'tns-core-modules/utils/utils';
import { ObservableArray } from 'tns-core-modules/data/observable-array';

@Component({
  selector: 'fc-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  tiles: ObservableArray<Tile>;

  constructor(
      private page: Page
  ) { }

  ngOnInit() {

    this.page.actionBarHidden = true;

    this.tiles = new ObservableArray([
        { name: '\'321 Launch\' from USA Today',
            url: 'https://play.google.com/store/apps/details?id=com.usatoday.spacear&hl=af',
            thumbnail: '/assets/img/media/321launch.png' },
        { name: 'ZLSA Infographics',
            url: 'https://zlsadesign.com/tags/flight-club/',
            thumbnail: '/assets/img/media/zlsadesign.png' },
        { name: 'Falcon Heavy Test Flight',
            url: 'https://youtu.be/R0w-BzDrWww',
            thumbnail: '/assets/img/media/spacex_fh-test-flight.png' }, //
        { name: 'SpaceX Iridium-2',
            url: 'https://youtu.be/CGL2FEMxDE0',
            thumbnail: '/assets/img/media/spacex_iridium-1.png' }, //
        { name: 'TMRO Interview',
            url: 'https://www.tmro.tv/2016/10/16/beautiful-data-rocket-launches/',
            thumbnail: '/assets/img/media/tmro_interview.png' }, //
        { name: 'The Economist',
            url: 'https://www.economist.com/technology-quarterly/2016-25-08/space-2016',
            thumbnail: '/assets/img/media/the_economist.png' }, //
        { name: 'Twitter Mentions',
            url: 'https://goo.gl/7x4c3z',
            thumbnail: '/assets/img/media/twitter_mentions.png' }, //
        { name: 'SpaceX CRS-9',
            url: 'https://youtu.be/NT50R2dLht8',
            thumbnail: '/assets/img/media/spacex_crs-9.png' }, //
        { name: 'Cesium Showcase',
            url: 'https://cesiumjs.org/demos/FlightClub/',
            thumbnail: '/assets/img/media/cesium_showcase.png' }, //
        { name: 'SpaceX CRS-8',
            url: 'https://youtu.be/ibv6vcNrxzA',
            thumbnail: '/assets/img/media/spacex_crs-8.png' }, //
        { name: 'SpaceX JCSAT-14',
            url: 'https://youtu.be/ui2H8aV99I4',
            thumbnail: '/assets/img/media/spacex_jcsat-14.png' }, //
        { name: 'Orbital Mechanics Interview',
            url: 'https://theorbitalmechanics.com/show-notes/psas',
            thumbnail: '/assets/img/media/orbital_mechanics_interview.png' }, //
        { name: 'SpaceX SES-9',
            url: 'https://youtu.be/wkMZbL-CzB0',
            thumbnail: '/assets/img/media/spacex_ses-9.png' }, //
        { name: 'SpaceX Jason-3',
            url: 'https://youtu.be/bpVNV9FzHqI',
            thumbnail: '/assets/img/media/spacex_jason-3.png' }, //
        { name: 'SpaceX Orbcomm OG2',
            url: 'https://youtu.be/RKJBV5vcel8',
            thumbnail: '/assets/img/media/spacex_orbcomm_og2.png' }, // assets/img.youtube.com/vi/RKJBV5vcel8/hqdefault.png
        { name: 'Popular Mechanics Article',
            url: 'https://www.popularmechanics.com/space/rockets/a18289/choose-your-own-spacex-adventure-with-this-website/',
            thumbnail: '/assets/img/media/popular_mechanics_article.png' }
    ]);
  }

  externalRedirect(url: string) {
    console.log('redirect to' + url);
    utilsModule.openUrl(url);
  }

}

interface Tile {
  name: string;
  url: string;
  thumbnail: string;
}
