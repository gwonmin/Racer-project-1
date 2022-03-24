<<<<<<< HEAD
import {Row, Button, Col, Card } from "react-bootstrap";

function AwardElement({award, isEditable, editingAwardList, setEditingAwardList}) {
  return (
    <Card.Text className="mb-3 mr-5">
        <Row className="align-items-center">
            <Col>
                <Col>{award?.title}</Col>
                <Col className="text-muted">{award?.description}</Col>
            </Col>
            {isEditable && (
                <Col xs lg="1">
                    <Button 
                        className="mr-3"
                        variant="outline-info"
                        size="sm"
                        onClick={() => {
                            console.log(`${award.user_id}가 EditingAwardList에 추가되었습니다.`)
                            const newList = editingAwardList.concat(award.user_id)
                            setEditingAwardList(newList);
                        }}
                    >
                    편집
                    </Button>
                </Col>
            )}
            </Row>
=======
import { Row, Button, Col, Card } from "react-bootstrap";
import * as Api from "../../api";

function AwardElement({
  award,
  isEditable,
  editingAwardList,
  setEditingAwardList,
  setFinalEditedAward,
}) {
  function handleEdit() {
    const newList = editingAwardList.concat(award._id);
    setEditingAwardList(newList);
  }
  function handleDelete() {
    Api.delete("awards", award._id);
    setFinalEditedAward(`${award._id} 삭제됨`);
  }

  return (
    <Card.Text className="mb-3 mr-5">
      <Row className="align-items-center">
        <Col>
          <Col>{award?.title}</Col>
          <Col className="text-muted">{award?.description}</Col>
          <Col className="text-muted">{award?.whenDate.slice(0, 10)}</Col>
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
>>>>>>> front-backend-connectiong-real
    </Card.Text>
  );
}

export default AwardElement;
