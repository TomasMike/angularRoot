import { CardSuitEnum } from "./Enums";

export class Card
{
    Suit: CardSuitEnum;
    SuitText: string;
    Name: string;
    Id: number;

    constructor(suit: CardSuitEnum, name: string, id: number)
    {
        this.Suit = suit;
        this.SuitText = CardSuitEnum[this.Suit];
        this.Name = name;
        this.Id = id;
    }
}

export class VizierCard extends Card
{
    constructor(suit: CardSuitEnum, name: string)
    {
       super(suit,name,-1);
    }
}