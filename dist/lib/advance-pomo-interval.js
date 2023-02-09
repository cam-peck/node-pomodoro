"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.advancePomoInterval = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const data_1 = require("../data");
const notify_1 = require("./notify");
const loading_bar_1 = require("./loading-bar");
const prompt = (0, prompt_sync_1.default)();
function advancePomoInterval() {
    let notificationTitle;
    let notificationMessage;
    // Just finished a work cycle //
    if (data_1.data.currentPomoInterval === 'workTime') {
        data_1.data.pomoIntervalCounter++;
        notificationTitle = `Work-time #${data_1.data.pomoIntervalCounter} complete!`;
        // Need a short break //
        if (data_1.data.pomoIntervalCounter !== 4) {
            const result = prompt(`Work-time #${data_1.data.pomoIntervalCounter} is over. Well done! Press enter to start your short break or type "quit" to exit out. `);
            if (result === '') {
                data_1.data.currentPomoInterval = 'shortBreak';
                const lb = new loading_bar_1.LoadingBar(data_1.config.shortBreak);
                lb.start();
            }
            else
                return;
            // Need a long break //
        }
        else {
            const result = prompt(`Work-time #${data_1.data.pomoIntervalCounter} is over -- time for a long break! Well done! Press enter to start your long break or type "quit" to exit out. `);
            if (result === '') {
                data_1.data.currentPomoInterval = 'longBreak';
                const lb = new loading_bar_1.LoadingBar(data_1.config.longBreak);
                lb.start();
            }
            else
                return;
        }
        // Just finished a short break cycle //
    }
    else if (data_1.data.currentPomoInterval === 'shortBreak') { // just finished a short break cycle
        notificationTitle = `Short-break #${data_1.data.pomoIntervalCounter} complete!`;
        const result = prompt(`Short-break #${data_1.data.pomoIntervalCounter} is over -- time to go back to work. Press enter to start work-time or type "quit" to exit out. `);
        if (result === '') {
            data_1.data.currentPomoInterval = 'workTime';
            const lb = new loading_bar_1.LoadingBar(data_1.config.workInterval);
            lb.start();
        }
        else
            return;
        // Just finished a long break cycle //
    }
    else if (data_1.data.currentPomoInterval === 'longBreak') { // just finished a long break cycle
        notificationTitle = 'Long break complete!';
        const result = prompt('Your long break is over. Nice job completing a full Pomodoro cycle! Would you like to start a new cycle? ');
        if (result.toLowerCase() === 'y' || result.toLowerCase() === 'yes') {
            data_1.data.pomoIntervalCounter = 0;
            const lb = new loading_bar_1.LoadingBar(data_1.config.workInterval);
            lb.start();
        }
        else
            return;
    }
    (0, notify_1.sendNotification)(notificationTitle, notificationMessage);
}
exports.advancePomoInterval = advancePomoInterval;
//# sourceMappingURL=advance-pomo-interval.js.map