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
} from "reactstrap";

// ** Third Party Components
import { useForm } from "react-hook-form";
import { UserPlus } from "react-feather";
import NuevoMedicoInputs from "./NuevoMedicoInputs";
import useCustomAlert from "@/hooks/useCustomAlert";
import { insertMedico } from "@/api/medicos/mutation";

const NuevoMedico = ({ obrassociales, especialidades }) => {
  const [show, setShow] = useState(false);
  const { simpleAlert, loadingAlert } = useCustomAlert();

  // ** Hooks
  const { reset, control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    loadingAlert();
    insertMedico(data)
      .then(() => {
        setShow(false);
        simpleAlert({
          title: "Carga exitosa!",
          message: "Archivo cargado con exito.",
          icon: "success",
        });
      })
      .catch((err) => {
        setShow(false);
        simpleAlert({
          title: "Error al cargar",
          message: err,
          icon: "error",
        });
      });
  };

  const onDiscard = () => {
    setShow(false);
    reset();
  };

  return (
    <div>
      <Button
        className="d-flex align-items-center text-nowrap  "
        onClick={() => setShow(true)}
        color="primary"
      >
        <span className="align-middle fw-bolder d-md-flex d-none ">
          Añadir nuevo medico
        </span>
        <UserPlus className="align-middle m-0 p-0 d-md-none" size={18} />
      </Button>
      {/* ----------------------------------------------------------------------------------------------------------- */}

      <Modal
        isOpen={show}
        onClosed={onDiscard}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="m-0 p-0 d-none"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="pb-5 px-sm-4 mx-50">
          <h1 className=" text-center mb-2">Añadir nuevo medico </h1>
          <Form className="gy-1 gx-2" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <NuevoMedicoInputs
                control={control}
                obrassociales={obrassociales}
                especialidades={especialidades}
              />
            </Row>
            <Col className="text-center mt-5" xs={12}>
              <Button type="submit" className="me-3 mt-2" color="primary">
                Cargar datos
              </Button>
              <Button
                type="reset"
                className="mt-2"
                color="danger"
                outline
                onClick={onDiscard}
              >
                Cancelar
              </Button>
            </Col>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default NuevoMedico;
