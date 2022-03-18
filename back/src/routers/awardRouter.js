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
    }
}); 

awardRouter.post("/award/create", async (req, res, next) => {
    try {
        const user_id = req.body.user_id;
        const title = req.body.title;
        const description = req.body.description;
        const whenDate = req.body.whenDate;

        const newAward = await awardService.addAward({
            user_id,
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

awardRouter.get(
    "/awards/:id",
    login_required,
    async (req, res, next) => {
        try {
            const id = req.params.id;
            const currentAwardInfo = await awardService.getAward({ _id });

            if (currentAwardInfo.errorMessage) {
                throw new Error(currentAwardInfo.errorMessage);
            };

            res.status(200).send(currentAwardInfo);
        } catch (error) {
            next(error);
        }
    }
);

awardRouter.put(
    "/awards/:id",
    login_required,
    async (req, res, next) => {
        try {
            const id = req.params.id;
            const title = req.body.title;
            const description = req.body.description;
            const whenDate = req.body.whenDate;

            const toUpdate = { title, description, whenDate };

            const updatedAward = await awardService.setAwards({ _id, toUpdate });

            if (updatedAward.errorMessage) {
                throw new Error(updatedAward.errorMessage);
            };

            res.status(200).json(updatedAward);
        } catch (error) {
            next(error);
        }
    }
);

awardRouter.get(
    "/awardlist/:user_id",
    login_required,
    async (req, res, next) => {
        try {
            const user_id =req.params.user_id;
            const currentAwardsInfo = await awardService.getAwardInfo({ user_id });

            if (currentAwardsInfo.errorMessage) {
                throw new Error(currentAwardsInfo.errorMessage);
            };

            res.status(200).json(currentAwardsInfo);
        } catch (error) {
            next(error);
        }
    }
);

export { awardRouter };