import {Row, Button, Col } from "react-bootstrap";

function EducationElement({education, isEditable, editingList, setEditingList}) {
  return (
    <div className="mb-2 ms-3 mr-5">
        <Col>{education?.school}</Col>
        <Row>
            <Col className="mb-2 text-muted">{`${education?.major} (${education?.position})`}</Col>
            {isEditable && (
                <Col>
                    <Row className="mt-3 text-center text-info">
                        <Col sm={{ span: 20 }}>
                            <Button
                                variant="outline-info"
                                size="sm"
                                onClick={() => {
                                    console.log(`${education.user_id}가 editingList에 추가되었습니다.`)
                                    // const tempList = [...editingList];
                                    // tempList.push(education.user_id);
                                    const newList = editingList.concat(education.user_id)
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

export default EducationElement;
