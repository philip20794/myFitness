import { Component } from '@angular/core';
import {Day} from '../modells/day';
import {Storage} from '@ionic/storage';
import {Week} from '../modells/week';
import {Mydate} from '../modells/mydate';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  // @ts-ignore
  currentWeekNumber = require('current-week-number');
  today = new Date();
  wochentag = this.today.toLocaleString('de-DE', { weekday: 'long'});
  uhrzeit = this.today.toLocaleString('de-DE', { hour: 'numeric', minute: 'numeric' });
  loaded: boolean;
  currentWeek: Week;

  constructor(public storage: Storage) {
    this.loaded = false;
    this.genOldStuff();
  }

  ionViewDidEnter() {
    this.loaded = false;
    this.init();
  }

  genOldStuff() {
    this.storage.set('2020week17', new Week([], 17, new Day(null, 66.16, 18, 43)));
    this.storage.set('2020week18', new Week([], 18, new Day(null, 66.63, 17.7, 43.1)));
    this.storage.set('2020week19', new Week([], 19, new Day(null, 67.01, 18, 43)));
  }

  async init() {
    await this.storage.get(this.today.getFullYear() + 'week' + this.currentWeekNumber()).then(value => {
      if (value !== null) {
        this.currentWeek = value;
      } else {
        this.currentWeek = new Week([], this.currentWeekNumber(), new Day(null, 0, 0, 0));
      }
    });
    if (!this.todayExists()) {
      this.currentWeek.days.push(new Day(new Mydate(this.wochentag, this.uhrzeit), 0, 0, 0));
      this.save();
    }
    this.loaded = true;
  }

  save() {
    this.genAverage();
    this.storage.set(this.today.getFullYear() + 'week' + this.currentWeekNumber(), this.currentWeek);
  }

  clean() {
    this.storage.clear();
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
    if (days <= 0) {return; }
    this.currentWeek.durchschnitt.gewicht = Math.round((gewicht / days) * 100) / 100;
    this.currentWeek.durchschnitt.fat = Math.round((fat / days) * 100) / 100;
    this.currentWeek.durchschnitt.muskel = Math.round((muskel / days) * 100) / 100;
  }


  todayExists(): boolean {
    for (const day of this.currentWeek.days) {
      if (this.wochentag === day.date.wochentag) {
        return true;
      }
    }
    return false;
  }

}
