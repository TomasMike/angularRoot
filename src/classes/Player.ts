import { RaceEnum } from "./models/Enums";

export class Player
{
    Number: number;
    Race: RaceEnum;

    constructor(number: number, race: RaceEnum)
    {
        this.Number = number;
        this.Race = race;
    }
}
