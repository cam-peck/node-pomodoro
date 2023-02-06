import promptSync from 'prompt-sync';
import { data, config } from './data';
import { startTimer } from './start-timer';

const prompt = promptSync();

function advancePomoInterval() {
    if (data.currentPomoInterval === 'workTime') { // just finished a work cycle
        data.pomoIntervalCounter++;
        if (data.pomoIntervalCounter !== 4) { // need a short break -- 4 cycles not completed yet
            const result: string = prompt(`Work-time #${data.pomoIntervalCounter} is over. Well done! Press enter to start your short break or type "quit" to exit out. `);
            if (result === '') {
                data.currentPomoInterval = 'shortBreak';
                startTimer(config.shortBreak);
            } else return;
        } else { // need a long break -- 4 cycles completed
            const result = prompt(`Work-time #${data.pomoIntervalCounter} is over -- time for a long break! Well done! Press enter to start your long break or type "quit" to exit out. `);
            if (result === '') {
                data.currentPomoInterval = 'longBreak';
                startTimer(config.longBreak);
            } else return;
        }
    } else if (data.currentPomoInterval === 'shortBreak') { // just finished a short break cycle
        const result: string = prompt(`Short-break #${data.pomoIntervalCounter} is over -- time to go back to work. Press enter to start work-time or type "quit" to exit out. `);
        if (result === '') {
            data.currentPomoInterval = 'workTime';
            startTimer(config.longBreak);
        }
    } else if (data.currentPomoInterval === 'longBreak') { // just finished a long break cycle
        const result: string = prompt('Your long break is over. Nice job completing a full Pomodoro cycle! Would you like to start a new cycle? ');
        if (result.toLowerCase() === 'y' || result.toLowerCase() === 'yes') {
            data.pomoIntervalCounter = 0;
            startTimer(config.workInterval);
        } else return;
    }
}

export { advancePomoInterval };