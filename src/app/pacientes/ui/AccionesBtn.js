

import useCustomAlert from "@/hooks/useCustomAlert";
import React from "react";
import { Edit2, Edit3, Trash2 } from "react-feather";
import { UncontrolledTooltip } from "reactstrap";
import Link from "next/link";
import { deletePaciente } from "@/api/pacientes/mutation";

const AccionesBtn = async({ props }) => {
  const { showConfirmAlert, simpleAlert, loadingAlert } = useCustomAlert();

  const { id, nombre } = props


  const handleBorrarPaciente = () => {
    showConfirmAlert({
      title: "Confirmación de borrar paciente",
      message: `Estás a punto de borrar un paciente: ${nombre}`,
      icon: "warning",
      confirmButtonText: "Borrar paciente",
      onConfirm: () => {
        loadingAlert();
        deletePaciente(id)
        .then((res)=>{
          simpleAlert({
            title: "Carga exitosa!",
            message: res || 'El paciente fue eliminado con exito!',
            icon: "success",
          })
      })
      .catch((err) =>
        simpleAlert({
          title: "Error al cargar",
          message: err,
          icon: "error",
        }
      ))

      },
    }); 

  };

  return (
    <div
      className=" d-flex align-items-center gap-4 "
      style={{ width: "100%" }}
    >
    <Link className="m-0 p-0 text-body" href={`/pacientes/editar/${id}`} >
      <Edit3  style={{cursor:'pointer'}} id={`editar-${id}`} size={20}/>
        </Link>
      <UncontrolledTooltip placement="top" target={`editar-${id}`}>
        Editar datos del paciente
      </UncontrolledTooltip>

      <Trash2 style={{cursor:'pointer'}} onClick={handleBorrarPaciente} id={`borrar-${id}`} size={20} />
      <UncontrolledTooltip
        placement="top"
        target={`borrar-${id}`}
      >
        Borrar Paciente
      </UncontrolledTooltip>
    </div>
  );
};

export default AccionesBtn;
