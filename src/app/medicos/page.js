import { getMedicos } from "@/api/get";
import BreadCrumbs from "@/components/BreadCrumbs";
import React from "react";

const page = async () => {
  const data = await getMedicos();
  console.log(data);
  return (
    <>
      <BreadCrumbs
        title="Listado de medicos"
        data={[{ title: "Medicos" }]}
      />
    </>
  );
};

export default page;
