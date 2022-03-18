import { ProjectModel } from "../schemas/project"

class Project{
    static create = async ({ newProject }) =>{
        const createdNewProject  =  await ProjectModel.create(newProject);
        return createdNewProject;
    }

    static findByUserId = async ({ user_id }) =>{  
        const project = await ProjectModel.find({ user_id });
        return project;
    }

    static findById = async ({ project_id }) => {
        const project = await ProjectModel.findOne({ id: project_id})
        return project;
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
        return updatedProject;
    }

    static delete = async ({ project_id }) => {
        const deletedProject = await ProjectModel.deleteOne({ id: project_id });
        return deletedProject;
    }
}

export { Project };