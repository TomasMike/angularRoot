import { Injectable } from "@angular/core";
import { ComponentInfo } from "../ComponentInfo";
import { Dictionary } from "../types/Dictionary";
import { ComponentGroupEnum, ComponentTypeEnum, RaceEnum } from "../models/Enums";

@Injectable({
    providedIn: "root"
})
export class ComponentHelper
{
    public static GetComponentInfo(type: ComponentTypeEnum): ComponentInfo
    {
        switch (type)
        {
            case ComponentTypeEnum.MarquiseDeCat_Warrior: return new ComponentInfo(RaceEnum.MarquiseDeCat, ComponentGroupEnum.Warrior);
            case ComponentTypeEnum.MarquiseDeCat_Building_Sawmill: return new ComponentInfo(RaceEnum.MarquiseDeCat, ComponentGroupEnum.Building, "Sawmill");
            case ComponentTypeEnum.MarquiseDeCat_Building_Recruiter: return new ComponentInfo(RaceEnum.MarquiseDeCat, ComponentGroupEnum.Building, "Recruiter");
            case ComponentTypeEnum.MarquiseDeCat_Building_Workshop: return new ComponentInfo(RaceEnum.MarquiseDeCat, ComponentGroupEnum.Building, "Workshop");
            case ComponentTypeEnum.MarquiseDeCat_Token_Wood: return new ComponentInfo(RaceEnum.MarquiseDeCat, ComponentGroupEnum.Token, "Wood");
            case ComponentTypeEnum.MarquiseDeCat_Token_Keep: return new ComponentInfo(RaceEnum.MarquiseDeCat, ComponentGroupEnum.Token, "Keep");
            case ComponentTypeEnum.EyrieDynasties_Warrior: return new ComponentInfo(RaceEnum.EyrieDynasties, ComponentGroupEnum.Warrior);
            case ComponentTypeEnum.EyrieDynasties_Building_Roost: return new ComponentInfo(RaceEnum.EyrieDynasties, ComponentGroupEnum.Building, "Roost");
            case ComponentTypeEnum.WoodlandAlliance_Warrior: return new ComponentInfo(RaceEnum.WoodlandAlliance, ComponentGroupEnum.Warrior);
            case ComponentTypeEnum.WoodlandAlliance_Building_Base_Fox: return new ComponentInfo(RaceEnum.WoodlandAlliance, ComponentGroupEnum.Building, "Fox Base");
            case ComponentTypeEnum.WoodlandAlliance_Building_Base_Rabbit: return new ComponentInfo(RaceEnum.WoodlandAlliance, ComponentGroupEnum.Building, "Rabbit Base");
            case ComponentTypeEnum.WoodlandAlliance_Building_Base_Mouse: return new ComponentInfo(RaceEnum.WoodlandAlliance, ComponentGroupEnum.Building, "Mouse Base");
            case ComponentTypeEnum.WoodlandAlliance_Token_Sympathy: return new ComponentInfo(RaceEnum.WoodlandAlliance, ComponentGroupEnum.Token, "Sympathy");
            case ComponentTypeEnum.Vagabond_Pawn: return new ComponentInfo(RaceEnum.Vagabond, ComponentGroupEnum.Token, "Vagabond");
            case ComponentTypeEnum.LizardCult_Warrior: return new ComponentInfo(RaceEnum.LizardCult, ComponentGroupEnum.Warrior);
            case ComponentTypeEnum.LizardCult_Building_Garden_Fox: return new ComponentInfo(RaceEnum.LizardCult, ComponentGroupEnum.Building, "Fox Garden");
            case ComponentTypeEnum.LizardCult_Building_Garden_Rabbit: return new ComponentInfo(RaceEnum.LizardCult, ComponentGroupEnum.Building, "Rabbit Garden");
            case ComponentTypeEnum.LizardCult_Building_Garden_Mouse: return new ComponentInfo(RaceEnum.LizardCult, ComponentGroupEnum.Building, "Mouse Garden");
            case ComponentTypeEnum.RiverfolkCompany_Warrior: return new ComponentInfo(RaceEnum.RiverfolkCompany, ComponentGroupEnum.Warrior);
            case ComponentTypeEnum.RiverfolkCompany_Token_TradePost_Fox: return new ComponentInfo(RaceEnum.RiverfolkCompany, ComponentGroupEnum.Token, "Fox Tradepost");
            case ComponentTypeEnum.RiverfolkCompany_Token_TradePost_Rabbit: return new ComponentInfo(RaceEnum.RiverfolkCompany, ComponentGroupEnum.Token, "Rabbit Tradepost");
            case ComponentTypeEnum.RiverfolkCompany_Token_TradePost_Mouse: return new ComponentInfo(RaceEnum.RiverfolkCompany, ComponentGroupEnum.Token, "Mouse Tradepost");
            case ComponentTypeEnum.UndergroundDuchy_Warrior: return new ComponentInfo(RaceEnum.UndergroundDuchy, ComponentGroupEnum.Warrior);
            case ComponentTypeEnum.UndergroundDuchy_Building_Citadel: return new ComponentInfo(RaceEnum.UndergroundDuchy, ComponentGroupEnum.Building, "Citadel");
            case ComponentTypeEnum.UndergroundDuchy_Building_Market: return new ComponentInfo(RaceEnum.UndergroundDuchy, ComponentGroupEnum.Building, "Market");
            case ComponentTypeEnum.UndergroundDuchy_Token_Tunnel: return new ComponentInfo(RaceEnum.UndergroundDuchy, ComponentGroupEnum.Token, "Tunnel");
            case ComponentTypeEnum.CorvidConspiracy_Warrior: return new ComponentInfo(RaceEnum.CorvidConspiracy, ComponentGroupEnum.Warrior);
            case ComponentTypeEnum.CorvidConspiracy_Token_Bomb: return new ComponentInfo(RaceEnum.CorvidConspiracy, ComponentGroupEnum.Token, "Token");
            case ComponentTypeEnum.CorvidConspiracy_Token_Snare: return new ComponentInfo(RaceEnum.CorvidConspiracy, ComponentGroupEnum.Token, "Token");
            case ComponentTypeEnum.CorvidConspiracy_Token_Extortion: return new ComponentInfo(RaceEnum.CorvidConspiracy, ComponentGroupEnum.Token, "Token");
            case ComponentTypeEnum.CorvidConspiracy_Token_Raid: return new ComponentInfo(RaceEnum.CorvidConspiracy, ComponentGroupEnum.Token, "Token");
            case ComponentTypeEnum.LordOfTheHundreds_Warrior: return new ComponentInfo(RaceEnum.LordOfTheHundreds, ComponentGroupEnum.Warrior);
            case ComponentTypeEnum.LordOfTheHundreds_Warrior_Warlord: return new ComponentInfo(RaceEnum.LordOfTheHundreds, ComponentGroupEnum.Warrior, "Warlord");
            case ComponentTypeEnum.LordOfTheHundreds_Building_Citadel: return new ComponentInfo(RaceEnum.LordOfTheHundreds, ComponentGroupEnum.Building);
            case ComponentTypeEnum.LordOfTheHundreds_Token_Mob: return new ComponentInfo(RaceEnum.LordOfTheHundreds, ComponentGroupEnum.Token, "Mob");
            case ComponentTypeEnum.KeepersInIron_Warrior: return new ComponentInfo(RaceEnum.KeepersInIron, ComponentGroupEnum.Warrior);
            case ComponentTypeEnum.KeepersInIron_Building_Waystation: return new ComponentInfo(RaceEnum.KeepersInIron, ComponentGroupEnum.Building, "Waystation");
        }
    }

    public static GetWarriorComponentTypeByRace(race: RaceEnum)
    {
        switch (race)
        {
            case RaceEnum.MarquiseDeCat: return ComponentTypeEnum.MarquiseDeCat_Warrior;
            case RaceEnum.EyrieDynasties: return ComponentTypeEnum.EyrieDynasties_Warrior;
            case RaceEnum.WoodlandAlliance: return ComponentTypeEnum.WoodlandAlliance_Warrior;
            case RaceEnum.Vagabond: return ComponentTypeEnum.Vagabond_Pawn;
            case RaceEnum.LizardCult: return ComponentTypeEnum.LizardCult_Warrior;
            case RaceEnum.RiverfolkCompany: return ComponentTypeEnum.RiverfolkCompany_Warrior;
            case RaceEnum.UndergroundDuchy: return ComponentTypeEnum.UndergroundDuchy_Warrior;
            case RaceEnum.CorvidConspiracy: return ComponentTypeEnum.CorvidConspiracy_Warrior;
            case RaceEnum.LordOfTheHundreds: return ComponentTypeEnum.LordOfTheHundreds_Warrior;
            case RaceEnum.KeepersInIron: return ComponentTypeEnum.KeepersInIron_Warrior;
            default: throw new Error();
        }
    }
}

export class ExtensionFaker
{
    public static MapWhere<K, V>(map: Map<K, V>, predicate: (keyPair: { value: V, key: K }) => boolean): Map<K, V>
    {
        var retVal: Map<K, V> = new Map();

        map.forEach((v, k) =>
        {
            if (predicate({ key: k, value: v }))
                retVal.set(k, v);
        });

        return retVal;
    }

    public static MapFirstOrDefault<K, V>(map: Map<K, V>, predicate?: (keyPair: { value: V, key: K }) => boolean): { key: K, value: V } | null
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

    public static MapFirst<K, V>(map: Map<K, V>, predicate?: (keyPair: { value: V, key: K }) => boolean): { key: K, value: V }
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