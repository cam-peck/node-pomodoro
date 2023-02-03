import fs from 'fs';

const pomodoroArt = fs.readFileSync('/workspaces/node-pomodoro/src/ASCII/pomodoro-text.txt', { encoding: 'utf-8' });

export { pomodoroArt };