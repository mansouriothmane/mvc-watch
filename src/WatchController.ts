import { Mode, WatchModel } from "./WatchModel";
import { WatchView } from "./WatchView";
import { sleep } from "./utils";

export class WatchController {
  test: Number;
  constructor(private readonly view: WatchView) {}

  async startWatch(model: WatchModel) {
    //the view should probably be an attribute of the controller
    //or make it a singleton ?
    while (true) {
      await sleep(1000);
      model.incrementSeconds();
      this.view.displayTime(model);
    }
  }

  changeMode(model: WatchModel) {
    let newMode: Mode;
    switch (model.mode) {
      case Mode.DEFAULT:
        newMode = Mode.HOURS;
        break;
      case Mode.HOURS:
        newMode = Mode.MINUTES;
        break;
      case Mode.MINUTES:
        newMode = Mode.DEFAULT;
        break;
    }
    model.setMode(newMode);
  }

  increaseTime(model: WatchModel) {
    switch (model.mode) {
      case Mode.DEFAULT:
        break;
      case Mode.HOURS:
        model.incrementHours();
        break;
      case Mode.MINUTES:
        model.incrementMinutes();
        break;
    }
  }

  // THE FOLLOWING METHODS DIRECTLY EDIT THE VIEW

  private onClickModeButton(model: WatchModel) {
    this.changeMode(model);
    switch (model.mode) {
      case Mode.HOURS:
        document.getElementById("time-h").classList.toggle("edit-mode");
        break;
      case Mode.MINUTES:
        document.getElementById("time-h").classList.toggle("edit-mode");
        document.getElementById("time-m").classList.toggle("edit-mode");
        break;
      case Mode.DEFAULT:
        document.getElementById("time-m").classList.toggle("edit-mode");
        break;
    }
  }

  private onClickIncreaseButton(model: WatchModel) {
    this.increaseTime(model);
    this.view.displayTime(model);
  }

  private onClickLightButton() {
    document
      .getElementById("time-container")
      .classList.toggle("light-background");
  }

  addEventListeners(model: WatchModel) {
    const modeButton = document.getElementById("mode-btn");
    modeButton.addEventListener("click", () => this.onClickModeButton(model));

    const increaseButton = document.getElementById("increase-btn");
    increaseButton.addEventListener("click", () =>
      this.onClickIncreaseButton(model)
    );

    const lightButton = document.getElementById("light-btn");
    lightButton.addEventListener("click", () => this.onClickLightButton());
  }
}
