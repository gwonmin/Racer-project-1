import { Row, Button, Col, Card } from "react-bootstrap";
import * as Api from "../../api";

function EducationElement({
  education,
  isEditable,
  editingEducationList,
  setEditingEducationList,
  setFinalEditedEducation,
}) {
  function handleEdit() {
    const newList = editingEducationList.concat(education._id);
    setEditingEducationList(newList);
    console.log(`${education._id}가 EditingEducationList에 추가되었습니다.`);
  }
  function handleDelete() {
    Api.delete("educations", education._id);
    setFinalEditedEducation(`${education._id} 삭제됨`);
  }
  return (
    <Card.Text className="mb-3 mr-5">
      <Row className="align-items-center">
        <Col>
          <Col>{education?.school}</Col>
          <Col className="text-muted">{`${education?.major} (${education?.position})`}</Col>
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
            <Col></Col>
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

export default EducationElement;
