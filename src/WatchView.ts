import { WatchModel } from "./WatchModel";

// Consider making this an interface and implement it
export class WatchView {
  constructor() {}

  private addZ(n: number) {
    return `${n < 10 ? "0" : ""}${n}`;
  }

  displayTime(model: WatchModel) {
    document.getElementById("time-h").innerText = this.addZ(model.time.hours);
    document.getElementById("time-m").innerText = this.addZ(model.time.minutes);
    document.getElementById("time-s").innerText = this.addZ(model.time.seconds);
  }
}
