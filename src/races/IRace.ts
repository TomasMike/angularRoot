import { Asker } from "../classes/Asker";
import { ComponentTypeEnum, RaceEnum } from "../classes/models/Enums";
import { GameComponent } from "../components/game/game";

export interface IRace
{
    RaceEnum: RaceEnum;
    StartingClearing?: number;

    Setup(asker: Asker, availableStartingClearings: number[]): Promise<number>;
    Morning(): void;
    Day(): void;
    Evening(): void;
    HandleComponentSpawn(type: ComponentTypeEnum):boolean;
}


