export class Metrics {
  timeStamp() {
    const date = new Date();
    return date.toISOString();
  }

  startTime() {
    const time = process.hrtime();
    return time;
  }

  stopTime(startTime) {
    const time = process.hrtime(startTime);
    const timeInterval = time[0] * 1000 + time[1] / 1000000;
    return timeInterval;
  }
}
