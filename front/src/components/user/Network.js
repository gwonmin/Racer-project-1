import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Form, Col, Stack, Button } from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist").then((res) => setUsers(res.data));
  }, [userState, navigate]);

  return (
    <Container fluid>
      <Stack direction="horizontal" gap={3} className="ms-5 me-5 mb-2">
        <Form.Control placeholder="원하는 언어를 입력해 주세요" />
        <Button variant="secondary">Submit</Button>
        <div className="vr" />
        <Button variant="outline-danger">Reset</Button>
      </Stack>
      <Stack
        direction="horizontal"
        gap={filterList.length}
        className="ms-5 me-5"
      >
        filterList.map
      </Stack>
      <Row xs="auto" className="jusify-content-center">
        {users.map((user) => (
          <UserCard key={user.id} user={user} id={user.id} isNetwork />
        ))}
      </Row>
    </Container>
  );
}

export default Network;
