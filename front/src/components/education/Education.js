/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import EducationAddForm from "./EducationAddForm";
import EducationElement from "./EducationElement";
import EducationEditForm from "./EducationEditForm";
import * as Api from "../../api";
import { Card, Row, Button, Col } from "react-bootstrap";

function Education({ portfolioOwnerId, isEditable }) {
  const [educationList, setEducationList] = useState([]);
  const [editingEducationList, setEditingEducationList] = useState([]);
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [finalEditedEducation, setFinalEditedEducation] = useState(
    "no education was edited"
  );

  useEffect(() => {
    //"educationlist/:user_id" 엔드포인트로 GET 요청을 하고, response의 data로 세팅해야 하는 부분입니다.
    Api.get("educationlist", portfolioOwnerId)
      .then((res) => setEducationList(res.data))
      .catch(() => {
        console.log("list 데이터 받아오기에 실패했습니다.");
      });
    console.log(finalEditedEducation);
  }, [portfolioOwnerId, finalEditedEducation]);

  return (
    <>
      <Card className="mb-2 mr-5">
        <Card.Body>
          <Card.Title>학력</Card.Title>
          {educationList.map((education) => (
            <div key={education._id}>
              <hr></hr>
              {editingEducationList.includes(education._id) ? (
                <EducationEditForm
                  editingEducationList={editingEducationList}
                  setEditingEducationList={setEditingEducationList}
                  setFinalEditedEducation={setFinalEditedEducation}
                  education={education}
                />
              ) : (
                <EducationElement
                  isEditable={isEditable}
                  editingEducationList={editingEducationList}
                  setEditingEducationList={setEditingEducationList}
                  setFinalEditedEducation={setFinalEditedEducation}
                  education={education}
                />
              )}
              <hr></hr>
            </div>
          ))}
          <Col>
            {isEditable && (
              <Row className="mt-3">
                <Col className="text-center mb-3">
                  <Button
                    variant={isAddingEducation ? "secondary" : "primary"}
                    disabled={isAddingEducation ? true : false}
                    onClick={() => setIsAddingEducation(true)}
                  >
                    +
                  </Button>
                </Col>
                {isAddingEducation && (
                  <EducationAddForm
                    setIsAddingEducation={setIsAddingEducation}
                    setFinalEditedEducation={setFinalEditedEducation}
                  />
                )}
              </Row>
            )}
          </Col>
        </Card.Body>
      </Card>
    </>
  );
}

export default Education;
