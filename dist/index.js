"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const display_ascii_1 = require("./lib/display-ascii");
const loading_bar_1 = require("./lib/loading-bar");
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
        const reply = prompt('Press enter when you\'re ready to start work cycle #1.\n');
        if (reply === '') {
            this.currentCycle = 'work';
            this.startCycle('work');
        }
    }
    startCycle(cycle) {
        let lb;
        switch (cycle) {
            case 'work':
                console.log(`Work Cycle #${this.workCyclesCompleted + 1}`);
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
        if (this.currentCycle === 'work' && this.workCyclesCompleted !== 4) {
            this.currentCycle = 'shortBreak';
        }
        if (this.currentCycle === 'shortBreak') {
            this.currentCycle = 'work';
        }
        if (this.workCyclesCompleted === 4) {
            this.currentCycle = 'longBreak';
        }
        if (this.currentCycle === 'longBreak') {
            this.currentCycle = 'work';
        }
    }
}
const timer = new PomodoroTimer(0.1, 0.1, 0.1);
timer.displayWelcomeMessage();
timer.promptUserForStart();
//# sourceMappingURL=index.js.map