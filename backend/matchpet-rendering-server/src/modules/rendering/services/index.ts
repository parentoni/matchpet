import { FastHTMLParser } from "./implementations/fastHTMLParser";
import { HttpContentManager } from "./implementations/httpContentManager";
import axios from "axios";

const contentManager = new HttpContentManager();
const htmlParser = new FastHTMLParser(contentManager);

export { contentManager, htmlParser }
