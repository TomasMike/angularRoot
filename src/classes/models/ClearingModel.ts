export class ClearingModel {
    Id: number;
    Suit: string;
    Left: number;
    Top: number;

    constructor(id: number, color: ClearingSuit, left: number, top: number) {
        this.Id = id;
        this.Suit = ClearingSuit[color];
        this.Left = left;
        this.Top = top;
    }
}

export enum ClearingSuit {
    Fox, Rabbit, Mouse
}


