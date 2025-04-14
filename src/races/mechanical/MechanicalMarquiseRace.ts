import { GameManager } from "../../classes/GameManager";
import { ClearingHelper } from "../../classes/helpers/ClearingHelper";
import { GeneralHelper } from "../../classes/helpers/BattleHelper";
import { ComponentTypeEnum, RaceEnum } from "../../classes/models/Enums";
import { IRace } from "../IRace";

export class MechanicalMarquiseRace implements IRace
{
    RaceEnum: RaceEnum = RaceEnum.MarquiseDeCat;

    Setup(): Promise<void>
    {
        // 4.3.2 Step 2: Place Keep. Place the keep token in a random corner clearing.
        var startingClearing = GeneralHelper.RandomIntFromInterval(1, 4);
        GameManager.SpawnPiece(ComponentTypeEnum.MarquiseDeCat_Token_Keep, startingClearing);

        // 4.3.3 Step 3: Garrison. Place a warrior in each clearing except the clearing in the diagonally opposite corner from the clearing with the keep token. Place an extra warrior in the clearing with the keep token.
        GameManager.GameState.Clearings.forEach(c =>
        {
            if (c.Id !== ClearingHelper.GetOppositeClearingId(startingClearing))
                GameManager.SpawnPiece(ComponentTypeEnum.MarquiseDeCat_Warrior, c.Id);
        });

        GameManager.SpawnPiece(ComponentTypeEnum.MarquiseDeCat_Warrior, startingClearing);

        // 4.3.4 Step 4: Place Starting Buildings. Randomly place 1 sawmill, 1 workshop, and 1 recruiter among the clearing with the keep token and those clearings adjacent with up to one building in each clearing.
        var clearingForBuildings = ClearingHelper.GetNeighbourClearings(startingClearing).concat([startingClearing]);

        var startingBuildings = [ComponentTypeEnum.MarquiseDeCat_Building_Sawmill, ComponentTypeEnum.MarquiseDeCat_Building_Workshop, ComponentTypeEnum.MarquiseDeCat_Building_Recruiter];


        startingBuildings.forEach(b =>
        {
            var c = clearingForBuildings[GeneralHelper.RandomIntFromInterval(0, clearingForBuildings.length - 1)];
            GameManager.SpawnPiece(b, c);
            clearingForBuildings.filter(_ => _ !== c);
        }
        );


        return  new Promise((resolveInner) => {
            setTimeout(resolveInner, 50);
          });





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
