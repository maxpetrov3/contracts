import {React, useState} from 'react'
import { Container, Row, Col, Modal, Alert, Nav, Tab } from 'react-bootstrap';
import Contragent from './Contragent'
import PayRule from './PayRules'

function Directions(){
    const [tabs, setTab] = useState({
        contragent: 1,
        payRules: 2
    })

    return(
        <Container className="mt-2 col-sm-10">
            <Tab.Container id="tabs" defaultActiveKey={tabs.contragent}>
                <Row>
                    <Col sm={3}>
                        <Nav variant="tabs" className="flex-column sticky-top" style={{ top: 125 }}>
                            <Nav.Item>
                                <Nav.Link eventKey={tabs.contragent}>Котрагенты</Nav.Link>
                                <Nav.Link eventKey={tabs.payRules}>Условия оплаты</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                        <Col sm={9}>
                        <Tab.Content>
                           
                                <Tab.Pane eventKey={tabs.contragent} className="col-sm-12">
                                    <Contragent/>
                                </Tab.Pane>
                                <Tab.Pane eventKey={tabs.payRules} className="col-sm-12">
                                    <PayRule/>
                                </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
}
export default Directions