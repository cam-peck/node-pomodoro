"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pomodoroArt = void 0;
const fs_1 = __importDefault(require("fs"));
const pomodoroArt = fs_1.default.readFileSync('/workspaces/node-pomodoro/src/ASCII/pomodoro-text.txt', { encoding: 'utf-8' });
exports.pomodoroArt = pomodoroArt;
//# sourceMappingURL=display-ascii.js.map