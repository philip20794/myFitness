import {Day} from './day';

export class Week {

    days: Array<Day>;
    nr: number;
    durchschnitt: Day;

    constructor(days: Array<Day>, nr: number, durchschnitt: Day) {
        this.days = days;
        this.nr = nr;
        this.durchschnitt = durchschnitt;
    }



}
