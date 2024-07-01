export class TArray<T> extends Array<T>
{
    constructor(a:T[]=[])
    {
        if(Array.isArray(a))
            super(...a);
        else
        super(a);
    }

    First<S extends T>(p: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): S
    {
        var q = this.find(p);

        if(q === undefined)
            throw new Error();

        return q as S;
    }

    Where<S extends T>(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): TArray<S>
    {
        var q = this.filter(predicate);

        var s =  new TArray<S>;

        s.push(...q as TArray<S>);

        return s ;
    }

    public GetArray():T[]
    {
        return this as T[];
    }

    public Pull()
    {
        let a :number[];
        a = [1,2,3];
    }

    public Randomize()
    {
        let currentIndex = this.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [this[currentIndex], this[randomIndex]] = [
            this[randomIndex], this[currentIndex]];
        }
    }
}