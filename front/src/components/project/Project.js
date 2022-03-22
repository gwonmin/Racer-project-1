/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ProjectAddForm from "./ProjectAddForm";
import ProjectElement from "./ProjectElement";
import * as Api from "../../api";
import { Card, Row, Button, Col } from "react-bootstrap";

function Project({ portfolioOwnerId, isEditable }) {
  const [projectList, setProjectList] = useState([{
    user_id: 1,
    title: "인생 프로젝트",
    description: "현재 진행형",
    fromDate: "1998-12-09",
    toDate: "2047-12-31"
  },
  {
    user_id: 2,
    title: "대박 프로젝트",
    description: "오늘부터 대박을 기원합니다.",
    fromDate: "2022-03-19",
    toDate: "2099-12-31"
  }]);
  const [editingProjectList, setEditingProjectList] = useState([]);
  const [isAddingProject, setIsAddingProject] = useState(false);

// useEffect 써보기
    
//   useEffect(() => {
//     "Projectlist/:user_id" 엔드포인트로 GET 요청을 하고, response의 data로 세팅해야 하는 부분입니다.
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
        <Card.Title>프로젝트</Card.Title>
        {
            projectList.map((project) => (<div key={project.user_id}>
                {
                    editingProjectList.includes(project.user_id) ? (
                        <ProjectAddForm
                            project={project}
                            projectList={projectList}
                            setProjectList={setProjectList}
                            isEditable={isEditable}
                            editingProjectList={editingProjectList}
                            setEditingProjectList={setEditingProjectList}
                        />
                    ):(
                        <ProjectElement 
                            project={project}
                            isEditable={isEditable}
                            editingProjectList={editingProjectList}
                            setEditingProjectList={setEditingProjectList}
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
                        variant={!isAddingProject ? ("secondary") : ("primary")}
                        disabled = {isAddingProject ? true : false}
                        onClick={() => setIsAddingProject(true)}
                        >
                        +
                        </Button>
                    </Col>
                {isAddingProject && (
                    <ProjectAddForm
                        project={{
                            user_id: projectList.length + 2,
                            title: "",
                            description: "",
                            fromDate: new Date(),
                            toDate: new Date()
                          }}
                        isEditable={isEditable}
                        editingProjectList={editingProjectList}
                        setEditingProjectList={setEditingProjectList}
                        setIsAddingProject={setIsAddingProject}
                        projectList={projectList}
                        setProjectList={setProjectList}
                    />
                )}
            </Row>)}
        </Col>
        </Card.Body>
        </Card>
    </>
  );
}

export default Project;
