import { Dictionary } from "../types/Dictionary";
import KeyValuePair from "../types/KeyValuePair";
import { ComponentGroupEnum, ComponentTypeEnum } from "./ClearingModel";

export class PieceGroupingModel
{

    componentType: ComponentTypeEnum;
    //componentRace: RaceEnum;
  //  componentGroupText: string;
    count: number;
    pieceInfo: string[];

    constructor(type: ComponentTypeEnum)
    {
        this.componentType = type;
        //this.componentRace = race;
        //this.componentGroupText = ComponentGroupEnum[type];
        this.count = 1;
        this.pieceInfo = ComponentTypeEnum[type].toString().split("_");
    }

    GetComponentRaceText(): string
    {
        return this.pieceInfo[0];
    }

    GetComponentTypeText(): string
    {
        if (this.pieceInfo.length === 2)
        {
            return this.pieceInfo[1];
        }
        if (this.pieceInfo.length === 3)
        {
            return this.pieceInfo[2];
        }
        else
            return this.pieceInfo[4];



        // switch (this.componentType)
        // {
        //     case ComponentTypeEnum.MarquiseDeCat_Warrior:
        //     case ComponentTypeEnum.EyrieDynasties_Warrior:
        //     case ComponentTypeEnum.WoodlandAlliance_Warrior:
        //         return "Warrior";
        //     case ComponentTypeEnum.MarquiseDeCat_Building_SawMill:
        //         return "Sawmill";
        //     case ComponentTypeEnum.MarquiseDeCat_Building_Recruiter:
        //         return "Recruiter";
        //     case ComponentTypeEnum.MarquiseDeCat_Building_Workshop:
        //         return "Workshop";
        //     case ComponentTypeEnum.MarquiseDeCat_Token_Wood:
        //         return "Wood";
        //     case ComponentTypeEnum.MarquiseDeCat_Token_Keep:
        //         return "Keep";
        //     case ComponentTypeEnum.EyrieDynasties_Building_Roost:
        //         return "Roost";
        //     case ComponentTypeEnum.WoodlandAlliance_Building_Base_Fox:
        //         return "Fox Base";
        //     case ComponentTypeEnum.WoodlandAlliance_Building_Base_Rabbit:
        //         return "Rabbit Base";
        //     case ComponentTypeEnum.WoodlandAlliance_Building_Base_Mice:
        //         return "Mice Base";
        //     case ComponentTypeEnum.WoodlandAlliance_Token_Sympathy:
        //         return "Sympathy";
        //     case ComponentTypeEnum.Vagabond_Pawn:
        //         return "Vagabond";
        //     default:
        //         return "TBD";
        // }
    }
}

export class ComponentInfo
{
    TypeText: string;
    RaceText: string;

    constructor(type: string, race: string)
    {
        this.RaceText = race;
        this.TypeText = type;
    }
}

// export class Helper
// {
//     static ComponentInfoDict: Dictionary<ComponentTypeEnum, ComponentInfo> = new Dictionary<ComponentTypeEnum, ComponentInfo>({
//         data: [
//             { key: ComponentTypeEnum.MarquiseDeCat_Warrior, value: new ComponentInfo("Warrior", "MarquiseDeCat") },
//         ]
//     });


// }