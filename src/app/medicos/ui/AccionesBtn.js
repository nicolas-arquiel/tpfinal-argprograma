import React from "react";
import { Edit2, Trash2 } from "react-feather";
import { Button, Spinner, UncontrolledTooltip } from "reactstrap";

const AccionesBtn = ({ id, idmateria }) => {
  const handleEditarMedico = () => {
    const inscribir = {
      idalumno: idAlumno,
      idcomision: idcomision,
      userid: user_id,
      idmateria: idmateria,
      idcatedra: idcatedra,
    };
  };

  const handleBorrarMedico = () => {
    const baja = {
      idalumno: idAlumno,
      userid: user_id,
      idmateria: idmateria,
      idcomision: idcomision,
      idcatedra: idcatedra,
    };
  };

  return (
    <div
      className=" d-flex align-items-center gap-4 "
      style={{ width: "100%" }}
    >
      <Edit2 style={{cursor:'pointer'}} onClick={handleEditarMedico} id={`editar-${id}`} size={20} />
      <UncontrolledTooltip placement="top" target={`editar-${id}`}>
        Editar datos del medico
      </UncontrolledTooltip>

      <Trash2 style={{cursor:'pointer'}} onClick={handleBorrarMedico} id={`borrar-${id}`} size={20} />
      <UncontrolledTooltip
        onClick={handleBorrarMedico}
        placement="top"
        target={`borrar-${id}`}
      >
        Borrar medico
      </UncontrolledTooltip>
    </div>
  );
};

export default AccionesBtn;
