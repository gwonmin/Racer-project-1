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
    </Card.Text>
  );
}

export default AwardElement;
