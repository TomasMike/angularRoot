import { Asker } from "../classes/GameManager";
import { ClearingHelper } from "../classes/helpers/ClearingHelper";
import { RaceEnum } from "../classes/models/Enums";
import { IRace } from "./IRace";


export class EyrieDynastiesRace implements IRace
{
    RaceEnum: RaceEnum = RaceEnum.EyrieDynasties;

    WarriorsReserve: number;
   // RoostReserve: number;


    constructor()
    {
        this.WarriorsReserve = 20;

    }


    async Setup(asker: Asker, usedStartingClearings: number[]): Promise<number>
    {
        console.log("eyrie setup");
        console.log(usedStartingClearings);
        let startingClearing = -1;
        
        
       


        //7.3.2 Place Roost and Starting Warriors. Place 1 roost and 6 warriors in a corner clearing that is not the starting corner clearing of another player and, if possible, is diagonally opposite from a starting corner clearing. This is your starting clearing.

        startingClearing = await asker.AskOneClearingFiltered(usedStartingClearings, "Select staring clearing");
        //usedStartingClearings.push(startingClearing);


        // 7.3.3 Step 3: Choose Leader. Choose 1 of the 4 Eyrie leader cards and place it in your Leader Card slot. Gather the remaining leaders face up near you.
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
