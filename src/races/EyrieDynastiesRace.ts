import { RaceEnum } from "../classes/models/Enums";
import { IRace } from "./IRace";


export class EyrieDynastiesRace implements IRace
{
    RaceEnum:RaceEnum = RaceEnum.EyrieDynasties;

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
