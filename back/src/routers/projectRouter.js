import { Router } from "express";
import { is } from "express/lib/request";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";

const projectRouter = Router();

// 새로운 프로젝트 만들기
projectRouter.post("/create", async (req, res, next)=>{
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
projectRouter.get("/", login_required, async (req, res, next)=>{
        try {
            const projects = await projectService.getProjects();
            res.status(200).send(projects)
        } catch (err){
            next(err)
        }
    }
);

projectRouter.get("/:id", async (req, res, next)=>{

    }
)

export default { projectRouter }