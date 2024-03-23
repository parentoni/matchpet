import { HttpContentManager } from "./httpContentManager";
import axios from "axios";

const httpContentManager = new HttpContentManager(axios.create());

export { httpContentManager }
