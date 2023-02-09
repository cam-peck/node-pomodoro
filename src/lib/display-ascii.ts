import fs from 'fs';
import path from 'path';

const ASCIIPath = path.join(__dirname, '../../src/ASCII/pomodoro-text.txt');
const pomodoroArt: string = fs.readFileSync(ASCIIPath, { encoding: 'utf-8' });

export { pomodoroArt };