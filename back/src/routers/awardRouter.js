import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService.js";

const awardRouter = Router();

awardRouter.post("/award/create", async (req, res, next) => {
    // req에서 데이터 가져오기
    const title = req.body.title;
    const description = req.body.description;
    const whenDate = req.body.whenDate;

});