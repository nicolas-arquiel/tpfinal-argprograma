import React from 'react'
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

const Stats = ({ pacientes, medicos, turnos, turnosCompletados  }) => {

  return (
    <>
        <Row className="mt-2">
        <Col lg="3" sm="6" className="mb-3">
          <StatsHorizontal
            icon={<FileText size={40} />}
            stats={pacientes}
            statTitle="Cantidad total de medicos"
          />
        </Col>
        <Col lg="3" sm="6" className="mb-3">
          <StatsHorizontal
            icon={<DollarSign size={40} />}
            stats={medicos}
            statTitle="Cantidad total de pacientes"
          />
        </Col>
        <Col lg="3" sm="6" className="mb-3">
          <StatsHorizontal
            icon={<Activity size={40} />}
            stats={turnos}
            statTitle="Cantidad total de turnos"
          />
        </Col>
        <Col lg="3" sm="6" className="mb-3">
          <StatsHorizontal
            icon={<AlertOctagon size={40} />}
            stats={turnosCompletados}
            statTitle="Cantidad total de turnos realizados"
          />
        </Col>
      </Row>
    </>
  )
}

export default Stats