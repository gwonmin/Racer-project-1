import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationAddForm({ user, education, setIsAdding, educationList, setEducationList, editingList, setEditingList }) {
  //useState로 education의 상태를 설정함.
  const [school, setSchool] = useState(education.school);
  const [major, setMajor] = useState(education.major);
  const [position, setPosition] = useState(education.position);

  const handleSubmit = async (e) => {
      e.preventDefault();
      //school이나 major가 공백일 때는 제출할 수 없습니다.
      if(school!=="" && major!=="") {
          // educationList를 변경합니다.
          const tempEducationList = [...educationList];
          const idx = tempEducationList.findIndex(edu => edu.user_id===education.user_id);
          const edu = {
              user_id: education.user_id,
              school: school,
              major: major,
              position: position
          }
          if(idx!==-1) {
              console.log(idx)
              tempEducationList[idx] = edu;
          } else {
              tempEducationList.push(edu);
          }
          setEducationList(tempEducationList);

          //editingList에서 현재 education을 제거합니다.
          setEditingList(editingList.filter(id => id !== education.user_id));
          console.log(`${education.user_id}가 editingList에서 제거되었습니다.`);

          //만약 education을 추가하는 중이라면 setIsAdding을 false로 바꿉니다.
          if(setIsAdding) {setIsAdding(false);}
      } else {
        console.log("공백은 제출할 수 없습니다.");
      }
  }

  const handleCancle = async (e) => {
      //editingList에서 현재 education을 제거합니다.
      setEditingList(editingList.filter(id => id !== education.user_id));
      console.log(`${education.user_id}가 editingList에서 제거되었습니다.`);

      //만약 education을 추가하는 중이라면 setIsAdding을 false로 바꿉니다.
      if(setIsAdding) {setIsAdding(false)}
  }

  return (
    <div className="mb-2">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="educationEditSchool" className="mb-3">
            <Form.Control
              type="text"
              placeholder="학교 이름"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="educationEditMajor" className="mb-3">
            <Form.Control
              type="text"
              placeholder="전공"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="educationEditPosition" className="mb-3">
              <div className="mb-3">
                  {["재학중", "학사졸업", "석사졸업", "박사졸업"].map((element) => (
                      <Form.Check
                          inline
                          label={element}
                          name="group1"
                          type="radio"
                          id={`inline-raido-${element}`}
                          key={element}
                          checked={position===element}
                          onChange={()=>{setPosition(element)}}
                      />
                  ))}
              </div>
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3" onClick={handleSubmit}>
                확인
              </Button>
              <Button variant="secondary" onClick={handleCancle}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
    </div>
  );
}

export default EducationAddForm;
