export class TArray<T> extends Array<T>
{
    constructor()
    {
        super();
    }

    First<S extends T>(p: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): S
    {
        var q = this.find(p);

        if(q === undefined)
            throw new Error();

        return q as S;
    }
}