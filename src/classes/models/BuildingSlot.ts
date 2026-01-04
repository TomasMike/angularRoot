import { ComponentTypeEnum } from "./Enums";

export class BuildingSlot
{
    IsRuinsSlot: boolean;
    Building?: ComponentTypeEnum | null;
    IsBlockedByRuin:boolean;

    constructor(isRuinsSlot: boolean)
    {
        this.IsRuinsSlot = isRuinsSlot;
        this.Building = null;
        this.IsBlockedByRuin = false;
    }

    IsEmpty()
    {
        return this.Building === null && !this.IsBlockedByRuin;
    }

}