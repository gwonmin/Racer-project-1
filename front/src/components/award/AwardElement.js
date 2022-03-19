import {Row, Button, Col } from "react-bootstrap";

function AwardElement({award, isEditable, editingAwardList, setEditingAwardList}) {
  return (
    <div className="mb-2 ms-3 mr-5">
        <Col>{award?.title}</Col>
        <Row>
            <Col className="mb-2 text-muted">{award?.description}</Col>
            {isEditable && (
                <Col>
                    <Row className="mt-3 text-center text-info">
                        <Col sm={{ span: 20 }}>
                            <Button
                                variant="outline-info"
                                size="sm"
                                onClick={() => {
                                    console.log(`${award.user_id}가 EditingAwardList에 추가되었습니다.`)
                                    // const tempList = [...EditingAwardList];
                                    // tempList.push(Award.user_id);
                                    const newList = editingAwardList.concat(award.user_id)
                                    setEditingAwardList(newList);
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

export default AwardElement;
