import React from "react";
import { Input, Label, Col } from "reactstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";

const NuevoMedicoInputs = ({ control, obrassociales, especialidades }) => {
  const infoMedico = [
    {
      label: "Nombre completo",
      id: "nombre",
      name: "nombre",
      type: "text",
      defaultValue: "PENDIENTE",
    },
    {
      label: "Especialidad",
      id: "especialidad_id",
      name: "especialidad_id",
      placeholder: "Selecciona una especialidad...",
      type: "select",
      defaultValue: "PENDIENTE",
      isMultiple: false,
      options: especialidades,
    },
    {
      label: "Email",
      id: "email",
      name: "email",
      type: "email",
      defaultValue: "PENDIENTE",
    },
    {
      label: "Numero de telefono",
      id: "numero_telefono",
      name: "numero_telefono",
      type: "tel",
      defaultValue: "PENDIENTE",
    },
    {
      label: "Obra social",
      id: "obra_social_id",
      name: "obra_social_id",
      type: "select",
      placeholder: "Selecciona una obra social...",
      defaultValue: "PENDIENTE",
      isMultiple: true,
      options: obrassociales,
    },
  ];

  return (
    <>
      <Col md="12" sm="12" className="mb-1 ">
        <h4>Informacion del medico</h4>
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
                            selectedValues = selectedOptions.value;
                          }

                          field.onChange(selectedValues);
                        }}
                        isMulti={item.isMultiple}
                        onBlur={field.onBlur}
                        value={item.options.filter((option) =>
                          item.isMultiple
                            ? field.value.includes(option.value)
                            : field.value === option.value
                        )}
                        name={field.name}
                        ref={field.ref}
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

export default NuevoMedicoInputs;
