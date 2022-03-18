import mongoose from "mongoose";
import { User } from "./models/User";
import { Project } from "./models/Project";

const DB_URL =
  process.env.MONGODB_URL ||
  "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.";

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("connected", () =>
  console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL)
);
db.on("error", (error) =>
  console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error)
);

db.collection('Azulcoding').insertOne({
  title: "elice resume webpage",
  description: "엘리스 AI 트랙 첫 번째 프로젝트",
  from_date: new Date("2022-03-15"),
  to_date: new Date("2022-03-26"),
  git: "https://kdt-gitlab.elice.io/",
})

export { User, Project };
