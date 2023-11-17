"use client";
import React from "react";
import { useState } from "react";
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
import useCustomAlert from "@/hooks/useCustomAlert";
import { updateMedico } from "@/api/medicos/mutation";
import Inputs from "./Inputs";
import { useRouter } from "next/navigation";

const EditarMedico = ({ obrassociales, especialidades, props }) => {
  const { simpleAlert, loadingAlert } = useCustomAlert();
  const router = useRouter();
  const { control, handleSubmit } = useForm({defaultValues: props});

  const onSubmit = (data) => {
    console.log(data);

    const isUnchanged = JSON.stringify(data) === JSON.stringify(props);

    if (isUnchanged) {
      simpleAlert({
        title: "Sin cambios",
        message: "No se ha editado ningún campo.",
        icon: "info",
      });
    } else {
      loadingAlert();
      updateMedico(data)
        .then(() => {
          simpleAlert({
            title: "Edicion exitosa!",
            message: "El medico se edito con éxito.",
            icon: "success",
          });
          router.push('/medicos');
        })
        .catch((err) => {
          simpleAlert({
            title: "Error al editar",
            message: err,
            icon: "error",
          });
        });
    }
  };

  return (
    <div>
 
          <h3 className=" mb-2 ">Editar datos del medico </h3>
          <h4 className="  mb-5"> {props.nombre} </h4>
          <Form className="gy-1 gx-2" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Inputs
                control={control}
                obrassociales={obrassociales}
                especialidades={especialidades}
              />
            </Row>
            <Col className="text-center mt-5" xs={12}>
              <Button type="submit" className="me-3 mt-2" color="primary">
                Editar datos
              </Button>
              <Button
                tag={'a'}
                href='/medicos'
                type="reset"
                className="mt-2"
                color="danger"
                outline
              >
                Cancelar
              </Button>
            </Col>
          </Form>
    </div>
  );
};

export default EditarMedico;
