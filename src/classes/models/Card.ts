import { CardSuitEnum, CardTypeEnum } from "./Enums";

export class Card
{
    Suit: CardSuitEnum;
    SuitText: string;
    Name: string;
    Id: number;
    Type:CardTypeEnum;

    constructor(suit: CardSuitEnum, name: string, id: number,type:CardTypeEnum = CardTypeEnum.Standard)
    {
        this.Suit = suit;
        this.SuitText = CardSuitEnum[this.Suit];
        this.Name = name;
        this.Id = id;
        this.Type = type;
    }
}

export class VizierCard extends Card
{
    constructor(suit: CardSuitEnum, name: string)
    {
       super(suit,name,-1,CardTypeEnum.EyrieVizier);
    }
}