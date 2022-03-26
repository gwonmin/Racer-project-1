import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Card, Row, Button, Col, Badge } from "react-bootstrap";
import * as Api from "../../api";

function UserCard({ user, setIsEditing, isEditable, isNetwork, id }) {
  const navigate = useNavigate();
  const [languageList, setLanguageList] = useState([]);

  useEffect(() => {
    if (!user) return;
    Api.get("languagelist", user.id)
      .then((res) => setLanguageList(res.data))
      .catch(() => {
        console.log("기술 데이터 받아오기에 실패했습니다.");
      });
  }, [user.id, user]);
  const LanguageBadge = (props) => {
    switch (props.name) {
      case "Python":
        return (
          <Badge className="m-1" bg="success">
            <img width="auto" height="20" alt="뱃지" src="/Icons/python.png" />
            파이썬
          </Badge>
        );
      case "C":
        return (
          <Badge className="m-1" bg="primary">
            <img width="auto" height="20" alt="뱃지" src="/Icons/C_lang.png" />C
            언어
          </Badge>
        );
      case "Java":
        return (
          <Badge className="m-1" bg="light" text="dark">
            <img width="auto" height="20" alt="뱃지" src="/Icons/java.png" />
            자바
          </Badge>
        );
      case "C++":
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
        return (
          <Badge className="m-1" bg="dark">
            <img width="auto" height="20" alt="뱃지" src="/Icons/C_sharp.png" />
            C#
          </Badge>
        );
      case "Visual Basic":
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
        return (
          <Badge className="m-1" bg="secondary">
            <img width="20" height="auto" alt="뱃지" src="/Icons/guitar.png" />
            기타
          </Badge>
        );
    }
  };

  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body className="text-center">
        <Row className="mt-3 text-center text-info">
          <Col>
            <Card.Img
              style={{ width: "8rem", height: "8rem" }}
              className="mb-3"
              src="http://placekitten.com/200/200"
              alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
            />
          </Col>
        </Row>
        <hr></hr>
        <Col>
          <Card.Title>{user?.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {user?.email}
          </Card.Subtitle>
          <Card.Text>{user?.description}</Card.Text>
          <Row xs="auto" className="justify-content-center"></Row>
          <hr></hr>
          {languageList.map((lgg) => (
            <LanguageBadge key={lgg?.id} name={lgg?.name} />
          ))}
          <hr></hr>
        </Col>
        <Col height="100%" className="justify-content-bottom">
          {isEditable && (
            <Col>
              <Row className="mt-3 text-center text-info">
                <Col sm={{ span: 20 }}>
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    편집
                  </Button>
                </Col>
              </Row>
            </Col>
          )}

          {isNetwork && (
            <Col className="mt-3 text-center text-info align-text-bottom">
              <Card.Link
                className="mt-3"
                href="#"
                onClick={() => navigate(`/users/${user.id}`)}
              >
                포트폴리오
              </Card.Link>
            </Col>
          )}
        </Col>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
