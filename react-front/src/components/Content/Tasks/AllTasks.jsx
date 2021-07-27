import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import { Container, Row, Col, Tabs, Tab, Collapse, Toast, Button } from 'react-bootstrap';
import ContractService from '../../../services/ContractService';
import moment from 'moment'


class AllTasks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contractTasks: [],
            commentOpen: []
        }


    }

    componentDidMount() {
        ContractService.getAllTasks().then((tasks) => {
            this.setState({ contractTasks: tasks.data })
        });
        
    }


    taskListCostructor(type) {
        var actualList = []
        var historyList = []
        var taskColor = ""

        this.state.contractTasks.map(task => {
            moment(task.endDate) < new Date() ? taskColor = "danger" : taskColor = "primary";
            task.taskStatus == "Выполнено" ? taskColor = "success" : taskColor = taskColor;
            this.state.commentOpen.push({ field: task.id, open: false})

            var renderItem = (
                <ListGroup.Item>
                    <Card border={taskColor}>
                        <Card.Header className={"bg-" + taskColor}>{task.taskName + " (" + task.taskStatus + ")"}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {task.aboutTask}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Срок исполнения: {moment(task.endDate).format("DD.MM.YYYY")}</ListGroup.Item>
                            <ListGroup.Item>Договор: {task.contractId}</ListGroup.Item>
                            {task.taskComments.length > 0
                            ? <ListGroup.Item>
                                    <Button variant="outline-primary mb-3"
                                        onClick={() => {
                                            this.state.commentOpen.find(x => x.field == task.id).open === false
                                            ? this.state.commentOpen.find(x => x.field == task.id).open = true 
                                            : this.state.commentOpen.find(x => x.field == task.id).open = false
                                            this.setState(this.state)
                                            console.log(this.state.commentOpen)
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
                                        </div>
                                    </Collapse>
                                </ListGroup.Item>
                                : <ListGroup.Item>"Нет комментариев"</ListGroup.Item>
                            }
                        </ListGroup>
                    </Card>
                </ListGroup.Item>
            )

            if (moment(task.endDate) < new Date()) {
                historyList.push(renderItem)
            } else {
                actualList.push(renderItem)
            }
        });
        if (type === "curent") {
            return actualList
        } else {
            return historyList
        }
    }

    render() {
        return (
            <Container className="mt-2 col-sm-8">
                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="Текущие задачи">
                        <Row className='mb-1'>
                            <Col className="col-sm-8 mt-3">
                                <h1>Календарный график</h1>
                            </Col>
                        </Row>
                        <ListGroup variant="flush">
                            {this.taskListCostructor("curent")}
                        </ListGroup>
                    </Tab>
                    <Tab eventKey="profile" title="История">
                        <Row className='mb-1'>
                            <Col className="col-sm-8 mt-3">
                                <h1>История</h1>
                            </Col>
                        </Row>
                        <ListGroup variant="flush">
                            {this.taskListCostructor("history")}
                        </ListGroup>
                    </Tab>
                </Tabs>

            </Container>
        );
    }
}
export default AllTasks;