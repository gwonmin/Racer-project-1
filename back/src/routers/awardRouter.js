import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";
import { userAuthService } from "../services/userService";

const awardRouter = Router();

awardRouter.post("/user/login", async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await userAuthService.getUser({ email, password });

        if (user.errorMessage) {
            throw new Error(user.errorMessage);
        };

        res.status(200).send(user);
    } catch (error) {
        next(error);
    };
}); 

awardRouter.post("/award/create", async (req, res, next) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const whenDate = req.body.whenDate;

        const newAward = await awardService.addAward({
            title,
            description,
            whenDate,
        });

        if (newAward.errorMessage) {
            throw new Error(newAward.errorMessage);
        };

        res.status(201).json(newAward);
    } catch (error) {
        next(error);
    }
});