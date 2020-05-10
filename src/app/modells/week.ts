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

    getDay(date: Date): Day {
        for (const day of this.days) {
            if (day.date.getDay() === date.getDay()) {
                return day;
            }
        }
        return null;
    }

}
