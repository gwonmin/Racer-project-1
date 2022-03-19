import {Row, Button, Col } from "react-bootstrap";

function CertificationElement({certification, isEditable, editingList, setEditingList}) {
  return (
    <div className="mb-2 ms-3 mr-5">
        <Col>{certification?.certificationTitle}</Col>
        <Row>
            <Col className="mb-2 text-muted">{`${certification?.details}`}</Col>
        </Row>
        <Row>
            <Col className="mb-2 text-muted">{`${certification?.receivedDate}`}</Col>
            {isEditable && (
                <Col>
                    <Row className="mt-3 text-center text-info">
                        <Col sm={{ span: 20 }}>
                            <Button
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
                    </Row>
                </Col>
            )}
            </Row>
    </div>
  );
}

export default CertificationElement;
