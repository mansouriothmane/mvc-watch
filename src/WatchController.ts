import { WatchModel } from "./WatchModel";
import { WatchView } from "./WatchView";
import { Mode } from "./types";
import { sleep } from "./utils";

export class WatchController {
  constructor(
    private readonly model: WatchModel,
    private readonly view: WatchView
  ) {}

  async updateTimeEverySecond() {
    const remainingMiliseconds = 1000 - new Date().getMilliseconds();
    await sleep(remainingMiliseconds);
    this.model.time.incrementSeconds();
    this.view.updateTime();

    while (true) {
      await sleep(1000);
      this.model.time.incrementSeconds();
      this.view.updateTime();
    }
  }

  changeMode() {
    let newMode: Mode;
    switch (this.model.mode) {
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
    this.model.setMode(newMode);
  }

  increaseTime() {
    switch (this.model.mode) {
      case Mode.DEFAULT:
        break;
      case Mode.HOURS:
        this.model.time.incrementHours();
        break;
      case Mode.MINUTES:
        this.model.time.incrementMinutes();
        break;
    }
  }

  // THE FOLLOWING METHODS DIRECTLY EDIT THE VIEW

  private onClickModeButton() {
    this.changeMode();
    switch (this.model.mode) {
      case Mode.HOURS:
        document
          .getElementById(`time-h-${this.model.id}`)
          .classList.toggle("edit-mode");
        break;
      case Mode.MINUTES:
        document
          .getElementById(`time-h-${this.model.id}`)
          .classList.toggle("edit-mode");
        document
          .getElementById(`time-m-${this.model.id}`)
          .classList.toggle("edit-mode");
        break;
      case Mode.DEFAULT:
        document
          .getElementById(`time-m-${this.model.id}`)
          .classList.toggle("edit-mode");
        break;
    }
  }

  private onClickIncreaseButton() {
    this.increaseTime();
    this.view.updateTime();
  }

  private onClickLightButton() {
    document
      .getElementById(`time-container-${this.model.id}`)
      .classList.toggle("light-background");
  }

  private onClickFormatButton() {
    this.model.time.toggleFormat();
    this.view.updateTime();
    this.view.updateTimeFormat();
  }

  addEventListeners() {
    const modeButton = document.getElementById(`mode-btn-${this.model.id}`);
    modeButton.addEventListener("click", () => this.onClickModeButton());

    const increaseButton = document.getElementById(
      `increase-btn-${this.model.id}`
    );
    increaseButton.addEventListener("click", () =>
      this.onClickIncreaseButton()
    );

    const lightButton = document.getElementById(`light-btn-${this.model.id}`);
    lightButton.addEventListener("click", () => this.onClickLightButton());

    const formatButton = document.getElementById(`format-btn-${this.model.id}`);
    formatButton.addEventListener("click", () => this.onClickFormatButton());
  }
}
