import notifier from 'node-notifier';
import path from 'path';

const tomatoIcon: string = path.join(__dirname, '../src/images/tomato-icon.png');


function sendNotification (title: string, message: string) {
    notifier.notify({
        title,
        message,
        icon: tomatoIcon
    });
}

export { sendNotification };