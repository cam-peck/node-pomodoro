import { pomodoroArt } from './lib/display-ascii';
import { config } from './data';
import { LoadingBar } from './lib/loading-bar';
import promptSync from 'prompt-sync';

const prompt = promptSync();

function initializePomodoro() {
    console.log(pomodoroArt, '\n');
    
    console.log('Welcome to Pomodoro Timer!\n');
    console.log('Current Pomodoro cycles are...');
    console.log(`Work: ${config.workInterval} minutes.`);
    console.log(`Short Break: ${config.shortBreak} minutes.`);
    console.log(`Long Break: ${config.longBreak} minutes.\n`);

    const result: string = prompt('Click enter when you\'re ready to start working! ');
    if (result === '') {
        const lb = new LoadingBar(config.workInterval);
        lb.start();
    }
}

initializePomodoro();


// TODO
// add timing markers -- no need to always update seconds
// add notification popup when timer pops
// consider if data.ts is actually the best way to store data --> is json better?