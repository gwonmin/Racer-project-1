import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";
import { userAuthService } from "../services/userService";

const awardRouter = Router();

// 새로운 수상이력 만들기
awardRouter.post(
    "/award/create",
    login_required,
    async (req, res, next) => {
        try {
            const user_id = req.currentUserId;
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
    }
);

// 특정 수상이력 찾기
awardRouter.get(
    "/awards/:id",
    login_required,
    async (req, res, next) => {
        try {
            const _id = req.params.id;
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

// 특정 수상이력 수정하기
awardRouter.put(
    "/awards/:id",
    login_required,
    async (req, res, next) => {
        try {
            const _id = req.params.id;
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

//전체 수상이력 불러오기
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

//특정 수상이력 삭제하기
awardRouter.delete(
    "/awards/:id",
    login_required,
    async (req, res, next) => {
        try {
            const _id = req.params.id;
            const deleteAwardsInfo = await awardService.deleteAward({ _id });

            if (deleteAwardsInfo.errorMessage) {
                throw new Error(deleteAwardsInfo.errorMessage);
            };

            res.status(200).json(deleteAwardsInfo);
        } catch (error) {
            next(error);
        }
    }
);

export { awardRouter };