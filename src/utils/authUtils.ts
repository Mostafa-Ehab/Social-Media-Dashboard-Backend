import JWT, { Secret, JsonWebTokenError } from "jsonwebtoken";
import { UnauthorizedException } from "../exceptions/unauthorizedException";

export const generateAccessToken = (userId: string, companyId: string | null = null) => {
    if (process.env.JWT_SECRET) {
        const jwtSecret: Secret = process.env.JWT_SECRET
        return JWT.sign({ userId, companyId }, jwtSecret, {
            expiresIn: '10m'
        });
    }

    throw new Error("Can't find JWT_SECRET");
};

export const verifyAccessToken = (authorization: string) => {
    if (process.env.JWT_SECRET) {
        const jwtSecret: Secret = process.env.JWT_SECRET
        try {
            return JWT.verify(
                authorization,
                jwtSecret
            )
        } catch (err) {
            if (err instanceof JsonWebTokenError) {
                throw new UnauthorizedException("Invalid token")
            }
        }
    }

    throw new Error("Can't find JWT_SECRET");
};

export const generateRefreshToken = (userId: string) => {
    if (process.env.JWT_SECRET) {
        const jwtSecret: Secret = process.env.JWT_SECRET
        return JWT.sign({ userId }, jwtSecret, {
            expiresIn: '7d'
        });
    }

    throw new Error("Can't find JWT_SECRET");
};

export const validateEmail = (email: String) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
