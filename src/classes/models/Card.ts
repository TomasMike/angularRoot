import { CardSuitEnum } from "./Enums";

export class Card
{
    Suit: CardSuitEnum;
    Name:string;

    constructor(suit: CardSuitEnum,name:string)
    {

        this.Suit = suit;
        this.Name = name;
    }
}

export class VizierCard extends Card{

}