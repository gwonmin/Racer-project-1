import { Award } from "../db";

class awardService {
    static addAward = async ({ title, description, whenDate }) => {
        const newAward = { title, description, whenDate };
        
        const createdNewAward = await Award.create({ newAward });
        createdNewAward.errorMessage = null;

        return createdNewAward;
    };

    static getAward = async ({ id }) => {
        const award = await Award.findById({ id });

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

    static setAwards = async ({ id, toUpdate }) => {
        let award = await Award.findById({ id });

        if (!award) {
            const errorMessage =
                "수상 내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        };

        if (toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            award = await Award.update({ id, fieldToUpdate, newValue });
        };

        if (toUpdate.description) {
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            award = await Award.update({ id, fieldToUpdate, newValue });
        };

        if (toUpdate.whenDate) {
            const fieldToUpdate = "whenDate";
            const newValue = toUpdate.whenDate;
            award = await Award.update({ award_id, fieldToUpdate, newValue });
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
};

export { awardService };