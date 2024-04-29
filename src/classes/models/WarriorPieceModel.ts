import { ComponentTypeEnum, RaceEnum } from "./ClearingModel";
import { IPieceModel } from "./IPieceModel";

export class WarriorPieceModel implements IPieceModel
{
    text: string;
    race: RaceEnum;
    type: ComponentTypeEnum;

    constructor(race: RaceEnum)
    {
        this.text = "Warrior";
        this.race = race;
        this.type = ComponentTypeEnum.Warrior;
    }
}

export class PieceGrouping
{
    componentType: ComponentTypeEnum;
    componentRace: RaceEnum;
    componentTypeText: string;
    componentRaceText: string;
    count: number;

    constructor(type: ComponentTypeEnum, race: RaceEnum)
    {
        this.componentType = type;
        this.componentRace = race;
        this.componentTypeText = ComponentTypeEnum[type];
        this.componentRaceText = RaceEnum[race];
        this.count = 1;
    }
}