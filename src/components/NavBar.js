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
    <Link className="d-none d-md-flex justify-content-end align-items-center h-100  m-0 p-0  bg-primary bg-gradient nav-link" href={'/'} >
        <h2 className="fw-bolder text-white mx-3 p-3 rounded-3" > SaludInnova</h2>
    </Link>
    </>
  );
};

export default NavBar;
