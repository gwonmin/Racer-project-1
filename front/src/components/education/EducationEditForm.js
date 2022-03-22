import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationEditForm({
  editingEducationList,
  setEditingEducationList,
  setFinalEditedEducation,
  educationId,
}) {
  //useState로 education의 상태를 설정함.
  const [education, setEducation] = useState({});
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("재학중");

  useEffect(() => {
    //"educationlist/:user_id" 엔드포인트로 GET 요청을 하고, response의 data로 세팅해야 하는 부분입니다.
    Api.get("educations", educationId)
      .then((res) => setEducation(res.data))
      .catch(() => {
        console.log("Education 데이터 받아오기에 실패했습니다.");
      });
    setSchool(education.school);
    setMajor(education.major);
    setPosition(education.position);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //school이나 major가 공백일 때는 제출할 수 없습니다.
    if (school !== "" && major !== "") {
      const edu = {
        school: school,
        major: major,
        position: position,
      };
      const res = await Api.put(`educations/:${educationId}`, edu);
      setFinalEditedEducation(`${educationId} 수정됨`);
      setEditingEducationList(
        editingEducationList.filter((id) => id !== educationId)
      );
    }
    console.log("공백은 제출할 수 없습니다.");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditingEducationList(
      editingEducationList.filter((id) => id !== educationId)
    );
    console.log(`${educationId}가 editingEducationList에서 제거되었습니다.`);
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
            <Button variant="secondary" onClick={handleCancel}>
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default EducationEditForm;
