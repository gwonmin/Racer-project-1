import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Api from "../../api";

function AwardAddForm({ setIsAddingAward, setFinalEditedAward }) {
  //useState로 Award의 상태를 설정함.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [whenDate, setWhenDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Title이나 Description가 공백일 때는 제출할 수 없습니다.
    if (title !== "" && description !== "") {
      const Awd = {
        title: title,
        description: description,
        whenDate: whenDate,
      };
      const res = await Api.post(`award/create`, Awd);
      const award = res.data;
      setFinalEditedAward(`${award._id} 추가됨`);
      setIsAddingAward(false);
      return;
    }
    console.log("공백은 제출할 수 없습니다.");
  };

  return (
    <div className="mb-2">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="AwardEditTitle" className="mb-3">
          <Form.Control
            type="text"
            placeholder="수상내역"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="AwardEditDescription" className="mb-3">
          <Form.Control
            type="text"
            placeholder="상세내역"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="ProjectEditToDate" className="mb-3">
          <DatePicker
            selected={whenDate}
            onChange={(date) => setWhenDate(date)}
          />
        </Form.Group>
        <Form.Group as={Row} className="mt-3 text-center">
          <Col sm={{ span: 20 }}>
            <Button
              variant="primary"
              type="submit"
              className="me-3"
              onClick={handleSubmit}
            >
              확인
            </Button>
            <Button variant="secondary" onClick={() => setIsAddingAward(false)}>
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default AwardAddForm;
