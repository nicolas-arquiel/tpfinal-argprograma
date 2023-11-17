import React from "react";
import { FileText, Calendar, Edit, Bell, Briefcase } from "react-feather";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
const Funcionalidades = () => {
  return (
    <>
      <Card className="mb-3 overflow-auto border-0">
        <CardHeader>
          <CardTitle tag={"h5"}>Este sistema te permitirá:</CardTitle>
        </CardHeader>
        <CardBody>
          <ListGroup>
            <ListGroupItem className="d-flex">
              <span className="me-3">
                <Briefcase size={20} />
              </span>
              <span>
                Gestionar la creación, edición y eliminación de registros
                médicos.
              </span>
            </ListGroupItem>
            <ListGroupItem className="d-flex">
              <span className="me-3">
                <FileText size={20} />
              </span>
              <span>
                Administrar la creación, edición y eliminación de registros de
                pacientes.
              </span>
            </ListGroupItem>
            <ListGroupItem className="d-flex">
              <span className="me-3">
                <Edit size={20} />
              </span>
              <span>
                Facilitar la creación, modificación de estado y eliminación de
                registros de turnos.
              </span>
            </ListGroupItem>

            <ListGroupItem className="d-flex">
              <span className="me-3">
                <Bell size={20} />
              </span>
              <span>
                Generar y mantener estadísticas de médicos, turnos y pacientes.
              </span>
            </ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    </>
  );
};

export default Funcionalidades;
