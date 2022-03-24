/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import AwardAddForm from "./AwardAddForm";
import AwardElement from "./AwardElement";
<<<<<<< HEAD
=======
import AwardEditForm from "./AwardEditForm";
>>>>>>> front-backend-connectiong-real
import * as Api from "../../api";
import { Card, Row, Button, Col } from "react-bootstrap";

function Award({ portfolioOwnerId, isEditable }) {
<<<<<<< HEAD
  const [awardList, setAwardList] = useState([{
    user_id: 1,
    title: "다독상",
    description: "학우들을 열심히 다독였습니다.",
  },
  {
    user_id: 2,
    title: "개근상",
    description: "스크럼에 빠지지 않고 열심히 참여했습니다.",
  }]);
  const [editingAwardList, setEditingAwardList] = useState([]);
  const [isAddingAward, setIsAddingAward] = useState(false);
// useEffect 써보기
    
//   useEffect(() => {
//     "Awardlist/:user_id" 엔드포인트로 GET 요청을 하고, response의 data로 세팅해야 하는 부분입니다.
//     Api.get("users", portfolioOwnerId).then((res) => setUser(res.data)).catch(()=>{
//       임시프로필을 만드는 임시 유닛입니다.
//       console.log('유저 데이터 받아오기에 실패했습니다.')
//       alert('유저 데이터 받아오기에 실패했습니다.')
//       setUser = ({
//         name: "임시유저",
//         email: "저는 임시유저입니다.",
//         description:"임시 소개글입니다."
//       });
//     });
//   }, [portfolioOwnerId]);

  return (
    <>
        <Card className="mb-2 mr-5">
        <Card.Body>
        <Card.Title>수상이력</Card.Title>
        {
            awardList.map((award) => (<div key={award.user_id}>
                {
                    editingAwardList.includes(award.user_id) ? (
                        <AwardAddForm
                            award={award}
                            awardList={awardList}
                            setAwardList={setAwardList}
                            isEditable={isEditable}
                            editingAwardList={editingAwardList}
                            setEditingAwardList={setEditingAwardList}
                        />
                    ):(
                        <AwardElement 
                            award={award}
                            isEditable={isEditable}
                            editingAwardList={editingAwardList}
                            setEditingAwardList={setEditingAwardList}
                        />
                    )
                }
            </div>))
        }
        <Col>
            {isEditable && (
                <Row className="mt-3">
                    <Col className="text-center mb-3">
                        <Button
                        variant={!isAddingAward ? ("primary") : ("secondary")}
                        disabled = {isAddingAward ? true : false}
                        onClick={() => setIsAddingAward(true)}
                        >
                        +
                        </Button>
                    </Col>
                {isAddingAward && (
                    <AwardAddForm
                        award={{
                            user_id: awardList.length + 2,
                            title: "",
                            description: "",
                          }}
                        isEditable={isEditable}
                        editingAwardList={editingAwardList}
                        setEditingAwardList={setEditingAwardList}
                        setIsAddingAward={setIsAddingAward}
                        awardList={awardList}
                        setAwardList={setAwardList}
                    />
                )}
            </Row>)}
        </Col>
        </Card.Body>
        </Card>
=======
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
>>>>>>> front-backend-connectiong-real
    </>
  );
}

export default Award;
