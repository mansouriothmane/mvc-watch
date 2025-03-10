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
    const date = new Date();
    const time: Time = {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
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
