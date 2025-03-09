import { WatchController } from "./WatchController";
import { Light, Mode, Time, WatchModel } from "./WatchModel";
import { WatchView } from "./WatchView";

// STEP 1 : load local time

const localTime = new Date().toLocaleTimeString();
const hms: string[] = localTime.split(":");

const time: Time = {
  hours: Number(hms[0]),
  minutes: Number(hms[1]),
  seconds: Number(hms[2]),
};

const model = new WatchModel(time, Mode.DEFAULT, Light.OFF);

const view = new WatchView();
view.displayWatch(model);

// STEP 2 : update watch every second

const controller = new WatchController();

controller.startWatch(model);
