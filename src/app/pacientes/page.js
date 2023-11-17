'use server'
import BreadCrumbs from "@/components/BreadCrumbs";
import React, { Suspense } from "react";
import TablaPacientes from "./ui/TablaPacientes";

const page = async () => {

  return (
    <>
      <BreadCrumbs
        title="Listado de pacientes"
        data={[{ title: "Pacientes" }]}
      />
        <Suspense fallback={<div>Obteniendo datos...</div>}>
          <TablaPacientes  />

        </Suspense>

    </>
  );
};

export default page;
