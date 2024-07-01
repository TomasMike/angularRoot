import { IRace } from "../races/IRace";
import { EyrieDynastiesRace } from "../races/EyrieDynastiesRace";
import { MarquiseDeCatRace } from "../races/MarquiseDeCatRace";
import { RaceEnum } from "./models/Enums";
import { TArray } from "./types/TArray";
import { Card } from "./models/Card";
// import { KeepersInIronRace } from "../races/KeepersInIronRace";
// import { LizardCultRace } from "../races/LizardCultRace";
// import { LordOfTheHundredsRace } from "../races/LordOfTheHundredsRace";
// import { CorvidConspiracyRace } from "../races/CorvidConspiracyRace";
// import { RiverfolkCompanyRace } from "../races/RiverfolkCompanyRace";
// import { UndergroundDuchyRace } from "../races/UndergroundDuchyRace";
// import { VagabondRace } from "../races/VagabondRace";
// import { WoodlandAllianceRace } from "../races/WoodlandAllianceRace";

export class Player
{
    Number: number;
    Race!: IRace;
    RaceEnum: RaceEnum;
    IsMechanical: boolean;
    Hand: TArray<Card>;

    constructor(number: number, race: RaceEnum)
    {
        this.Number = number;
        this.RaceEnum = race;
        this.IsMechanical = false;
        this.Hand = new TArray<Card>;

    }

    SetRace()
    {
        switch (this.RaceEnum)
        {
            case RaceEnum.MarquiseDeCat: this.Race = new MarquiseDeCatRace(this); break;
            case RaceEnum.EyrieDynasties: this.Race = new EyrieDynastiesRace(this); break;
            // case RaceEnum.WoodlandAlliance: this.Race = new WoodlandAllianceRace(); break;
            // case RaceEnum.Vagabond: this.Race = new VagabondRace(); break;
            // case RaceEnum.LizardCult: this.Race = new LizardCultRace(); break;
            // case RaceEnum.RiverfolkCompany: this.Race = new RiverfolkCompanyRace(); break;
            // case RaceEnum.UndergroundDuchy: this.Race = new UndergroundDuchyRace(); break;
            // case RaceEnum.CorvidConspiracy: this.Race = new CorvidConspiracyRace(); break;
            // case RaceEnum.LordOfTheHundreds: this.Race = new LordOfTheHundredsRace(); break;
            // case RaceEnum.KeepersInIron: this.Race = new KeepersInIronRace(); break;
            default: throw new Error();
        }
    }
}