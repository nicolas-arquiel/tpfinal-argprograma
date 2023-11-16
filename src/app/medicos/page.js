'use server'
import BreadCrumbs from "@/components/BreadCrumbs";
import React, { Suspense } from "react";
import TablaMedicos from "./ui/TablaMedicos";

const page = async () => {

  return (
    <>
      <BreadCrumbs
        title="Listado de medicos"
        data={[{ title: "Medicos" }]}
      />
        <Suspense fallback={<div>Obteniendo datos...</div>}>
          <TablaMedicos  />

        </Suspense>

    </>
  );
};

export default page;
