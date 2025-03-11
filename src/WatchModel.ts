import { Time } from "./Time";
import { Light, Mode } from "./types";

export class WatchModel {
  private static nextId = 0;
  public readonly id: number;

  constructor(public time: Time, public mode: Mode, public light: Light) {
    this.id = WatchModel.nextId++;
  }

  setMode(mode: Mode) {
    this.mode = mode;
  }

  toggleLight() {
    this.light = 1 - this.light;
  }
}
