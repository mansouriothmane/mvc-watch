// Consider making this a class with a toString method and a self managed format (hh:mm:ss)
export interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

export enum Mode {
  DEFAULT = 0, // Default mode
  HOURS = 1, // Editing the hours
  MINUTES = 2, // Editing the minutes
}

export enum Light {
  OFF = 0, // White
  ON = 1, // Yellow
}

export class WatchModel {
  constructor(
    private _time: Time,
    private _mode: Mode,
    private _light: Light
  ) {}

  //getters and setters
  get time() {
    return this._time;
  }

  get mode() {
    return this._mode;
  }

  get light() {
    return this._light;
  }

  setMode(mode: Mode) {
    this._mode = mode;
  }

  toggleLight() {
    this._light = 1 - this._light;
  }

  incrementHours() {
    if (this._time.hours != 23) {
      this._time.hours++;
    } else {
      this._time.hours = 0;
    }
  }

  incrementMinutes() {
    if (this._time.minutes != 59) {
      this._time.minutes++;
    } else {
      this._time.minutes = 0;
      this.incrementHours();
    }
  }

  incrementSeconds() {
    if (this._time.seconds != 59) {
      this._time.seconds++;
    } else {
      this._time.seconds = 0;
      this.incrementMinutes();
    }
  }
}
