import { error } from "console";
import { GameManager } from "../GameManager";
import { ClearingHelper } from "../helpers/ClearingHelper";
import { ComponentHelper } from "../helpers/ComponentHelper";
import { ExtensionFaker } from "../helpers/ExtensionFaker";
import { GeneralHelper } from "../helpers/GeneralHelper";
import { Dictionary } from "../types/Dictionary";
import { TArray } from "../types/TArray";
import { BuildingSlot } from "./BuildingSlot";
import { Card } from "./Card";
import { CardSuitEnum, ClearingSuitEnum, ComponentGroupEnum, ComponentTypeEnum, RaceEnum } from "./Enums";
import { AskerPromptOption } from "./Option";
import { PieceGroupingModel } from "./PieceGroupingModel";

export class ClearingModel
{
    Id: number;
    Suit: ClearingSuitEnum;
    Left: number;
    Top: number;
    Pieces: TArray<PieceGroupingModel>;
    Highlighted: boolean;
    SuitText: string;
    BuildingSlots: BuildingSlot[];

    constructor(id: number, buildingSlots: number, buildingAndRuinsSlots: number, color: ClearingSuitEnum, left: number, top: number)
    {
        this.Id = id;
        this.Suit = color;
        this.SuitText = ClearingSuitEnum[color];
        this.Left = left;
        this.Top = top;
        this.Pieces = new TArray;
        this.Highlighted = false;

        this.BuildingSlots = [];
        for (let i = 1; i <= buildingSlots; i++)
        {
            this.BuildingSlots.push(new BuildingSlot(false));
        }
        for (let i = 1; i <= buildingAndRuinsSlots; i++)
        {
            this.BuildingSlots.push(new BuildingSlot(true));
        }
    }

    GetCardSuitOfClearing(): CardSuitEnum
    {
        switch (this.Suit)
        {
            case ClearingSuitEnum.Fox: return CardSuitEnum.Fox;
            case ClearingSuitEnum.Mouse: return CardSuitEnum.Mouse;
            case ClearingSuitEnum.Rabbit: return CardSuitEnum.Rabbit;
        }
    }

    IsCardMatchingClearing(card: Card): boolean
    {
        return card.Suit === CardSuitEnum.Bird
            || (card.Suit === CardSuitEnum.Fox && this.Suit === ClearingSuitEnum.Fox)
            || (card.Suit === CardSuitEnum.Mouse && this.Suit === ClearingSuitEnum.Mouse)
            || (card.Suit === CardSuitEnum.Rabbit && this.Suit === ClearingSuitEnum.Rabbit)
    }

    IsCardSuitMatchingClearing(suit: CardSuitEnum): boolean
    {
        return suit === CardSuitEnum.Bird
            || (suit === CardSuitEnum.Fox && this.Suit === ClearingSuitEnum.Fox)
            || (suit === CardSuitEnum.Mouse && this.Suit === ClearingSuitEnum.Mouse)
            || (suit === CardSuitEnum.Rabbit && this.Suit === ClearingSuitEnum.Rabbit)
    }


    AddPieces(type: ComponentTypeEnum, amount: number = 1, pNumber?: number): void
    {
        
        if(ComponentHelper.GetComponentInfo(type).Group === ComponentGroupEnum.Building)
        {
            if(!this.HasFreeBuildingSlot())
                throw new Error("Cant build, no free build spaces");

            this.BuildingSlots.find( bs => bs.IsEmpty())?.Building === type;

        }

        if (typeof pNumber === 'undefined')
        {
            pNumber = GameManager.GameState.Players.First(p => p.RaceEnum === ComponentHelper.GetComponentInfo(type).Race).Number;
        }

        var group = this.Pieces.find(_ => _.componentType === type);

        if (group === undefined)
        {

            this.Pieces.push(new PieceGroupingModel(type, amount, pNumber));
        }
        else
        {
            group.count += amount;
        }
    }

    RemovePieces(type: ComponentTypeEnum, amount: number = 1): void
    {
        var g = this.Pieces.First(_ => _.componentType === type);

        if (amount > g.count)
            throw new Error("Cant remove more than there is.");

        g.count -= amount;

        if (g.count === 0)
        {
            this.Pieces = this.Pieces.Where(_ => _.count > 0);
        }
    }

    GetAmountOfWarOfPlayer(race: RaceEnum): number
    {
        var warType = ComponentHelper.GetWarriorComponentTypeByRace(race);
        return this.Pieces.First(_ => _.componentType === warType).count;
    }

    GetWhoRulesClearing(): RaceEnum | null
    {
        var d = new Map<RaceEnum, number>();

        if (this.Pieces.length === 0)
            return null;

        //RULE - LIZARD GARDENS OVERRIDE RULE
        if (this.Pieces.some(p => p.GetComponentRace() === RaceEnum.LizardCult && p.GetComponentInfo().Group === ComponentGroupEnum.Building))
            return RaceEnum.LizardCult;


        this.Pieces.forEach(g =>
        {
            let info = ComponentHelper.GetComponentInfo(g.componentType);
            let race = info.Race;

            if (info.Group === ComponentGroupEnum.Pawn || info.Group === ComponentGroupEnum.Token)
                return;

            if (d.has(race))
            {
                let p = d.get(race) as number;
                d.set(race, p + g.count)
            }
            else
            {
                d.set(race, g.count);
            }
        });

        var vals = d.values();

        var maxVal = Math.max(...vals);

        var playersWithMax = ExtensionFaker.MapWhere(d, _ => _.value === maxVal);

        if (playersWithMax.size === 1)
        {
            return ExtensionFaker.MapFirst(d).key;
        }
        //RULE - EYRIE WIN RULING TIES
        else if (d.has(RaceEnum.EyrieDynasties) && d.get(RaceEnum.EyrieDynasties) === maxVal)
        {
            return RaceEnum.EyrieDynasties;
        }

        return null;
    }


    CanRaceFightHere(r: RaceEnum): boolean
    {
        return this.Pieces.some(p => p.componentType === ComponentHelper.GetWarriorComponentTypeByRace(r))
            && this.Pieces.some(p => p.GetComponentRace() != r);
    }

    GetPossibleDefenders(attacker: RaceEnum): number[]
    {
        var attackerId = GeneralHelper.GetPlayerByRaceEnum(attacker).Number;


        var playerIds: number[] = [];

        this.Pieces.forEach(p =>
        {
            var cNum = p.playerNumber;


            if (cNum !== attackerId)
            {
                if (!playerIds.includes(cNum))
                {
                    playerIds.push(cNum);
                }
            }
        });

        return playerIds;
    }

    GetPossibleDefendersForAskPrompt(attacker: RaceEnum): AskerPromptOption[]
    {
        var attackerId = GeneralHelper.GetPlayerByRaceEnum(attacker).Number;


        var options: AskerPromptOption[] = [];

        this.Pieces.forEach(p =>
        {
            var cNum = p.playerNumber;


            if (cNum !== attackerId)
            {
                if (options.every(o => o.Id !== cNum))
                {
                    options.push(new AskerPromptOption(p.GetComponentRaceText(), cNum));
                }
            }
        });

        return options;
    }

    HasFreeBuildingSlot():boolean
    {
        return this.BuildingSlots.some(b => b.IsEmpty());
    }


}

