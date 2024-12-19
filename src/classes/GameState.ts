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

        this.Players.push(new Player(1,RaceEnum.EyrieDynasties));

        for (let index = 0; index < 15; index++)
        {
            this.DrawDeck.push(new Card(CardSuitEnum.Bird,   `Placeholder Card ${(index * 4) + 1}`,(index * 4) + 1));
            this.DrawDeck.push(new Card(CardSuitEnum.Fox,    `Placeholder Card ${(index * 4) + 2}`,(index * 4) + 2));
            this.DrawDeck.push(new Card(CardSuitEnum.Mouse,  `Placeholder Card ${(index * 4) + 3}`,(index * 4) + 3));
            this.DrawDeck.push(new Card(CardSuitEnum.Rabbit, `Placeholder Card ${(index * 4) + 4}`,(index * 4) + 4));
        }

        this.DrawDeck.Randomize();
    }
}

