/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";
import * as Api from "../../api";

function User({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState({});
  const [languageList, setLanguageList] = useState([]);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId)
      .then((res) => setUser(res.data))
      .catch(() => {
        console.log("유저 데이터 받아오기에 실패했습니다.");
      });
    Api.get("languagelist", portfolioOwnerId)
      .then((res) => setLanguageList(res.data))
      .catch(() => {
        console.log("유저 데이터 받아오기에 실패했습니다.");
      });
  }, [portfolioOwnerId]);
  return (
    <>
      {isEditing ? (
        <UserEditForm
          user={user}
          setIsEditing={setIsEditing}
          setUser={setUser}
        />
      ) : (
        <UserCard
          user={user}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          languageList={languageList}
        />
      )}
    </>
  );
}

export default User;
