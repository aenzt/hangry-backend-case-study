import { IncomingMessage, ServerResponse } from "http";
import errorResponse from "../utils/response/error.response";
import userController from "./user.controller";
import response from "../utils/response/response";

const controller: Function = (req: IncomingMessage, res: ServerResponse) => {
if (req.url?.startsWith("/api/users")) {
    userController(req, res);
    return;
  } else if (req.url?.toLowerCase() === "/") {
    response(res, 200, "Hello World");
  } else {
    errorResponse(res, 404, "Not Found");
    return;
  }
};

export default controller;
