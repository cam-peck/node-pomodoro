import { pomodoroArt } from './display-ascii';
import { config } from './data';
import { startTimer } from './start-timer';
import promptSync from 'prompt-sync';

const prompt = promptSync();

async function initializePomodoro() {
    console.log('Welcome to Pomodoro Timer!');
    console.log(pomodoroArt);
    console.log(`Current Pomodoro cycles are Work: ${config.workInterval} minutes, Short Break: ${config.shortBreak} minutes, and Long Break: ${config.longBreak} minutes.`);
    const result: string = prompt('Click enter when you\'re ready to start working! ');
    if (result === '') startTimer(config.workInterval);
}

initializePomodoro();


// TODO
// Add a lib folder and better file organization
// add timing markers -- no need to always update seconds
// add notification popup when timer pops
// consider if data.ts is actually the best way to store data --> is json better?