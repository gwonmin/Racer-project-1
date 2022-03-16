import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";

const projectRouter = Router();

projectRouter.get(
    "/projects", 
    login_required,
    async (req, res, next)=>{
        try {
            // 전체 프로젝트 목록을 얻음
            const projects = await projectService.getProjects();
            res.status(200).send(projects)
        } catch (err){
            next(err)
        }
    }
);

export default { projectRouter }