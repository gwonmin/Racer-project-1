import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ProjectEditForm({
  user,
  project,
  setIsAddingProject,
  projectList,
  setProjectList,
  editingProjectList,
  setEditingProjectList,
}) {
  //useState로 Project의 상태를 설정함.
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [fromDate, setFromDate] = useState(new Date(project.fromDate));
  console.log(fromDate.getFullYear);
  const [toDate, setToDate] = useState(new Date(project.toDate));

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Title이나 Description가 공백일 때는 제출할 수 없습니다.
    if (title !== "" && description !== "") {
      // ProjectList를 변경합니다.
      const tempProjectList = [...projectList];
      const idx = tempProjectList.findIndex(
        (awd) => awd.user_id === project.user_id
      );
      const prj = {
        user_id: project.user_id,
        title: title,
        description: description,
        fromDate: `${fromDate.getFullYear()}-${
          fromDate.getMonth() + 1
        }-${fromDate.getDate()}`,
        toDate: `${toDate.getFullYear()}-${
          toDate.getMonth() + 1
        }-${toDate.getDate()}`,
      };
      if (idx !== -1) {
        console.log(idx);
        tempProjectList[idx] = prj;
      } else {
        tempProjectList.push(prj);
      }
      setProjectList(tempProjectList);

      //EditingProjectList에서 현재 Project을 제거합니다.
      setEditingProjectList(
        editingProjectList.filter((id) => id !== project.user_id)
      );
      console.log(
        `${project.user_id}가 EditingProjectList에서 제거되었습니다.`
      );

      //만약 Project을 추가하는 중이라면 setIsAddingProject을 false로 바꿉니다.
      if (setIsAddingProject) {
        setIsAddingProject(false);
      }
    } else {
      console.log("공백은 제출할 수 없습니다.");
    }
  };

  const handleCancle = async (e) => {
    //EditingProjectList에서 현재 Project을 제거합니다.
    setEditingProjectList(
      editingProjectList.filter((id) => id !== project.user_id)
    );
    console.log(`${project.user_id}가 EditingProjectList에서 제거되었습니다.`);

    //만약 Project을 추가하는 중이라면 setIsAddingProject을 false로 바꿉니다.
    if (setIsAddingProject) {
      setIsAddingProject(false);
    }
  };

  return (
    <div className="mb-2">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="ProjectEditTitle" className="mb-3">
          <Form.Control
            type="text"
            placeholder="프로젝트 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="ProjectEditDescription" className="mb-3">
          <Form.Control
            type="text"
            placeholder="상세내역"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="ProjectEditFromDate" className="mb-3">
          <DatePicker
            selected={fromDate}
            onChange={(date) => {
              setFromDate(date);
              console.log(date);
            }}
          />
        </Form.Group>
        <Form.Group controlId="ProjectEditToDate" className="mb-3">
          <DatePicker
            selected={toDate}
            onChange={(date) => {
              setToDate(date);
              console.log(date, typeof date);
            }}
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
            <Button variant="secondary" onClick={handleCancle}>
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default ProjectEditForm;
