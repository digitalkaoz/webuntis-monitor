import {inject} from '@vercel/analytics';
import {injectSpeedInsights} from '@vercel/speed-insights';

import './style.css'
import {initializeState} from "./store.js";
import mount from "./components/app.js";
import {setupWorker} from "./worker.js";

// vercel metrics
inject();
injectSpeedInsights({route:'/'});

// state
initializeState();

//components
mount()

// setup service worker interaction
setupWorker();
