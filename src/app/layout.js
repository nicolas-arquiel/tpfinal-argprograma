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

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Clinica",
  description: "Clinica Argentina programa",
};

export default function RootLayout({ children }) {


  return (
    <html
      style={{ height: "100%", width: "100%", boxSizing: "border-box" }}
      lang="es"
    >
      <body  suppressHydrationWarning={true} style={{ height: "100%", width: "100%", boxSizing: "border-box" }}>
        <Card
        className="p-0 m-0"
          style={{ height: "100%", width: "100%", boxSizing: "border-box" }}
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
                 style={{ height: "100%", width: "100%", boxSizing: "border-box" }}
              >
                <CardHeader className="d-flex justify-content-center align-items-center m-0 p-0" style={{ height: "10%"}} >
                <NavBar/>

                </CardHeader>
                <CardBody style={{ height: "85%" }}>
                <div >{children}</div>

                </CardBody>
                <CardFooter  style={{ height: "5%" }} >
                  asd
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
