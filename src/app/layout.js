import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNav from "@/components/SideNav";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Navbar,
  NavbarBrand,
  Row,
} from "reactstrap";
import NavBar from "@/components/NavBar";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Clinica",
  description: "Clinica Argentina programa",
};

export default function RootLayout({ children }) {


  return (
    <html
      style={{ height: "100%", width: "100%", boxSizing: "border-box", backgroundColor:'##f8f8f8' }}
      lang="es"
    >
      <body  suppressHydrationWarning={true} style={{ height: "100%", width: "100%", boxSizing: "border-box", backgroundColor:'#f8f8f8' }}>
        <Card
        className="p-0 m-0"
          style={{ height: "100%", width: "100%", boxSizing: "border-box", backgroundColor:'#f8f8f8' }}
        >
          <CardBody className="p-0 m-0">
            <Row className="p-0 m-0 d-flex h-100">
              <Col
                xs="0"
                sm="0"
                md="3"
                lg="3"
                xl="2"
                className="p-0 m-0 nav flex-column nav-pills d-none d-md-flex"
              >
                <SideNav />
              </Col>
              <Col
                xs="12"
                sm="12"
                md="9"
                lg="9"
                xl="10"
                className="p-0 m-0 "
              >
              <Card
                 style={{ height: "100%", width: "100%", boxSizing: "border-box", backgroundColor:'#f8f8f8' }}
              >
                <CardHeader className="d-flex justify-content-end align-items-center m-0 p-0" style={{ height: "10%", backgroundColor:'#f8f8f8'}} >
                <NavBar/>

                </CardHeader>
                <CardBody className="px-xl-5 px-4"  style={{ height: "85%", backgroundColor:'#f8f8f8' }}>
                {children}

                </CardBody>
                <CardFooter  style={{ height: "5%", backgroundColor:'#f8f8f8' }} >
                  <Link href={'https://github.com/nicolas-arquiel?tab=repositories'} target="_blank" className="nav-link text-primary">Clinica, Argentina Programa</Link>
                  
                </CardFooter>
              </Card>


              </Col>
            </Row>
          </CardBody>
        </Card>
      </body>
    </html>
  );
}
