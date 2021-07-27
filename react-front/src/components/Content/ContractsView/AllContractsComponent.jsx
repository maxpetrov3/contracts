import React, { Component } from 'react';
import ContractService from '../../../services/ContractService';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import { OverlayTrigger } from 'react-bootstrap'
import { Tooltip } from 'react-bootstrap'


class AllContractsComponent extends Component {
    constructor() {
        super();
        this.state = {
            contracts: []
        }
    }

    componentDidMount() {
        ContractService.getAllContracts().then((res) => {
            this.setState({ contracts: res.data })
        })

    }

    serchIt = (event) => {
        const query = event.target.value;
        ContractService.serchContracts(query).then((res) => {
            this.setState({ contracts: res.data })
        });
        this.render();

    };

    deleteContract(contract) {
        console.log(contract)
        // ContractService.deleteContract(contract);
    }

    render() {
        return (
            <div>
                <div className='row mt-3 ml-1 mr-1 mb-2'>
                    <div className='col-lg text-left'>
                        <h2>Все договоры</h2>
                    </div>
                    <div className="col-sm text-right">
                        <Link to={
                            {
                                pathname: '/contractInfo',
                                data: { 'contract': {}, 'action': 'new' }
                            }
                        }>
                            <Button variant='primary'>Новый договор</Button>
                        </Link>
                    </div>
                    <div className='col-sm text-right'>
                        <input type="text" className='form-control' placeholder='Поиск' onChange={this.serchIt} />
                    </div>
                </div>
                <div className="row ml-3 mr-3">
                    <table className='table'>
                        <thead className='thead-dark'>
                            <tr>
                                <th scope='col'>№</th>
                                <th scope='col'>Описание</th>
                                <th scope='col'>Стоимость</th>
                                <th scope='col'>Статус</th>
                                <th scope='col'>Оператор</th>
                                <th scope='col' className='text-center'>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.contracts.map(
                                    contract =>
                                        contract ? (<tr key={contract.id}>
                                            <td>{contract.contractId}</td>
                                            <td>{contract.aboutContractShort}</td>
                                            <td>{contract.contractPrice}</td>
                                            <td>{contract.contractStatus.status_name}</td>
                                            <td>{contract.executor.ex_name}</td>
                                            <td className='text-center'>
                                                <OverlayTrigger overlay={<Tooltip>Подробнее</Tooltip>}>
                                                    <Link to={
                                                        {
                                                            pathname: '/contractInfo',
                                                            data: { 'contract': contract, 'action': 'read' }

                                                        }
                                                    }>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square" viewBox="0 0 16 16">
                                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                                        </svg>
                                                    </Link>
                                                </OverlayTrigger>
                                            </td>
                                        </tr>) : null)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default AllContractsComponent;