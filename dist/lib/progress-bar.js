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
function progressBar() {
    rl.cursorTo(15, 10);
    rl.commit();
    process.stdout.write('A');
}
class LoadingBar {
    constructor(size) {
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
//# sourceMappingURL=progress-bar.js.map