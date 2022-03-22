import { Row, Button, Col, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import * as Api from "../../api";

function EducationElement({
  educationId,
  isEditable,
  editingEducationList,
  setEditingEducationList,
}) {
  const [education, setEducation] = useState({});
  useEffect(() => {
    //"educations/:educationId" 엔드포인트로 GET 요청을 하고, response의 data로 세팅해야 하는 부분입니다.
    Api.get("educations", educationId)
      .then((res) => setEducation(res.data))
      .catch(() => {
        console.log("Education 데이터 받아오기에 실패했습니다.");
      });
  }, []);
  function handleEdit() {
    const newList = editingEducationList.concat(educationId);
    setEditingEducationList(newList);
    console.log(editingEducationList);
    console.log(`${educationId}가 EditingEducationList에 추가되었습니다.`);
  }
  return (
    <Card.Text className="mb-3 mr-5">
      <Row className="align-items-center">
        <Col>
          <Col>{education?.school}</Col>
          <Col className="text-muted">{`${education?.major} (${education?.position})`}</Col>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              className="mr-3"
              variant="outline-info"
              size="sm"
              onClick={() => handleEdit}
            >
              편집
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default EducationElement;
