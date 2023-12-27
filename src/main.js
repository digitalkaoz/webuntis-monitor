import {inject} from '@vercel/analytics';
import {injectSpeedInsights} from '@vercel/speed-insights';

import './style.css'
import {initializeState} from "./store.js";
import mount from "./components/app.js";

// vercel metrics
inject();
injectSpeedInsights({route:'/'});
// state
initializeState();

//components
mount()