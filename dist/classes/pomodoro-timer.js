"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PomodoroTimer = void 0;
const display_ascii_1 = require("../lib/display-ascii");
const loading_bar_1 = require("./loading-bar");
const notify_1 = require("../lib/notify");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
class PomodoroTimer {
    constructor(workDuration, shortBreakDuration, longBreakDuration) {
        this.workDuration = workDuration;
        this.shortBreakDuration = shortBreakDuration;
        this.longBreakDuration = longBreakDuration;
        this.currentCycle = '';
        this.workCyclesCompleted = 0;
    }
    displayWelcomeMessage() {
        console.log(display_ascii_1.pomodoroArt, '\n');
        console.log('Welcome to Pomodoro Timer!\n');
        console.log('Current Pomodoro cycles are...');
        console.log(`Work: ${this.workDuration} minutes.`);
        console.log(`Short Break: ${this.shortBreakDuration} minutes.`);
        console.log(`Long Break: ${this.longBreakDuration} minutes.\n`);
    }
    promptUserForStart() {
        const reply = prompt('Press enter when you\'re ready to start work cycle #1.');
        if (reply === '') {
            this.currentCycle = 'work';
            this.startCycle('work');
        }
    }
    promptUserForNextCycle() {
        (0, notify_1.sendNotification)('Pomodoro Cycle Complete!', 'Check the terminal to advance to the next cycle.');
        const result = prompt('Cycle complete! Press enter to move onto the next cycle.');
        if (result === '') {
            this.updateCycle();
        }
    }
    startCycle(cycle) {
        let lb;
        switch (cycle) {
            case 'work':
                lb = new loading_bar_1.LoadingBar(this.workDuration);
                break;
            case 'shortBreak':
                lb = new loading_bar_1.LoadingBar(this.shortBreakDuration);
                break;
            case 'longBreak':
                lb = new loading_bar_1.LoadingBar(this.longBreakDuration);
                break;
        }
        lb.start();
    }
    updateCycle() {
        if (this.currentCycle === 'work') {
            this.workCyclesCompleted++;
            if (this.workCyclesCompleted !== 4)
                this.currentCycle = 'shortBreak';
            else if (this.workCyclesCompleted === 4)
                this.currentCycle = 'longBreak';
            else
                throw new Error('Error thrown from update Cycle: invalid cycle count detected');
        }
        else if (this.currentCycle === 'shortBreak') {
            this.currentCycle = 'work';
        }
        else if (this.currentCycle === 'longBreak') {
            this.currentCycle = 'work';
            this.workCyclesCompleted = 0;
            const reply = prompt('Pomodoro Cycle Complete! Would you like to restart the timer? (Y / n) ');
            if (reply.toLowerCase() !== 'y')
                return;
        }
        this.startCycle(this.currentCycle);
    }
}
exports.PomodoroTimer = PomodoroTimer;
// TODO:
// fix weird bug where shrinking the terminal results in losing the bar b/c time overlaps it
//# sourceMappingURL=pomodoro-timer.js.map