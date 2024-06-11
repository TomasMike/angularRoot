import { Asker } from "../classes/GameManager";
import { RaceEnum } from "../classes/models/Enums";
import { GameComponent } from "../components/game/game";

export interface IRace
{
    RaceEnum:RaceEnum;
    Setup(o:Asker):void;
    Morning():void;
    Day():void;
    Evening():void;
}


