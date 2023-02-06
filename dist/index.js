"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const display_ascii_1 = require("./display-ascii");
const data_1 = require("./data");
const start_timer_1 = require("./start-timer");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
async function initializePomodoro() {
    console.log('Welcome to Pomodoro Timer!');
    console.log(display_ascii_1.pomodoroArt);
    console.log(`Current Pomodoro cycles are Work: ${data_1.config.workInterval} minutes, Short Break: ${data_1.config.shortBreak} minutes, and Long Break: ${data_1.config.longBreak} minutes.`);
    const result = prompt('Click enter when you\'re ready to start working! ');
    if (result === '')
        (0, start_timer_1.startTimer)(data_1.config.workInterval);
}
initializePomodoro();
// TODO
// Add a lib folder and better file organization
// add timing markers -- no need to always update seconds
// add notification popup when timer pops
// consider if data.ts is actually the best way to store data --> is json better?
//# sourceMappingURL=index.js.map