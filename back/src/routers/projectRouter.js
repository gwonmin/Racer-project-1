import { Router } from "express";
import { is } from "express/lib/request";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";

const projectRouter = Router();

// 새로운 프로젝트 만들기
projectRouter.post(
    "/project/create", 
    async (req, res, next) => {
    try{
        if(is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type를 application/json으로 설정해주세요"
            );
        }

        console.log(req.body);
        const title = req.body.title;
        const from_date = req.body.from_date;
        const to_date = req.body.to_date;

        const newProject = await projectService.addProject({
            title,
            from_date,
            to_date,
        })

        if(newProject.errorMessage){
            throw new Error(newProject.errorMessage);
        }

        res.status(201).json(newProject);

    } catch (error) {
        next(error);
    }
});

// 전체 프로젝트 목록을 얻음
projectRouter.get(
    "/projects", 
    login_required, 
    async (req, res, next) => {
        try {
            const projects = await projectService.getProjects();
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

export default { projectRouter }