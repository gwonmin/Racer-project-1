import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { languageService } from "../services/languageService";

const languageRouter = Router();

languageRouter.post(
  "/language/create",
  login_required,
  async (req, res, next) => {
    try {
      //토큰으로 사용자 id 불러오기
      const user_id = req.currentUserId;

      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      // req 에서 데이터 가져오기
      const name = req.body.name;
      const level = req.body.level;

      //데이터를 학력 DB에 추가하기
      const newLanguage = await languageService.addLanguage({
        user_id,
        name,
        level,
      });

      if (newLanguage.errorMessage) {
        throw new Error(newLanguage.errorMessage);
      }

      res.status(201).json(newLanguage);
    } catch (error) {
      next(error);
    }
  }
);

languageRouter.get(
  "/languages/:user_id",
  login_required,
  async (req, res, next) => {
    try {
      const user_id = req.params.user_id;
      const languages = await languageService.getLanguages({ user_id });

      res.status(200).json(languages);
    } catch (error) {
      next(error);
    }
  }
);

languageRouter.put("/languages/:id", login_required, async (req, res, next) => {
  try {
    // URI로부터 id를 추출함.
    const _id = req.params.id;
    // body data 로부터 업데이트할 학력 정보를 추출함.
    const name = req.body.name ?? null;
    const level = req.body.level ?? null;

    const toUpdate = { name, level };

    //해당 id로 학력 정보를 db에서 찾아 업데이트함. 업데이트가 없을 시 생략
    const updatedLanguage = await languageService.setLanguage({
      _id,
      toUpdate,
    });

    if (updatedLanguage.errorMessage) {
      throw new Error(updatedLanguage.errorMessage);
    }

    res.status(200).json(updatedLanguage);
  } catch (error) {
    next(error);
  }
});

//삭제 기능 추가
languageRouter.delete(
  "/languages/:id",
  login_required,
  async (req, res, next) => {
    try {
      const result = await languageService.removeLanguage({
        _id: req.params.id,
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

languageRouter.get(
  "/languagelist/:user_id",
  login_required,
  async (req, res, next) => {
    try {
      // URI로부터 user_id를 추출함.
      const user_id = req.params.user_id;
      const languages = await languageService.getLanguages({ user_id });

      res.status(200).json(languages);
    } catch (error) {
      next(error);
    }
  }
);

export { languageRouter };
