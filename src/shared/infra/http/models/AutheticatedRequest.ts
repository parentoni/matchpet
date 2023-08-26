import express from "express";
import { JWTDTO } from "../../../../modules/user/domain/jwt";

export interface AuthenticatedRequest extends express.Request {
  decoded: JWTDTO;
}
