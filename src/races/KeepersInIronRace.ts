import { RaceEnum } from "../classes/models/Enums";
import { IRace } from "./IRace";

export class KeepersInIronRace implements IRace
{
    RaceEnum:RaceEnum = RaceEnum.KeepersInIron;

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
