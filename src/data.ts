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
    workInterval: 1,
    shortBreak: 1,
    longBreak: 1
};

export { data, config };