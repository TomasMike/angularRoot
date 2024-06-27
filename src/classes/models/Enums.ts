
export enum ClearingSuitEnum
{
    Fox, Rabbit, Mouse
}

export enum RaceEnum
{
    MarquiseDeCat,
    EyrieDynasties,
    WoodlandAlliance,
    Vagabond,
    LizardCult,
    RiverfolkCompany,
    UndergroundDuchy,
    CorvidConspiracy,
    LordOfTheHundreds,
    KeepersInIron
}

export enum ComponentGroupEnum
{
    Warrior,
    Pawn,
    Building,
    Token
}

export enum ComponentTypeEnum
{
    MarquiseDeCat_Warrior,
    MarquiseDeCat_Building_Sawmill,
    MarquiseDeCat_Building_Recruiter,
    MarquiseDeCat_Building_Workshop,
    MarquiseDeCat_Token_Wood,
    MarquiseDeCat_Token_Keep,

    EyrieDynasties_Warrior,
    EyrieDynasties_Building_Roost,

    WoodlandAlliance_Warrior,
    WoodlandAlliance_Building_Base_Fox,
    WoodlandAlliance_Building_Base_Rabbit,
    WoodlandAlliance_Building_Base_Mouse,
    WoodlandAlliance_Token_Sympathy,

    Vagabond_Pawn,

    LizardCult_Warrior,
    LizardCult_Building_Garden_Fox,
    LizardCult_Building_Garden_Rabbit,
    LizardCult_Building_Garden_Mouse,

    RiverfolkCompany_Warrior,
    RiverfolkCompany_Token_TradePost_Fox,
    RiverfolkCompany_Token_TradePost_Rabbit,
    RiverfolkCompany_Token_TradePost_Mouse,

    UndergroundDuchy_Warrior,
    UndergroundDuchy_Building_Citadel,
    UndergroundDuchy_Building_Market,
    UndergroundDuchy_Token_Tunnel,

    CorvidConspiracy_Warrior,
    CorvidConspiracy_Token_Bomb,
    CorvidConspiracy_Token_Snare,
    CorvidConspiracy_Token_Extortion,
    CorvidConspiracy_Token_Raid,

    LordOfTheHundreds_Warrior,
    LordOfTheHundreds_Warrior_Warlord,
    LordOfTheHundreds_Building_Citadel,
    LordOfTheHundreds_Token_Mob,

    KeepersInIron_Warrior,
    KeepersInIron_Building_Waystation,

}

export enum AskPlayerQuestionTypeEnum{
    PickOneClearing,
    PickOneClearingFiltered,
    SelectNumber,
}

export enum GameWorkflowStateEnum
{
    PlayersPickingRaces,
    PlayerSetup,
    Game
}

export class EnumHelper {
    public static GetEnumArray<T extends {}>(e:T):{value:number,text:string}[]
    {
        var k = Object.keys(e);
        if(k.length % 2 != 0)
            throw new Error();

        var a = k.length /2;

        var retVal : {value:number,text:string}[] = [];

        for (let index = a; index < k.length; index++) {
            retVal.push({value:index-a,text:k[index]});
            
        }
        return retVal;
    }
}


