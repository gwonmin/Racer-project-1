import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Card, Row, Button, Col, Badge, Container } from "react-bootstrap";
import * as Api from "../../api";

function UserCard({
  user,
  setIsEditing,
  isEditable,
  isNetwork,
  filterName,
  isFiltering,
}) {
  const navigate = useNavigate();
  const [languageList, setLanguageList] = useState([]);
  const [isInFilter, setIsInFilter] = useState(true);

  useEffect(() => {
    if (!user) return;
    Api.get("languagelist", user.id)
      .then((res) => setLanguageList(res.data))
      .catch(() => {
        console.log("기술 데이터 받아오기에 실패했습니다.");
      });
  }, [user.id, user]);

  useEffect(() => {
    let count = 0;
    if (!languageList) return;
    languageList.forEach((element) => {
      if (element.name !== filterName) {
        count++;
      }
    });
    count === languageList.length ? setIsInFilter(true) : setIsInFilter(false);
  }, [languageList, filterName]);

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

  if (isNetwork && isFiltering && isInFilter) {
    return <div></div>;
  } else {
    return (
      <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
        <Card.Body className="text-center">
          <Row className="mt-3 text-center text-info">
            <Col>
              <Card.Img
                style={{ width: "8rem", height: "8rem" }}
                className="mb-3"
                src={
                  user.poke === ""
                    ? "http://placekitten.com/200/200"
                    : "http://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                      user.poke +
                      ".png"
                }
                alt="프로필 사진"
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
        </Card.Body>
        <Card.Footer>
          <Col className="justify-content-bottom">
            {isEditable && (
              <Col>
                <Row className="text-center text-info">
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
              <Col className="text-center text-info align-text-bottom">
                <Button onClick={() => navigate(`/users/${user.id}`)}>
                  포트폴리오
                </Button>
              </Col>
            )}
          </Col>
        </Card.Footer>
      </Card>
    );
  }
}
export default UserCard;
