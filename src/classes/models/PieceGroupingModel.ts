import { race } from "rxjs";
import { ComponentTypeEnum, RaceEnum } from "./ClearingModel";
import { ComponentHelper } from "../helpers/ComponentHelper";

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
        return ComponentHelper.ComponentInfoDict.GetValue(this.componentType).Race.toString();
    }

    GetComponentRace(): RaceEnum
    {
        return ComponentHelper.ComponentInfoDict.GetValue(this.componentType).Race;
    }

    GetComponentTypeText(): string
    {
        return ComponentHelper.ComponentInfoDict.GetValue(this.componentType).Group.toString();
    }
}


