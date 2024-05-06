import { ComponentGroupEnum, RaceEnum } from "./models/Enums";

export class ComponentInfo
{
    Race: RaceEnum;
    Group: ComponentGroupEnum;
    ComponentDisplayText: string;

    constructor(race: RaceEnum, group: ComponentGroupEnum, text?: string)
    {
        this.Race = race;
        this.Group = group;
        this.ComponentDisplayText = text ?? ComponentGroupEnum[group].toString();
    }
}
