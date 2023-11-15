"use client";
import React from "react";
import { Col, Navbar } from "reactstrap";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { links } from "@/Router/routes";
import NavLinks from "./NavLinks";

const NavBar = () => {
  const pathname = usePathname();


  return (
    <
      
    >
      <div
        className=" d-md-none d-flex justify-content-evenly "
        style={{ width: "100%", height:'100%' }}
      >
        <NavLinks vertical={false} />
      </div>
      <div className="d-none d-md-flex justify-content-center ">Clinica Testeo</div>
    </>
  );
};

export default NavBar;
