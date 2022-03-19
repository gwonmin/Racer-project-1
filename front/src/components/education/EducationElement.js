import {Row, Button, Col } from "react-bootstrap";

function EducationElement({education, isEditable, editingEducationList, setEditingEducationList}) {
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
                                    console.log(`${education.user_id}가 editingEducationList에 추가되었습니다.`)
                                    // const tempList = [...EditingEducationList];
                                    // tempList.push(education.user_id);
                                    const newList = editingEducationList.concat(education.user_id)
                                    setEditingEducationList(newList);
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
