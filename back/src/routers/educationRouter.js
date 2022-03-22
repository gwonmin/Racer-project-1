import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";

const educationRouter = Router();

//새로운 학력 만들기
educationRouter.post(
    "/education/create",
    login_required,
    async (req, res, next) => {
        try {
            //토큰으로 사용자 id 불러오기
            const user_id = req.currentUserId

            if (is.emptyObject(req.body)) {
                throw new Error(
                  "headers의 Content-Type을 application/json으로 설정해주세요"
                );
              }
            // req 에서 데이터 가져오기  
            const school = req.body.school;
            const major = req.body.major;
            const position = req.body.position;


            //데이터를 학력 DB에 추가하기
            const newEducation = await educationService.addEducation({
                user_id,
                school,
                major,
                position 
            });

            if (newEducation.errorMessage) {
                throw new Error(newEducation.errorMessage);
            }

            res.status(201).json(newEducation);
        } catch (error) {
            next(error);
        }
    }
);


//특정 학력 찾기
educationRouter.get(
    '/educations/:id',
    login_required,
    async (req, res, next) => {
        try {
            const _id = req.params.id;
            const Education = await educationService.getEducation({ _id });

            res.status(200).json(Education);
        } catch (error) {
            next(error);
        }
    }
);


//특정 학력 수정하기
educationRouter.put(
    '/educations/:id',
    login_required,
    async (req, res, next) => {
        try {
            // URI로부터 id를 추출함.
            const _id = req.params.id;
            // body data 로부터 업데이트할 학력 정보를 추출함.
            const school = req.body.school ?? null;
            const major = req.body.major ?? null;
            const position = req.body.position ?? null;
            
            const toUpdate = { school, major, position };

            //해당 id로 학력 정보를 db에서 찾아 업데이트함. 업데이트가 없을 시 생략
            const updatedEducation = await educationService.setEducation({_id, toUpdate});

            if(updatedEducation.errorMessage) {
                throw new Error(updatedEducation.errorMessage);
            }

            res.status(200).json(updatedEducation);
        } catch (error) {
            next(error);
        }
    }
);

//삭제 기능 추가
educationRouter.delete(
    '/educations/:id',
    login_required,
    async (req, res, next) => {
        try {
            const result = await educationService.removeEducation({ _id: req.params.id });
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
);

//전체 학력 불러오기
educationRouter.get(
    '/educationlist/:user_id',
    login_required,
    async (req, res, next) => {
        try {
            // URI로부터 user_id를 추출함.
            const user_id = req.params.user_id;
            const Educations = await educationService.getEducations({ user_id });

            res.status(200).json(Educations);
        } catch (error) {
            next(error);
        }
    }
);


export { educationRouter };