import { GameManager } from "../GameManager";
import { RaceEnum } from "../models/Enums";
import { Player } from "../Player";

export class GeneralHelper
{
    /**
     * Min and max included
     */
    public static RandomIntFromInterval(min: number, max: number)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public static GetPlayerByRaceEnum(race: RaceEnum, playerNumberIfVagabond?: number): Player
    {
        if (race === RaceEnum.Vagabond && GameManager.GameState.IsTwoVagabondGame())
        {
            if (!!playerNumberIfVagabond)
            {
                return GameManager.GameState.Players.First(p => p.Number === playerNumberIfVagabond);
            }
            else
            {
                throw new Error("define playernumber");
            }
        }
        else
        {
            return GameManager.GameState.Players.First(p => p.RaceEnum === race);
        }
    }

    public static GetPlayerById(id:number):Player
    {
        return GameManager.GameState.Players.First(_ => _.Number === id);
    }

    public static IsUndefined(o:any):boolean
    {
        return typeof(o) === "undefined";
    }
}
