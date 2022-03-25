import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CertificateAddForm({
  setIsAddingCertificate,
  setFinalEditedCertificate,
}) {
  //useState로 Certificate의 상태를 설정함.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [whenDate, setWhenDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Title이나 Description가 공백일 때는 제출할 수 없습니다.
    if (title !== "" && description !== "") {
      const Ctf = {
        title: title,
        description: description,
        when_date: `${whenDate.getFullYear()}-${
          whenDate.getMonth() + 1
        }-${whenDate.getDate()}`,
      };
      const res = await Api.post(`certificate/create`, Ctf);
      const certificate = res.data;
      setFinalEditedCertificate(`${certificate._id} 추가됨`);
      setIsAddingCertificate(false);
      return;
    }
    console.log("공백은 제출할 수 없습니다.");
  };

  return (
    <div className="mb-2">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="CertificateEditTitle" className="mb-3">
          <Form.Control
            type="text"
            placeholder="자격증 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="CertificateEditDescription" className="mb-3">
          <Form.Control
            type="text"
            placeholder="상세내역"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="CertificateEditToDate" className="mb-3">
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
            <Button
              variant="secondary"
              onClick={() => setIsAddingCertificate(false)}
            >
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default CertificateAddForm;
