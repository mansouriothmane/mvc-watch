import { WatchModel } from "./WatchModel";
import { WatchView } from "./WatchView";
import { sleep } from "./utils";

export class WatchController {
  test: Number;

  constructor() {}

  async startWatch(model: WatchModel) {
    //the view should probably be an attribute of the controller
    //or make it a singleton ?
    const view = new WatchView();
    while (true) {
      await sleep(1000);
      model.incrementSeconds();
      view.displayWatch(model);
    }
  }

  editMode(): WatchView {
    return new WatchView();
  }

  editTime() {}

  editLight() {}
}
