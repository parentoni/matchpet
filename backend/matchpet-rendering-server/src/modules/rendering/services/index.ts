import { FastHTMLParser } from "./implementations/fastHTMLParser";
import { HttpContentManager } from "./implementations/httpContentManager";
import axios from "axios";
import { PuppeteerDraw } from "./implementations/puppeteerDraw";

const contentManager = new HttpContentManager();
const htmlParser = new FastHTMLParser(contentManager);
const drawHTML = new PuppeteerDraw()

export { contentManager, htmlParser, drawHTML}
