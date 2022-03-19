/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import EducationAddForm from "./EducationAddForm";
import EducationElement from "./EducationElement";
import * as Api from "../../api";
import { Card, Row, Button, Col } from "react-bootstrap";

function Education({ portfolioOwnerId, isEditable }) {
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
  const [editingEducationList, setEditingEducationList] = useState([]);
  const [isAddingEducation, setIsAddingEducation] = useState(false);
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
        <Card className="mb-2 mr-5">
        <Card.Body>
        <Card.Title>학력</Card.Title>
        {
            educationList.map((education) => (<div key={education.user_id}>
                {
                    editingEducationList.includes(education.user_id) ? (
                        <EducationAddForm
                            education={education}
                            educationList={educationList}
                            setEducationList={setEducationList}
                            isEditable={isEditable}
                            editingEducationList={editingEducationList}
                            setEditingEducationList={setEditingEducationList}
                        />
                    ):(
                        <EducationElement 
                            education={education}
                            isEditable={isEditable}
                            editingEducationList={editingEducationList}
                            setEditingEducationList={setEditingEducationList}
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
                        variant={!isAddingEducation ? ("primary") : ("secondary")}
                        disabled = {isAddingEducation ? true : false}
                        onClick={() => setIsAddingEducation(true)}
                        >
                        +
                        </Button>
                    </Col>
                {isAddingEducation && (
                    <EducationAddForm
                        education={{
                            user_id: educationList.length + 2,
                            school: "",
                            major: "",
                            position: "재학중"
                          }}
                        isEditable={isEditable}
                        editingEducationList={editingEducationList}
                        setEditingEducationList={setEditingEducationList}
                        setIsAddingEducation={setIsAddingEducation}
                        educationList={educationList}
                        setEducationList={setEducationList}
                    />
                )}
            </Row>)}
        </Col>
        </Card.Body>
        </Card>
    </>
  );
}

export default Education;
