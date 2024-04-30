import { Player } from "./Player";
import { ClearingModel } from "./models/ClearingModel";

export class GameState
{
    Clearings: ClearingModel[];
    ClearingSize: number;
    Players: Player[];

    constructor()
    {
        this.Clearings = [];
        this.ClearingSize = 50;
        this.Players = [];
    }
}

