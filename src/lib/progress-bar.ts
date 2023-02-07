import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = new readline.Readline(output);

function progressBar() {
    rl.cursorTo(15, 10);
    rl.commit();
    process.stdout.write('A');
}

class LoadingBar {
    size: number;
    cursor: number;
    timer: ReturnType<typeof setTimeout>;

    constructor(size: number) {
        this.size = size;
        this.cursor = 0;
        this.timer = null;
    }

    start() {
        process.stdout.write('\x1B[?25l');
        process.stdout.write('[');
        for (let i = 0; i < this.size; i++) {
            process.stdout.write('-');
        }
        process.stdout.write(']');
        this.cursor = 1;
        rl.cursorTo(this.cursor, 1);
        rl.commit();
        this.timer = setInterval(() => {
            process.stdout.write('=');
            this.cursor++;
            if (this.cursor > this.size) { // >= stops one before, > stops at size
                clearTimeout(this.timer);
            } //stop code goes here
        }, 1000);
    }
}

const lb = new LoadingBar(20);
lb.start();