import { RaceEnum } from "../classes/models/Enums";
import { IRace } from "./IRace";


export class UndergroundDuchyRace implements IRace
{
    RaceEnum:RaceEnum = RaceEnum.UndergroundDuchy;

    Setup(): void
    {
        throw new Error("Method not implemented.");
    }
    Morning(): void
    {
        throw new Error("Method not implemented.");
    }
    Day(): void
    {
        throw new Error("Method not implemented.");
    }
    Evening(): void
    {
        throw new Error("Method not implemented.");
    }
}


