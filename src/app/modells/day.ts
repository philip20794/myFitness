import {Mydate} from './mydate';

export class Day {
    date: Mydate;
    gewicht: number;
    fat: number;
    muskel: number;


    constructor(date: Mydate, gewicht: number, fat: number, muskel: number) {
        this.date = date;
        this.gewicht = gewicht;
        this.fat = fat;
        this.muskel = muskel;
    }
}
