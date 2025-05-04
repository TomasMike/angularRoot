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
    componentTypeText: string;
    count: number;
    playerNumber: number;

    constructor(type: ComponentTypeEnum, amount: number = 1, pNumber: number)
    {
        this.componentType = type;
        this.count = amount;
        this.componentTypeText = ComponentTypeEnum[this.componentType];
        this.playerNumber = pNumber;
    }

    GetComponentRaceText(): string
    {
        return RaceEnum[this.GetComponentRace()].toString();
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


