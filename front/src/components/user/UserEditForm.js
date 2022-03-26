import React, { useState, useContext } from "react";
import { Button, Form, Card, Col, Row, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import { DispatchContext } from "../../App";

function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);
  const dispatch = useContext(DispatchContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  const handleDelete = () => {
    Api.delete("users", user.id);
    sessionStorage.removeItem("userToken");
    dispatch({ type: "LOGOUT" });
    navigate("/login", { replace: true });
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 mb-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button
                variant="primary"
                type="submit"
                className="me-3"
                onClick={handleSubmit}
              >
                확인
              </Button>
              <Button
                variant="secondary"
                className="me-3"
                onClick={() => setIsEditing(false)}
              >
                취소
              </Button>
              <Button variant="danger" onClick={() => setShow(!show)}>
                회원탈퇴
              </Button>
            </Col>
            <>
              <Alert show={show} variant="danger" className="mt-3">
                <Alert.Heading>경고</Alert.Heading>
                <p>확인 버튼을 누르시면 회원님의 정보가 영구히 삭제됩니다.</p>
                <hr />
                <div className="d-flex justify-content-center">
                  <Button
                    size="sm"
                    onClick={() => setShow(false)}
                    variant="outline-danger"
                  >
                    확인
                  </Button>
                </div>
              </Alert>
            </>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
