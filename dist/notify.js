"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const node_notifier_1 = __importDefault(require("node-notifier"));
const path_1 = __importDefault(require("path"));
const tomatoIcon = path_1.default.join(__dirname, '../src/images/tomato-icon.png');
console.log(tomatoIcon);
function sendNotification(title, message) {
    node_notifier_1.default.notify({
        title,
        message,
        icon: tomatoIcon
    });
}
exports.sendNotification = sendNotification;
sendNotification('Work time #3 Complete!', 'Click to start your short break!');
//# sourceMappingURL=notify.js.map