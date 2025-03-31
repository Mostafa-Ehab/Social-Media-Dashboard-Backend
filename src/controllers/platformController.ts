import { Request, Response, NextFunction } from "express";
import { IPlatformService } from "../services/platformService";
import { BadRequestException } from "../exceptions/badRequestException";

export interface IPlatformController {
    getAllPlatforms(req: Request, res: Response, next: NextFunction): Promise<any>;
    getUserPlatforms(req: Request, res: Response, next: NextFunction): Promise<any>;
    addPlatform(req: Request, res: Response, next: NextFunction): Promise<any>;
    deletePlatform(req: Request, res: Response, next: NextFunction): Promise<any>;
}

class PlatformController implements IPlatformController {
    constructor(private readonly platformService: IPlatformService) { }

    getAllPlatforms = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const platforms = await this.platformService.getAllPlatforms();
            return res.status(200).send(platforms.map(
                platform => ({
                    id: platform.id,
                    name: platform.name,
                    icon: platform.icon
                })
            ));
        } catch (err) {
            next(err);
        }
    }

    getUserPlatforms = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const platforms = await this.platformService.getUserPlatforms(String(req.user.id));
            return res.status(200).send(platforms.map(
                platform => ({
                    id: platform.id,
                    name: platform.platform.name,
                    icon: platform.platform.icon,
                    token: platform.token
                })
            ));
        } catch (err) {
            next(err);
        }
    }
    addPlatform = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { platformId, token } = req.body;

            if (!platformId || !token) {
                throw new BadRequestException("Platform ID and token are required");
            }

            const platform = await this.platformService.addPlatform(String(req.user.id), platformId, token);
            return res.status(200).send({
                id: platform.id,
                name: platform.platform.name,
                icon: platform.platform.icon,
                token: platform.token
            });
        } catch (err) {
            next(err);
        }
    }
    deletePlatform = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { platformId } = req.params;
            await this.platformService.deletePlatform(String(req.user.id), platformId);
            return res.status(200).send({
                message: "Platform deleted successfully"
            });
        } catch (err) {
            next(err);
        }
    }
}

export default PlatformController

