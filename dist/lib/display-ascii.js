"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pomodoroArt = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ASCIIPath = path_1.default.join(__dirname, '../../src/ASCII/pomodoro-text.txt');
const pomodoroArt = fs_1.default.readFileSync(ASCIIPath, { encoding: 'utf-8' });
exports.pomodoroArt = pomodoroArt;
//# sourceMappingURL=display-ascii.js.map