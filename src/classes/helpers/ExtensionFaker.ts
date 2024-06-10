
export class ExtensionFaker
{
    public static MapWhere<K, V>(map: Map<K, V>, predicate: (keyPair: { value: V; key: K; }) => boolean): Map<K, V>
    {
        var retVal: Map<K, V> = new Map();

        map.forEach((v, k) =>
        {
            if (predicate({ key: k, value: v }))
                retVal.set(k, v);
        });

        return retVal;
    }

    public static MapFirstOrDefault<K, V>(map: Map<K, V>, predicate?: (keyPair: { value: V; key: K; }) => boolean): { key: K; value: V; } | null
    {
        for (let entry of map.entries())
        {
            if (predicate === undefined)
            {
                return { key: entry[0], value: entry[1] };
            }
            else if (predicate({ key: entry[0], value: entry[1] }))
            {
                return { key: entry[0], value: entry[1] };
            }
        }

        return null;
    }

    public static MapFirst<K, V>(map: Map<K, V>, predicate?: (keyPair: { value: V; key: K; }) => boolean): { key: K; value: V; }
    {
        for (let entry of map.entries())
        {
            if (predicate === undefined)
            {
                return { key: entry[0], value: entry[1] };
            }
            else if (predicate({ key: entry[0], value: entry[1] }))
            {
                return { key: entry[0], value: entry[1] };
            }
        }

        throw new Error("No element matched predicate.");
    }
}


