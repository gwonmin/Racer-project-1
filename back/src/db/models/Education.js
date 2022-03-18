import { EducationModel } from "../schemas/education";

class Education {
    static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findByUserId({ user_id }) {
    const Educations = await EducationModel.find({ user_id });
    return Educations;
  }

  static async findById({ _id }) {
    const Education = await EducationModel.findOne({ _id });
    return Education;
  }

  static async update({ _id, fieldToUpdate, newValue }) {
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
  static async remove({ _id }) {
    const result = await EducationModel.remove({ _id });
    return result;
  }

}

export { Education };
