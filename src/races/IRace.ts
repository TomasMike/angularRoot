import { Asker } from "../classes/Asker";
import { ComponentTypeEnum, RaceEnum } from "../classes/models/Enums";
import { GameComponent } from "../components/rootGame/rootGame";

export interface IRace
{
    RaceEnum: RaceEnum;
    StartingClearing?: number;

    Setup(asker: Asker, availableStartingClearings: number[]): Promise<number>;
    Morning(): Promise<void>;
    Day(): void;
    Evening(): void;
    HandleComponentSpawn(type: ComponentTypeEnum):boolean;
}


