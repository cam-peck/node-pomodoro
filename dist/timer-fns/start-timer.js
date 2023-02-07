"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startTimer = void 0;
const convert_to_seconds_1 = require("../lib/convert-to-seconds");
const countdown_1 = require("./countdown");
const data_1 = require("../data");
function startTimer(duration) {
    data_1.data.remainingTime = (0, convert_to_seconds_1.convertToSeconds)(duration);
    data_1.data.nIntervId = setInterval(countdown_1.countdown, 1000);
    console.log(`Starting a timer for ${duration} minutes.`);
}
exports.startTimer = startTimer;
//# sourceMappingURL=start-timer.js.map