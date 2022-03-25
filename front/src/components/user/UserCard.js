import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Card, Row, Button, Col, Badge } from "react-bootstrap";
import * as Api from "../../api";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  const [languageList, setLanguageList] = useState([]);
  const [badge, setBadge] = useState({});

  useEffect(() => {
    //"languagelist/:user_id" 엔드포인트로 GET 요청을 하고, response의 data로 세팅해야 하는 부분입니다.
    Api.get("languagelist", user.id)
      .then((res) => setLanguageList(res.data))
      .catch(() => {
        console.log("list 데이터 받아오기에 실패했습니다.");
      });
  }, [user]);

  // [
  //   "C",
  //   "Java",
  //   "C++",
  //   "C#",
  //   "Visual Basic",
  //   "Javascript",
  //   "Assembly",
  //   "SQL",
  //   "Swift",
  //   "기타",
  // ];
  const LanguageBadge = (language) => {
    switch (language.name) {
      case "Python":
        setBadge({
          src: "/Icons/python_18894.png",
          name: "파이썬",
          bg: "warning",
          text: "dark",
        });
        break;
      case "C":
        setBadge({
          src: "/Icons/pngegg.png",
          name: "C 언어",
          bg: "warning",
          text: "dark",
        });
        break;

      default:
    }
    return (
      <Badge bg="success" text="dark" margin="10">
        <img
          width="20"
          height="auto"
          alt={"파이썬뱃지"}
          src="/Icons/python_18894.png"
        />
        파이썬
      </Badge>
    );
  };

  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            className="mb-3"
            src="http://placekitten.com/200/200"
            alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
          />
          <hr></hr>
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>
        <Row xs="auto" className="jusify-content-center">
          {languageList.map((language) => (
            <div>
              <LanguageBadge />
            </div>
          ))}
        </Row>
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
          <Card.Link
            className="mt-3"
            href="#"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            포트폴리오
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
