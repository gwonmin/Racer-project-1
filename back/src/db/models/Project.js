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

    static update = async ({ project_id, fieldToUpdate, newValue }) => {
        const filter = { id: project_id };
        const update = { [fieldToUpdate]: newValue }
        const option = { returnOriginal: false }
        
        const updatedProject = await ProjectModel.findOneAndUpdate(
            filter,
            update,
            option,
        );
    }
}

export default { Project };