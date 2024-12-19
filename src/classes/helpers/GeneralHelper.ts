import { Card } from "../models/Card";
import { TArray } from "../types/TArray";

export class GeneralHelper
{
    // min and max included 
    public static RandomIntFromInterval(min: number, max: number)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

   


    
}
