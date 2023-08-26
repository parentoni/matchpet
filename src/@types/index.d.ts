import { IncomingHttpHeaders } from "http";

declare module "http" {
  interface IncomingHttpHeaders {
    "accept-version"?: string;
  }
}
