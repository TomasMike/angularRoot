import { Asker, GameManager } from "../classes/GameManager";
import { ClearingHelper } from "../classes/helpers/ClearingHelper";
import { ComponentTypeEnum, EnumHelper, RaceEnum } from "../classes/models/Enums";
import { IRace } from "./IRace";


export enum EyrieLeaderEnum
{
    Builder,
    Charismatic,
    Commander,
    Despot
}

export class EyrieDynastiesRace implements IRace
{
    RaceEnum: RaceEnum = RaceEnum.EyrieDynasties;

    WarriorsReserve: number;
    RoostReserve: number;


    constructor()
    {
        this.WarriorsReserve = 20;
        this.RoostReserve = 7;
    }


    async Setup(asker: Asker, usedStartingClearings: number[]): Promise<number>
    {
        console.log("eyrie setup");
        let startingClearing = -1;

        //7.3.2 Place Roost and Starting Warriors. Place 1 roost and 6 warriors in a corner clearing that is not the starting corner clearing of another player and, if possible, is diagonally opposite from a starting corner clearing. This is your starting clearing.
        startingClearing = await asker.AskOneClearingFiltered(ClearingHelper.GetAvailableStartingClearings(usedStartingClearings), "Select staring clearing");

        GameManager.SpawnPiece(ComponentTypeEnum.EyrieDynasties_Building_Roost, startingClearing);
        
        for (let index = 1; index <= 6; index++)
        {
            GameManager.SpawnPiece(ComponentTypeEnum.EyrieDynasties_Warrior, startingClearing);
        }
       

        // 7.3.3 Step 3: Choose Leader. Choose 1 of the 4 Eyrie leader cards and place it in your Leader Card slot. Gather the remaining leaders face up near you.
//let leader = asker.AskPrompt("Choose leader: 1=",EnumHelper.GetEnumArray(EyrieLeaderEnum).some)

        // 7.3.4 Step 4: Tuck Viziers. Tuck your 2 Loyal Vizier cards, showing their suit, into the Decree columns above your faction board as listed on your leader.
        // 7.3.5 Step 5: Fill Roosts Track. Place your 6 remaining roosts on your Roosts track from right to left.
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
