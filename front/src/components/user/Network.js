import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Form, Stack, Badge, Card } from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);
  const [filterName, setFilterName] = useState("사용 언어");
  const [tempName, setTempName] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist").then((res) => setUsers(res.data));
  }, [userState, navigate]);

  const FilterBadge = (props) => {
    switch (props.filter) {
      case "사용 언어":
        setIsFiltering(false);
        return <div />;
      case "Python":
        setIsFiltering(true);
        return (
          <Badge className="m-1" bg="success">
            <img width="auto" height="20" alt="뱃지" src="/Icons/python.png" />
            파이썬
          </Badge>
        );
      case "C":
        setIsFiltering(true);
        return (
          <Badge className="m-1" bg="primary">
            <img width="auto" height="20" alt="뱃지" src="/Icons/C_lang.png" />C
            언어
          </Badge>
        );
      case "Java":
        setIsFiltering(true);
        return (
          <Badge className="m-1" bg="light" text="dark">
            <img width="auto" height="20" alt="뱃지" src="/Icons/java.png" />
            자바
          </Badge>
        );
      case "C++":
        setIsFiltering(true);
        return (
          <Badge className="m-1" bg="info">
            <img
              width="auto"
              height="20"
              alt="뱃지"
              src="/Icons/C_plusplus.png"
            />
            C++
          </Badge>
        );
      case "C#":
        setIsFiltering(true);
        return (
          <Badge className="m-1" bg="dark">
            <img width="auto" height="20" alt="뱃지" src="/Icons/C_sharp.png" />
            C#
          </Badge>
        );
      case "Visual Basic":
        setIsFiltering(true);
        return (
          <Badge className="m-1" bg="light" text="dark">
            <img
              width="auto"
              height="20"
              alt="뱃지"
              src="/Icons/visual_basic.png"
            />
            Visual Basic
          </Badge>
        );
      case "Javascript":
        setIsFiltering(true);
        return (
          <Badge className="m-1" bg="warning" text="dark">
            <img
              width="auto"
              height="20"
              alt="뱃지"
              src="/Icons/javascript.png"
            />
            Javascript
          </Badge>
        );
      default:
        setIsFiltering(true);
        return (
          <Badge className="m-1" bg="secondary">
            <img width="20" height="auto" alt="뱃지" src="/Icons/guitar.png" />
            기타
          </Badge>
        );
    }
  };

  return (
    <Container>
      <Row xs="auto" className="jusify-content-center">
        <Card className="mb-2 ms-3 mr-5 pb-3" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title width="auto">언어로 사용자 검색하기</Card.Title>
            <hr></hr>
            <Card.Text>
              원하는 언어의 사용자들만을 선택해서 볼 수 있습니다.
            </Card.Text>
          </Card.Body>
          <Stack gap={2} className="ms-5 me-5 mt-3">
            <Form.Group controlId="languageEditName">
              <Form.Control
                as="select"
                name="state"
                defaultValue={filterName}
                onChange={(e) => {
                  setFilterName(e.target.value);
                }}
              >
                {[
                  "사용 언어",
                  "Python",
                  "C",
                  "Java",
                  "C++",
                  "C#",
                  "Visual Basic",
                  "Javascript",
                  "Assembly",
                  "SQL",
                  "Swift",
                  "기타",
                ].map((element) => (
                  <option
                    value={element}
                    key={element}
                    id={`language-select-${element}`}
                  >
                    {element}
                  </option>
                ))}
              </Form.Control>
              {filterName === "기타" && (
                <div className="mt-1">
                  <Form.Control
                    type="text"
                    placeholder="기타 언어"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                  />
                </div>
              )}
            </Form.Group>
            <FilterBadge filter={filterName} classNmae="mb-3" />
          </Stack>
        </Card>
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            id={user.id}
            isNetwork
            filterName={filterName === "기타" ? tempName : filterName}
            isFiltering={isFiltering}
          />
        ))}
      </Row>
    </Container>
  );
}

export default Network;
