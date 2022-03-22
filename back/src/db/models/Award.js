import { AwardModel } from "../schemas/award";

class Award {
    static async create({ newAward }) {
        const createdNewAward = await AwardModel.create(newAward);
        return createdNewAward;
    };

    static async findById({ _id }) {
        const award = await AwardModel.findOne({ _id });
        return award;
    };

    static async findByUserId({ user_id }) {
        const award = await AwardModel.find({ user_id });
        return award;
    };

    static async findAll() {
        const awards = await AwardModel.find({});
        return awards;
    };

    static async update({ _id, fieldToUpdate, newValue }) {
        const filter = { _id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedAward = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedAward;
    };

    static async delete({ _id }) {
        const deletedAward = await AwardModel.deleteOne({ _id });
        return deletedAward;
    }
};

export { Award };