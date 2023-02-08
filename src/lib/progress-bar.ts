import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = new readline.Readline(output);

class LoadingBar {
    size: number;
    progressCursor: number;
    timeRemaining: number;
    timer: ReturnType<typeof setTimeout>;

    constructor(size: number) {
        this.size = size;
        this.progressCursor = 0;
        this.timeRemaining = 20;
        this.timer = null;
    }
    
    start() {
        process.stdout.write('\x1B[?25l');
        process.stdout.write('Work Cycle #1\n');
        process.stdout.write('Time Remaining: 20\n');

        // draws the initial bar //
        process.stdout.write('[');
        for (let i = 0; i < this.size; i++) {
            process.stdout.write('-');
        }
        process.stdout.write('] ');

        // fills in the bar //
        this.progressCursor = 1;
        rl.cursorTo(this.progressCursor, 3);
        rl.commit();
        this.timer = setInterval(() => {
            this.updateTimer();
            this.updateProgress();
            process.stdout.write('=');
            this.progressCursor++;
            if (this.progressCursor > this.size) { // >= stops one before, > stops at size
                process.stdout.write('\n');
                // rl.cursorTo(0, 0);
                // rl.clearScreenDown();
                // rl.commit();
                clearTimeout(this.timer);
                // this.start();
            }
        }, 1000);
    }

    updateTimer() {
        rl.cursorTo(15, 2);
        rl.clearLine(1);
        rl.cursorTo(16, 2);
        rl.commit();
        this.timeRemaining--;
        process.stdout.write(`${this.timeRemaining}`);
    }

    updateProgress() {
        rl.cursorTo(this.progressCursor, 3);
        rl.commit();
    }
}

const lb = new LoadingBar(20);
lb.start();