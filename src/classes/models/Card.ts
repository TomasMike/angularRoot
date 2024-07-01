import { CardSuitEnum } from "./Enums";

export class Card
{
    Suit: CardSuitEnum;
    SuitText: string;
    Name:string;

    constructor(suit: CardSuitEnum,name:string)
    {

        this.Suit = suit;
        this.Name = name;
        this.SuitText = CardSuitEnum[this.Suit];
    }
}

export class VizierCard extends Card{

}