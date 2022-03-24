import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
<<<<<<< HEAD
import * as Api from "../../api";

function AwardAddForm({ user, award, setIsAddingAward, awardList, setAwardList, editingAwardList, setEditingAwardList }) {
  //useState로 Award의 상태를 설정함.
  const [title, setTitle] = useState(award.title);
  const [description, setDescription] = useState(award.description);
  //const [date, setDate] = useState();

  const handleSubmit = async (e) => {
      e.preventDefault();
      //Title이나 Description가 공백일 때는 제출할 수 없습니다.
      if(title!=="" && description!=="") {
          // AwardList를 변경합니다.
          const tempAwardList = [...awardList];
          const idx = tempAwardList.findIndex(awd => awd.user_id===award.user_id);
          const awd = {
              user_id: award.user_id,
              title: title,
              description: description,
          }
          if(idx!==-1) {
              console.log(idx)
              tempAwardList[idx] = awd;
          } else {
              tempAwardList.push(awd);
          }
          setAwardList(tempAwardList);

          //EditingAwardList에서 현재 Award을 제거합니다.
          setEditingAwardList(editingAwardList.filter(id => id !== award.user_id));
          console.log(`${award.user_id}가 EditingAwardList에서 제거되었습니다.`);

          //만약 Award을 추가하는 중이라면 setIsAddingAward을 false로 바꿉니다.
          if(setIsAddingAward) {setIsAddingAward(false);}
      } else {
        console.log("공백은 제출할 수 없습니다.");
      }
  }

  const handleCancle = async (e) => {
      //EditingAwardList에서 현재 Award을 제거합니다.
      setEditingAwardList(editingAwardList.filter(id => id !== award.user_id));
      console.log(`${award.user_id}가 EditingAwardList에서 제거되었습니다.`);

      //만약 Award을 추가하는 중이라면 setIsAddingAward을 false로 바꿉니다.
      if(setIsAddingAward) {setIsAddingAward(false)}
  }

  return (
    <div className="mb-2">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="AwardEditTitle" className="mb-3">
            <Form.Control
              type="text"
              placeholder="학교 이름"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="AwardEditDescription" className="mb-3">
            <Form.Control
              type="text"
              placeholder="전공"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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
=======
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Api from "../../api";

function AwardAddForm({ setIsAddingAward, setFinalEditedAward }) {
  //useState로 Award의 상태를 설정함.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [whenDate, setWhenDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Title이나 Description가 공백일 때는 제출할 수 없습니다.
    if (title !== "" && description !== "") {
      const Awd = {
        title: title,
        description: description,
        whenDate: whenDate,
      };
      const res = await Api.post(`award/create`, Awd);
      const award = res.data;
      setFinalEditedAward(`${award._id} 추가됨`);
      setIsAddingAward(false);
      return;
    }
    console.log("공백은 제출할 수 없습니다.");
  };

  return (
    <div className="mb-2">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="AwardEditTitle" className="mb-3">
          <Form.Control
            type="text"
            placeholder="수상내역"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="AwardEditDescription" className="mb-3">
          <Form.Control
            type="text"
            placeholder="상세내역"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="ProjectEditToDate" className="mb-3">
          <DatePicker
            selected={whenDate}
            onChange={(date) => setWhenDate(date)}
          />
        </Form.Group>
        <Form.Group as={Row} className="mt-3 text-center">
          <Col sm={{ span: 20 }}>
            <Button
              variant="primary"
              type="submit"
              className="me-3"
              onClick={handleSubmit}
            >
              확인
            </Button>
            <Button variant="secondary" onClick={() => setIsAddingAward(false)}>
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
>>>>>>> front-backend-connectiong-real
    </div>
  );
}

export default AwardAddForm;
