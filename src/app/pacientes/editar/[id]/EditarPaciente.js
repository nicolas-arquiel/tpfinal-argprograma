"use client";
import React from "react";
import {
  Row,
  Col,
  Button,
  Form,
} from "reactstrap";

import { useForm } from "react-hook-form";
import useCustomAlert from "@/hooks/useCustomAlert";
import Inputs from "./Inputs";
import { useRouter } from "next/navigation";
import { updatePaciente } from "@/api/pacientes/mutation";

const EditarPaciente = ({ obrassociales, props }) => {
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
      updatePaciente(data)
        .then(() => {
          simpleAlert({
            title: "Edicion exitosa!",
            message: "El paciente se edito con éxito.",
            icon: "success",
          });
          router.push('/pacientes');
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
 
          <h3 className=" mb-2 ">Editar datos del paciente </h3>
          <h4 className="  mb-5"> {props.nombre} </h4>
          <Form className="gy-1 gx-2" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Inputs
                control={control}
                obrassociales={obrassociales}
              />
            </Row>
            <Col className="text-center mt-5" xs={12}>
              <Button type="submit" className="me-3 mt-2" color="primary">
                Editar datos
              </Button>
              <Button
                tag={'a'}
                href='/pacientes'
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

export default EditarPaciente;
