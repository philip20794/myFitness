import { Component } from '@angular/core';
import {Storage} from '@ionic/storage';
import {Week} from '../modells/week';
import {Day} from '../modells/day';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  loaded: boolean;
  weeks: Array<Week>;

  constructor(public storage: Storage) {
    this.loaded = false;
  }

  ionViewDidEnter() {
    this.init();
  }

  async init() {
    let year = 2020;
    this.weeks = [];
    for (let j = 0; j < 10; j++) {
      year += j;
      for (let i = 0; i < 53; i++) {
        await this.storage.get(year + 'week' + i).then(value => {
          if (value !== null) {
            this.weeks.push(value);
          }
        });
      }
    }
    this.loaded = true;
  }

}
