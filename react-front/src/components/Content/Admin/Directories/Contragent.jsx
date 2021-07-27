import { React, useState, useEffect } from 'react'
import DirectionService from '../../../../services/DirectoriesService'
import { Container, Row, Col, Button, Table, Modal, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Contragent() {
    const [params, setParams] = useState({
        contragentsList: [],
        newContragentModal: false,
        newContragent: "",
        errors: {
            contragentIdErr: "",
            contrEqualsIdErr: "",
            nameErr: "",
            descriptionErr: ""
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            const result = await DirectionService.getAllContragents()

            setParams(ps => {
                return { ...ps, contragentsList: result.data }
            })
        };

        fetchData();
    }, [])

    function saveContragent() {
        if (
            params.errors.contragentIdErr === false &
            params.errors.nameErr === false &
            params.errors.contrEqualsIdErr === false &
            params.errors.descriptionErr === false
        ) {
            DirectionService.saveContragent(params.newContragent)
            if (params.newContragent.id == "") {
                params.contragentsList.push(params.newContragent)
            }else{
                params.contragentsList[params.contragentsList.findIndex(x => x.id == params.newContragent.id)] = params.newContragent
            }
            setParams(ps => {
                return {
                    ...ps,
                    newContragent: "",
                    newContragentModal: false
                }
            })
        }
    }

    const searchContragent = async (text) => {
        if (text !== "") {
            const result = await DirectionService.searchContragent(text)
            setParams(ps => {
                return {
                    ...ps,
                    contragentsList: result.data
                }
            })
        } else {
            const result = await DirectionService.getAllContragents()
            setParams(ps => {
                return {
                    ...ps,
                    contragentsList: result.data
                }
            })
        }
    }

    return (
        <Container>
            <Container className="flex-column sticky-top" >
                <Row className="mt-3">
                    <Col>
                        <h2>Котрагенты</h2>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-end">
                        <Button variant="outline-primary"
                            onClick={() =>
                                setParams(ps => {
                                    return {
                                        ...ps,
                                        newContragentModal: true,
                                        errors: {
                                            contragentIdErr: true,
                                            contrEqualsIdErr: false,
                                            nameErr: true,
                                            descriptionErr: true,
                                        }
                                    }
                                })
                            }
                        >Новый контрагент
                    </Button>
                    </Col>
                </Row>
                <Row className="mt-3 mb-3">
                    <Col className="d-flex align-items-center justify-content-end">
                        <input type="search" className="form-control" id="cId" placeholder="Поиск по идентификатору"
                            onChange={(val) => searchContragent(val.target.value)}
                        />
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Table>
                        <thead>
                            <tr>
                                <th>Идентификатор</th>
                                <th>Название</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {params.contragentsList.map(contragent =>
                                <tr>
                                    <td>{contragent.contragent_id}</td>
                                    <td>{contragent.name}</td>
                                    <td>
                                        <OverlayTrigger overlay={<Tooltip>Редактировать</Tooltip>}>
                                            <Link onClick={() =>
                                                setParams(ps => {
                                                    return {
                                                        ...ps,
                                                        newContragentModal: true,
                                                        newContragent: contragent,
                                                        errors: {
                                                            ...ps.errors,
                                                            contragentIdErr: false,
                                                            contrEqualsIdErr: false,
                                                            nameErr: false,
                                                            descriptionErr: false
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
                show={params.newContragentModal}
                onHide={() =>
                    setParams(ps => {
                        return {
                            ...ps,
                            newContragentModal: false,
                            newContragent: "",
                        }
                    })
                }
            >
                <Modal.Header>
                    <Modal.Title>{params.newContragent !== "" ? "Редактировать" : "Новый контрагент"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col>
                        <Row>
                            <label className="col-sm-2">Идентификатор</label>
                        </Row>
                        <Row>
                            <input type="text" className="form-control" id="cId" value={params.newContragent !== undefined ? params.newContragent.contragent_id : ""}
                                onChange={(value) => {
                                    value.target.value.length > 0
                                        ?
                                        params.contragentsList.find(x => x.contragent_id === value.target.value) !== undefined
                                            ?
                                            setParams(ps => {
                                                return {
                                                    ...ps,
                                                    newContragent: { ...ps.newContragent, contragent_id: value.target.value },
                                                    errors: { ...ps.errors, contragentIdErr: false, contrEqualsIdErr: true }
                                                }
                                            })
                                            :
                                            setParams(ps => {
                                                return {
                                                    ...ps,
                                                    newContragent: { ...ps.newContragent, contragent_id: value.target.value },
                                                    errors: { ...ps.errors, contragentIdErr: false, contrEqualsIdErr: false }
                                                }
                                            })
                                        :
                                        setParams(ps => {
                                            return {
                                                ...ps,
                                                newContragent: { ...ps.newContragent, contragent_id: value.target.value },
                                                errors: { ...ps.errors, contragentIdErr: true, contrEqualsIdErr: false }
                                            }
                                        })
                                }} />
                        </Row>
                        <Row>
                            <Alert className="mt-1 col-sm-12" variant="danger" show={params.errors.contragentIdErr}>Укажите идентификатор!</Alert>
                        </Row>
                        <Row>
                            <Alert className="mt-1 col-sm-12" variant="danger" show={params.errors.contrEqualsIdErr}>Контрагент с таким идентификатором уже существует!</Alert>
                        </Row>
                        <Row>
                            <label className="col-sm-2">Название</label>
                        </Row>
                        <Row>
                            <input type="text" className="form-control" id="cId" value={params.newContragent !== undefined ? params.newContragent.name : ""}
                                onChange={(value) => {
                                    value.target.value.length > 0
                                        ?
                                        setParams(ps => {
                                            return {
                                                ...ps, newContragent: { ...ps.newContragent, name: value.target.value },
                                                errors: { ...ps.errors, nameErr: false }
                                            }
                                        })
                                        :
                                        setParams(ps => {
                                            return {
                                                ...ps, newContragent: { ...ps.newContragent, name: value.target.value },
                                                errors: { ...ps.errors, nameErr: true }
                                            }
                                        })
                                }} />
                        </Row>
                        <Row>
                            <Alert className="mt-1 col-sm-12" variant="danger" show={params.errors.nameErr}>Укажите название контрагента!</Alert>
                        </Row>
                        <Row>
                            <label className="col-sm-2">Описание</label>
                        </Row>
                        <Row>
                            <input type="textarea" className="form-control" id="cId" value={params.newContragent !== undefined ? params.newContragent.description : ""}
                                onChange={(value) => {
                                    value.target.value.length > 0
                                        ?
                                        setParams(ps => {
                                            return {
                                                ...ps, newContragent: { ...ps.newContragent, description: value.target.value },
                                                errors: { ...ps.errors, descriptionErr: false }
                                            }
                                        })
                                        :
                                        setParams(ps => {
                                            return {
                                                ...ps, newContragent: { ...ps.newContragent, description: value.target.value },
                                                errors: { ...ps.errors, descriptionErr: true }
                                            }
                                        })
                                }} />
                        </Row>
                        <Row>
                            <Alert className="mt-1 col-sm-12" variant="danger" show={params.errors.descriptionErr}>Укажите описание контрагента!</Alert>
                        </Row>
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary"
                        onClick={() => {
                            saveContragent()
                        }}>
                        Сохранить</Button>
                    <Button variant="outline-secondary"
                        onClick={() => {
                            setParams(ps => {
                                return { ...ps, newContragentModal: false, newContragent: "" }
                            })
                        }
                        }>
                        Отмена</Button>
                </Modal.Footer>
            </Modal>
        </Container>

    )
}
export default Contragent
