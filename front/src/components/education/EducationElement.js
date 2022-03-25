import {Row, Button, Col, Card } from "react-bootstrap";

function EducationElement({education, isEditable, editingEducationList, setEditingEducationList}) {
    function handleEdit() {
        console.log(`${education.user_id}가 EditingAwardList에 추가되었습니다.`)
        const newList = editingEducationList.concat(education.user_id)
        setEditingEducationList(newList);
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
             </Col>
            )}
            </Row>
        </Card.Text>
  );
}

export default EducationElement;
