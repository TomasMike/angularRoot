import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './components/app.config.server';
import { GameComponent } from './components/rootGame/rootGame';

const bootstrap = () => bootstrapApplication(GameComponent, config);

export default bootstrap;
