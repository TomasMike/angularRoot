import { MoveResult } from "./models/MoveResult";

export class Asker
{
    that: object;
    AskOneClearing: (cancelable?: boolean, question?: string) => Promise<number>;
    AskOneClearingFiltered: (allowedIds: number[], question?: string, cancelable?: boolean) => Promise<number>;
    AskAddDecree: (canCancel: boolean) => Promise<string>;
    DoAMove: (cancelable?: boolean, allowedIds?: number[], question?: string) => Promise<MoveResult|null>;

    constructor(
        that: object,
        askOneClearing: (cancelable?: boolean, question?: string) => Promise<number>,
        askOneClearingFiltered: (allowedIds: number[], question?: string, cancelable?: boolean) => Promise<number>,
        askAddDecree: (canCancel: boolean) => Promise<string>,
        doAMove: (cancelable?: boolean, allowedIds?: number[], question?: string) => Promise<MoveResult|null>)
    {
        this.that = that;
        this.AskOneClearing = askOneClearing;
        this.AskOneClearingFiltered = askOneClearingFiltered;
        this.AskAddDecree = askAddDecree;
        this.DoAMove = doAMove;
    }

    /**
     * 
     * @param question 
     * @param validAnswers 
     * @param cancelable true if not defined
     * @param extraInfo 
     * @returns 
     */
    AskPrompt(question: string, validAnswers?: string[], cancelable?: boolean, extraInfo?: string)
    {
        let answeredWrongly = false;
        //cancelable = cancelable ?? true;
        if (validAnswers !== undefined)
        {
            question = `${question}\nValid options:${validAnswers.join(';')}`;
        }

        while (true)
        {
            let message = answeredWrongly ? "Wrong!" : "";
            message += `\n${question}`;
            if (extraInfo !== null)
                message += `\n${extraInfo}`;

            let a = prompt(message);

            if (!cancelable && a === null)
            {
                answeredWrongly = true;
                continue;
            }

            if (validAnswers === undefined || validAnswers.includes(a as string))
                return a;

            answeredWrongly = true;
        }
    }
}

export interface AskerOption
{

}
