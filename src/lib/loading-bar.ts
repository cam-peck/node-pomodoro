import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { convertToSeconds } from './convert-to-seconds';
import { formatTime } from './format-time';
import { advancePomoInterval } from './advance-pomo-interval';

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
        this.progressCursorY = 20;
        this.timerIntvId = null;
    }
    
    start() {
        process.stdout.write('\x1B[?25l');
        process.stdout.write('Work Cycle #1\n');
        process.stdout.write(`Time Remaining: ${formatTime(this.secondsRemaining)} \n`);
        this.drawProgressBar();

        this.timerIntvId = setInterval(() => {
            this.updateTimer();
            this.updateProgress();
        }, 1000);
    }

    updateTimer() {
        rl.cursorTo(15, this.progressCursorY - 1);
        rl.clearLine(1);
        rl.cursorTo(16, this.progressCursorY - 1);
        rl.commit();
        this.secondsRemaining--;
        process.stdout.write(`${formatTime(this.secondsRemaining)}`);
    }

    updateProgress() {
        this.progressCursorX++;
        rl.cursorTo(this.progressCursorX, this.progressCursorY);
        rl.commit();
        process.stdout.write('=');
        if (this.progressCursorX > this.barLength) { // once we hit the minute marker...
            this.resetMinuteProgress();
        }
        if (this.secondsRemaining === 0) { // timer is complete
            process.stdout.write('\n');
            advancePomoInterval();
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