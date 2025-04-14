import { RaceEnum } from "../models/Enums";

export class RaceHelper
{
    public static RaceNameAsText(race:RaceEnum):string
    {
        switch(race)
        {
            case RaceEnum.EyrieDynasties:return "Eyrie Dynasties";
            default:return "ERROR";
        }
    }
}
