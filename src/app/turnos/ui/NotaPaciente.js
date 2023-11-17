"use client";
import React from "react";
import { useState } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  Form,
  UncontrolledTooltip,
} from "reactstrap";

import { Edit3 } from "react-feather";

const NotaPaciente = ({ notas, nombre, id }) => {
  const [show, setShow] = useState(false);


  const onDiscard = () => {
    setShow(false);
  };

  return (
    <div>
      <Edit3  style={{cursor:'pointer'}} onClick={() => setShow(true)} id={`editar-${id}`} size={20}/>
      <UncontrolledTooltip placement="top" target={`editar-${id}`}>
        Ver nota del paciente
      </UncontrolledTooltip>

      {/* ----------------------------------------------------------------------------------------------------------- */}

      <Modal
        isOpen={show}
        onClosed={onDiscard}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-md"
      >
        <ModalHeader
          className="m-0 p-0 d-none"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="pb-4 px-sm-4 mx-50">
          <h5 className=" text-center mb-4">Nota del paciente: {nombre} </h5>
            {notas}
            <Col className="text-center mt-5" xs={12}>
              <Button
                type="reset"
                className="mt-2"
                color="danger"
                outline
                onClick={onDiscard}
              >
                Regresar
              </Button>
            </Col>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default NotaPaciente;
