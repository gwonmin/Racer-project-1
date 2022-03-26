import { Award } from "../db";

class awardService {
    static addAward = async ({ user_id, title, description, whenDate }) => {
        const newAward = { user_id, title, description, whenDate };
        
        const createdNewAward = await Award.create({ newAward });
        createdNewAward.errorMessage = null;

        return createdNewAward;
    };

    static getAward = async ({ _id }) => {
        const award = await Award.findById({ _id });

        const title = award.title;
        const description = award.description;
        const whenDate = award.whenDate;

        const clickedAward = {
            title,
            description,
            whenDate,
            errorMessage: null,
        };

        return clickedAward;
    };

    static setAwards = async ({ _id, toUpdate }) => {
        let award = await Award.findById({ _id });

        if (!award) {
            const errorMessage =
                "수상 내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        };

        if (toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            award = await Award.update({ _id, fieldToUpdate, newValue });
        };

        if (toUpdate.description) {
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            award = await Award.update({ _id, fieldToUpdate, newValue });
        };

        if (toUpdate.whenDate) {
            const fieldToUpdate = "whenDate";
            const newValue = toUpdate.whenDate;
            award = await Award.update({ _id, fieldToUpdate, newValue });
        };

        return award;
    };

    static getAwardInfo = async ({ user_id }) => {
        const award = await Award.findByUserId({ user_id });

        if (!award) {
            const errorMessage =
                "수상 내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        };

        return award;
    };

    static deleteAward = async ({ _id }) => {
        const award = await Award.delete({ _id });
        return award;
    }
};

export { awardService };