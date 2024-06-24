import { retry } from "rxjs";
import { GameManager } from "../classes/GameManager";
import { Asker } from "../classes/Asker";
import { ClearingHelper } from "../classes/helpers/ClearingHelper";
import { ComponentHelper } from "../classes/helpers/ComponentHelper";
import { ComponentTypeEnum, RaceEnum } from "../classes/models/Enums";
import { IRace } from "./IRace";


export class MarquiseDeCatRace implements IRace
{
    RaceEnum: RaceEnum = RaceEnum.MarquiseDeCat;

    private _woodReserve: number;
    private _warriorsReserve: number;

    get WoodReserve() { return this._woodReserve }
    private set WoodReserve(n: number) { this._woodReserve = n; }

    constructor()
    {
        this._woodReserve = 8;
        this._warriorsReserve = 25;

    }

    async Setup(asker: Asker, usedStartingClearings: number[]): Promise<number>
    {
        console.log("Marquise setup");

        //6.3.2 ask for starting cleraing - place keep there
        let startingClearing = -1;


        startingClearing = await asker.AskOneClearingFiltered(ClearingHelper.GetAvailableStartingClearings(usedStartingClearings), "Select staring clearing");
        GameManager.SpawnPiece(ComponentTypeEnum.MarquiseDeCat_Token_Keep, startingClearing);
       // usedStartingClearings.push(startingClearing);

        //6.3.3 Place a warrior in each clearing except the clearing in the diagonally opposite corner from the clearing with the keep token.

        GameManager.GameState.Clearings.forEach(c =>
        {
            if (c.Id !== ClearingHelper.GetOppositeClearingId(startingClearing))
                GameManager.SpawnPiece(ComponentTypeEnum.MarquiseDeCat_Warrior, c.Id);
        });

        //6.3.4Place 1 sawmill, 1 workshop, and 1 recruiter. You may place them among the clearing with the keep token  nd any adjacent clearings, in any combination. 
        GameManager.SpawnPiece(
            ComponentTypeEnum.MarquiseDeCat_Building_Sawmill,
            await asker.AskOneClearingFiltered(ClearingHelper.GetNeighbourClearings(startingClearing).concat([startingClearing]), `Select clearing to place Sawmill`));

        GameManager.SpawnPiece(
            ComponentTypeEnum.MarquiseDeCat_Building_Recruiter,
            await asker.AskOneClearingFiltered(ClearingHelper.GetNeighbourClearings(startingClearing).concat([startingClearing]), `Select clearing to place Recruiter`));
        GameManager.SpawnPiece(
            ComponentTypeEnum.MarquiseDeCat_Building_Workshop,
            await asker.AskOneClearingFiltered(ClearingHelper.GetNeighbourClearings(startingClearing).concat([startingClearing]), `Select clearing to place Workshop`));

return startingClearing;

    }
    Morning(): void
    {
        throw new Error("Method not implemented.");
    }
    Day(): void
    {
        throw new Error("Method not implemented.");
    }
    Evening(): void
    {
        throw new Error("Method not implemented.");
    }
}
