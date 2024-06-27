import { TArray } from "../types/TArray";

export class GeneralHelper
{
    // min and max included 
    public static RandomIntFromInterval(min: number, max: number)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public static Randomize<T>(array: TArray<T>)
    {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }
}
