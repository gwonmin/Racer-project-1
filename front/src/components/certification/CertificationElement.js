import {Row, Button, Col, Card } from "react-bootstrap";

function CertificationElement({certification, isEditable, editingList, setEditingList}) {
  return (
    <Card.Text className="mb-3 mr-5">
        <Row className="align-items-center">
            <Col>
                <Col>{certification?.certificationTitle}</Col>
                <Col className="text-muted">{certification?.details}</Col>
                <Col className="text-muted">{certification?.receivedDate}</Col>
            </Col>
            {isEditable && (
                <Col xs lg="1">
                    <Button
                        className="mr-3"
                        variant="outline-info"
                        size="sm"
                        onClick={() => {
                            console.log(`${certification.user_id}가 editingList에 추가되었습니다.`)
                            // const tempList = [...editingList];
                            // tempList.push(certification.user_id);
                            const newList = editingList.concat(certification.user_id)
                            setEditingList(newList);
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

export default CertificationElement;
