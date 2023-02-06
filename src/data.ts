const data: {
    nIntervId: ReturnType<typeof setTimeout>,
    remainingTime: number,
    currentPomoInterval: string,
    pomoIntervalCounter: number
} = {
    nIntervId: null,
    remainingTime: 0,
    currentPomoInterval: 'workTime',
    pomoIntervalCounter: 0
};

const config: {
    workInterval: number,
    shortBreak: number,
    longBreak: number
} = {
    workInterval: 0.1,
    shortBreak: 0.1,
    longBreak: 0.1
};

export { data, config };