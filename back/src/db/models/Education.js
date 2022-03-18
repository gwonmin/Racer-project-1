import { EducationModel } from "../schemas/education";

class Education {
    static create = async ({ newEducation }) => {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static findByUserId = async ({ user_id }) => {
    const Educations = await EducationModel.find({ user_id });
    return Educations;
  }

  static findById = async ({ _id }) => {
    const Education = await EducationModel.findOne({ _id });
    return Education;
  }

  static update = async ({ _id, fieldToUpdate, newValue }) => {
    const filter = { _id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }
  static remove = async ({ _id }) => {
    const result = await EducationModel.remove({ _id });
    return result;
  }

}

export { Education };
