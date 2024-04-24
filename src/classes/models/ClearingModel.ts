import { IPieceModel } from "./IPieceModel";

export class ClearingModel {
    Id: number;
    Suit: string;
    Left: number;
    Top: number;
    Pieces: IPieceModel[];

    constructor(id: number, color: ClearingSuitEnum, left: number, top: number) {
        this.Id = id;
        this.Suit = ClearingSuitEnum[color];
        this.Left = left;
        this.Top = top;
        this.Pieces = [];
    }
}

export enum ClearingSuitEnum {
    Fox, Rabbit, Mouse
}

export enum RaceEnum
{
    MarquiseDeCat,
    EyrieDynasties,
    WoodlandAlliance,
    Vagabond,
    LizardCult,
    RiverfolkCompany,
    UndergroundDuchy,
    CorvidConspiracy,
    LordOfTheHundreds,
    KeepersInIron
}

export enum ComponentTypeEnum{
    Warrior,
    Pawn,
    Building,
    Token
}



