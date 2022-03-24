/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import EducationAddForm from "./EducationAddForm";
import EducationElement from "./EducationElement";
<<<<<<< HEAD
=======
import EducationEditForm from "./EducationEditForm";
>>>>>>> front-backend-connectiong-real
import * as Api from "../../api";
import { Card, Row, Button, Col } from "react-bootstrap";

function Education({ portfolioOwnerId, isEditable }) {
<<<<<<< HEAD
  const [educationList, setEducationList] = useState([{
    user_id: 1,
    school: "엘리스대학교",
    major: "Javascript 전공",
    position: "재학중"
  },
  {
    user_id: 2,
    school: "체셔대학교",
    major: "Python 전공",
    position: "박사졸업"
  }]);
  const [editingList, setEditingList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
// useEffect 써보기
    
//   useEffect(() => {
//     "educationlist/:user_id" 엔드포인트로 GET 요청을 하고, response의 data로 세팅해야 하는 부분입니다.
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
        <Card className="mb-2 ms-3 mr-5">
        <Card.Body>
        <Card.Title>학력</Card.Title>
        {
            educationList.map((education) => (<div key={education.user_id}>
                {
                    editingList.includes(education.user_id) ? (
                        <EducationAddForm
                            education={education}
                            educationList={educationList}
                            setEducationList={setEducationList}
                            isEditable={isEditable}
                            editingList={editingList}
                            setEditingList={setEditingList}
                        />
                    ):(
                        <EducationElement 
                            education={education}
                            isEditable={isEditable}
                            editingList={editingList}
                            setEditingList={setEditingList}
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
                        variant={!isAdding ? ("primary") : ("secondary")}
                        disabled = {isAdding ? true : false}
                        onClick={() => setIsAdding(true)}
                        >
                        +
                        </Button>
                    </Col>
                {isAdding && (
                    <EducationAddForm
                        education={{
                            user_id: educationList.length + 2,
                            school: "",
                            major: "",
                            position: "재학중"
                          }}
                        isEditable={isEditable}
                        editingList={editingList}
                        setEditingList={setEditingList}
                        setIsAdding={setIsAdding}
                        educationList={educationList}
                        setEducationList={setEducationList}
                    />
                )}
            </Row>)}
        </Col>
        </Card.Body>
        </Card>
=======
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
>>>>>>> front-backend-connectiong-real
    </>
  );
}

export default Education;
