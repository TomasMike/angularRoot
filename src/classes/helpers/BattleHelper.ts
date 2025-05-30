import { GameManager } from "../GameManager";
import { RaceEnum } from "../models/Enums";
import { Player } from "../Player";
import { ClearingHelper } from "./ClearingHelper";
import { ComponentHelper } from "./ComponentHelper";
import { GeneralHelper } from "./GeneralHelper";


export class BattleHelper
{
    public static Battle(attacker: Player, defender: Player, clearingId: number)
    {
        var dice = [GeneralHelper.RandomIntFromInterval(0, 3), GeneralHelper.RandomIntFromInterval(0, 3)].sort();
        var clearing = ClearingHelper.GetClearingById(clearingId);

        var attackerWarsCount = clearing.Pieces.Where(p => p.GetComponentRace() === attacker.Race.RaceEnum).length;
        var defenderWarsCount = clearing.Pieces.Where(p => p.GetComponentRace() === defender.Race.RaceEnum).length;

        if (attackerWarsCount === 0 || defenderWarsCount === 0)
            throw new Error();

        var aDice, dDice: number;

        if (dice[0] === dice[1])
            aDice = dDice = dice[0];

        //dice[1] is higher
        else if (defender.Race.RaceEnum == RaceEnum.WoodlandAlliance) //if WA is defending it takes higher dice
        {
            aDice = dice[0];
            dDice = dice[1];
        }
        else
        {
            aDice = dice[1];
            dDice = dice[0];
        }

        var aHitsDealt = Math.min(aDice, attackerWarsCount);
        var dHitsDealt = Math.min(dDice, defenderWarsCount);

        clearing.RemovePieces(ComponentHelper.GetWarriorComponentTypeByRace(attacker.RaceEnum), Math.min(dHitsDealt, attackerWarsCount));
        clearing.RemovePieces(ComponentHelper.GetWarriorComponentTypeByRace(defender.RaceEnum), Math.min(aHitsDealt, defenderWarsCount));
        GameManager.GameState.Log(`Battle:Attacker[${attacker.Race.RaceEnum}][W:${attackerWarsCount},Hits:${aHitsDealt},Kills:${Math.min(dHitsDealt, attackerWarsCount)}]`);
        GameManager.GameState.Log(`Battle:Defender[${defender.Race.RaceEnum}][W:${defenderWarsCount},Hits:${dHitsDealt},Kills:${Math.min(aHitsDealt, defenderWarsCount)}]`);

    }





}
