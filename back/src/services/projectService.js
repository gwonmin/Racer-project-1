import Project from "../db";
import { v4 as uuidv4 } from "uuid";

class projectService{
    static addProject = async ({ title, from_date, to_date })=>{
        const id = uuidv4();
        const newProject = { id, title, from_date, to_date };

        const createdNewProject = await Project.create({ newProject });
        createdNewProject.errorMessage = Null;

        return createdNewProject;

    }

    static getProjects = async () =>{
        const projects = await Project.findAll();
        return projects;
    }

    static setProject = async ({ id, })=>{
        let project = await Project.findByID({});

    }

}

export default { projectService };