function getTimeISO(): string {
  return new Date().toISOString();
}

function getTriggerDate(): number {
  return new Date().getTime();
}

function getTimeInterval(triggerDate: number): number {
  return getTriggerDate() - triggerDate;
}

export const metrics = { getTimeISO, getTriggerDate, getTimeInterval };
