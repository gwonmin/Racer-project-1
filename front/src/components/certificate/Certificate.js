/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import CertificateAddForm from "./CertificateAddForm";
import CertificateElement from "./CertificateElement";
import CertificateEditForm from "./CertificateEditForm";
import * as Api from "../../api";
import { Card, Row, Button, Col } from "react-bootstrap";

function Certificate({ portfolioOwnerId, isEditable }) {
  const [certificateList, setCertificateList] = useState([]);
  const [editingCertificateList, setEditingCertificateList] = useState([]);
  const [isAddingCertificate, setIsAddingCertificate] = useState(false);
  const [finalEditedCertificate, setFinalEditedCertificate] = useState(
    "no certificate was edited"
  );
  useEffect(() => {
    //"certificatelist/:user_id" 엔드포인트로 GET 요청을 하고, response의 data로 세팅해야 하는 부분입니다.
    Api.get("certificatelist", portfolioOwnerId)
      .then((res) => setCertificateList(res.data))
      .catch(() => {
        console.log("list 데이터 받아오기에 실패했습니다.");
      });
    console.log(finalEditedCertificate);
  }, [portfolioOwnerId, finalEditedCertificate]);
  return (
    <>
      <Card className="mb-2 mr-5">
        <Card.Body>
          <Card.Title>자격증</Card.Title>
          {certificateList.map((certificate) => (
            <div key={certificate._id}>
              {editingCertificateList.includes(certificate._id) ? (
                <CertificateEditForm
                  certificate={certificate}
                  editingCertificateList={editingCertificateList}
                  setEditingCertificateList={setEditingCertificateList}
                  setFinalEditedCertificate={setFinalEditedCertificate}
                />
              ) : (
                <CertificateElement
                  certificate={certificate}
                  isEditable={isEditable}
                  editingCertificateList={editingCertificateList}
                  setEditingCertificateList={setEditingCertificateList}
                  setFinalEditedCertificate={setFinalEditedCertificate}
                />
              )}
            </div>
          ))}
          <Col>
            {isEditable && (
              <Row className="mt-3">
                <Col className="text-center mb-3">
                  <Button
                    variant={isAddingCertificate ? "secondary" : "primary"}
                    disabled={isAddingCertificate ? true : false}
                    onClick={() => setIsAddingCertificate(true)}
                  >
                    +
                  </Button>
                </Col>
                {isAddingCertificate && (
                  <CertificateAddForm
                    setIsAddingCertificate={setIsAddingCertificate}
                    setFinalEditedCertificate={setFinalEditedCertificate}
                  />
                )}
              </Row>
            )}
          </Col>
        </Card.Body>
      </Card>
    </>
  );
}

export default Certificate;
