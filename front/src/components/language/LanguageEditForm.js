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
  const [name, setName] = useState(language.name);
  const [level, setLevel] = useState(language.level);
  const [tempName, setTempName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //name이나 level가 공백일 때는 제출할 수 없습니다.
    if (level === "" || (name === "기타" && tempName === "")) {
      console.log("공백은 제출할 수 없습니다.");
      return;
    }
    async function LGGPut(Lgg) {
      await Api.put(`languages/${language._id}`, Lgg);
      setFinalEditedLanguage(`${language._id} 추가됨`);
      setEditingLanguageList(
        editingLanguageList.filter((id) => id !== language._id)
      );
    }
    if (name === "기타") {
      const Lgg = {
        name: tempName,
        level: level,
      };
      LGGPut(Lgg);
    } else {
      const Lgg = {
        name: name,
        level: level,
      };
      LGGPut(Lgg);
    }
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
        <Form.Group controlId="languageEditName" className="mb-3">
          <Form.Control
            as="select"
            name="state"
            defaultValue={language.name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          >
            {[
              "사용 언어",
              "Python",
              "C",
              "Java",
              "C++",
              "C#",
              "Visual Basic",
              "Javascript",
              "Assembly",
              "SQL",
              "Swift",
              "기타",
            ].map((element) => (
              <option
                value={element}
                key={element}
                id={`language-select-${element}`}
              >
                {element}
              </option>
            ))}
          </Form.Control>
          {name === "기타" && (
            <div>
              <Form.Control
                type="text"
                placeholder="기타 언어"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
              />
            </div>
          )}
        </Form.Group>

        <Form.Group controlId="languageEditLevel" className="mb-3">
          <Form.Control
            type="text"
            placeholder="어느 정도로 다룰 수 있는지 기입해주세요."
            value={level}
            onChange={(e) => setLevel(e.target.value)}
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
export default LanguageEditForm;
