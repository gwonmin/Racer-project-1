import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationAddForm({ setIsAddingEducation, setFinalEditedEducation }) {
  //useState로 education의 상태를 설정함.
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("재학중");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //school이나 major가 공백일 때는 제출할 수 없습니다.
    if (school !== "" && major !== "") {
      setIsAddingEducation(false);
      const edu = {
        school: school,
        major: major,
        position: position,
      };
      const res = await Api.post(`education/create`, edu);
      const education = res.data;
      setFinalEditedEducation(`${education._id} 추가됨`);
      return;
    }
    console.log("공백은 제출할 수 없습니다.");
  };

  return (
    <div className="mb-2">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="educationEditSchool" className="mb-3">
          <Form.Control
            type="text"
            placeholder="학교 이름"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="educationEditMajor" className="mb-3">
          <Form.Control
            type="text"
            placeholder="전공"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="educationEditPosition" className="mb-3">
          <div className="mb-3">
            {["재학중", "학사졸업", "석사졸업", "박사졸업"].map((element) => (
              <Form.Check
                inline
                label={element}
                name="group1"
                type="radio"
                id={`inline-raido-${element}`}
                key={element}
                checked={position === element}
                onChange={() => {
                  setPosition(element);
                }}
              />
            ))}
          </div>
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
              onClick={() => setIsAddingEducation(false)}
            >
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default EducationAddForm;
