import ProjectModel from "../schemas/project"

class Project{
    static findAll = async() =>{
        const projects = await ProjectModel.find({});
        return projects;
    }
}

export default { Project };