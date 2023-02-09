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
exports.LoadingBar = void 0;
const readline = __importStar(require("node:readline/promises"));
const node_process_1 = require("node:process");
const convert_to_seconds_1 = require("../lib/convert-to-seconds");
const format_time_1 = require("../lib/format-time");
const index_1 = require("../index");
const rl = new readline.Readline(node_process_1.stdout);
class LoadingBar {
    constructor(timerLength) {
        this.timerLength = timerLength;
        this.secondsRemaining = (0, convert_to_seconds_1.convertToSeconds)(timerLength);
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
        if (index_1.timer.currentCycle === 'work') {
            process.stdout.write(`Work Cycle #${index_1.timer.workCyclesCompleted + 1} \n`);
        }
        if (index_1.timer.currentCycle === 'shortBreak') {
            process.stdout.write(`Short Break #${index_1.timer.workCyclesCompleted} \n`);
        }
        if (index_1.timer.currentCycle === 'longBreak') {
            process.stdout.write('Long Break! \n');
        }
    }
    writeTimeRemaining() {
        process.stdout.write(`Time Remaining: ${(0, format_time_1.formatTime)(this.secondsRemaining)} \n`);
    }
    updateTimeRemaining() {
        rl.cursorTo(15, this.progressCursorY - 1);
        rl.clearLine(1);
        rl.cursorTo(16, this.progressCursorY - 1);
        rl.commit();
        this.secondsRemaining--;
        process.stdout.write(`${(0, format_time_1.formatTime)(this.secondsRemaining)}`);
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
            index_1.timer.promptUserForNextCycle();
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
exports.LoadingBar = LoadingBar;
//# sourceMappingURL=loading-bar.js.map