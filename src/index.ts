import { PomodoroTimer } from './pomodoro-timer';

const timer = new PomodoroTimer(0.05, 0.1, 5);
timer.displayWelcomeMessage();
timer.promptUserForStart();

export { timer };