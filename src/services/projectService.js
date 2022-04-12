import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";

class projectService {
  // 프로젝트 추가하기
  static addProject = async ({
    user_id,
    title,
    from_date,
    to_date,
    description,
    git,
  }) => {
    const id = uuidv4();
    const newProject = { user_id, title, from_date, to_date, description, git };

    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null;

    return createdNewProject;
  };

  // 프로젝트 가져오기
  static getProjectByProjectID = async ({ _id }) => {
    const projects = await Project.findByProjectId({ _id });
    return projects;
  };

  static getProjectByUserID = async ({ user_id }) => {
    const projects = await Project.findByUserId({ user_id });
    return projects;
  };

  // static getProjectList = async() => {
  //     const projects = await Project.findAll();
  //     return projects;
  // }

  // 프로젝트 수정하기
  static setProject = async ({ _id, toUpdate }) => {
    let project = await Project.findByProjectId({ _id });

    if (!project) {
      const errorMessage = "프로젝트를 찾을 수 없습니다.";
      return { errorMessage };
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }

    if (toUpdate.from_date) {
      const fieldToUpdate = "from_date";
      const newValue = toUpdate.from_date;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }

    if (toUpdate.to_date) {
      const fieldToUpdate = "to_date";
      const newValue = toUpdate.to_date;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }

    if (toUpdate.git) {
      const fieldToUpdate = "git";
      const newValue = toUpdate.git;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }

    return project;
  };

  // 프로젝트 삭제하기
  static deleteProject = async ({ _id }) => {
    const project = await Project.remove({ _id });
    return project;
  };
}

export { projectService };
