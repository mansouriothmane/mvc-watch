import { WatchController } from "./WatchController";
import { Light, Mode, Time, WatchModel } from "./WatchModel";
import { WatchView } from "./WatchView";

export class WatchListController {
  constructor() {}

  addEventListeners() {
    const addWatchButton = document.getElementById("add-watch-btn");
    addWatchButton.addEventListener("click", () => this.addWatch());
  }

  createWatch(): WatchModel {
    const localTime = new Date().toLocaleTimeString();
    const hms: string[] = localTime.split(":");

    const time: Time = {
      hours: Number(hms[0]),
      minutes: Number(hms[1]),
      seconds: Number(hms[2]),
    };

    return new WatchModel(time, Mode.DEFAULT, Light.OFF);
  }

  addWatch() {
    const model = this.createWatch();

    const view = new WatchView(model);
    view.displayWatch();

    const watchController = new WatchController(model, view);
    watchController.updateTimeEverySecond();
    watchController.addEventListeners();
  }

  removeWatch() {}
}
