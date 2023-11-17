import StatsHorizontal from "@/components/StatsHorizontal";
import {
  Activity,
  AlertOctagon,
  DollarSign,
  FileText,
  Calendar,
  Edit,
  Mail,
  Bell,
  Briefcase,
} from "react-feather";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  ListGroup,
  ListGroupItem,
  Badge,
  CardFooter,
} from "reactstrap";
import Funcionalidades from "./_iu/Funcionalidades";
import Stats from "./_iu/Stats";
import { getPacientes } from "@/api/pacientes/get";
import { getMedicos } from "@/api/medicos/get";
import { getTurnos, getTurnosCompletados } from "@/api/turnos/get";
import Bienvenida from "./_iu/Bienvenida";

export default async function Home () {

  const pacientes = (await getPacientes()).length
  const medicos = (await getMedicos()).length
  const turnos = (await getTurnos()).length
  const turnosCompletados = (await getTurnosCompletados()).length
  
  
  

  return (
    <main className="d-flex flex-column" style={{height:'100%', width:'100%'}} >
    <Col style={{height:'50%'}}  className=" p-0 m-0 " >
        <Bienvenida/>
        {/* <Stats pacientes={pacientes} medicos={medicos} turnos={turnos} turnosCompletados={turnosCompletados} /> */}
    </Col>
    <Col style={{height:'50%'}} className="d-flex flex-column justify-content-end p-0 m-0 " >
        <Funcionalidades/>
    </Col>
      
    </main>
  );
}
