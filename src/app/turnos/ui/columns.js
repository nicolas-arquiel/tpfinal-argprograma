'use client'
import { Progress } from "reactstrap";
import AccionesBtn from "./AccionesBtn";

// ** Table columns
export const columns = [
  {
    name: "Paciente",
    cell: (row) => <span>{row.nombre_paciente}</span>,
  },
  {
    name: "Medico",
    cell: (row) => <span>{row.nombre_medico}</span>,
  },
  {
    name: "Especialidad",
    cell: (row) => <span>{row.especialidad_medico}</span>,
  },
  {
    name: "Obra social",
    cell: (row) => <span>{row.nombre_obrasocial_paciente}</span>,
  },
  {
    name: "Fecha",
    cell: (row) => <span>{row.fecha_formateada}</span>,
  },
  {
    name: "Hora",
    cell: (row) => <span>{row.hora}</span>,
  },
  {
    name: "Estado",
    cell: (row) => <span>{row.nombre_estado}</span>,
  },
  {
    name: "Acciones",
    minWidth: "150px",
    cell: (row) => (
      <AccionesBtn
          props={row}
      />
    ),
  }
];
