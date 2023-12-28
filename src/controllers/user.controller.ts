import { IncomingMessage, ServerResponse } from "http";
import errorResponse from "../utils/response/error.response";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUserById,
} from "../services/user.service";
import response from "../utils/response/response";
import { bindBody } from "../utils/bindBody";
import userInputValidator from "../utils/validators/userInput.validator";
import { fromZodError } from "zod-validation-error";

const userController = async (req: IncomingMessage, res: ServerResponse) => {
  switch (req.method) {
    case "GET":
      const userId = parseInt(req.url?.split("/").pop() || "", 10);
      if (userId) {
        const user = getUserById(userId);
        if (user) {
          response(res, 200, "Get user by ID success", user);
          return;
        } else {
          errorResponse(res, 404, "User Not Found");
          return;
        }
      } else {
        if (
          req.url?.toString() !== "/api/users" &&
          req.url?.toString() !== "/api/users/"
        ) {
          errorResponse(res, 404, "Not Found");
          return;
        }
        const users = getAllUsers();
        response(res, 200, "Get all users success", users);
        return;
      }

    case "POST":
      try {
        const body = await bindBody(req);
        const validationStatus = userInputValidator.safeParse(body);
        if (validationStatus.success) {
          const existingUser = getUserByEmail(validationStatus.data.email);
          if (existingUser) {
            errorResponse(res, 400, "Email already registered");
            return;
          }
          createUser(validationStatus.data);
          response(res, 201, "User Created", validationStatus.data);
        } else {
          errorResponse(res, 400, fromZodError(validationStatus.error).message);
        }
      } catch (error) {
        errorResponse(res, 500, error);
      }
      break;

    case "DELETE":
      const userIdToDelete = parseInt(req.url?.split("/").pop() || "", 10);
      if (userIdToDelete) {
        const user = getUserById(userIdToDelete);
        if (user) {
          deleteUserById(userIdToDelete);
          response(res, 200, "Delete user by ID success", user);
          return;
        } else {
          errorResponse(res, 404, "User Not Found");
          return;
        }
      }

    case "PATCH":
      const userIdToUpdate = parseInt(req.url?.split("/").pop() || "", 10);
      if (userIdToUpdate) {
        let user = getUserById(userIdToUpdate);
        if (user) {
          const body = await bindBody(req);
          user = { ...user, ...body };
          updateUserById(userIdToUpdate, user);
          response(res, 200, "User Updated", user);
          return;
        } else {
          errorResponse(res, 404, "User Not Found");
          return;
        }
      }
      break;
    default:
      errorResponse(res, 404, "Not Found");
      break;
  }
};

export default userController;
