export class ServerCommunication
{
    async callServer(path: string): Promise<string>
    {
        var a = "api/game/";
        var url = "https://localhost:7200/";
        var h = new Headers();
        h.append("Content-Type", "text/plain");

        const myInit = {
            //mode: "cors" as RequestMode,
            headers: h,
            method: "GET"
        };
        var r = new Request(url + path, myInit);

        const data = await fetch(r);
        var q = await data.json();
        return q;
    }
}