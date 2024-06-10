import { RaceEnum } from "../classes/models/Enums";

export interface IRace
{
    RaceEnum:RaceEnum;
    Setup():void;
    Morning():void;
    Day():void;
    Evening():void;
}


