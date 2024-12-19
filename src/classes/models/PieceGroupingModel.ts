import { AnonymousSubject } from "rxjs/internal/Subject";
import { ComponentHelper } from "../helpers/ComponentHelper"
import { ComponentTypeEnum, RaceEnum } from "./Enums";
import { ComponentInfo } from "../ComponentInfo";

/**
 * a group of same components of one player, like 5 warriors, 1 sawmill
 */
export class PieceGroupingModel
{
    componentType: ComponentTypeEnum;
    count: number;

    constructor(type: ComponentTypeEnum, amount: number = 1)
    {
        this.componentType = type;
        this.count = amount;
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

    GetComponentInfo(): ComponentInfo
    {
        return ComponentHelper.GetComponentInfo(this.componentType);
    }
}


