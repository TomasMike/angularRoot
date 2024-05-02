import { RaceEnum } from "./models/ClearingModel";

export class Player
{
    number: number;
race:RaceEnum;

    constructor(number: number,race:RaceEnum)
    {
        this.number = number;
        this.race = race;
    }
}
