/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import AwardAddForm from "./AwardAddForm";
import AwardElement from "./AwardElement";
import AwardEditForm from "./AwardEditForm";
import * as Api from "../../api";
import { Card, Row, Button, Col } from "react-bootstrap";

function Award({ portfolioOwnerId, isEditable }) {
  const [awardList, setAwardList] = useState([]);
  const [editingAwardList, setEditingAwardList] = useState([]);
  const [isAddingAward, setIsAddingAward] = useState(false);
  const [finalEditedAward, setFinalEditedAward] = useState(
    "no award was edited"
  );
  useEffect(() => {
    //"awardlist/:user_id" 엔드포인트로 GET 요청을 하고, response의 data로 세팅해야 하는 부분입니다.
    Api.get("awardlist", portfolioOwnerId)
      .then((res) => setAwardList(res.data))
      .catch(() => {
        console.log("list 데이터 받아오기에 실패했습니다.");
      });
    console.log(finalEditedAward);
  }, [portfolioOwnerId, finalEditedAward]);
  return (
    <>
      <Card className="mb-2 mr-5">
        <Card.Body>
          <Card.Title>수상이력</Card.Title>
          {awardList.map((award) => (
            <div key={award._id}>
              {editingAwardList.includes(award._id) ? (
                <AwardEditForm
                  award={award}
                  editingAwardList={editingAwardList}
                  setEditingAwardList={setEditingAwardList}
                  setFinalEditedAward={setFinalEditedAward}
                />
              ) : (
                <AwardElement
                  isEditable={isEditable}
                  editingAwardList={editingAwardList}
                  setEditingAwardList={setEditingAwardList}
                  setFinalEditedAward={setFinalEditedAward}
                  award={award}
                />
              )}
            </div>
          ))}
          <Col>
            {isEditable && (
              <Row className="mt-3">
                <Col className="text-center mb-3">
                  <Button
                    variant={isAddingAward ? "secondary" : "primary"}
                    disabled={isAddingAward ? true : false}
                    onClick={() => setIsAddingAward(true)}
                  >
                    +
                  </Button>
                </Col>
                {isAddingAward && (
                  <AwardAddForm
                    setIsAddingAward={setIsAddingAward}
                    setFinalEditedAward={setFinalEditedAward}
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

export default Award;
