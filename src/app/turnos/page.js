'use server'
import BreadCrumbs from "@/components/BreadCrumbs";
import React, { Suspense } from "react";
import TablaTurnos from "./ui/TablaTurnos";

const page = async () => {

  return (
    <>
    <BreadCrumbs
      title="Listado de turnos"
      data={[{ title: "Turnos" }]}
    />
        <Suspense fallback={<div>Obteniendo datos...</div>}>
          <TablaTurnos  />

        </Suspense>

    </>
  );
};

export default page;
