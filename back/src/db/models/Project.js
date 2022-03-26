import { ProjectModel } from "../schemas/project";

class Project {
  static create = async ({ newProject }) => {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  };

  static findByUserId = async ({ user_id }) => {
    const project = await ProjectModel.find({ user_id });
    return project;
  };

  static findByProjectId = async ({ _id }) => {
    const project = await ProjectModel.findOne({ _id });
    return project;
  };

  static findAll = async () => {
    const projects = await ProjectModel.find({});
    return projects;
  };

  static update = async ({ _id, fieldToUpdate, newValue }) => {
    const filter = { _id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  };

  static delete = async ({ _id }) => {
    const deletedProject = await ProjectModel.deleteOne({ _id });
    return deletedProject;
  };

  static remove = async ({ _id }) => {
    const result = await ProjectModel.remove({ _id });
    return result;
  };
}

export { Project };
