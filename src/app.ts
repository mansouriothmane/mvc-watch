import "./index.css";
import { Light, Mode, Time, WatchModel } from "./WatchModel";

// STEP 1 : load local time
const localTime = new Date().toLocaleTimeString();
const hms: string[] = localTime.split(":");

const time: Time = {
  hours: Number(hms[0]),
  minutes: Number(hms[1]),
  seconds: Number(hms[2]),
};

const watch = new WatchModel(time, Mode.DEFAULT, Light.OFF);

const format = (time: Time) => {
  //do the logic of adding zero when there is only 1 digit
  const addZ = (n: number) => `${n < 10 ? "0" : ""}${n}`;
  return `${addZ(time.hours)}:${addZ(time.minutes)}:${addZ(time.seconds)}`;
};

document.getElementById("time").innerText = format(watch.time);
console.log("started");
// STEP 2 : increment seconds each second
const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const startWatch = async () => {
  while (true) {
    await sleep(1000);
    watch.incrementSeconds();
    // could be optimized to only update the part that changed
    document.getElementById("time-h").innerText = String(watch.time.hours);
    document.getElementById("time-m").innerText = String(watch.time.minutes);
    document.getElementById("time-s").innerText = String(watch.time.seconds);
  }
};

startWatch();

function onClickModeButton() {
  alert("clicked!");
  console.log("clicked!");

  // document.getElementById("test").classList.toggle("hideP");
}

document
  .getElementById("mode-btn")
  .addEventListener("click", onClickModeButton);

// THIS IS THE ENTRY NOW (AND NOT INDEX.TS)
