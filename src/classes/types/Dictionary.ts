import KeyValuePair from "./KeyValuePair";
import { TArray } from "./TArray";

export class Dictionary<TKey, TValue>
{
    private _i: KeyValuePair<TKey, TValue>[];


    public GetValue(key: TKey): TValue
    {
        return this.GetPair(key).value;
    }

    public ContainsKey(key: TKey): boolean
    {
        return this._i.find(k => k.key == key) !== undefined;
    }

    public Add(key: TKey, value: TValue): void
    {
        if (this.ContainsKey(key))
            throw new Error("object with this key already exists.");

        this._i.push(new KeyValuePair(key, value));
    }

    public GetPair(key: TKey): KeyValuePair<TKey, TValue>
    {
        if (!this.ContainsKey(key))
            throw new Error("object with this key exists.");

        return this._i.find(k => k.key == key) as KeyValuePair<TKey, TValue>;
    }

    public GetPairByPredicate(p: (value: KeyValuePair<TKey, TValue>, index: number, obj: KeyValuePair<TKey, TValue>[]) => unknown, thisArg?: any): KeyValuePair<TKey, TValue> | undefined
    {
        return this._i.find(p);
    }

    constructor(options?: { data: KeyValuePair<TKey, TValue>[] })
    {
        if (options?.data)
        {
            this._i = options.data;
        }
        else
        {
            this._i = [];
        }
    }

    public Sort(compareFn?: (a: KeyValuePair<TKey, TValue>, b: KeyValuePair<TKey, TValue>) => number): void
    {
        this._i.sort(compareFn);
    }

    public ValuesAsTArray(): TArray<TValue>
    {
        var q = this._i.map(_ => _.value);
        return new TArray<TValue>(q);
    }
    public Values(): TValue[]
    {
        return this._i.map(_ => _.value);
        
    }
}
