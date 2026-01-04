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
            new ClearingModel(1,  1, 0, ClearingSuitEnum.Fox, 60, 60),
            new ClearingModel(2,  2, 0, ClearingSuitEnum.Mouse, 440, 110),
            new ClearingModel(3,  1, 0, ClearingSuitEnum.Rabbit, 410, 410),
            new ClearingModel(4,  1, 0, ClearingSuitEnum.Rabbit, 60, 380),
            new ClearingModel(5,  2, 0, ClearingSuitEnum.Rabbit, 270, 60),
            new ClearingModel(6,  1, 1, ClearingSuitEnum.Fox, 460, 240),
            new ClearingModel(7,  2, 0, ClearingSuitEnum.Mouse, 290, 340),
            new ClearingModel(8,  2, 0, ClearingSuitEnum.Fox, 190, 420),
            new ClearingModel(9,  2, 0, ClearingSuitEnum.Mouse, 50, 190),
            new ClearingModel(10, 1, 1, ClearingSuitEnum.Rabbit, 220, 130),
            new ClearingModel(11, 2, 1, ClearingSuitEnum.Mouse, 320, 220),
            new ClearingModel(12, 1, 1, ClearingSuitEnum.Fox, 150, 250),
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

        for (var i = 1; i <= 12; i++)
        {
            if (ClearingHelper.GetPossibleMoveOptionsFromThisClearing(race, i))
                retVal.push(i);
        }

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

    static GetPossibleMoveOptionsFromThisClearing(race: RaceEnum, clearingId: number): number[][]
    {
        var c = ClearingHelper.GetClearingById(clearingId);

        if (c.Pieces.every(p => p.GetComponentRace() !== race))
            return [[-1]];

        var neighClearings = ClearingHelper.GetNeighbourClearings(clearingId);

        var doesCurrentPlayerRuleStartClearing = c.GetWhoRulesClearing() === race;


        var retVal:number[][] = [];
        neighClearings.forEach(cl =>
        {
            if (ClearingHelper.GetClearingById(cl).GetWhoRulesClearing() === race //does player whos moving rules destination clearing
            ||doesCurrentPlayerRuleStartClearing)//OR player whos moving rules starting clearing
            retVal.push([clearingId,cl]);
        });

        return retVal;

  

    }
}