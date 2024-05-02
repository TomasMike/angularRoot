import { Dictionary } from "../types/Dictionary";
import { ComponentGroupEnum, ComponentTypeEnum, RaceEnum } from "../models/ClearingModel";
import { ComponentInfo } from "../ComponentInfo";


export class ComponentHelper
{
    static ComponentInfoDict: Dictionary<ComponentTypeEnum, ComponentInfo> = new Dictionary<ComponentTypeEnum, ComponentInfo>({
        data: [
            { key: ComponentTypeEnum.MarquiseDeCat_Warrior, value: new ComponentInfo(RaceEnum.MarquiseDeCat, ComponentGroupEnum.Warrior) },
            { key: ComponentTypeEnum.MarquiseDeCat_Building_Sawmill, value: new ComponentInfo(RaceEnum.MarquiseDeCat, ComponentGroupEnum.Building, "Sawmill") },
            { key: ComponentTypeEnum.MarquiseDeCat_Building_Recruiter, value: new ComponentInfo(RaceEnum.MarquiseDeCat, ComponentGroupEnum.Building, "Recruiter") },
            { key: ComponentTypeEnum.MarquiseDeCat_Building_Workshop, value: new ComponentInfo(RaceEnum.MarquiseDeCat, ComponentGroupEnum.Building, "Workshop") },
            { key: ComponentTypeEnum.MarquiseDeCat_Token_Wood, value: new ComponentInfo(RaceEnum.MarquiseDeCat, ComponentGroupEnum.Token, "Wood") },
            { key: ComponentTypeEnum.MarquiseDeCat_Token_Keep, value: new ComponentInfo(RaceEnum.MarquiseDeCat, ComponentGroupEnum.Token, "Keep") },

            { key: ComponentTypeEnum.EyrieDynasties_Warrior, value: new ComponentInfo(RaceEnum.EyrieDynasties, ComponentGroupEnum.Warrior) },
            { key: ComponentTypeEnum.EyrieDynasties_Building_Roost, value: new ComponentInfo(RaceEnum.EyrieDynasties, ComponentGroupEnum.Building, "Roost") },

            { key: ComponentTypeEnum.WoodlandAlliance_Warrior, value: new ComponentInfo(RaceEnum.WoodlandAlliance, ComponentGroupEnum.Warrior) },
            { key: ComponentTypeEnum.WoodlandAlliance_Building_Base_Fox, value: new ComponentInfo(RaceEnum.WoodlandAlliance, ComponentGroupEnum.Building, "Fox Base") },
            { key: ComponentTypeEnum.WoodlandAlliance_Building_Base_Rabbit, value: new ComponentInfo(RaceEnum.WoodlandAlliance, ComponentGroupEnum.Building, "Rabbit Base") },
            { key: ComponentTypeEnum.WoodlandAlliance_Building_Base_Mouse, value: new ComponentInfo(RaceEnum.WoodlandAlliance, ComponentGroupEnum.Building, "Mouse Base") },
            { key: ComponentTypeEnum.WoodlandAlliance_Token_Sympathy, value: new ComponentInfo(RaceEnum.WoodlandAlliance, ComponentGroupEnum.Token, "Sympathy") },

            { key: ComponentTypeEnum.Vagabond_Pawn, value: new ComponentInfo(RaceEnum.Vagabond, ComponentGroupEnum.Pawn, "Vagabond") },

            { key: ComponentTypeEnum.LizardCult_Warrior, value: new ComponentInfo(RaceEnum.LizardCult, ComponentGroupEnum.Warrior) },
            { key: ComponentTypeEnum.LizardCult_Building_Garden_Fox, value: new ComponentInfo(RaceEnum.LizardCult, ComponentGroupEnum.Building, "Fox Garden") },
            { key: ComponentTypeEnum.LizardCult_Building_Garden_Rabbit, value: new ComponentInfo(RaceEnum.LizardCult, ComponentGroupEnum.Building, "Rabbit Garden") },
            { key: ComponentTypeEnum.LizardCult_Building_Garden_Mouse, value: new ComponentInfo(RaceEnum.LizardCult, ComponentGroupEnum.Building, "Mouse Garden") },

            { key: ComponentTypeEnum.RiverfolkCompany_Warrior, value: new ComponentInfo(RaceEnum.RiverfolkCompany, ComponentGroupEnum.Warrior) },
            { key: ComponentTypeEnum.RiverfolkCompany_Token_TradePost_Fox, value: new ComponentInfo(RaceEnum.RiverfolkCompany, ComponentGroupEnum.Token, "Fox Trade Post") },
            { key: ComponentTypeEnum.RiverfolkCompany_Token_TradePost_Rabbit, value: new ComponentInfo(RaceEnum.RiverfolkCompany, ComponentGroupEnum.Token, "Rabbit Trade Post") },
            { key: ComponentTypeEnum.RiverfolkCompany_Token_TradePost_Mouse, value: new ComponentInfo(RaceEnum.RiverfolkCompany, ComponentGroupEnum.Token, "Mouse Trade Post") },

            { key: ComponentTypeEnum.UndergroundDuchy_Warrior, value: new ComponentInfo(RaceEnum.UndergroundDuchy, ComponentGroupEnum.Warrior) },
            { key: ComponentTypeEnum.UndergroundDuchy_Building_Citadel, value: new ComponentInfo(RaceEnum.UndergroundDuchy, ComponentGroupEnum.Building, "Citadel") },
            { key: ComponentTypeEnum.UndergroundDuchy_Building_Market, value: new ComponentInfo(RaceEnum.UndergroundDuchy, ComponentGroupEnum.Building, "Market") },
            { key: ComponentTypeEnum.UndergroundDuchy_Token_Tunnel, value: new ComponentInfo(RaceEnum.UndergroundDuchy, ComponentGroupEnum.Token, "Tunnel") },

            { key: ComponentTypeEnum.CorvidConspiracy_Warrior, value: new ComponentInfo(RaceEnum.CorvidConspiracy, ComponentGroupEnum.Warrior) },
            { key: ComponentTypeEnum.CorvidConspiracy_Token_Bomb, value: new ComponentInfo(RaceEnum.CorvidConspiracy, ComponentGroupEnum.Token, "Plot") },
            { key: ComponentTypeEnum.CorvidConspiracy_Token_Snare, value: new ComponentInfo(RaceEnum.CorvidConspiracy, ComponentGroupEnum.Token, "Plot") },
            { key: ComponentTypeEnum.CorvidConspiracy_Token_Extortion, value: new ComponentInfo(RaceEnum.CorvidConspiracy, ComponentGroupEnum.Token, "Plot") },
            { key: ComponentTypeEnum.CorvidConspiracy_Token_Raid, value: new ComponentInfo(RaceEnum.CorvidConspiracy, ComponentGroupEnum.Token, "Plot") },

            { key: ComponentTypeEnum.LordOfTheHundreds_Warrior, value: new ComponentInfo(RaceEnum.LordOfTheHundreds, ComponentGroupEnum.Warrior) },
            { key: ComponentTypeEnum.LordOfTheHundreds_Warrior_Warlord, value: new ComponentInfo(RaceEnum.LordOfTheHundreds, ComponentGroupEnum.Warrior, "Warlord") },
            { key: ComponentTypeEnum.LordOfTheHundreds_Building_Citadel, value: new ComponentInfo(RaceEnum.LordOfTheHundreds, ComponentGroupEnum.Building, "Citadel") },
            { key: ComponentTypeEnum.LordOfTheHundreds_Token_Mob, value: new ComponentInfo(RaceEnum.LordOfTheHundreds, ComponentGroupEnum.Token, "Mob") },

            { key: ComponentTypeEnum.KeepersInIron_Warrior, value: new ComponentInfo(RaceEnum.KeepersInIron, ComponentGroupEnum.Warrior) },
            { key: ComponentTypeEnum.KeepersInIron_Building_Waystation, value: new ComponentInfo(RaceEnum.KeepersInIron, ComponentGroupEnum.Building) },
        ]
    });


}
