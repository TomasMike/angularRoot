import { GameManager } from "../classes/GameManager";
import { Asker } from "../classes/Asker";
import { ClearingHelper } from "../classes/helpers/ClearingHelper";
import { CardSuitEnum, ComponentTypeEnum, EnumHelper, EyrieActionEnum, RaceEnum } from "../classes/models/Enums";
import { IRace } from "./IRace";
import { Card, VizierCard } from "../classes/models/Card";
import { TArray } from "../classes/types/TArray";
import { Player } from "../classes/Player";


export enum EyrieLeaderEnum
{
    Builder,
    Commander,
    Despot,
    Charismatic,
}

interface ILeader
{
    name: EyrieLeaderEnum,
    vizierActions: EyrieActionEnum[],
    ability: string
}

export class EyrieDynastiesRace implements IRace
{
    private Leaders: TArray<ILeader> = new TArray<ILeader>([
        {
            name: EyrieLeaderEnum.Builder,
            vizierActions: [EyrieActionEnum.Recruit, EyrieActionEnum.Move],
            ability: "Whenever you craft, you ignore your Disdain for Trade special ability."
        },
        {
            name: EyrieLeaderEnum.Charismatic,
            vizierActions: [EyrieActionEnum.Recruit, EyrieActionEnum.Battle],
            ability: "Whenever you take a Recruit action, you must place two warriors instead of one."
        },
        {
            name: EyrieLeaderEnum.Commander,
            vizierActions: [EyrieActionEnum.Move, EyrieActionEnum.Battle],
            ability: "In battle as attacker, you deal an extra hit."
        },
        {
            name: EyrieLeaderEnum.Despot,
            vizierActions: [EyrieActionEnum.Move, EyrieActionEnum.Build],
            ability: "Whenever you remove at least one enemy building or token in battle, you score one extra victory point (two in total, 3.2.1)."
        }]);


    Decree: {
        recruit: Card[],
        move: Card[],
        battle: Card[],
        build: Card[],
    } = {
            recruit: [],
            move: [],
            battle: [],
            build: [],
        }


    RaceEnum: RaceEnum = RaceEnum.EyrieDynasties;

    WarriorsReserve: number;
    RoostReserve: number;

    ActiveLeader!: EyrieLeaderEnum;
    UnusedLeaders: EyrieLeaderEnum[];
    UsedLeaders: EyrieLeaderEnum[];

    Player:Player;

    private a!: Asker;

    constructor(player:Player)
    {
        this.WarriorsReserve = 20;
        this.RoostReserve = 7;
        this.UnusedLeaders = [];
        this.UsedLeaders = [];
        this.Player = player;
    }
    StartingClearing?: number | undefined;



    async Setup(asker: Asker, usedStartingClearings: number[]): Promise<number>
    {
        this.a = asker;
        let debug = true;
        console.log("eyrie setup");
        let startingClearing = -1;

        //7.3.2 Place Roost and Starting Warriors. Place 1 roost and 6 warriors in a corner clearing that is not the starting corner clearing of another player and, if possible, is diagonally opposite from a starting corner clearing. This is your starting clearing.
        if (debug)
            startingClearing = ClearingHelper.GetAvailableStartingClearings(usedStartingClearings)[0];
        else
            startingClearing = await asker.AskOneClearingFiltered(ClearingHelper.GetAvailableStartingClearings(usedStartingClearings), "Select staring clearing");

        GameManager.SpawnPiece(ComponentTypeEnum.EyrieDynasties_Building_Roost, startingClearing);

        for (let index = 1; index <= 6; index++)
        {
            GameManager.SpawnPiece(ComponentTypeEnum.EyrieDynasties_Warrior, startingClearing);
        }

        // 7.3.3 Step 3: Choose Leader. Choose 1 of the 4 Eyrie leader cards and place it in your Leader Card slot. Gather the remaining leaders face up near you.
        this.SetupNewLeader(asker,debug);

        // 7.3.4 Step 4: Tuck Viziers. Tuck your 2 Loyal Vizier cards, showing their suit, into the Decree columns above your faction board as listed on your leader.
        for (let index = 0; index < 2; index++)
        {
            this.AddCardToDecree(new VizierCard(CardSuitEnum.Bird, "Vizier Card"), this.Leaders.First(l => l.name == this.ActiveLeader).vizierActions[index]);
        }

        // 7.3.5 Step 5: Fill Roosts Track. Place your 6 remaining roosts on your Roosts track from right to left.



        if (debug)
        {

        }


        return startingClearing;
    }

    AddCardToDecree(card: Card, action: EyrieActionEnum)
    {
        switch (action)
        {
            case EyrieActionEnum.Recruit:
                this.Decree.recruit.push(card);
                break;
            case EyrieActionEnum.Move:
                this.Decree.move.push(card);
                break;
            case EyrieActionEnum.Battle:
                this.Decree.battle.push(card);
                break;
            case EyrieActionEnum.Build:
                this.Decree.build.push(card);
                break;
            default:
                break;
        }
    }

    SetupNewLeader(asker: Asker, debug: boolean = false)
    {
        var extraInfo = EnumHelper.GetEnumArray(EyrieLeaderEnum).map(_ => `[${_.value}]-${_.text}`).join(',');
        let leader: number;

        if (debug)
            leader = 0;
        else
            leader = Number(asker.AskPrompt(`Choose leader `, EnumHelper.GetEnumArray(EyrieLeaderEnum).map(_ => _.value.toString()), false, extraInfo) as string);

        this.ActiveLeader = leader;

        this.UnusedLeaders = EnumHelper.GetEnumArray(EyrieLeaderEnum)
            .filter(_ => _.value !== leader)
            .map(_ => _.value);
    }

    Morning(): void
    {
        //7.4.1 Emergency Orders. If you have no cards in your hand, draw one card.
        if(this.Player.Hand.length === 0)
            this.Player.Hand.push(GameManager.DrawCard());

        //7.4.2 Add to the Decree. You must add one or two cards to the Decree, but only one card added may be a bird card. You may play each card to any column, and each column can hold any number of cards.
        this.a.AskPrompt("test promt");

        //7.4.3 A New Roost. If you have no roosts on the map, place a roost and three warriors in a clearing with the fewest warriors where all those pieces can be placed. 
    }
    Day(): void
    {
        throw new Error("Method not implemented.");
    }
    Evening(): void
    {
        throw new Error("Method not implemented.");
    }

    HandleComponentSpawn(type: ComponentTypeEnum): boolean
    {
        switch (type)
        {
            case ComponentTypeEnum.EyrieDynasties_Warrior:
                if (this.WarriorsReserve == 0)
                    return false;
                this.WarriorsReserve--;
                break;
            case ComponentTypeEnum.EyrieDynasties_Building_Roost:
                if (this.RoostReserve == 0)
                    return false;
                this.RoostReserve--;
                break;
            default:
                throw new Error();
        }

        return true;
    }
}
