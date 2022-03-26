import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();

//새로운 자격증 만들기
certificateRouter.post(
  "/certificate/create",
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
      const title = req.body.title;
      const description = req.body.description;
      const when_date = req.body.when_date;

      //데이터를 학력 DB에 추가하기
      const newCertificate = await certificateService.addCertificate({
        user_id,
        title,
        description,
        when_date,
      });

      if (newCertificate.errorMessage) {
        throw new Error(newCertificate.errorMessage);
      }

      res.status(201).json(newCertificate);
    } catch (error) {
      next(error);
    }
  }
);

//특정 자격증 찾기
certificateRouter.get(
  "/certificates/:id",
  login_required,
  async (req, res, next) => {
    try {
      const _id = req.params.id;
      const certificate = await certificateService.getCertificate({ _id });

      res.status(200).json(certificate);
    } catch (error) {
      next(error);
    }
  }
);

//특정 자격증 수정하기
certificateRouter.put(
  "/certificates/:id",
  login_required,
  async (req, res, next) => {
    try {
      // URI로부터 id를 추출함.
      const _id = req.params.id;
      // body data 로부터 업데이트할 학력 정보를 추출함.
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;
      const when_date = req.body.when_date ?? null;

      const toUpdate = { title, description, when_date };

      //해당 id로 학력 정보를 db에서 찾아 업데이트함. 업데이트가 없을 시 생략
      const updatedCertificate = await certificateService.setCertificate({
        _id,
        toUpdate,
      });

      if (updatedCertificate.errorMessage) {
        throw new Error(updatedCertificate.errorMessage);
      }

      res.status(200).json(updatedCertificate);
    } catch (error) {
      next(error);
    }
  }
);

//삭제 기능 추가
certificateRouter.delete(
  "/certificates/:id",
  login_required,
  async (req, res, next) => {
    try {
      const result = await certificateService.removeCertificate({
        _id: req.params.id,
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

//전체 수상이력 불러오기
certificateRouter.get(
  "/certificatelist/:user_id",
  login_required,
  async (req, res, next) => {
    try {
      // URI로부터 user_id를 추출함.
      const user_id = req.params.user_id;
      const certificates = await certificateService.getCertificates({
        user_id,
      });

      res.status(200).json(certificates);
    } catch (error) {
      next(error);
    }
  }
);

export { certificateRouter };
