import { Dictionary } from "../types/Dictionary";
import { PieceGroupingModel } from "./PieceGroupingModel";

export class ClearingModel
{
    Id: number;
    Suit: string;
    Left: number;
    Top: number;
    Pieces: PieceGroupingModel[];

    constructor(id: number, color: ClearingSuitEnum, left: number, top: number)
    {
        this.Id = id;
        this.Suit = ClearingSuitEnum[color];
        this.Left = left;
        this.Top = top;
        this.Pieces = [];
    }

    AddPiece(type: ComponentTypeEnum): void
    {
        var g = this.Pieces.find(_ => _.componentType === type);

        if(g === undefined)
        {
            this.Pieces.push(new PieceGroupingModel(type));
        }
        else
        {
            g.count++;
        }

     

    }
}

export enum ClearingSuitEnum
{
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

export enum ComponentGroupEnum
{
    Warrior,
    Pawn,
    Building,
    Token
}

export enum ComponentTypeEnum
{
    MarquiseDeCat_Warrior,
    MarquiseDeCat_Building_SawMill,
    MarquiseDeCat_Building_Recruiter,
    MarquiseDeCat_Building_Workshop,
    MarquiseDeCat_Token_Wood,
    MarquiseDeCat_Token_Keep,

    EyrieDynasties_Warrior,
    EyrieDynasties_Building_Roost,

    WoodlandAlliance_Warrior,
    WoodlandAlliance_Building_Base_Fox,
    WoodlandAlliance_Building_Base_Rabbit,
    WoodlandAlliance_Building_Base_Mice,
    WoodlandAlliance_Token_Sympathy,

    Vagabond_Pawn,


}



