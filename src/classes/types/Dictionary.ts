import KeyValuePair from "./KeyValuePair";

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

    constructor(options: { data: KeyValuePair<TKey, TValue>[] })
    {
        if (options.data)
        { 
            this._i = options.data;
        }
        else
        {
            this._i = [];
        }
    }


}
