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

  incrementSeconds() {
    //add the logic of incrementing minutes when time is hh:mm:59
    //and increment hours when time is hh:59:59
    //and reseting all to 0 when time is 23:59:59
    let { hours: h, minutes: m, seconds: s } = this._time;
    if (s != 59) {
      s++;
    } else if (m != 59) {
      s = 0;
      m++;
    } else if (h != 23) {
      m = 0;
      h++;
    } else {
      s = 0;
      m = 0;
      h = 0;
    }
    this._time = { hours: h, minutes: m, seconds: s };
  }

  increment() {}
}
