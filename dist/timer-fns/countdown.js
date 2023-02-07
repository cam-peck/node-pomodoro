"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countdown = void 0;
const advance_pomo_interval_1 = require("./advance-pomo-interval");
const format_time_1 = require("../lib/format-time");
const data_1 = require("../data");
function countdown() {
    if (data_1.data.remainingTime === 0) {
        clearInterval(data_1.data.nIntervId);
        (0, advance_pomo_interval_1.advancePomoInterval)();
    }
    else {
        data_1.data.remainingTime -= 1;
        console.log((0, format_time_1.formatTime)(data_1.data.remainingTime));
    }
}
exports.countdown = countdown;
//# sourceMappingURL=countdown.js.map