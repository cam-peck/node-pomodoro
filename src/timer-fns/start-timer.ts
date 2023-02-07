import { convertToSeconds } from '../lib/convert-to-seconds';
import { countdown } from './countdown';
import { data } from '../data';

function startTimer(duration: number) { // starts a timer for the passed in minute value //
    data.remainingTime = convertToSeconds(duration);
    data.nIntervId = setInterval(countdown, 1000);
    console.log(`Starting a timer for ${duration} minutes.`);
}

export { startTimer };