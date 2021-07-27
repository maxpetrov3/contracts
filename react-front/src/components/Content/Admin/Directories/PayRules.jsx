import { React, useState, useEffect } from 'react'
import DirectionService from '../../../../services/DirectoriesService'
import { Container, Row, Col, Button, Table, Modal, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function PayRule() {
    const [params, setParams] = useState({
        payRulesList: [],
        newPayRuleModal: false,
        newPayRule: "",
        errors: {
            codeErr: false,
            codeEqualsErr: false,
            nameErr: false,
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            const result = await DirectionService.getAllPayRules()

            setParams(ps => {
                return { ...ps, payRulesList: result.data }
            })
        };

        fetchData();
    }, [])

    function savePayRule() {
        if (
            params.errors.codeErr === false &
            params.errors.nameErr === false &
            params.errors.codeEqualsErr === false
        ) {
            DirectionService.savePayRule(params.newPayRule)
            if (params.newPayRule.id == "") {
                params.payRulesList.push(params.newPayRule)
            }else{
                params.payRulesList[params.payRulesList.findIndex(x => x.id == params.newPayRule.id)] = params.newPayRule
            }
            setParams(ps => {
                return {
                    ...ps,
                    newPayRule: "",
                    newPayRuleModal: false
                }
            })
        }
    }

    const searchPayRule = async (text) => {
        if (text !== "") {
            const result = await DirectionService.searchPayRule(text)
            setParams(ps => {
                return {
                    ...ps,
                    payRulesList: result.data
                }
            })
        } else {
            const result = await DirectionService.getAllPayRules()
            setParams(ps => {
                return {
                    ...ps,
                    payRulesList: result.data
                }
            })
        }
    }

    return (
        <Container>
            <Container className="flex-column sticky-top" >
                <Row className="mt-3">
                    <Col>
                        <h2>Условия оплаты</h2>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-end">
                        <Button variant="outline-primary"
                            onClick={() =>
                                setParams(ps => {
                                    return {
                                        ...ps,
                                        newPayRuleModal: true,
                                        errors: {
                                            codeErr: true,
                                            codeEqualsErr: false,
                                            nameErr: true,
                                        }
                                    }
                                })
                            }
                        >Новое условие
                    </Button>
                    </Col>
                </Row>
                <Row className="mt-3 mb-3">
                    <Col className="d-flex align-items-center justify-content-end">
                        <input type="search" className="form-control" id="cId" placeholder="Поиск по коду"
                            onChange={(val) => searchPayRule(val.target.value)}
                        />
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Table>
                        <thead>
                            <tr>
                                <th>Код</th>
                                <th>Название</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {params.payRulesList.map(payRule =>
                                <tr>
                                    <td>{payRule.code}</td>
                                    <td>{payRule.name}</td>
                                    <td>
                                        <OverlayTrigger overlay={<Tooltip>Редактировать</Tooltip>}>
                                            <Link onClick={() =>
                                                setParams(ps => {
                                                    return {
                                                        ...ps,
                                                        newPayRuleModal: true,
                                                        newPayRule: payRule,
                                                        errors: {
                                                            ...ps.errors,
                                                            codeErr: false,
                                                            codeEqualsErr: false,
                                                            nameErr: false,
                                                        }
                                                    }
                                                })
                                            }>
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                </svg>
                                            </Link>
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Row>
            </Container>
            <Modal
                show={params.newPayRuleModal}
                onHide={() =>
                    setParams(ps => {
                        return {
                            ...ps,
                            newPayRuleModal: false,
                            newPayRule: "",
                        }
                    })
                }
            >
                <Modal.Header>
                    <Modal.Title>{params.newPayRule !== "" ? "Редактировать" : "Новое условие"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col>
                        <Row>
                            <label className="col-sm-2">Код</label>
                        </Row>
                        <Row>
                            <input type="text" className="form-control" id="cId" value={params.newPayRule !== undefined ? params.newPayRule.code : ""}
                                onChange={(value) => {
                                    value.target.value.length > 0
                                        ?
                                        params.payRulesList.find(x => x.code === value.target.value) !== undefined
                                            ?
                                            setParams(ps => {
                                                return {
                                                    ...ps,
                                                    newPayRule: { ...ps.newPayRule, code: value.target.value },
                                                    errors: { ...ps.errors, codeErr: false, codeEqualsErr: true }
                                                }
                                            })
                                            :
                                            setParams(ps => {
                                                return {
                                                    ...ps,
                                                    newPayRule: { ...ps.newPayRule, code: value.target.value },
                                                    errors: { ...ps.errors, codeErr: false, codeEqualsErr: false }
                                                }
                                            })
                                        :
                                        setParams(ps => {
                                            return {
                                                ...ps,
                                                newPayRule: { ...ps.newPayRule, code: value.target.value },
                                                errors: { ...ps.errors, codeErr: true, codeEqualsErr: false }
                                            }
                                        })
                                }} />
                        </Row>
                        <Row>
                            <Alert className="mt-1 col-sm-12" variant="danger" show={params.errors.codeErr}>Укажите идентификатор условия!</Alert>
                        </Row>
                        <Row>
                            <Alert className="mt-1 col-sm-12" variant="danger" show={params.errors.codeEqualsErr}>Условие с таким кодом уже существует!</Alert>
                        </Row>
                        <Row>
                            <label className="col-sm-2">Название</label>
                        </Row>
                        <Row>
                            <input type="text" className="form-control" id="cId" value={params.newPayRule !== undefined ? params.newPayRule.name : ""}
                                onChange={(value) => {
                                    value.target.value.length > 0
                                        ?
                                        setParams(ps => {
                                            return {
                                                ...ps, newPayRule: { ...ps.newPayRule, name: value.target.value },
                                                errors: { ...ps.errors, nameErr: false }
                                            }
                                        })
                                        :
                                        setParams(ps => {
                                            return {
                                                ...ps, newPayRule: { ...ps.newPayRule, name: value.target.value },
                                                errors: { ...ps.errors, nameErr: true }
                                            }
                                        })
                                }} />
                        </Row>
                        <Row>
                            <Alert className="mt-1 col-sm-12" variant="danger" show={params.errors.nameErr}>Укажите название условия!</Alert>
                        </Row>
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary"
                        onClick={() => {
                            savePayRule()
                        }}>
                        Сохранить</Button>
                    <Button variant="outline-secondary"
                        onClick={() => {
                            setParams(ps => {
                                return { ...ps, newPayRuleModal: false, newPayRule: "" }
                            })
                        }
                        }>
                        Отмена</Button>
                </Modal.Footer>
            </Modal>
        </Container>

    )
}
export default PayRule
