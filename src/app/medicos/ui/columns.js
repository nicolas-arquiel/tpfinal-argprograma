'use client'
import { Progress } from "reactstrap";
import AccionesBtn from "./AccionesBtn";

// ** Table columns
export const columns = [
  {
    name: "Nombre",
    cell: (row) => <span>{row.nombre}</span>,
  },
  {
    name: "Especialidad",
    cell: (row) => <span>{row.nombre_especialidad}</span>,
  },
  {
    name: "Email",
    cell: (row) => <span>{row.email}</span>,
  },
  {
    name: "telefono",
    cell: (row) => <span>{row.numero_telefono}</span>,
  },
  {
    name: "Obras sociales",
    cell: (row) => <span>{row.nombres_obras_sociales}</span>,
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
