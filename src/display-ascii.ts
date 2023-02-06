import fs from 'fs';

const pomodoroArt: string = fs.readFileSync('/workspaces/node-pomodoro/src/ASCII/pomodoro-text.txt', { encoding: 'utf-8' });

export { pomodoroArt };