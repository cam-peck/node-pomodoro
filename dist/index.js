"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timer = void 0;
const pomodoro_timer_1 = require("./classes/pomodoro-timer");
const pomo_config_1 = require("./pomo-config");
// To change the interval duration, change the numbers in src/config/config.ts //
const { workInterval, shortBreakInterval, longBreakInterval } = pomo_config_1.pomoConfig;
const timer = new pomodoro_timer_1.PomodoroTimer(workInterval, shortBreakInterval, longBreakInterval);
exports.timer = timer;
timer.displayWelcomeMessage();
timer.promptUserForStart();
//# sourceMappingURL=index.js.map