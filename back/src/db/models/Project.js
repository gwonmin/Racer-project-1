import ProjectModel from "../schemas/project"

class Project{
    static create = async ({ newProject }) =>{
        const createdNewProject  =  await ProjectModel.create(newProject);
        return createdNewProject;
    }

    static findAll = async () =>{
        const projects = await ProjectModel.find({});
        return projects;
    }

    static update = async ({ project_id, }) => {
        const filter = { id: project_id };
        const update = { }
        const updatedProject = await ProjectModel.findOneAndUpdate(
            filter,

        )
    }
}

export default { Project };