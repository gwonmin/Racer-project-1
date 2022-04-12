import { Education } from '../db'
class educationService {
    static addEducation = async ({ user_id, school, major, position }) => {
        const newEducation = { user_id, school, major, position };
        
        const createdNewEducation = await Education.create({ newEducation });
        createdNewEducation.errorMessage = null;

        return createdNewEducation;
    };

    static getEducations = async ({ user_id }) => {
        const educations = await Education.findByUserId({ user_id });
        return educations;
    }

    static getEducation = async ({ _id }) => {
        const education = await Education.findById({ _id });
        
        // db에 없는 경우, 에러 메시지 반환
        if (!education) {
            const errorMessage = "_id에 해당하는 데이터가 없습니다."
            return errorMessage;
        }

        const school = education.school;
        const major = education.major;
        const position = education.position;

        const clickedEducation = {
            school,
            major,
            position
        }
        return clickedEducation
    };

    static setEducation = async ({ _id, toUpdate }) => {
        //우선 해당 id의 학력이 db에 존재하는지 확인
        let education = await Education.findById({ _id });

        // db에 없는 경우, 에러 메시지 반환
        if (!education) {
            return education.errorMessage;
        }

        if (toUpdate.school) {
            const fieldToUpdate = "school";
            const newValue = toUpdate.school;
            education = await Education.update({_id, fieldToUpdate, newValue})
        }
        if (toUpdate.major) {
        const fieldToUpdate = "major";
            const newValue = toUpdate.major;
            education = await Education.update({_id, fieldToUpdate, newValue})
        }
        if (toUpdate.position) {
            const fieldToUpdate = "position";
            const newValue = toUpdate.position;
            education = await Education.update({_id, fieldToUpdate, newValue})
        }

        return education;
    };

    static removeEducation = async ({ _id }) => {
        const result = await Education.remove({ _id });
        return result;
    }
};

export { educationService };