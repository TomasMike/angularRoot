import { RaceEnum } from "../classes/models/Enums";
import { IRace } from "./IRace";


export class CorvidConspiracyRace implements IRace
{
    RaceEnum: RaceEnum = RaceEnum.CorvidConspiracy;

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
