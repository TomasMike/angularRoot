import { ComponentTypeEnum, RaceEnum } from "./ClearingModel";
import { ComponentHelper } from "../helpers/ComponentHelper"

export class PieceGroupingModel
{
    componentType: ComponentTypeEnum;
    count: number;

    constructor(type: ComponentTypeEnum)
    {
        this.componentType = type;
        this.count = 1;
    }

    GetComponentRaceText(): string
    {
       return RaceEnum[this.GetComponentRace()].toString()
    }

    GetComponentRace(): RaceEnum
    {
        return ComponentHelper.GetComponentInfo(this.componentType).Race;
    }

    GetComponentTypeText(): string
    {
        return ComponentHelper.GetComponentInfo(this.componentType).ComponentDisplayText;
    }
}


