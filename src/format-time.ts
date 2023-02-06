function formatTime(durationInSeconds: number): string {
    const minutes: number = Math.floor(durationInSeconds / 60);
    const leftoverSeconds: number = durationInSeconds - (minutes * 60);
    if (leftoverSeconds > 9) return `${minutes}:${leftoverSeconds}`;
    else return `${minutes}:0${leftoverSeconds}`;
}

export { formatTime };