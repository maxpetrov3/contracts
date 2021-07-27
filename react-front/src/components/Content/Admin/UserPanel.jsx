
import React, { useEffect, useState } from 'react'
import { Container, Table, Modal, Col, Row, Alert, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Select from 'react-select';
import { Link } from 'react-router-dom'
import UserService from '../../../services/UserService'
import ModalHeader from 'react-bootstrap/esm/ModalHeader';


function UserPanel() {
    const [params, setParams] = useState({
        userList: [],
        modalOpen: false,
        passModalOpen: false,
        changeUser: "",
        nameErr: false,
        positionErr: false,
        loginErr: false,
        passErr: false,
        secondPassword: "",
        selectedRole: { value: 1, label: "ADMIN" }
    })


    useEffect(() => {
        const fetchData = async () => {
            const result = await UserService.getUsers()

            setParams(ps => {
                return { ...ps, userList: result.data }
            })
        };

        fetchData();
    }, [])


    function saveUser() {
        if (params.nameErr === false &
            params.positionErr === false &
            params.loginErr === false &
            params.passErr === false) {
            UserService.createUser(params.changeUser)
            setParams(ps => {
                return { ...ps, modalOpen: false, changeUser: "" }
            })
            window.location.reload()
        }
    }

    return (
        <Container>
            <Row className="mb-3 mt-3">
                <Col>
                    <h2>Пользователи</h2>
                </Col>
                <Col className="d-flex align-items-center justify-content-end">
                    <Button variant="outline-primary"
                        onClick={() =>
                            setParams(ps => {
                                return { ...ps, modalOpen: true, nameErr: true, positionErr: true, loginErr: true }
                            })
                        }
                    >Новый пользователь</Button>
                </Col>
            </Row>
            <Table>
                <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Должость</th>
                        <th>Роли</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {params.userList.map(user => user ?
                        <tr>
                            <td>{user.ex_name}</td>
                            <td>{user.position}</td>
                            <td>{user.role}</td>
                            <td>
                                <OverlayTrigger overlay={<Tooltip>Редактировать</Tooltip>}>
                                    <Link onClick={() =>
                                        user.role === "USER" ?
                                            setParams(prevState => {
                                                return { ...prevState, modalOpen: true, changeUser: user, nameErr: false, positionErr: false, loginErr: false, selectedRole: { value: 2, label: "USER" } }
                                            })
                                            :
                                            setParams(prevState => {
                                                return { ...prevState, modalOpen: true, changeUser: user, nameErr: false, positionErr: false, loginErr: false, selectedRole: { value: 1, label: "ADMIN" } }
                                            })
                                    }>
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                        </svg>
                                    </Link>
                                </OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>Сменить пароль</Tooltip>}>
                                    <Link className="ml-3"
                                        onClick={() =>
                                            setParams(ps => {
                                                return { ...ps, passModalOpen: true, changeUser: user }
                                            })
                                        }>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
                                            <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" />
                                        </svg>
                                    </Link>
                                </OverlayTrigger>
                            </td>
                        </tr>
                        : null)}
                </tbody>
            </Table>
            <Modal
                show={params.modalOpen}
                onHide={() =>
                    setParams(prevState => {
                        return { ...prevState, modalOpen: false, changeUser: "" }
                    })}>
                <Modal.Header closeButton={false}>
                    <Modal.Title>Редактировать</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col>
                        <Row>
                            <label className="col-sm-2">ФИО</label>
                        </Row>
                        <Row>
                            <input type="text" className="form-control" id="cId" value={params.changeUser !== undefined ? params.changeUser.ex_name : ""}
                                onChange={(value) => {
                                    value.target.value.length > 0
                                        ?
                                        setParams(ps => {
                                            return { ...ps, changeUser: { ...ps.changeUser, ex_name: value.target.value }, nameErr: false }
                                        })
                                        :
                                        setParams(ps => {
                                            return { ...ps, changeUser: { ...ps.changeUser, ex_name: value.target.value }, nameErr: true }
                                        })
                                }} />
                        </Row>
                        <Row>
                            <Alert className="mt-1 col-sm-12" variant="danger" show={params.nameErr}>Укажите ФИО!</Alert>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <label className="col-sm-2 mt-3">Должность</label>
                        </Row>
                        <Row>
                            <input type="text" className="form-control" id="cId" value={params.changeUser !== undefined ? params.changeUser.position : ""}
                                onChange={(value) => {
                                    value.target.value.length > 0
                                        ?
                                        setParams(ps => {
                                            return { ...ps, changeUser: { ...ps.changeUser, position: value.target.value }, positionErr: false }
                                        })
                                        :
                                        setParams(ps => {
                                            return { ...ps, changeUser: { ...ps.changeUser, position: value.target.value }, positionErr: true }
                                        })
                                }} />
                        </Row>
                        <Row>
                            <Alert className="mt-1 col-sm-12" variant="danger" show={params.positionErr}>Укажите должность!</Alert>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <label className="col-sm-2 mt-3">Логин</label>
                        </Row>
                        <Row>
                            <input type="text" className="form-control" id="cId" value={params.changeUser !== undefined ? params.changeUser.login : ""}
                                onChange={(value) => {
                                    value.target.value.length > 0
                                        ?
                                        setParams(ps => {
                                            return { ...ps, changeUser: { ...ps.changeUser, login: value.target.value }, loginErr: false }
                                        })
                                        :
                                        setParams(ps => {
                                            return { ...ps, changeUser: { ...ps.changeUser, login: value.target.value }, loginErr: true }
                                        })
                                }} />
                        </Row>
                        <Row>
                            <Alert className="mt-1 col-sm-12" variant="danger" show={params.loginErr}>Укажите логин!</Alert>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <label className="col-sm-2 mt-3">Роль</label>
                        </Row>
                        <Row>
                            <Select className="col-sm-12 mb-5"
                                options={[{ value: 1, label: "ADMIN" }, { value: 2, label: "USER" }]}
                                value={params.selectedRole}
                                name='roleSelector'
                                onChange={selection => {
                                    selection.length > 0
                                        ?
                                        setParams(ps => {
                                            return { ...ps, changeUser: { ...ps.changeUser, role: selection.label }, selectedRole: selection }
                                        })
                                        :
                                        setParams(ps => {
                                            return { ...ps, changeUser: { ...ps.changeUser, role: selection.label }, selectedRole: selection }
                                        })

                                }
                                }
                                isSearchable={true}
                            />
                        </Row>
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary"
                        onClick={() => {
                            saveUser()
                        }}>
                        Сохранить</Button>
                    <Button variant="outline-secondary"
                        onClick={() => {
                            setParams(ps => {
                                return { ...ps, modalOpen: false, changeUser: "" }
                            })
                        }
                        }>
                        Отмена</Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={params.passModalOpen}
                onHide={() =>
                    setParams(ps => {
                        return { ...ps, changeUser: "", passModalOpen: false }
                    })
                }
            >
                <Modal.Header>Сменить пароль</Modal.Header>
                <Modal.Body>
                    <Col>
                        <Row>
                            <label className="col-sm-8">Новый пароль</label>
                        </Row>
                        <Row>
                            <input type="password" className="form-control" id="cId" value={params.secondPassword}
                                onChange={(value) => {
                                    value.target.value.length > 0
                                        ?
                                        setParams(ps => {
                                            return { ...ps, secondPassword: value.target.value, passErr: false }
                                        })
                                        :
                                        setParams(ps => {
                                            return { ...ps, secondPassword: value.target.value, passErr: true }
                                        })
                                }} />
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <label className="col-sm-8">Новый пароль</label>
                        </Row>
                        <Row>
                            <input type="password" className="form-control" id="cId" value={params.changeUser.password}
                                onChange={(value) => {
                                    value.target.value === params.secondPassword
                                        ?
                                        setParams(ps => {
                                            return { ...ps, changeUser: { ...ps.changeUser, password: value.target.value }, passErr: false }
                                        })
                                        :
                                        setParams(ps => {
                                            return { ...ps, changeUser: { ...ps.changeUser, password: value.target.value }, passErr: true }
                                        })
                                }} />
                        </Row>
                        <Row>
                            <Alert className="mt-1 col-sm-12" variant="danger" show={params.passErr}>Пароли не совпадают!</Alert>
                        </Row>
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary"
                        onClick={() => {
                            saveUser()
                        }}>
                        Сохранить</Button>
                    <Button variant="outline-secondary"
                        onClick={() => {
                            setParams(ps => {
                                return { ...ps, passModalOpen: false, changeUser: "" }
                            })
                        }
                        }>
                        Отмена</Button>
                </Modal.Footer>
            </Modal>
        </Container>

    )
}
export default UserPanel