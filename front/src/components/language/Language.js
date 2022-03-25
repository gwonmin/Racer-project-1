/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import LanguageAddForm from "./LanguageAddForm";
import LanguageElement from "./LanguageElement";
import LanguageEditForm from "./LanguageEditForm";
import * as Api from "../../api";
import { Card, Row, Button, Col } from "react-bootstrap";

function Language({ portfolioOwnerId, isEditable }) {
  const [languageList, setLanguageList] = useState([]);
  const [editingLanguageList, setEditingLanguageList] = useState([]);
  const [isAddingLanguage, setIsAddingLanguage] = useState(false);
  const [finalEditedLanguage, setFinalEditedLanguage] = useState(
    "no language was edited"
  );

  useEffect(() => {
    //"languagelist/:user_id" 엔드포인트로 GET 요청을 하고, response의 data로 세팅해야 하는 부분입니다.
    Api.get("languagelist", portfolioOwnerId)
      .then((res) => setLanguageList(res.data))
      .catch(() => {
        console.log("list 데이터 받아오기에 실패했습니다.");
      });
    console.log(finalEditedLanguage);
  }, [portfolioOwnerId, finalEditedLanguage]);

  return (
    <>
      <Card className="mb-2 mr-5">
        <Card.Body>
          <Card.Title>사용 언어</Card.Title>
          {languageList.map((language) => (
            <div key={language._id}>
              {editingLanguageList.includes(language._id) ? (
                <LanguageEditForm
                  editingLanguageList={editingLanguageList}
                  setEditingLanguageList={setEditingLanguageList}
                  setFinalEditedLanguage={setFinalEditedLanguage}
                  language={language}
                />
              ) : (
                <LanguageElement
                  isEditable={isEditable}
                  editingLanguageList={editingLanguageList}
                  setEditingLanguageList={setEditingLanguageList}
                  setFinalEditedLanguage={setFinalEditedLanguage}
                  language={language}
                />
              )}
            </div>
          ))}
          <Col>
            {isEditable && (
              <Row className="mt-3">
                <Col className="text-center mb-3">
                  <Button
                    variant={isAddingLanguage ? "secondary" : "primary"}
                    disabled={isAddingLanguage ? true : false}
                    onClick={() => setIsAddingLanguage(true)}
                  >
                    +
                  </Button>
                </Col>
                {isAddingLanguage && (
                  <LanguageAddForm
                    setIsAddingLanguage={setIsAddingLanguage}
                    setFinalEditedLanguage={setFinalEditedLanguage}
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

export default Language;
