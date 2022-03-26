/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ProjectAddForm from "./ProjectAddForm";
import ProjectElement from "./ProjectElement";
import ProjectEditForm from "./ProjectEditForm";
import * as Api from "../../api";
import { Card, Row, Button, Col } from "react-bootstrap";

function Project({ portfolioOwnerId, isEditable }) {
  const [projectList, setProjectList] = useState([]);
  const [editingProjectList, setEditingProjectList] = useState([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [finalEditedProject, setFinalEditedProject] = useState(
    "no project was edited"
  );
  useEffect(() => {
    //"projectlist/:user_id" 엔드포인트로 GET 요청을 하고, response의 data로 세팅해야 하는 부분입니다.
    Api.get("projectlist", portfolioOwnerId)
      .then((res) => setProjectList(res.data))
      .catch(() => {
        console.log("list 데이터 받아오기에 실패했습니다.");
      });
    console.log(finalEditedProject);
  }, [portfolioOwnerId, finalEditedProject]);
  return (
    <>
      <Card className="mb-2 mr-5">
        <Card.Body>
          <Card.Title>프로젝트</Card.Title>
          {projectList.map((project) => (
            <div key={project._id}>
              <hr></hr>
              {editingProjectList.includes(project._id) ? (
                <ProjectEditForm
                  project={project}
                  editingProjectList={editingProjectList}
                  setEditingProjectList={setEditingProjectList}
                  setFinalEditedProject={setFinalEditedProject}
                />
              ) : (
                <ProjectElement
                  project={project}
                  isEditable={isEditable}
                  editingProjectList={editingProjectList}
                  setEditingProjectList={setEditingProjectList}
                  setFinalEditedProject={setFinalEditedProject}
                />
              )}
              <hr></hr>
            </div>
          ))}
          <Col>
            {isEditable && (
              <Row className="mt-3">
                <Col className="text-center mb-3">
                  <Button
                    variant={isAddingProject ? "secondary" : "primary"}
                    disabled={isAddingProject ? true : false}
                    onClick={() => setIsAddingProject(true)}
                  >
                    +
                  </Button>
                </Col>
                {isAddingProject && (
                  <ProjectAddForm
                    setIsAddingProject={setIsAddingProject}
                    setFinalEditedProject={setFinalEditedProject}
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

export default Project;
