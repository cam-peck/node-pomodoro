import { advancePomoInterval } from './advance-pomo-interval';
import { formatTime } from '../lib/format-time';
import { data } from '../data';

function countdown() {
    if (data.remainingTime === 0) {
        clearInterval(data.nIntervId);
        advancePomoInterval();
    }
    else {
        data.remainingTime -= 1;
        console.log(formatTime(data.remainingTime));
    }
}

export { countdown };