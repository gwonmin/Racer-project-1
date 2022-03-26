import { Row, Button, Col, Card } from "react-bootstrap";
import * as Api from "../../api";

function CertificateElement({
  certificate,
  isEditable,
  editingCertificateList,
  setEditingCertificateList,
  setFinalEditedCertificate,
}) {
  function handleEdit() {
    const newList = editingCertificateList.concat(certificate._id);
    setEditingCertificateList(newList);
    console.log(
      `${certificate._id}가 EditingCertificateList에 추가되었습니다.`
    );
  }

  function handleDelete() {
    Api.delete("certificates", certificate._id);
    setFinalEditedCertificate(`${certificate._id} 삭제됨`);
  }
  return (
    <Card.Text className="mb-3 mr-5">
      <Row className="align-items-center">
        <Col>
          <Col>{certificate?.title}</Col>
          <Col className="text-muted">{certificate?.description}</Col>
          <Col className="text-muted">{certificate?.when_date}</Col>
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
    </Card.Text>
  );
}

export default CertificateElement;
