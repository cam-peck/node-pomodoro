"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTime = void 0;
function formatTime(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const leftoverSeconds = durationInSeconds - (minutes * 60);
    if (leftoverSeconds > 9)
        return `${minutes}:${leftoverSeconds}`;
    else
        return `${minutes}:0${leftoverSeconds}`;
}
exports.formatTime = formatTime;
//# sourceMappingURL=format-time.js.map