import { pomodoroArt } from './lib/display-ascii';
import { LoadingBar } from './lib/loading-bar';
import promptSync from 'prompt-sync';
import { start } from 'repl';

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
        const reply = prompt('Press enter when you\'re ready to start work cycle #1.\n');
        if (reply === '') {
            this.currentCycle = 'work';
            this.startCycle('work');
        }
    }

    startCycle(cycle: string) {
        let lb: LoadingBar;
        switch (cycle) {
            case 'work':
                console.log(`Work Cycle #${this.workCyclesCompleted + 1}`);
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