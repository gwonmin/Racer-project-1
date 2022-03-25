import { Row, Button, Col, Card } from "react-bootstrap";
import * as Api from "../../api";

function ProjectElement({
  project,
  isEditable,
  editingProjectList,
  setEditingProjectList,
  setFinalEditedProject,
}) {
  function handleEdit() {
    const newList = editingProjectList.concat(project._id);
    setEditingProjectList(newList);
    console.log(`${project._id}가 EditingProjectList에 추가되었습니다.`);
  }

  function handleDelete() {
    Api.delete("projects", project._id);
    setFinalEditedProject(`${project._id} 삭제됨`);
  }
  return (
    <Card.Text className="mb-3 mr-5">
      <Row className="align-items-center">
        <Col>
          <Col>{project?.title}</Col>
          <Col className="text-muted">{project?.description}</Col>
          <Col className="text-muted">
            {project?.from_date} ~ {project?.to_date}
          </Col>
          {project.git !== "" && (
            <Col className="text-muted">{project?.git}</Col>
          )}
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
            <Button
              className="mr-3"
              variant="outline-danger"
              size="sm"
              onClick={handleDelete}
            >
              삭제
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default ProjectElement;
