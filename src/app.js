import cors from "cors";
import express from "express";
import { userAuthRouter } from "./routers/userRouter";
import { certificateRouter } from "./routers/certificateRouter";
import { educationRouter } from "./routers/educationRouter";
import { awardRouter } from "./routers/awardRouter";
import { projectRouter } from "./routers/projectRouter";
import { languageRouter } from "./routers/languageRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

// CORS 에러 방지
app.use(cors());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use(userAuthRouter);
app.use(certificateRouter);
app.use(educationRouter);
app.use(awardRouter);
app.use(projectRouter);
app.use(languageRouter);

// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

import path from "path"
app.use(express.static(path.join(__dirname, "../front", "build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../front", "build", "index.html"));
});

export { app };
