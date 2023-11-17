import React from "react";
import { Input, Label, Col } from "reactstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";

const NuevoTurnoInputs = ({ control, pacientes, estados, medicos, onPacienteChange }) => {
  
  const infoMedico = [
    {
      label: "Paciente",
      id: "paciente_id",
      name: "paciente_id",
      placeholder: "Selecciona una especialidad...",
      type: "select",
      defaultValue: "PENDIENTE",
      isMultiple: false,
      options: pacientes,
    },
    {
      label: "Medico",
      id: "medico_id",
      name: "medico_id",
      placeholder: "Selecciona una especialidad...",
      type: "select",
      defaultValue: "PENDIENTE",
      isMultiple: false,
      options: medicos,
      noOptionsMessage:'No hay medicos con la obra social del paciente'
    },
    {
      label: "Fecha",
      id: "fecha",
      name: "fecha",
      type: "date",
      defaultValue: "PENDIENTE",
    },
    {
      label: "Hora",
      id: "hora",
      name: "hora",
      type: "time",
      defaultValue: "PENDIENTE",
    },
    {
      label: "Estado",
      id: "estado_id",
      name: "estado_id",
      placeholder: "Selecciona una especialidad...",
      type: "select",
      defaultValue: "PENDIENTE",
      isMultiple: false,
      options: estados,
    },
    {
      label: "Notas",
      id: "notas",
      name: "notas",
      type: "area",
      defaultValue: "PENDIENTE",
    },
  ];

  return (
    <>
      <Col md="12" sm="12" className="mb-1 ">
        <h4>Informacion del turno</h4>
        {infoMedico.map((item) => {
          return (
            <Col key={item.id} md="12" sm="12" className="mb-2">
              <Label className="form-label mb-0" htmlFor={item.name}>
                {item.label}
              </Label>
              <Controller
                control={control}
                id={item.id}
                name={item.name}
                defaultValue={""}
                render={({ field }) => (
                  <>
                    {item.type === "select" ? (
                      <Select
                        placeholder={item.placeholder}
                        options={item.options}
                        onChange={(selectedOptions) => {
                          let selectedValues;

                          if (item.isMultiple) {
                            selectedValues = selectedOptions
                              ? selectedOptions.map((option) => option.value)
                              : [];
                          } else {
                            selectedValues = selectedOptions ? selectedOptions.value : "";
                          }

                          field.onChange(selectedValues);
                          onPacienteChange(selectedOptions); // Llama a la función con las opciones seleccionadas
                        }}
                        isMulti={item.isMultiple}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        noOptionsMessage={() => item.noOptionsMessage}
                      />
                    ) : (
                      <Input
                        id={item.id}
                        name={item.name}
                        type={item.type}
                        value={""}
                        placeholder={item.placeholder}
                        className="form-control border-2"
                        {...field}
                      />
                    )}
                  </>
                )}
              />
            </Col>
          );
        })}
      </Col>
    </>
  );
};

export default NuevoTurnoInputs;

