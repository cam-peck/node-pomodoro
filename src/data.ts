const data: {
    nIntervId: ReturnType<typeof setTimeout>,
    remainingTime: number,
    currentPomoInterval: string,
    pomoIntervalCounter: number
} = {
    nIntervId: null,
    remainingTime: 0,
    currentPomoInterval: 'workTime',
    pomoIntervalCounter: 1
};

const config: {
    workInterval: number,
    shortBreak: number,
    longBreak: number
} = {
    workInterval: 0.05,
    shortBreak: 0.05,
    longBreak: 0.05
};

export { data, config };