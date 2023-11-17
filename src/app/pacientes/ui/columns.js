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
    name: "Email",
    cell: (row) => <span>{row.email}</span>,
  },
  {
    name: "telefono",
    cell: (row) => <span>{row.numero_telefono}</span>,
  },
  {
    name: "Obra social",
    cell: (row) => <span>{row.obra_social}</span>,
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
