import { LanguageModel } from "../schemas/language";

class Language {
  static create = async ({ newLanguage }) => {
    const createdNewLanguage = await LanguageModel.create(newLanguage);
    return createdNewLanguage;
  };

  static findByUserId = async ({ user_id }) => {
    const Languages = await LanguageModel.find({ user_id });
    return Languages;
  };

  static findByName = async ({ name }) => {
    const Language = await LanguageModel.findOne({ name });
    return Language;
  };

  static findById = async ({ _id }) => {
    const Language = await LanguageModel.findOne({ _id });
    return Language;
  };

  static update = async ({ _id, fieldToUpdate, newValue }) => {
    const filter = { _id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedLanguage = await LanguageModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedLanguage;
  };
  static remove = async ({ _id }) => {
    const result = await LanguageModel.remove({ _id });
    return result;
  };
}

export { Language };
