import { Player } from "./Player";
import { GeneralHelper } from "./helpers/GeneralHelper";
import { Card } from "./models/Card";
import { ClearingModel } from "./models/ClearingModel";
import { CardSuitEnum, GameWorkflowStateEnum, RaceEnum } from "./models/Enums";
import { TArray } from "./types/TArray";

export class GameState
{
    Clearings: TArray<ClearingModel>;
    ClearingSize: number;
    Players: TArray<Player>;
    ActivePlayerId: number;
    GameWorkflowState: GameWorkflowStateEnum;
    DrawDeck: TArray<Card>;
    DiscardPile: TArray<Card>;

    constructor()
    {
        this.Clearings = new TArray<ClearingModel>;
        this.ClearingSize = 50;
        this.Players = new TArray;
        this.ActivePlayerId = 1;
        this.GameWorkflowState = GameWorkflowStateEnum.PlayersPickingRaces;
        this.DrawDeck = new TArray<Card>;
        this.DiscardPile = new TArray<Card>;

        this.Players.push(new Player(1, RaceEnum.EyrieDynasties));

        // for (let index = 0; index < 15; index++)
        // {
        //     this.DrawDeck.push(new Card(CardSuitEnum.Bird, `Placeholder Card ${(index * 4) + 1}`, (index * 4) + 1));
        //     this.DrawDeck.push(new Card(CardSuitEnum.Fox, `Placeholder Card ${(index * 4) + 2}`, (index * 4) + 2));
        //     this.DrawDeck.push(new Card(CardSuitEnum.Mouse, `Placeholder Card ${(index * 4) + 3}`, (index * 4) + 3));
        //     this.DrawDeck.push(new Card(CardSuitEnum.Rabbit, `Placeholder Card ${(index * 4) + 4}`, (index * 4) + 4));
        // }

        var i = 1;
        this.DrawDeck.push(new Card(CardSuitEnum.Bird, "Armorers", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Bird, "Armorers", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Bird, "Sappers", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Bird, "Sappers", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Bird, "Brutal Tactics", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Bird, "Brutal Tactics", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Bird, "Royal Claim", i++));

        this.DrawDeck.push(new Card(CardSuitEnum.Bird, "Birdy Bindle", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Bird, "Woodland Runners", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Bird, "Arms Grader", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Bird, "Crossbow", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Bird, "Ambush", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Bird, "Ambush", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Bird, "Dominance", i++));
        
        this.DrawDeck.push(new Card(CardSuitEnum.Rabbit, "Better Burrow Bank", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Rabbit, "Better Burrow Bank", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Rabbit, "Cobbler", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Rabbit, "Cobbler", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Rabbit, "Command Warren", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Rabbit, "Command Warren", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Rabbit, "Bake Sale", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Rabbit, "Smuggler's Trail", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Rabbit, "Root Tea", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Rabbit, "A Visit to Friends", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Rabbit, "Favor of the Rabbits", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Rabbit, "Ambush", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Rabbit, "Dominance", i++));

        this.DrawDeck.push(new Card(CardSuitEnum.Mouse, "Codebreakers", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Mouse, "Codebreakers", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Mouse, "Scouting Party", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Mouse, "Scouting Party", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Mouse, "Crossbow", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Mouse, "Sword", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Mouse, "Travel Gear", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Mouse, "Investments", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Mouse, "Favor of the Mice", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Mouse, "Root Tea", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Mouse, "Mouse-in-a-Sack", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Mouse, "Ambush", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Mouse, "Dominance", i++));
        
        this.DrawDeck.push(new Card(CardSuitEnum.Fox, "Stand and Deliver!", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Fox, "Stand and Deliver!", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Fox, "Tax Collector", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Fox, "Tax Collector", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Fox, "Tax Collector", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Fox, "Root Tea", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Fox, "Protection Racket", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Fox, "Travel Gear", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Fox, "Gently used Knapsack", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Fox, "Favor of the Foxes", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Fox, "Foxfolk Steel", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Fox, "Anvil", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Fox, "Ambush", i++));
        this.DrawDeck.push(new Card(CardSuitEnum.Fox, "Dominance", i++));

        this.DrawDeck.Randomize();
    }
}

