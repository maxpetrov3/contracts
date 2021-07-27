import React, { Component } from 'react';
import ContractService from '../../../services/ContractService';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import { OverlayTrigger } from 'react-bootstrap'
import { Tooltip } from 'react-bootstrap'



class ContractComponent extends Component {
    constructor() {
        super();
        this.state = {
            contracts: []
        }
        
    }

    componentDidMount() {
       var user = JSON.parse(window.localStorage.getItem('user'))
        ContractService.getUserContracts(user.id).then((res) => {
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


    render() {
        return (
            <div>
                <div className='row mt-3 ml-1 mr-1 mb-2'>
                    <div className='col-lg text-left'>
                        <h2>Мои договоры</h2>
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
                                            <td className='text-center'>
                                                <OverlayTrigger overlay={<Tooltip>Редактировать</Tooltip>}>
                                                    <Link to={
                                                        {
                                                            pathname: '/contractInfo',
                                                            data: { 'contract': contract, 'action': 'edit' }

                                                        }
                                                    }>
                                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                        </svg>
                                                    </Link>
                                                </OverlayTrigger>
                                                <OverlayTrigger overlay={<Tooltip>По образцу</Tooltip>}>
                                                    <Link className="ml-3" to={
                                                        {
                                                            pathname: '/contractInfo',
                                                            data: { 'contract': contract, 'action': 'dublicate' }

                                                        }
                                                    }>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-files" viewBox="0 0 16 16">
                                                            <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" />
                                                        </svg>
                                                    </Link>
                                                </OverlayTrigger>
                                                <OverlayTrigger overlay={<Tooltip>Календарный график</Tooltip>}>
                                                    <Link className="ml-3" to={
                                                        {
                                                            pathname: '/contractPlan',
                                                            data: { 'contract': contract, 'action': 'edit' }

                                                        }
                                                    }>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-checklist" viewBox="0 0 16 16">
                                                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                                                            <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
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

export default ContractComponent;