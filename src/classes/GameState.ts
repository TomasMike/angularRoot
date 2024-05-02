import { Player } from "./Player";
import { ClearingModel } from "./models/ClearingModel";

export class GameState
{
    Clearings: ClearingModel[];
    ClearingSize: number;
    Players: Player[];
    ActivePlayerId: number;


    constructor()
    {
        this.Clearings = [];
        this.ClearingSize = 50;
        this.Players = [];
        this.ActivePlayerId = 1;
    }
}

