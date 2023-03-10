import { pomodoroArt } from '../lib/display-ascii';
import { LoadingBar } from './loading-bar';
import { sendNotification } from '../lib/notify';
import promptSync from 'prompt-sync';

const prompt = promptSync();

class PomodoroTimer {
    workDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    currentCycle: string;
    workCyclesCompleted: number;

    constructor(workDuration: number, shortBreakDuration: number, longBreakDuration: number) {
        this.workDuration = workDuration;
        this.shortBreakDuration = shortBreakDuration;
        this.longBreakDuration = longBreakDuration;
        this.currentCycle = '';
        this.workCyclesCompleted = 0;
    }

    displayWelcomeMessage() {
    console.log(pomodoroArt, '\n');
    
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
        sendNotification('Pomodoro Cycle Complete!', 'Check the terminal to advance to the next cycle.');
        const result = prompt('Cycle complete! Press enter to move onto the next cycle.');
        if (result === '') {
            this.updateCycle();
        }
    }

    startCycle(cycle: string) {
        let lb: LoadingBar;
        switch (cycle) {
            case 'work':
                lb = new LoadingBar(this.workDuration);
                break;
            case 'shortBreak':
                lb = new LoadingBar(this.shortBreakDuration);
                break;
            case 'longBreak':
                lb = new LoadingBar(this.longBreakDuration);
                break;
        }
        lb.start();
    }

    updateCycle() {
        if (this.currentCycle === 'work') {
            this.workCyclesCompleted++;
            if (this.workCyclesCompleted !== 4) this.currentCycle = 'shortBreak';
            else if (this.workCyclesCompleted === 4) this.currentCycle = 'longBreak';
            else throw new Error('Error thrown from update Cycle: invalid cycle count detected');
        } else if (this.currentCycle === 'shortBreak') {
            this.currentCycle = 'work';
        } else if (this.currentCycle === 'longBreak') {
            this.currentCycle = 'work';
            this.workCyclesCompleted = 0;
            const reply = prompt('Pomodoro Cycle Complete! Would you like to restart the timer? (Y / n) ');
            if (reply.toLowerCase() !== 'y') return;
        }
        this.startCycle(this.currentCycle);
    }
}

export { PomodoroTimer };

// TODO:
    // fix weird bug where shrinking the terminal results in losing the bar b/c time overlaps it