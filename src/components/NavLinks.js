"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/Router/routes";
import { Col } from "reactstrap";

const NavLinks = ({ vertical }) => {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return vertical ? (
          <Link
            key={link.name}
            href={link.href}
            className={`${pathname == link.href ? 'bg-info bg-gradient' : '' } nav-link d-flex h-[48px] grow align-items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover-bg-sky-100 hover:text-blue-600 md-flex-none md-justify-start md-p-2 md-px-3 `}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md-block p-0 m-0 ms-2">{link.name}</p>
          </Link>
        ) : (
          <Col className="" key={link.name}>
            <Link
              href={link.href}
              className={`${
                pathname == link.href ? "bg-info bg-gradient" : ""
              } nav-link h-100 d-flex flex-column justify-content-center align-items-center py-2 items-center text-sm font-medium md-flex-none md-justify-start px-2 `}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md-block m-0">{link.name}</p>
            </Link>
          </Col>
        );
      })}
    </>
  );
};

export default NavLinks;
