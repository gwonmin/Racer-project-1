import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

import { UserStateContext } from "../App";
import * as Api from "../api";
import User from "./user/User";
import Education from "./education/Education";
import Award from "./award/Award";
import Project from "./project/Project";
import Certificate from "./certificate/Certificate";

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();
  // useState 훅을 통해 portfolioOwner 상태를 생성함.
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  // fetchPorfolioOwner 함수가 완료된 이후에만 (isFetchCompleted가 true여야) 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면, isFetchCompleted가 false이면 "loading..."만 반환되어서, 화면에 이 로딩 문구만 뜨게 됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);
  const isEditable = portfolioOwner?.id === userState.user?.id;

  const fetchPorfolioOwner = async (ownerId) => {
    // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
    try {
      const res = await Api.get("users", ownerId);
      // 사용자 정보는 response의 data임.
      const ownerData = res.data;
      // portfolioOwner을 해당 사용자 정보로 세팅함.
      setPortfolioOwner(ownerData);
      // fetchPorfolioOwner 과정이 끝났으므로, isFetchCompleted를 true로 바꿈.
      setIsFetchCompleted(true);
    } catch (err) {
      //백엔드와 연결 전에 로딩을 위해 임시 유닛을 개설합니다.
      console.log("포트폴리오 불러오기에 실패하였습니다.\n", err);
      const ownerData = "임시유저의 데이터입니다.";
      setPortfolioOwner(ownerData);
      setIsFetchCompleted(true);
    }
  };

  useEffect(() => {
    // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }

    if (params.userId) {
      // 만약 현재 URL이 "/users/:userId" 라면, 이 userId를 유저 id로 설정함.
      const ownerId = params.userId;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    } else {
      // 이외의 경우, 즉 URL이 "/" 라면, 전역 상태의 user.id를 유저 id로 설정함.
      const ownerId = userState.user.id;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    }
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <Container fluid>
      <Row>
        <Col md="3" lg="3">
          <User portfolioOwnerId={portfolioOwner.id} isEditable={isEditable} />
        </Col>
        <Col>
          <Education
            portfolioOwnerId={portfolioOwner.id}
            isEditable={isEditable}
          />
          <Award portfolioOwnerId={portfolioOwner.id} isEditable={isEditable} />
          <Project
            portfolioOwnerId={portfolioOwner.id}
            isEditable={isEditable}
          />
          <Certificate
            portfolioOwnerId={portfolioOwner.id}
            isEditable={isEditable}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Portfolio;
