import { GameManager } from "../GameManager";
import { ClearingModel } from "../models/ClearingModel";
import { ClearingSuitEnum, RaceEnum } from "../models/Enums";
import { TArray } from "../types/TArray";

export class ClearingHelper
{
    private static OppositeClearingIds: { a: number, b: number }[] =
        [
            { a: 1, b: 3 },
            { a: 3, b: 1 },
            { a: 2, b: 4 },
            { a: 4, b: 2 }
        ];

    static GetCornerClearings(): number[]
    {
        return [1, 2, 3, 4];
    }

    static InitClearings(): TArray<ClearingModel>
    {
        return new TArray([
            new ClearingModel(1, ClearingSuitEnum.Fox, 40, 40),
            new ClearingModel(2, ClearingSuitEnum.Mouse, 420, 90),
            new ClearingModel(3, ClearingSuitEnum.Rabbit, 390, 390),
            new ClearingModel(4, ClearingSuitEnum.Rabbit, 40, 360),
            new ClearingModel(5, ClearingSuitEnum.Rabbit, 250, 40),
            new ClearingModel(6, ClearingSuitEnum.Fox, 440, 220),
            new ClearingModel(7, ClearingSuitEnum.Mouse, 270, 320),
            new ClearingModel(8, ClearingSuitEnum.Fox, 170, 400),
            new ClearingModel(9, ClearingSuitEnum.Mouse, 30, 170),
            new ClearingModel(10, ClearingSuitEnum.Rabbit, 200, 110),
            new ClearingModel(11, ClearingSuitEnum.Mouse, 300, 200),
            new ClearingModel(12, ClearingSuitEnum.Fox, 130, 230),
        ]);
    }

    static GetNeighbourClearings(clearingId: number)
    {
        let r: number[] = [];

        this.Paths.forEach(p =>
        {
            if (p.a == clearingId)
                r.push(p.b);
            else if (p.b == clearingId)
                r.push(p.a);
        });

        return r;
    }

    static GetClearingById(id: number): ClearingModel
    {
        var c = GameManager.GameState.Clearings.find(_ => _.Id === id);

        if (c === undefined)
            throw new Error(`Clearing with id=[${id}] doesnt exist.`);

        return c;
    }

    private static Paths: { a: number, b: number }[] =
        [
            { a: 1, b: 5 },
            { a: 1, b: 9 },
            { a: 1, b: 10 },
            { a: 2, b: 5 },
            { a: 2, b: 6 },
            { a: 2, b: 10 },
            { a: 3, b: 6 },
            { a: 3, b: 7 },
            { a: 3, b: 11 },
            { a: 4, b: 8 },
            { a: 4, b: 9 },
            { a: 4, b: 12 },
            { a: 5, b: 10 },
            { a: 6, b: 11 },
            { a: 7, b: 8 },
            { a: 7, b: 12 },
            { a: 9, b: 12 },
            { a: 10, b: 12 },
            { a: 11, b: 12 },
        ];


    static GetOppositeClearingId(clearingId: number): number
    {
        switch (clearingId)
        {
            case 1: return 3;
            case 2: return 4;
            case 3: return 1;
            case 4: return 2;
            default: throw new Error(`Clearing id[${clearingId}] isnt corner clearing.`);
        }
    }

    static GetClearingsToMoveFrom(race: RaceEnum): number[]
    {
        var retVal: number[] = [];
        return retVal;
    }


    static GetAvailableStartingClearings(usedStartingClearings: number[]): number[]
    {

        let withoutUsedOnes = this.GetCornerClearings().filter(c => !usedStartingClearings.includes(c));

        if (withoutUsedOnes.length === 1) return withoutUsedOnes;

        //forceDiagonallyOposite
        let withoutTwoFreeOpopsiteOnes = withoutUsedOnes.filter(c => !withoutUsedOnes.includes(this.GetOppositeClearingId(c)));

        //there are only clearing that are diagonally oposite, pick from those
        if (withoutTwoFreeOpopsiteOnes.length === 0) return withoutUsedOnes;
        //there is one that its opposite clearing is used, must use that one.
        else return withoutTwoFreeOpopsiteOnes;
    }
}