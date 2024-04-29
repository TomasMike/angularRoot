import KeyValuePair from "./KeyValuePair";

export class Dictionary<TKey, TValue>
{
    private _i: KeyValuePair<TKey, TValue>[];

    public Get(key: TKey): TValue
    {
        var r = this._i.find(k => k.key == key);

        if (r === undefined)
            throw new Error("object with this key doesnt exist.");

        return r.value;
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

    constructor()
    {
        this._i = [];
    }
}
