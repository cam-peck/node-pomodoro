import { PomodoroTimer } from './classes/pomodoro-timer';
import { pomoConfig } from './pomo-config';

// To change the interval duration, change the numbers in src/config/config.ts //

const { workInterval, shortBreakInterval, longBreakInterval } = pomoConfig;

const timer = new PomodoroTimer(workInterval, shortBreakInterval, longBreakInterval);
timer.displayWelcomeMessage();
timer.promptUserForStart();

export { timer };