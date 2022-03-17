import { Router } from "express";
import { is } from "express/lib/request";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";

const projectRouter = Router();

projectRouter.post("/create", async (req, res, next)=>{
    try{
        if(is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type를 application/json으로 설정해주세요"
            );
        }

        console.log(req.body);

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