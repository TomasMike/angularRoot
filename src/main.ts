import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './components/app.config';
import { GameComponent } from './components/game/game';

bootstrapApplication(GameComponent, appConfig)
  .catch((err) => console.error(err));
