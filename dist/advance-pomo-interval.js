"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.advancePomoInterval = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const data_1 = require("./data");
const start_timer_1 = require("./start-timer");
const prompt = (0, prompt_sync_1.default)();
function advancePomoInterval() {
    if (data_1.data.currentPomoInterval === 'workTime') { // just finished a work cycle
        data_1.data.pomoIntervalCounter++;
        if (data_1.data.pomoIntervalCounter !== 4) { // need a short break -- 4 cycles not completed yet
            const result = prompt(`Work-time #${data_1.data.pomoIntervalCounter} is over. Well done! Press enter to start your short break or type "quit" to exit out. `);
            if (result === '') {
                console.log('empty detected');
                data_1.data.currentPomoInterval = 'shortBreak';
                (0, start_timer_1.startTimer)(data_1.config.shortBreak);
            }
            else
                return;
        }
        else { // need a long break -- 4 cycles completed
            const result = prompt(`Work-time #${data_1.data.pomoIntervalCounter} is over -- time for a long break! Well done! Press enter to start your long break or type "quit" to exit out. `);
            if (result === '') {
                data_1.data.currentPomoInterval = 'longBreak';
                (0, start_timer_1.startTimer)(data_1.config.longBreak);
            }
            else
                return;
        }
    }
    else if (data_1.data.currentPomoInterval === 'shortBreak') { // just finished a short break cycle
        const result = prompt(`Short-break #${data_1.data.pomoIntervalCounter} is over -- time to go back to work. Press enter to start work-time or type "quit" to exit out. `);
        if (result === '') {
            data_1.data.currentPomoInterval = 'workTime';
            (0, start_timer_1.startTimer)(data_1.config.longBreak);
        }
    }
    else if (data_1.data.currentPomoInterval === 'longBreak') { // just finished a long break cycle
        const result = prompt('Your long break is over. Nice job completing a full Pomodoro cycle! Would you like to start a new cycle? ');
        if (result.toLowerCase() === 'y' || result.toLowerCase() === 'yes') {
            data_1.data.pomoIntervalCounter = 0;
            (0, start_timer_1.startTimer)(data_1.config.workInterval);
        }
        else
            return;
    }
}
exports.advancePomoInterval = advancePomoInterval;
//# sourceMappingURL=advance-pomo-interval.js.map