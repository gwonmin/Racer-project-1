/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import CertificationAddForm from "./CertificationAddForm";
import CertificationElement from "./CertificationElement";
import * as Api from "../../api";
import { Card, Row, Button, Col } from "react-bootstrap";

function Certification({ portfolioOwnerId, isEditable }) {
  const [certificationList, setCertificationList] = useState([{
    user_id: 1,
    certificationTitle: "엘리스자격증",
    details: "Javascript",
    receivedDate: "2022-03-20"
  },
  ]);
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
        <Card.Title>자격증</Card.Title>
        {
            certificationList.map((certification) => (<div key={certification.user_id}>
                {
                    editingList.includes(certification.user_id) ? (
                        <CertificationAddForm
                            certification={certification}
                            certificationList={certificationList}
                            setCertificationList={setCertificationList}
                            isEditable={isEditable}
                            editingList={editingList}
                            setEditingList={setEditingList}
                        />  
                    ):(
                        <CertificationElement 
                            certification={certification}
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
                    <CertificationAddForm
                        certification={{
                            user_id: certificationList.length + 2,
                            certificationTitle: "",
                            details: "",
                            receivedDate: new Date()
                          }}
                        isEditable={isEditable}
                        editingList={editingList}
                        setEditingList={setEditingList}
                        setIsAdding={setIsAdding}
                        certificationList={certificationList}
                        setCertificationList={setCertificationList}
                    />
                )}
            </Row>)}
        </Col>
        </Card.Body>
        </Card>
    </>
  );
}

export default Certification;
