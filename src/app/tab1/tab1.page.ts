import { Component } from '@angular/core';
import {Day} from '../modells/day';
import {Storage} from '@ionic/storage';
import {Week} from '../modells/week';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  // @ts-ignore
  currentWeekNumber = require('current-week-number');
  today = new Date();
  loaded: boolean;
  currentWeek: Week;

  constructor(public storage: Storage) {
    this.loaded = false;
    this.genOldStuff();
  }

  ionViewDidEnter() {
    this.init();
  }

  genOldStuff() {
    this.storage.set('2020week17', new Week([], 17, new Day(null, 66.16, 18, 43)));
    this.storage.set('2020week18', new Week([], 18, new Day(null, 66.63, 17.7, 43.1)));
  }

  async init() {
    await this.storage.get(this.today.getFullYear() + 'week' + this.currentWeekNumber()).then(value => {
      if (value !== null) {
        this.currentWeek = new Week(value.days, value.nr, value.durchschnitt);
      } else {
        this.currentWeek = new Week([], this.currentWeekNumber(), new Day(null, 0, 0, 0));
      }
    });
    if (this.currentWeek.getDay(this.today) === null) {
      this.currentWeek.days.push(new Day(this.today, 0, 0, 0));
    }
    this.loaded = true;
  }

  save() {
    this.genAverage();
    this.storage.set(this.today.getFullYear() + 'week' + this.currentWeekNumber(), this.currentWeek);
  }

  focusNext(event: any, nextElement: any) {
    const enterClicked = event.key === 'Enter';
    if (enterClicked) {
      nextElement.setFocus();
    }
  }

  genAverage() {
    if (this.currentWeek.days === null) {return; }
    if (this.currentWeek.days.length < 1) {return; }
    let gewicht = 0;
    let fat = 0;
    let muskel = 0;
    let days = 0;
    for (const day of this.currentWeek.days) {
      gewicht += Number(day.gewicht);
      fat += Number(day.fat);
      muskel += Number(day.muskel);
      if (gewicht > 1) {
        days += 1;
      }
    }
    this.currentWeek.durchschnitt.gewicht = (gewicht / days);
    this.currentWeek.durchschnitt.fat = (fat / days);
    this.currentWeek.durchschnitt.muskel = (muskel / days);
  }



}
