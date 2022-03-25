import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function LanguageEditForm({
  editingLanguageList,
  setEditingLanguageList,
  setFinalEditedLanguage,
  language,
}) {
  //useState로 language의 상태를 설정함.
  const [school, setSchool] = useState(language.school);
  const [major, setMajor] = useState(language.major);
  const [position, setPosition] = useState(language.position);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //school이나 major가 공백일 때는 제출할 수 없습니다.
    if (school !== "" && major !== "") {
      const edu = {
        school: school,
        major: major,
        position: position,
      };
      await Api.put(`languages/${language._id}`, edu);
      setFinalEditedLanguage(`${language._id} 수정됨`);
      setEditingLanguageList(
        editingLanguageList.filter((id) => id !== language._id)
      );
      return;
    }
    console.log("공백은 제출할 수 없습니다.");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditingLanguageList(
      editingLanguageList.filter((id) => id !== language._id)
    );
  };

  return (
    <div className="mb-2">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="languageEditSchool" className="mb-3">
          <Form.Control
            type="text"
            placeholder="학교 이름"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="languageEditMajor" className="mb-3">
          <Form.Control
            type="text"
            placeholder="전공"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="languageEditPosition" className="mb-3">
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

export default LanguageEditForm;
