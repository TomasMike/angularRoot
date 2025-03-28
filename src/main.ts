import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './components/app.config';
import { GameComponent } from './components/rootGame/rootGame';

bootstrapApplication(GameComponent, appConfig)
  .catch((err) => console.error(err));

