

import { deleteMedico } from "@/api/medicos/mutation";
import useCustomAlert from "@/hooks/useCustomAlert";
import React from "react";
import { CheckCircle, Clock, Edit2, Edit3, MoreVertical, Trash2, XCircle } from "react-feather";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, UncontrolledTooltip } from "reactstrap";
import Link from "next/link";
import NotaPaciente from "./NotaPaciente";
import { updateEstadoTurno } from "@/api/turnos/mutation";

const AccionesBtn = async({ props }) => {
  const { showConfirmAlert, simpleAlert, loadingAlert } = useCustomAlert();
  console.log(props);
  const { id, notas, nombre_paciente } = props
  

  const dropdownItems = [
    {
      id:crypto.randomUUID(),
      label: 'Programado',
      value: 1,
      icon: <Clock size={18} className="me-2" />,
    },
    {
      id:crypto.randomUUID(),
      label: 'Cancelado',
      value: 2,
      icon: <XCircle size={18} className="me-2" />,
  },
    {
      id:crypto.randomUUID(),
      label: 'Completado',
      value: 3,
      icon: <CheckCircle size={18} className="me-2" />,
  },
  ]




  const handleCambiarEstado = (data) => {
    console.log(data);
    showConfirmAlert({
      title: "Confirmación de cambio de estado",
      message: `Estás a punto de cambiar el estado del  turno a ${data.label}`,
      icon: "warning",
      confirmButtonText: "Cambiar estado",
      onConfirm: () => {
        loadingAlert();
        updateEstadoTurno({id: data.id, estado_id: data.value})
        .then((res)=>{
          simpleAlert({
            title: "Cambio de estado exitoso!",
            message: res || 'El estado se cambio con exito!',
            icon: "success",
          })
      })
      .catch((err) =>
        simpleAlert({
          title: "Error al cambiar de estado",
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
      
      <NotaPaciente notas={notas} nombre={nombre_paciente} id={id} />

      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={20} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu container="body">
        {
          dropdownItems && dropdownItems.map((item)=>(

            <DropdownItem
                  key={item.id}
                  className="w-100 py-2"
                  onClick={()=>handleCambiarEstado({...item,id})}
                >
                  {item.icon}
                  <span className="align-middle">{item.label}</span>
                </DropdownItem>

          ))
        }

    
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default AccionesBtn;
