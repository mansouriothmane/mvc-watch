import { WatchModel } from "./WatchModel";

export class WatchView {
  constructor(private readonly model: WatchModel) {}

  private addZ(n: number) {
    return `${n < 10 ? "0" : ""}${n}`;
  }

  displayWatch() {
    const container = document.querySelector(".container");
    if (!container) return;

    const watchDiv = this.createWatchElement();
    container.appendChild(watchDiv);
  }

  createWatchElement(): HTMLElement {
    const watchDiv = document.createElement("div");
    watchDiv.classList.add("watch");
    watchDiv.id = `watch-${this.model.id}`;

    // Time Display
    const timeDisplay = document.createElement("div");
    timeDisplay.classList.add("time-display");
    timeDisplay.id = `time-container-${this.model.id}`;

    timeDisplay.innerHTML = `
        <span id="time-h-${this.model.id}">${this.addZ(
      this.model.time.hours
    )}</span>:
        <span id="time-m-${this.model.id}">${this.addZ(
      this.model.time.minutes
    )}</span>
        <sup id="time-s-${this.model.id}">${this.addZ(
      this.model.time.seconds
    )}</sup>
    `;

    // Buttons and Labels
    const buttonsHTML = `
        <span class="label mode">Mode</span>
        <button class="button mode" id="mode-btn-${this.model.id}"></button>
        <span class="label increase">Increase</span>
        <button class="button increase" id="increase-btn-${this.model.id}"></button>
        <span class="label light">Light</span>
        <button class="button light" id="light-btn-${this.model.id}"></button>
    `;

    watchDiv.appendChild(timeDisplay);
    watchDiv.innerHTML += buttonsHTML;

    return watchDiv;
  }

  updateTime() {
    document.getElementById(`time-h-${this.model.id}`).innerText = this.addZ(
      this.model.time.hours
    );
    document.getElementById(`time-m-${this.model.id}`).innerText = this.addZ(
      this.model.time.minutes
    );
    document.getElementById(`time-s-${this.model.id}`).innerText = this.addZ(
      this.model.time.seconds
    );
  }
}
