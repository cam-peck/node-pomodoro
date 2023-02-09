import * as readline from 'node:readline/promises';
import { stdout as output } from 'node:process';
import { convertToSeconds } from '../lib/convert-to-seconds';
import { formatTime } from '../lib/format-time';
import { timer } from '../index';

const rl = new readline.Readline(output);

class LoadingBar {
    barLength: number;
    timerLength: number;
    secondsRemaining: number;
    progressCursorX: number;
    progressCursorY: number;
    timerIntvId: ReturnType<typeof setTimeout>;

    constructor(timerLength: number) {
        this.timerLength = timerLength;
        this.secondsRemaining = convertToSeconds(timerLength);
        this.barLength = 59;
        this.progressCursorX = 0;
        this.progressCursorY = 19;
        this.timerIntvId = null;
    }
    
    start() {
        // setup all the UI //
        process.stdout.write('\x1B[?25l');
        rl.cursorTo(0, 17);
        rl.clearScreenDown();
        rl.commit();
        this.writeCycleText();
        this.writeTimeRemaining();
        this.drawProgressBar();
        // start the timer //
        this.timerIntvId = setInterval(() => {
            this.updateTimeRemaining();
            this.updateProgressBar();
        }, 1000);
    }

    writeCycleText() {
        if (timer.currentCycle === 'work') {
            process.stdout.write(`Work Cycle #${timer.workCyclesCompleted + 1} \n`);
        }
        if (timer.currentCycle === 'shortBreak') {
            process.stdout.write(`Short Break #${timer.workCyclesCompleted} \n`);
        }
        if (timer.currentCycle === 'longBreak') {
            process.stdout.write('Long Break! \n');
        }
    }

    writeTimeRemaining() {
        process.stdout.write(`Time Remaining: ${formatTime(this.secondsRemaining)} \n`);
    }

    updateTimeRemaining() {
        rl.cursorTo(15, this.progressCursorY - 1);
        rl.clearLine(1);
        rl.cursorTo(16, this.progressCursorY - 1);
        rl.commit();
        this.secondsRemaining--;
        process.stdout.write(`${formatTime(this.secondsRemaining)}`);
    }

    updateProgressBar() {
        this.progressCursorX++;
        rl.cursorTo(this.progressCursorX, this.progressCursorY);
        rl.commit();
        process.stdout.write('=');
        if (this.progressCursorX > this.barLength) { // once we hit the minute marker...
            this.resetMinuteProgress();
        }
        if (this.secondsRemaining === 0) { // timer is complete
            process.stdout.write('\n');
            clearTimeout(this.timerIntvId);
            timer.promptUserForNextCycle();
        }
    }

    resetMinuteProgress() {
        rl.clearLine(-1);
        this.progressCursorX = 0;
        rl.cursorTo(this.progressCursorX, this.progressCursorY);
        rl.commit();
        this.drawProgressBar();
    }

    drawProgressBar() {
        process.stdout.write('[');
        for (let i = 0; i < this.barLength; i++) {
            process.stdout.write('-');
        }
        process.stdout.write('] ');
    }
}

export { LoadingBar };