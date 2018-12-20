import { Component, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';

import { LoadScreenService } from './load-screen.service';

@Component({
  selector: 'fc-load-screen',
  templateUrl: './load-screen.component.html',
  styleUrls: ['./load-screen.component.scss']
})
export class LoadScreenComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('header') header: string;
  @Input('page') page: string;

  constructor(private loadScreen: LoadScreenService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadScreen.initiateRoller(this.page);
  }

  ngOnDestroy() {
    this.loadScreen.setLoading(false);
  }

  getLoadScreenMessage(): string {
    return this.loadScreen.getLoadingMessage();
  }

}
