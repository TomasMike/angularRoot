import { ComponentType, RaceEnum } from "./ClearingModel";
import { IPieceModel } from "./IPieceModel";

export class WarriorPieceModel implements IPieceModel {
    text: string;
    race: RaceEnum;
    type: ComponentType;

    constructor(race: RaceEnum) {
        this.text = "Warrior";
        this.race = race;
        this.type = ComponentType.Warrior;
    }

    ComponentCode(): string {
        return this.race + "_" + this.type;
    }

   
}



export class PieceGrouping {
    type: string;
    count: number;

    constructor(type: string) {
        this.type = type;
        this.count =1;
    }

}