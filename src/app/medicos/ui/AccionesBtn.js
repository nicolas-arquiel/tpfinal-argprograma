

import { deleteMedico } from "@/api/medicos/mutation";
import useCustomAlert from "@/hooks/useCustomAlert";
import React from "react";
import { Edit2, Edit3, Trash2 } from "react-feather";
import { UncontrolledTooltip } from "reactstrap";
import Link from "next/link";

const AccionesBtn = async({ props }) => {
  const { showConfirmAlert, simpleAlert, loadingAlert } = useCustomAlert();

  const { id, nombre } = props


  const handleBorrarMedico = () => {
    showConfirmAlert({
      title: "Confirmación de borrar medico",
      message: `Estás a punto de borrar un medico: ${nombre}`,
      icon: "warning",
      confirmButtonText: "Borrar Medico",
      onConfirm: () => {
        loadingAlert();
        deleteMedico(id)
        .then((res)=>{
          simpleAlert({
            title: "Carga exitosa!",
            message: res || 'El medico fue eliminado con exito!',
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
    <Link className="m-0 p-0 text-body" href={`/medicos/editar/${id}`} >
      <Edit3  style={{cursor:'pointer'}} id={`editar-${id}`} size={20}/>
        </Link>
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
