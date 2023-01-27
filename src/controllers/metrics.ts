function getTimeISO(): string {
  return new Date().toISOString();
}

function getTriggerDate(): [number, number] {
  // return new Date().getTime();
  return process.hrtime();
}

function getTimeInterval(triggerDate: [number, number]): number {
  // return getTriggerDate() - triggerDate;
  const timeInterval = process.hrtime(triggerDate);
  return timeInterval[0] * 1000 + timeInterval[1] / 1000000;
}

export const metrics = { getTimeISO, getTriggerDate, getTimeInterval };
