import { Player } from "./Player";
import { GeneralHelper } from "./helpers/GeneralHelper";
import { Card } from "./models/Card";
import { ClearingModel } from "./models/ClearingModel";
import { CardSuitEnum, GameWorkflowStateEnum } from "./models/Enums";
import { TArray } from "./types/TArray";

export class GameState
{
    Clearings: ClearingModel[];
    ClearingSize: number;
    Players: TArray<Player>;
    ActivePlayerId: number;
    GameWorkflowState: GameWorkflowStateEnum;
    Deck: TArray<Card>;

    constructor()
    {
        this.Clearings = [];
        this.ClearingSize = 50;
        this.Players = new TArray;
        this.ActivePlayerId = 1;
        this.GameWorkflowState = GameWorkflowStateEnum.PlayersPickingRaces;
        this.Deck = new TArray<Card>;

        for (let index = 0; index < 15; index++)
        {
            this.Deck.push(new Card(CardSuitEnum.Bird, `Placeholder Card ${(index * 4) + 1}`));
            this.Deck.push(new Card(CardSuitEnum.Fox, `Placeholder Card ${(index * 4) + 2}`));
            this.Deck.push(new Card(CardSuitEnum.Mouse, `Placeholder Card ${(index * 4) + 3}`));
            this.Deck.push(new Card(CardSuitEnum.Rabbit, `Placeholder Card ${(index * 4) + 4}`));
        }

        GeneralHelper.Randomize(this.Deck);
    }
}

