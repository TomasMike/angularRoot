import { Card } from "./Card";
import { TArray } from "../types/TArray";

export class PlayerHand 
{
    _cards: TArray<Card>;

    constructor()
    {
        this._cards = new TArray<Card>;
    }

    public GetCards():TArray<Card>
    {
        return this._cards;
    }

    public Draw(card: Card)
    {
        this._cards.push(card);
    }

    public IsEmpty(): boolean
    {
        return this._cards.length === 0;
    }

    public RemoveCard(id: number)
    {
        if (!this._cards.some(_ => _.Id === id))
            throw new Error("this hand doesnt have this card");

        this._cards = this._cards.Where(_ => _.Id !== id);
    }

    public GetCardById(id: number): Card
    {
        return this._cards.First(_ => _.Id == id);
    }
}
