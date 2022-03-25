import { Row, Button, Col, Card } from "react-bootstrap";
import * as Api from "../../api";

function LanguageElement({
  language,
  isEditable,
  editingLanguageList,
  setEditingLanguageList,
  setFinalEditedLanguage,
}) {
  function handleEdit() {
    const newList = editingLanguageList.concat(language._id);
    setEditingLanguageList(newList);
    console.log(`${language._id}가 EditingLanguageList에 추가되었습니다.`);
  }
  function handleDelete() {
    Api.delete("languages", language._id);
    setFinalEditedLanguage(`${language._id} 삭제됨`);
  }
  return (
    <Card.Text className="mb-3 mr-5">
      <Row className="align-items-center">
        <Col>
          <Col>
            {language?.name}: Lv.{language?.level}
          </Col>
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

export default LanguageElement;
