import "./index.css";
import { WatchListController } from "./WatchListController";

const listController = new WatchListController();

listController.addWatch();
listController.addEventListeners();
