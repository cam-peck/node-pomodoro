"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("node:readline/promises"));
const node_process_1 = require("node:process");
const rl = new readline.Readline(node_process_1.stdout);
class LoadingBar {
    constructor(size) {
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
//# sourceMappingURL=progress-bar.js.map