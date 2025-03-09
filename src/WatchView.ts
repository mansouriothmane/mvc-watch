import { Time, WatchModel } from "./WatchModel";

// Consider making this an interface and implement it
export class WatchView {
  constructor() {}

  private formatTime(time: Time) {
    //do the logic of adding zero when there is only 1 digit
    const addZ = (n: number) => `${n < 10 ? "0" : ""}${n}`;
    return `${addZ(time.hours)}:${addZ(time.minutes)}:${addZ(time.seconds)}`;
  }

  displayWatch(model: WatchModel) {
    document.getElementById("time").innerHTML = this.formatTime(model.time);
  }
}
