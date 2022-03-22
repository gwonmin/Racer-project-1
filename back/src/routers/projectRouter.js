import { Router } from "express";
import is from "@sindresorhus/is";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";

const projectRouter = Router();

// 새로운 프로젝트 만들기
projectRouter.post(
    "/project/create", 
    login_required,
    async (req, res, next) => {
    try{
        if(is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type를 application/json으로 설정해주세요"
            );
        }

        console.log(req.body);
        const user_id = req.currentUserId;
        const title = req.body.title;
        const from_date = req.body.from_date;
        const to_date = req.body.to_date;
        const description = req.body.description;
        const git = req.body.git;

        const newProject = await projectService.addProject({
            user_id,
            title,
            from_date,
            to_date,
            description,
            git,
        })

        if(newProject.errorMessage){
            throw new Error(newProject.errorMessage);
        }

        res.status(201).json(newProject);

    } catch (error) {
        next(error);
    }
});


// 특정 프로젝트 찾기
projectRouter.get(
    "/projects/:id", 
    login_required, 
    async (req, res, next) => {
        try {
            const project_id = req.params.id;
            const projects = await projectService.getProjectByProjectID({ project_id });
            res.status(200).send(projects)
        } catch (error){
            next(error)
        }
    }
);

// 전체 프로젝트 얻기
projectRouter.get(
    "/projectlist/:user_id", 
    login_required, 
    async (req, res, next) => {
        try {
            const user_id = req.params.user_id;
            const projects = await projectService.getProjectByUserID({ user_id });
            res.status(200).send(projects)
        } catch (error){
            next(error)
        }
    }
);


// 프로젝트 수정-업데이트
projectRouter.put(
    "/projects/:id",
    login_required,
    async (req, res, next) => {
      try {
        // URI로부터 사용자 id를 추출함.
        const user_id = req.params.user_id;

        // body data 로부터 업데이트할 프로젝트 정보를 추출함.
        const title = req.body.title ?? null;
        const from_date = req.body.from_date ?? null;
        const to_date = req.body.pto_date?? null;
        const description = req.body.description ?? null;
        const git = req.body.git ?? null;

        const toUpdate = { title, from_date, to_date, description, git };
  
        // 해당 사용자 아이디로 프로젝트 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
        const updatedProject = await projectService.setProject({ user_id, toUpdate });
  
        if (updatedProject.errorMessage) {
          throw new Error(updatedProject.errorMessage);
        }
  
        res.status(200).json(updatedProject);
      } catch (error) {
        next(error);
      }
    }
  );

  // 프로젝트 삭제
  projectRouter.delete(
      "/projects/:id",
      login_required,
      async (req, res, next) => {
          try {
            const project_id = req.params.id;
            const deletedProject = await projectService.deleteProject({ project_id });

            if(deletedProject.errorMessage){
                throw new Error(updatedProject.errorMessage);
            }

            res.status(200).json(deletedProject);

          } catch (error) {
            next(error);
          }
      }

  )

export { projectRouter }