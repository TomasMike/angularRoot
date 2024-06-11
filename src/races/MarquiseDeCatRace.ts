import { Asker, GameManager } from "../classes/GameManager";
import { ClearingHelper } from "../classes/helpers/ClearingHelper";
import { ComponentHelper } from "../classes/helpers/ComponentHelper";
import { ComponentTypeEnum, RaceEnum } from "../classes/models/Enums";
import { IRace } from "./IRace";


export class MarquiseDeCatRace implements IRace
{
    RaceEnum: RaceEnum = RaceEnum.MarquiseDeCat;

    private _wood: number;
    private _warriors: number;

    constructor()
    {
        this._wood = 8;
        this._warriors = 25;
    }


    async Setup(o: Asker): Promise<void>
    {
        //6.3.2 ask for starting cleraing - place keep there
        let startingClearing = -1;

        // var q = o.AskOneClearing();
        // q.then(qq => keepClearing = qq);
        // await q;

        startingClearing = await o.AskOneClearingFiltered(ClearingHelper.GetCornerClearings(), "Select staring clearing");
        GameManager.SpawnPiece(ComponentTypeEnum.MarquiseDeCat_Token_Keep, startingClearing)


        //6.3.3 Place a warrior in each clearing except the clearing in the diagonally opposite corner from the clearing with the keep token.



        //6.3.4Place 1 sawmill, 1 workshop, and 1 recruiter. You may place them among the clearing with the keep token  nd any adjacent clearings, in any combination. 
        //ASK
        let c = [ComponentTypeEnum.MarquiseDeCat_Building_Sawmill, ComponentTypeEnum.MarquiseDeCat_Building_Workshop, ComponentTypeEnum.MarquiseDeCat_Building_Recruiter];

        GameManager.SpawnPiece(
            ComponentTypeEnum.MarquiseDeCat_Building_Sawmill,
            await o.AskOneClearingFiltered(ClearingHelper.GetNeighbourClearings(startingClearing).concat([startingClearing]), `Select clearing to place Sawmill`));

        GameManager.SpawnPiece(
            ComponentTypeEnum.MarquiseDeCat_Building_Sawmill,
            await o.AskOneClearingFiltered(ClearingHelper.GetNeighbourClearings(startingClearing).concat([startingClearing]), `Select clearing to place Sawmill`));
        GameManager.SpawnPiece(
            ComponentTypeEnum.MarquiseDeCat_Building_Sawmill,
            await o.AskOneClearingFiltered(ClearingHelper.GetNeighbourClearings(startingClearing).concat([startingClearing]), `Select clearing to place Sawmill`));
        // ComponentHelper.GetComponentInfo


        //throw new Error("Method not implemented.");
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
