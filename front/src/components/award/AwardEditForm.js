import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Api from "../../api";

function AwardEditForm({
  award,
  editingAwardList,
  setEditingAwardList,
  setFinalEditedAward,
}) {
  //useState로 Award의 상태를 설정함.
  const [title, setTitle] = useState(award.title);
  const [description, setDescription] = useState(award.description);
  const [whenDate, setWhenDate] = useState(new Date(award.whenDate));

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Title이나 Description가 공백일 때는 제출할 수 없습니다.
    if (title !== "" && description !== "") {
      const Awd = {
        title: title,
        description: description,
        whenDate: whenDate,
      };
      await Api.put(`awards/${award._id}`, Awd);
      await setFinalEditedAward(`${award._id} 수정됨`);
      await setEditingAwardList(
        editingAwardList.filter((id) => id !== award._id)
      );
      return;
    }
    console.log("공백은 제출할 수 없습니다.");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    //EditingAwardList에서 현재 Award을 제거합니다.
    setEditingAwardList(editingAwardList.filter((id) => id !== award._id));
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
            onChange={(whenDate) => setWhenDate(whenDate)}
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
            <Button variant="secondary" onClick={handleCancel}>
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default AwardEditForm;
