import Project from "../db";

class projectService{
    static getProjects = async () =>{
        const projects = await Project.findAll();
        return projects;
    }

    static setProject = async ()=>{
        let project = await Project.findByID({})
    }

}

export default { projectService };