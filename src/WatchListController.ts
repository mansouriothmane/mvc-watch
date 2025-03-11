import { Time } from "./Time";
import { Light, Mode } from "./types";
import { WatchController } from "./WatchController";
import { WatchModel } from "./WatchModel";
import { WatchView } from "./WatchView";

export class WatchListController {
  constructor() {}

  addEventListeners() {
    this.addTimezoneEventListeners();
  }

  addTimezoneEventListeners() {
    const timezones: { label: string; value: string }[] = [];
    for (let i = -12; i <= 14; i++) {
      const label = i === 0 ? "GMT" : `GMT${i > 0 ? `+${i}` : i}`;
      timezones.push({ label, value: i.toString() });
    }

    const selectElement = document.getElementById(
      "timezone-select"
    ) as HTMLSelectElement;

    timezones.forEach((timezone) => {
      const option = document.createElement("option");
      option.value = timezone.value;
      option.textContent = timezone.label;
      selectElement.appendChild(option);
    });

    const addWatchButton = document.getElementById("add-watch-btn");
    addWatchButton.addEventListener("click", () =>
      this.addWatch(parseInt(selectElement.value))
    );
  }

  getDateWithOffset(gmtOffset: number): Date {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000; // Convert to UTC
    return new Date(utc + gmtOffset * 3600000); // Apply GMT offset
  }

  createWatch(gmtOffset?: number): WatchModel {
    const time = new Time(gmtOffset);
    return new WatchModel(time, Mode.DEFAULT, Light.OFF);
  }

  addWatch(gmtOffset?: number) {
    const model = this.createWatch(gmtOffset);

    const view = new WatchView(model);
    view.displayWatch();

    const watchController = new WatchController(model, view);
    watchController.updateTimeEverySecond();
    watchController.addEventListeners();
  }
}
