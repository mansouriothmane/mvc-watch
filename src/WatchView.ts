import { WatchModel } from "./WatchModel";

export class WatchView {
  constructor(private readonly model: WatchModel) {}

  private addZ(n: number) {
    return `${n < 10 ? "0" : ""}${n}`;
  }

  createTimezoneElement() {
    const timezone = document.createElement("p");
    timezone.classList.add("timezone");
    timezone.textContent = `GMT${
      this.model.time.gmtOffset === 0
        ? ""
        : this.model.time.gmtOffset > 0
        ? `+${this.model.time.gmtOffset}`
        : this.model.time.gmtOffset
    }`;
    return timezone;
  }

  createRemoveButtonElement() {
    const removeButton = document.createElement("button");
    removeButton.id = `remove-${this.model.id}`;
    removeButton.classList.add("remove-watch");
    removeButton.textContent = "X";
    removeButton.addEventListener("click", () => this.removeWatch());
    return removeButton;
  }

  displayWatch() {
    const container = document.querySelector(".container");
    if (!container) return;

    const watchDivContainer = document.createElement("div");
    watchDivContainer.id = `watch-container-${this.model.id}`;
    watchDivContainer.classList.add("watchContainer");

    const watchDiv = this.createWatchElement();
    const timezone = this.createTimezoneElement();
    const removeButton = this.createRemoveButtonElement();

    watchDivContainer.appendChild(watchDiv);
    watchDivContainer.appendChild(timezone);
    watchDivContainer.appendChild(removeButton);

    container.appendChild(watchDivContainer);
  }

  removeWatch() {
    const watchDivContainer = document.getElementById(
      `watch-container-${this.model.id}`
    );
    if (!watchDivContainer) return;
    watchDivContainer.remove();
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
    const hoursElement = document.getElementById(`time-h-${this.model.id}`);
    const minutesElement = document.getElementById(`time-m-${this.model.id}`);
    const secondsElement = document.getElementById(`time-s-${this.model.id}`);
    if (hoursElement && minutesElement && secondsElement) {
      hoursElement.innerText = this.addZ(this.model.time.hours);
      minutesElement.innerText = this.addZ(this.model.time.minutes);
      secondsElement.innerText = this.addZ(this.model.time.seconds);
    }
  }
}
