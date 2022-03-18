import { CertificateModel } from "../schemas/Certificate";

class Certificate {
    static create = async ({ newCertificate }) => {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static findByUserId = async ({ user_id }) => {
    const Certificates = await CertificateModel.find({ user_id });
    return Certificates;
  }

  static findById = async ({ _id }) => {
    const Certificate = await CertificateModel.findOne({ _id });
    return Certificate;
  }

  static update = async ({ _id, fieldToUpdate, newValue }) => {
    const filter = { _id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  }
  static remove = async ({ _id }) => {
    const result = await CertificateModel.remove({ _id });
    return result;
  }

}

export { Certificate };
