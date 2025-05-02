import { GameManager } from "../classes/GameManager";
import { Asker } from "../classes/Asker";
import { ClearingHelper } from "../classes/helpers/ClearingHelper";
import { CardSuitEnum, CardTypeEnum, ComponentTypeEnum, EnumHelper, EyrieActionEnum, RaceEnum } from "../classes/models/Enums";
import { IRace } from "./IRace";
import { Card, VizierCard } from "../classes/models/Card";
import { TArray } from "../classes/types/TArray";
import { Player } from "../classes/Player";
import { BattleHelper } from "../classes/helpers/BattleHelper";

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
    CardsInDecree: Card[]

    Player: Player;

    private a!: Asker;

    constructor(player: Player)
    {
        this.WarriorsReserve = 20;
        this.RoostReserve = 7;
        this.UnusedLeaders = [];
        this.UsedLeaders = [];
        this.Player = player;
        this.CardsInDecree = [];

    }
    StartingClearing?: number | undefined;



    async Setup(asker: Asker, usedStartingClearings: number[]): Promise<number>
    {
        this.a = asker;
        let debug = true;
        console.log("eyrie setup start");
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
        // 7.3.4 Step 4: Tuck Viziers. Tuck your 2 Loyal Vizier cards, showing their suit, into the Decree columns above your faction board as listed on your leader.
        this.SetupNewLeader(asker, debug);

        // 7.3.5 Step 5: Fill Roosts Track. Place your 6 remaining roosts on your Roosts track from right to left.

        console.log("eyrie setup end");
        return startingClearing;
    }

    async Morning(): Promise<void>
    {
        console.log("eyrie morning start");

        //7.4.1 Emergency Orders. If you have no cards in your hand, draw one card.
        if (this.Player.Hand.IsEmpty())
            this.Player.Hand.Draw(GameManager.DrawCard());

        //7.4.2 Add to the Decree. You must add one or two cards to the Decree, but only one card added may be a bird card. You may play each card to any column, and each column can hold any number of cards.
        await this.PickCardToAddToDecree(false);
        await this.PickCardToAddToDecree(true);

        //7.4.3 A New Roost. If you have no roosts on the map, place a roost and three warriors in a clearing with the fewest warriors where all those pieces can be placed. 

        console.log("eyrie morning end");
    }
    async Day(): Promise<void>
    {
        console.log("eyrie Day start");
        //TODO CRAFTING

        //decrees recruit - on what clearing suit we must recruit
        var requiredSuitsToRecruit = this.Decree.recruit.map(_ => _.Suit);
        console.log("eyrie Day Recruit start");

        var isTurmoil: boolean = false;

        //#region DECREE RECRUIT
        if (requiredSuitsToRecruit.length > 0)
        {
            do
            {
                //if we dont have any warrs in reserve, we cannot recruit -> turmoil
                if (this.WarriorsReserve === 0)
                {
                    isTurmoil = true;
                    break;
                }

                //is there at least one clearing where we can successfully recruit?
                //this is a list of clearing ids where we can
                var possibleClearingsToRecruit = GameManager.GameState.Clearings
                    .Where(c => requiredSuitsToRecruit.some(b => c.IsCardSuitMatchingClearing(b))) //clearings of suits in decree
                    .Where(c => c.Pieces.some(p => p.componentType === ComponentTypeEnum.EyrieDynasties_Building_Roost))

                //if not, turmoil
                if (possibleClearingsToRecruit.length === 0)
                {
                    isTurmoil = true;
                    break;
                }

                //pick clearing to recruit
                var p = await this.a.AskOneClearingFiltered(possibleClearingsToRecruit.map(c => c.Id), "Pick a clearing to recruit.", false);

                GameManager.SpawnPiece(ComponentTypeEnum.EyrieDynasties_Warrior, p);

                //with charismatic leader, we must recruit twice, if we have only one warrior, we recruit one, the turmoil
                if (this.ActiveLeader === EyrieLeaderEnum.Charismatic)
                {
                    if (this.WarriorsReserve === 0)
                    {
                        isTurmoil = true;
                        break;
                    }

                    GameManager.SpawnPiece(ComponentTypeEnum.EyrieDynasties_Warrior, p);
                }

                //get color of clearing we recruited on, remove the color from required colors
                var usedSuitToRecruit = ClearingHelper.GetClearingById(p).GetCardSuitOfClearing();

                // non bird suit was used
                if (requiredSuitsToRecruit.some(s => s === usedSuitToRecruit))
                {
                    requiredSuitsToRecruit = new TArray<CardSuitEnum>(requiredSuitsToRecruit).RemoveFirstMatching(s => s === usedSuitToRecruit);
                }
                else
                {
                    //we used bird
                    requiredSuitsToRecruit = new TArray<CardSuitEnum>(requiredSuitsToRecruit).RemoveFirstMatching(s => s === CardSuitEnum.Bird);
                }

            } while (requiredSuitsToRecruit.length > 0)
        }

        console.log("eyrie Day Recruit end");

        console.log("eyrie Day Move start");
        //#endregion DECREE RECRUIT
        //#region DECREE MOVE
        var requiredSuitsToMoveFrom = this.Decree.recruit.map(_ => _.Suit);

        if (requiredSuitsToMoveFrom.length > 0)
        {
            do 
            {
                var possibleClearingsToMoveFrom = GameManager.GameState.Clearings
                    .Where(c => requiredSuitsToMoveFrom.some(b => c.IsCardSuitMatchingClearing(b))) //clearings of suits in decree
                    .Where(c => c.Pieces.some(p => p.componentType === ComponentTypeEnum.EyrieDynasties_Warrior)) //has the clearing eyrie warrs
                    .Where(c => ClearingHelper.GetPossibleMoveOptionsFromThisClearing(RaceEnum.EyrieDynasties, c.Id)); //the eyrie can move from

                if (possibleClearingsToMoveFrom.length === 0)
                {
                    //turmoil
                }

                //pick clearing to move from
                var moveResult = await this.a.DoAMove(false, possibleClearingsToMoveFrom.map(c => c.Id));

                if (moveResult == null)
                {
                    throw Error("move in decree cannot be cancelled");
                }

                var usedSuitToMoveFrom = ClearingHelper.GetClearingById(moveResult.From).GetCardSuitOfClearing();

                if (requiredSuitsToMoveFrom.some(s => s === usedSuitToMoveFrom))
                {
                    requiredSuitsToMoveFrom = new TArray<CardSuitEnum>(requiredSuitsToMoveFrom).RemoveFirstMatching(s => s === usedSuitToRecruit);
                }
                else
                {
                    //we used bird
                    requiredSuitsToMoveFrom = new TArray<CardSuitEnum>(requiredSuitsToMoveFrom).RemoveFirstMatching(s => s === CardSuitEnum.Bird);
                }

                //requiredSuitsToMoveFrom.remove

            } while (requiredSuitsToMoveFrom.length > 0);
        }
        //#endregion DECREE MOVE
        //#region DECREE BATTLE
        var requiredSuitsToBattleIn = this.Decree.battle.map(_ => _.Suit);

        if (requiredSuitsToBattleIn.length > 0)
        {
            do
            {
                var possibleClearingsToBattleIn = GameManager.GameState.Clearings
                    .Where(c => requiredSuitsToBattleIn.some(b => c.IsCardSuitMatchingClearing(b))) //clearings of suits in decree
                    .Where(c => c.Pieces.some(p => p.componentType === ComponentTypeEnum.EyrieDynasties_Warrior)) //has the clearing eyrie warrs
                    .Where(c => c.CanRaceFightHere(RaceEnum.EyrieDynasties)); //the eyrie can battle in

                if(possibleClearingsToBattleIn.length === 0)
                {
                    //turmoil
                }

                var p = await this.a.AskOneClearingFiltered(possibleClearingsToBattleIn.map(c=>c.Id),"pick a clearing to battle")
                
                var q  =ClearingHelper.GetClearingById(p).GetPossibleDefenders
                
                this.a.AskPrompt("pick race to battle",)
                // BattleHelper.
                
            } while (requiredSuitsToBattleIn.length > 0);

        }






        console.log("eyrie Day end");
    }

    Evening(): void
    {
        console.log("eyrie Evening start");
        console.log("eyrie Evening end");
    }

    AddCardToDecree(card: Card, action: EyrieActionEnum)
    {
        if (card.Type === CardTypeEnum.Standard)
            this.Player.Hand.RemoveCard(card.Id);



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

        for (let index = 0; index < 2; index++)
        {
            this.AddCardToDecree(new VizierCard(CardSuitEnum.Bird, "Vizier Card"), this.Leaders.First(l => l.name == this.ActiveLeader).vizierActions[index]);
        }

        //rule fact, you must go through all leaders before using any leader a second time
        this.UnusedLeaders = EnumHelper.GetEnumArray(EyrieLeaderEnum)
            .filter(_ => _.value !== leader)
            .map(_ => _.value);
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

    async PickCardToAddToDecree(canCancel: boolean): Promise<boolean>
    {
        var selection = await this.a.AskAddDecree(canCancel);

        if (selection == "-1")
            return false;

        if (selection.indexOf(';') == -1)
            throw new Error("bad return value from askadddecree");

        //prve je EyrieActionEnum 0 based, druhe je id karty
        var commands = selection.split(';');

        if (commands.length != 2)
            throw new Error("bad return value from askadddecree");

        var action = Number(commands[0]) as EyrieActionEnum;
        var cardId = Number(commands[1]);

        var card = this.Player.Hand.GetCardById(cardId);

        this.AddCardToDecree(card, action);

        return true;
    }
}
