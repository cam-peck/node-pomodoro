import promptSync from 'prompt-sync';
import { data, config } from '../data';
import { sendNotification } from './notify';
import { LoadingBar } from './loading-bar';

const prompt = promptSync();

function advancePomoInterval() {
    let notificationTitle: string;
    let notificationMessage: 'Check the terminal to start the next cycle.';

    // Just finished a work cycle //
    if (data.currentPomoInterval === 'workTime') { 
        data.pomoIntervalCounter++;
        notificationTitle = `Work-time #${data.pomoIntervalCounter} complete!`;
        // Need a short break //
        if (data.pomoIntervalCounter !== 4) {
            const result: string = prompt(`Work-time #${data.pomoIntervalCounter} is over. Well done! Press enter to start your short break or type "quit" to exit out. `);
            if (result === '') {
                data.currentPomoInterval = 'shortBreak';
                const lb = new LoadingBar(config.shortBreak);
                lb.start();
            } else return;
        // Need a long break //
        } else { 
            const result = prompt(`Work-time #${data.pomoIntervalCounter} is over -- time for a long break! Well done! Press enter to start your long break or type "quit" to exit out. `);
            if (result === '') {
                data.currentPomoInterval = 'longBreak';
                const lb = new LoadingBar(config.longBreak);
                lb.start();
            } else return;
        }

    // Just finished a short break cycle //
    } else if (data.currentPomoInterval === 'shortBreak') { // just finished a short break cycle
        notificationTitle = `Short-break #${data.pomoIntervalCounter} complete!`;
        const result: string = prompt(`Short-break #${data.pomoIntervalCounter} is over -- time to go back to work. Press enter to start work-time or type "quit" to exit out. `);
        if (result === '') {
            data.currentPomoInterval = 'workTime';
            const lb = new LoadingBar(config.workInterval);
            lb.start();
        } else return;

    // Just finished a long break cycle //
    } else if (data.currentPomoInterval === 'longBreak') { // just finished a long break cycle
        notificationTitle = 'Long break complete!';
        const result: string = prompt('Your long break is over. Nice job completing a full Pomodoro cycle! Would you like to start a new cycle? ');
        if (result.toLowerCase() === 'y' || result.toLowerCase() === 'yes') {
            data.pomoIntervalCounter = 0;
            const lb = new LoadingBar(config.workInterval);
            lb.start();
        } else return;
    }
    sendNotification(notificationTitle, notificationMessage);
}

export { advancePomoInterval };