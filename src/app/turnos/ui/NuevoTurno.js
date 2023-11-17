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

import { useForm } from "react-hook-form";
import { UserPlus } from "react-feather";
import NuevoTurnoInputs from "./NuevoTurnoInputs";
import useCustomAlert from "@/hooks/useCustomAlert";
import { insertTurno } from "@/api/turnos/mutation";

const NuevoTurno = ({ pacientes, estados, medicos }) => {
  const [show, setShow] = useState(false);
  const { simpleAlert, loadingAlert } = useCustomAlert();
  const { reset, control, handleSubmit } = useForm();
  const [medicosFiltrados, setMedicosFiltrados] = useState(medicos);

  const handlePacienteChange = (selectedPaciente) => {
    if (!selectedPaciente) {
      // No hay paciente seleccionado, puedes manejar esto según tus necesidades
      setMedicosFiltrados(medicos);
      return;
    }
  
    const obrasSocialesPaciente = Array.isArray(selectedPaciente.obra_social)
      ? selectedPaciente.obra_social
      : [selectedPaciente.obra_social];
  
    console.log('OBRA PACIENTE', obrasSocialesPaciente);
  
    const nuevosMedicosFiltrados = medicos.filter((medico) =>
      medico.obras_sociales.some((obraSocial) => {
        console.log('OBRA MEDICO', obraSocial);
        return obrasSocialesPaciente.includes(obraSocial);
      })
    );
  
    setMedicosFiltrados(nuevosMedicosFiltrados);
  };

  const onSubmit = (data) => {
    console.log(data);
     loadingAlert();
    insertTurno(data)
      .then(() => {
        setShow(false);
        simpleAlert({
          title: "Carga exitosa!",
          message: "Turno cargado con exito.",
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
          Añadir nuevo turno
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
          <h1 className=" text-center mb-2">Añadir nuevo turno </h1>
          <Form className="gy-1 gx-2" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <NuevoTurnoInputs
                control={control}
                pacientes={pacientes}
                estados={estados}
                medicos={medicosFiltrados} 
        onPacienteChange={handlePacienteChange} 
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

export default NuevoTurno;
