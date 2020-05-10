export class Day {
    date: Date;
    gewicht: number;
    fat: number;
    muskel: number;


    constructor(date: Date, gewicht: number, fat: number, muskel: number) {
        this.date = date;
        this.gewicht = gewicht;
        this.fat = fat;
        this.muskel = muskel;
    }
}
