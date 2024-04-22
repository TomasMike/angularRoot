import { ComponentType, RaceEnum } from "./ClearingModel";

export interface IPieceModel {
    text:string;
    race:RaceEnum;
    type:ComponentType;
    ComponentCode():string;
}


