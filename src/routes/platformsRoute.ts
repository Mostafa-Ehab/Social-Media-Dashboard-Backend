import { IPlatformController } from "../controllers/platformController";
import { IAuthMiddleware } from "../middlewares/authMiddleware";
import express from "express";

export function platformsRoute(platformController: IPlatformController, authMiddleware: IAuthMiddleware): express.Router {
    const router = express.Router();

    router.get("/all", authMiddleware.loginRequired, platformController.getAllPlatforms);
    router.get("/me", authMiddleware.loginRequired, platformController.getUserPlatforms);
    router.post("/add", authMiddleware.loginRequired, platformController.addPlatform);
    router.delete("/delete/:platformId", authMiddleware.loginRequired, platformController.deletePlatform);

    return router;
}