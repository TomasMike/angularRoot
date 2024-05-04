import { Player } from "./Player";
import { ClearingModel } from "./models/ClearingModel";
import { TArray } from "./types/TArray";

export class GameState
{
    Clearings: ClearingModel[];
    ClearingSize: number;
    Players: TArray<Player>;
    ActivePlayerId: number;


    constructor()
    {
        this.Clearings = [];
        this.ClearingSize = 50;
        this.Players = new TArray;
        this.ActivePlayerId = 1;
    }
}

