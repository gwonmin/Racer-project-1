import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";


function CertificationAddForm({ user, certification, setIsAdding, certificationList, setCertificationList, editingList, setEditingList }) {
  //useState로 certification의 상태를 설정함.
  const [certificationTitle, setCertificationTitle] = useState(certification.certificationTitle);
  const [details, setDetails] = useState(certification.details);
  const [receivedDate, setReceivedDate] = useState(new Date(certification.receivedDate));

  const handleSubmit = async (e) => {
      e.preventDefault();
      //certificationTitle이나 details가 공백일 때는 제출할 수 없습니다.
      if(certificationTitle!=="" && details!=="") {
          // certificationList를 변경합니다.
          const tempCertificationList = [...certificationList];
          const idx = tempCertificationList.findIndex(certifi => certifi.user_id===certification.user_id);
          const certifi = {
              user_id: certification.user_id,
              certificationTitle: certificationTitle,
              details: details,
              receivedDate: `${receivedDate.getFullYear()}-${receivedDate.getMonth()+1}-${receivedDate.getDate()}`,
          }
          if(idx!==-1) {
              console.log(idx)
              tempCertificationList[idx] = certifi;
          } else {
              tempCertificationList.push(certifi);
          }
          setCertificationList(tempCertificationList);

          //editingList에서 현재 education을 제거합니다.
          setEditingList(editingList.filter(id => id !== certification.user_id));
          console.log(`${certification.user_id}가 editingList에서 제거되었습니다.`);

          //만약 education을 추가하는 중이라면 setIsAdding을 false로 바꿉니다.
          if(setIsAdding) {setIsAdding(false);}
      } else {
        console.log("공백은 제출할 수 없습니다.");
      }
  }

  const handleCancle = async (e) => {
      //editingList에서 현재 education을 제거합니다.
      setEditingList(editingList.filter(id => id !== certification.user_id));
      console.log(`${certification.user_id}가 editingList에서 제거되었습니다.`);

      //만약 education을 추가하는 중이라면 setIsAdding을 false로 바꿉니다.
      if(setIsAdding) {setIsAdding(false)}
  }



  return (
    <div className="mb-2">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="educationEditSchool" className="mb-3">
            <Form.Control
              type="text"
              placeholder="자격증 제목"
              value={certificationTitle}
              onChange={(e) => setCertificationTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="educationEditMajor" className="mb-3">
            <Form.Control
              type="text"
              placeholder="상세내역"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="educationEditPosition" className="mb-3">
              <div className="mb-3">
              <DatePicker 
                  selected={receivedDate} 
                  onChange={(date) => {
                    setReceivedDate(date)
                    console.log(date)
                }} 
              />
                


                  
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

export default CertificationAddForm;
