import { Router } from "express";
import multer from "multer";

import multerConfig from "./config/multer";
import authMiddleware from "./app/middlewares/auth";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/FileController";
import ProviderController from "./app/controllers/ProviderController";
import AppointmentController from "./app/controllers/AppointmentController";
import ScheduleController from "./app/controllers/ScheduleController";
import NotificationController from "./app/controllers/NotificationController";
import AvailableController from "./app/controllers/AvailableController";

const routes = new Router();
const uploads = multer(multerConfig);

routes.get("/providers", authMiddleware, ProviderController.index);
routes.get("/providers/:providerId/available", authMiddleware, AvailableController.index);
routes.get("/appointments", authMiddleware, AppointmentController.index);
routes.get("/schedules", authMiddleware, ScheduleController.index);
routes.get("/notification", authMiddleware, NotificationController.index);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);
routes.post("/files", authMiddleware, uploads.single("file"), FileController.store);
routes.post("/appointments", authMiddleware, AppointmentController.store);

routes.put("/users", authMiddleware, UserController.update);
routes.put("/notification/:id", authMiddleware, NotificationController.update);

routes.delete("/appointments/:id", authMiddleware, AppointmentController.delete);

export default routes;