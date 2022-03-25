import { Language } from '../db'
class languageService {
    static addLanguage = async ({ user_id, name, level }) => {
        const newLanguage = { user_id, name, level };
        
        const createdNewLanguage = await Language.create({ newLanguage });
        createdNewLanguage.errorMessage = null;

        return createdNewLanguage;
    };

    static getLanguages = async ({ user_id }) => {
        const Languages = await Language.findByUserId({ user_id });
        return Languages;
    }

    static getLanguage = async ({ _id }) => {
        const language = await Language.findById({ _id });
        
        // db에 없는 경우, 에러 메시지 반환
        if (!language) {
            const errorMessage = "_id에 해당하는 데이터가 없습니다."
            return errorMessage;
        }

        const name = language.name;
        const level = language.level;

        const clickedLanguage = {
            name,
            level,
        }
        return clickedLanguage
    };

    static setLanguage = async ({ _id, toUpdate }) => {
        //우선 해당 id의 학력이 db에 존재하는지 확인
        let language = await Language.findById({ _id });

        // db에 없는 경우, 에러 메시지 반환
        if (!language) {
            const errorMessage = "_id에 해당하는 데이터가 없습니다."
            return errorMessage;
        }

        if (toUpdate.name) {
            const fieldToUpdate = "name";
            const newValue = toUpdate.name;
            language = await Language.update({_id, fieldToUpdate, newValue})
        }
        if (toUpdate.level) {
        const fieldToUpdate = "level";
            const newValue = toUpdate.level;
            language = await Language.update({_id, fieldToUpdate, newValue})
        }

        return language;
    };

    static removeLanguage = async ({ _id }) => {
        const result = await Language.remove({ _id });
        return result;
    }
};

export { languageService };
