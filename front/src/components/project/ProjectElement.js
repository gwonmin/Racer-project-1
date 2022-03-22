import {Row, Button, Col, Card } from "react-bootstrap";

function ProjectElement({project, isEditable, editingProjectList, setEditingProjectList}) {
    function handleEdit() {
        console.log(`${project.user_id}가 EditingAwardList에 추가되었습니다.`)
        const newList = editingProjectList.concat(project.user_id)
        setEditingProjectList(newList);
    }
  return (
    <Card.Text className="mb-3 mr-5">
        <Row className="align-items-center">
            <Col>
                <Col>{project?.title}</Col>
                <Col className="text-muted">{project?.description}</Col>
                <Col className="text-muted">{project?.fromDate} ~ {project?.toDate}</Col>
            </Col>
            {isEditable && (
                 <Col xs lg="1">
                 <Button 
                     className="mr-3"
                     variant="outline-info"
                     size="sm"
                     onClick={handleEdit}
                 >
                 편집
                 </Button>
             </Col>
            )}
            </Row>
    </Card.Text>
  );
}

export default ProjectElement;
