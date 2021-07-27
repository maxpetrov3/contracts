import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Container, Toast, Collapse, Row, Col, Modal, Alert, Nav, Tab } from 'react-bootstrap';
import ContractService from '../../../services/ContractService';
import moment from 'moment'
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom'

var contract
var user

class ContractPlan extends Component {
    constructor(props) {
        super(props);

        user = JSON.parse(window.localStorage.getItem('user'))

        if (props.location.data !== undefined) {
            contract = props.location.data.contract
            window.localStorage.setItem('contractData', JSON.stringify(this.props.location.data));
        } else {
            var data = JSON.parse(window.localStorage.getItem('contractData'))
            contract = data.contract
        }
        this.state = {
            contractTasks: [],
            commentOpen: [],
            modalInput: false,
            changeStatusModalInput: false,
            taskName: "",
            taskNameError: true,
            taskAbout: "",
            taskAboutError: true,
            taskDate: "",
            taskDateError: true,
            changeStatusError: true,
            changeStatusComment: "",
            changeStatusTask: "",
            mothsTabs: [{ id: "1", value: 'Январь' }, { id: "2", value: 'Февраль' }, { id: "3", value: 'Март' }, { id: "4", value: 'Апрель' },
            { id: "5", value: 'Май' }, { id: "6", value: 'Июнь' }, { id: "7", value: 'Июль' }, { id: "8", value: 'Август' }, { id: "9", value: 'Сентябрь' },
            { id: "10", value: 'Октябрь' }, { id: "11", value: 'Ноябрь' }, { id: "12", value: 'Декабрь' }],
            curentMonth: new Date().getMonth() + 1
        }
    }

    componentDidMount() {
        ContractService.getContractTasks(contract.contractId).then((tasks) => {
            this.setState({ contractTasks: tasks.data })
        });
    }

    saveComment = (commentParams) => {
        var comment = new Object()
        comment.comment = commentParams.text
        comment.commentDate = moment(new Date()).format("YYYY-MM-DD")
        comment.task = commentParams.field
        comment.executor = user

        ContractService.saveTaskComment(comment)
        console.log(this.state.contractTasks)
        this.state.contractTasks.find(x => x.id == commentParams.field).taskComments.push(comment)
        this.setState(this.state)
    }

    saveTask() {
        if (this.state.taskNameError === false &&
            this.state.taskAboutError === false &&
            this.state.taskDateError === false) {
            var task = new Object()
            task.aboutTask = this.state.taskAbout
            task.contractId = contract.contractId.trim()
            task.endDate = moment(this.state.taskDate).format("YYYY-MM-DD")
            task.taskName = this.state.taskName
            task.taskStatus = "Не выполнено"
            this.setState({ modalInput: false })
            ContractService.saveTask(task)
        }
    }

    buildMonthTabs() {
        var renderList = []

        this.state.mothsTabs.map(month => {
            renderList.push(
                <Nav.Item>
                    <Nav.Link eventKey={month.id}>{month.value}</Nav.Link>
                </Nav.Item>
            )
        });

        return renderList
    }

    buildTabsContent() {
        var renderList = []

        this.state.mothsTabs.map(month => {
            renderList.push(
                <Tab.Pane eventKey={month.id} className="col-sm-12">
                    <ListGroup variant="flush">
                        {this.taskListCostructor(month.id)}
                    </ListGroup>
                </Tab.Pane>
            )
        });

        return renderList
    }

    changeTaskStatus(task) {
        if (task.taskStatus === "Не выполнено") {
            this.state.contractTasks.find(x => x.id == task.id).taskStatus = "Выполнено"
        } else {
            this.state.contractTasks.find(x => x.id == task.id).taskStatus = "Не выполнено"
        }
        ContractService.saveTask(task)
        this.state.changeStatusModalInput = false
        this.state.changeStatusError = true
        this.setState(this.state)
    }

    taskListCostructor(month) {
        var renderList = []
        var taskColor = ""

        this.state.contractTasks.map(task => {
            moment(task.endDate) < new Date() ? taskColor = "danger" : taskColor = "primary";
            task.taskStatus == "Выполнено" ? taskColor = "success" : taskColor = taskColor;
            this.state.commentOpen.push({ field: task.id, open: false, text: "" })

            if (new Date(task.endDate).getMonth() + 1 == month) {
                renderList.push(
                    <ListGroup.Item>
                        <Card border={taskColor} style={{ width: '40rem' }}>
                            <Card.Header className={"bg-" + taskColor}>
                                <Row>
                                    <Col className="col-sm-8"> {task.taskName + " (" + task.taskStatus + ")"}</Col>
                                    <Col className="d-flex align-items-center justify-content-end">
                                        {
                                            taskColor == "success"
                                                ? <button className="btn btn-outline-light"
                                                    onClick={() => {
                                                        this.state.changeStatusTask = task
                                                        this.state.changeStatusModalInput = true
                                                        this.setState(this.state)
                                                    }}
                                                >Вернуть в работу</button>

                                                : <button className="btn btn-outline-light"
                                                    onClick={() => {
                                                        this.state.changeStatusTask = task
                                                        this.state.changeStatusModalInput = true
                                                        this.setState(this.state)
                                                    }}
                                                >Закрыть задачу</button>
                                        }
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {task.aboutTask}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Срок исполнения: {moment(task.endDate).format("DD.MM.YYYY")}</ListGroup.Item>
                                <ListGroup.Item>
                                    <Button variant="outline-primary mb-3"
                                        onClick={() => {
                                            this.state.commentOpen.find(x => x.field == task.id).open == false ?
                                                this.state.commentOpen.find(x => x.field == task.id).open = true :
                                                this.state.commentOpen.find(x => x.field == task.id).open = false;
                                            this.setState(this.state)
                                        }}
                                        aria-controls={task.id}
                                        aria-expanded={this.state.commentOpen}
                                    >
                                        Комментарии
                                </Button>
                                    <Collapse in={this.state.commentOpen.find(x => x.field == task.id).open}>
                                        <div id={task.id}>
                                            {task.taskComments.map(comment =>
                                                <Toast show={true}>
                                                    <Toast.Header closeButton={false}>
                                                        <strong className="mr-auto">{comment.executor.ex_name}</strong>
                                                        <small>{moment(comment.commentDate).format("DD.MM.YYYY")}</small>
                                                    </Toast.Header>
                                                    <Toast.Body>{comment.comment}</Toast.Body>
                                                </Toast>
                                            )
                                            }
                                            <div className="form-group row mt-3">
                                                <label htmlFor="cId" className="col-sm-3 col-form-label">Коментарий:</label>
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control" id="cId"
                                                        value={this.state.commentOpen.find(x => x.field == task.id).text}
                                                        onChange={value => {
                                                            this.state.commentOpen.find(x => x.field == task.id).text = value.target.value;
                                                            this.setState(this.state)
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-sm-1">
                                                    <Button variant="outline-primary"
                                                        onClick={() => this.saveComment(this.state.commentOpen.find(x => x.field == task.id))}
                                                    >Добавить
                                                </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Collapse>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </ListGroup.Item>
                );
            }
        });
        renderList.push(<ListGroup.Item style={{ width: '40rem' }}></ListGroup.Item>)
        return (renderList)
    }

    render() {
        return (
            <Container className="mt-2 col-sm-8">
                <Row className='mb-1 sticky-top bg-white' style={{ top: 70 }}>
                    <Col className="col-sm-8">
                        <h2>Календарный график договора {contract.contractId}</h2>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-end">
                        <Button variant="outline-primary" className="mr-2"
                            onClick={() => this.setState({ modalInput: true })}
                        >Добавить событие</Button>
                        <Link to={{ pathname: '/myContracts' }} >
                            <Button variant="outline-secondary" >Отмена</Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Tab.Container id="tabs" defaultActiveKey={this.state.curentMonth} >
                        <Row>
                            <Col sm={3} >
                                <Nav variant="tabs" className="flex-column sticky-top" style={{ top: 125 }}>
                                    {this.buildMonthTabs()}
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    {this.buildTabsContent()}
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                    <Modal show={this.state.modalInput} >
                        <Modal.Header closeButton={false}>
                            <Modal.Title>Новое событие</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Col>
                                <Row>
                                    <label className="col-sm-2">Название</label>
                                </Row>
                                <Row>
                                    <input type="text" className="form-control" id="cId" value={this.state.taskName}
                                        onChange={(value) => {
                                            value.target.value.length > 0 ? this.state.taskNameError = false : this.state.taskNameError = true
                                            this.setState({ taskName: value.target.value, taskNameError: this.state.taskNameError })
                                        }} />
                                </Row>
                                <Row>
                                    <Alert className="mt-1 col-sm-12" variant="danger" show={this.state.taskNameError}>Укажите название события!</Alert>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <label className="col-sm-2 mt-1">Описание</label>
                                </Row>
                                <Row>
                                    <input type="text" className="form-control" id="cId" value={this.state.taskAbout}
                                        onChange={(value) => {
                                            value.target.value.length > 0 ? this.state.taskAboutError = false : this.state.taskAboutError = true
                                            this.setState({ taskAbout: value.target.value, taskAboutError: this.state.taskAboutError })
                                        }} />
                                </Row>
                                <Row>
                                    <Alert className="mt-1 col-sm-12" variant="danger" show={this.state.taskAboutError}>Укажите описание события!</Alert>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <label className="col-sm-12 mt-1">Срок исполнения</label>
                                </Row>
                                <Row>
                                    <DatePicker className="form-control" id='cDate' dateFormat="dd.MM.yyyy" selected={this.state.taskDate}
                                        onChange={(date) => {
                                            date <= new Date() ? this.state.taskDateError = true : this.state.taskDateError = false
                                            this.setState({ taskDate: date, taskDateError: this.state.taskDateError })
                                        }} />
                                </Row>
                                <Row>
                                    <Alert className="mt-1 col-sm-12" variant="danger" show={this.state.taskDateError}>Укажите корректную дату!</Alert>
                                </Row>
                            </Col>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-primary" onClick={() => this.saveTask()}>Сохранить</Button>
                            <Button variant="outline-secondary" onClick={() => this.setState({ modalInput: false })}>Отмена</Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.changeStatusModalInput} >
                        <Modal.Header closeButton={false}>
                            <Modal.Title>
                                {this.state.changeStatusTask.taskStatus === "Не выполнено"
                                    ? "Закрыть задачу"
                                    : "Открыть задачу"
                                }
                                {" '" + this.state.changeStatusTask.taskName + "'"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Col>
                                <Row>
                                    <label className="col-sm-2">Коментарий:</label>
                                </Row>
                                <Row>
                                    <input type="text" className="form-control" id="cId"
                                        onChange={(value) => {
                                            value.target.value.length > 0 ? this.state.changeStatusError = false : this.state.changeStatusError = true
                                            this.state.changeStatusComment = { field: this.state.changeStatusTask.id, text: value.target.value }
                                            this.setState(this.state)
                                        }} />
                                </Row>
                                <Row>
                                    <Alert className="mt-1 col-sm-12" variant="danger" show={this.state.changeStatusError}>Укажите причину!</Alert>
                                </Row>
                            </Col>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-primary" 
                            onClick={() => {
                                this.saveComment(this.state.changeStatusComment)
                                this.changeTaskStatus(this.state.changeStatusTask)
                                }}>Сохранить</Button>
                            <Button variant="outline-secondary" onClick={() => this.setState({ changeStatusModalInput: false })}>Отмена</Button>
                        </Modal.Footer>
                    </Modal>
                </Row>
            </Container>
        );
    }
}
export default ContractPlan;