import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment'
import Select from 'react-select';
import { Link } from 'react-router-dom'

import DirectoiresService from '../../../services/DirectoriesService';
import ContractService from '../../../services/ContractService'


import 'react-datepicker/dist/react-datepicker.css';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';



var contract
var action


class ContractInfoComponent extends Component {
    constructor(props) {
        super(props);

        if (props.location.data !== undefined) {
            contract = props.location.data.contract
            action = props.location.data.action
            window.localStorage.setItem('contractData', JSON.stringify(this.props.location.data));
        } else {
            var data = JSON.parse(window.localStorage.getItem('contractData'))
            contract = data.contract
            action = data.action
        }
        this.state = {
            //переменные
            contractId: ' ',
            ds_id: ' ',
            urId: ' ',
            curentStatus: { value: "", label: "" },
            curentDirection: { value: "", label: "" },
            executor: { value: "", label: "" },
            curentContragent: ' ',
            aboutContract: ' ',
            aboutContractShort: ' ',
            contractPrice: ' ',
            curentCurrency: { value: "", label: "" },
            payRules: [],
            finPositions: [],
            curentKreditor: { value: "", label: "" },
            curentTender: { value: "", label: "" },
            costTypes: [],
            curentDisPr: { value: "", label: "" },
            curentPostPay: { value: "", label: "" },
            investProject: ' ',
            rks: { value: "", label: "" },
            contractDate: '',
            beginContractDate: '',
            endContractDate: '',
            //справочники
            allStatuses: [],
            allDirections: [],
            allExecutors: [],
            allContragents: [],
            allCurrency: [],
            allPayRules: [],
            allFinPositions: [],
            allKreditors: [],
            allTenders: [],
            allCostTypes: [],
            allDisProtocols: [],
            allPostPays: [],
            //индикаторы ошибок
            modalError: false,
            errors: {
                contractIdError: true,
                statusError: true,
                directionError: true,
                urIdError: true,
                executorError: true,
                contractDateError: true,
                beginContractDateError: true,
                endContractDateError: true,
                contragentError: true,
                aboutError: true,
                currencyError: true,
                payRulesError: true,
                finPositionsError: true,
                kreditorError: true,
                tenderError: true,
                costTypesError: true,
                disProtocolError: true,
                postPayError: true,
                rksError: true
            }
        }

        this.state.allStatuses = this.getStatusList();
        this.state.allDirections = this.getDirectionsList();
        this.state.allExecutors = this.getExecutorsList();
        this.state.allContragents = this.getAllContragentsList();
        this.state.allCurrency = this.getAllCurrencyList();
        this.state.allPayRules = this.getAllPayRulesList();
        this.state.allFinPositions = this.getAllFinPositions();
        this.state.allKreditors = this.getAllKreditorsList();
        this.state.allTenders = this.getAllTendersList();
        this.state.allCostTypes = this.getAllCostTypesList();
        this.state.allDisProtocols = this.getAllDisPrList();
        this.state.allPostPays = this.getAllPostPaysList();
        this.fillData()
    }



    fillData() {
        if (action == "edit" || action == "dublicate" || action == "read") {
            this.state.contractId = contract.contractId
            this.state.ds_id = contract.ds_id
            this.state.urId = contract.urId
            this.state.curentDirection = { value: contract.directionId, label: contract.directionId.name }
            this.state.curentStatus = { value: contract.contractStatus, label: contract.contractStatus.status_name }
            this.state.contractDate = Date.parse(moment(contract.contractDate).format("yyyy-MM-DD"))
            this.state.beginContractDate = Date.parse(moment(contract.beginContractDate).format("yyyy-MM-DD"))
            this.state.endContractDate = Date.parse(moment(contract.endContractDate).format("yyyy-MM-DD"))
            this.state.executor = { value: contract.executor, label: contract.executor.ex_name }
            this.state.curentContragent = { value: contract.contragent, label: contract.contragent.contragent_id + " - " + contract.contragent.name }
            this.state.aboutContract = contract.aboutContract
            this.state.aboutContractShort = contract.aboutContractShort
            this.state.contractPrice = contract.contractPrice
            this.state.curentCurrency = { value: contract.currency, label: contract.currency.name }
            this.state.payRules = []
            this.state.finPositions = []
            this.state.curentKreditor = { value: contract.kreditor, label: contract.kreditor.name }
            this.state.curentTender = { value: contract.tender, label: contract.tender.name }
            this.state.costTypes = []
            this.state.curentDisPr = { value: contract.disProtocol, label: contract.disProtocol.name }
            this.state.curentPostPay = { value: contract.postPay, label: contract.postPay.name }
            this.state.investProject = contract.investProject
            this.state.rks = { value: contract.rks, label: "Нет" }
            contract.payRules.map(val => this.state.payRules.push({ value: val, label: val.code + " - " + val.name }))
            contract.fmPositions.map(val => this.state.finPositions.push({ value: val, label: val.name }))
            contract.costsTypes.map(val => this.state.costTypes.push({ value: val, label: val.name }))

            this.state.errors = Object.fromEntries(
                Object.entries(this.state.errors)
                    .map(([key, val]) => [key, false])
            );
        }

    }

    saveChanges = async (event) =>  {

        var error = false
        Object.entries(this.state.errors).map(([key, val]) => val == true ? error = true : null)
        if (action === "dublicate"){
            contract.id = ''
        }

        if (!error) {
            await ContractService.saveContract(contract)
            this.props.history.push('/myContracts')
        } else {
            this.setState({ modalError: true })
        }
    }

    getStatusList() {
        var varList = [];
        DirectoiresService.getAllStatuses().then((result) =>
            result.data.map(v => varList.push({ value: v, label: v.status_name })))
        return varList;
    }

    getDirectionsList() {
        var varList = [];
        DirectoiresService.getAllDirections().then((result) =>
            result.data.map(v => varList.push({ value: v, label: v.name })))
        return varList;
    }

    getExecutorsList() {
        var varList = [];
        DirectoiresService.getAllExecutors().then((result) =>
            result.data.map(v => varList.push({ value: v, label: v.ex_name })))
        return varList;
    }

    getAllContragentsList() {
        var varList = [];
        DirectoiresService.getAllContragents().then((result) =>
            result.data.map(dir => varList.push({ value: dir, label: dir.contragent_id + " - " + dir.name })))
        return varList;
    }

    getAllCurrencyList() {
        var varList = [];
        DirectoiresService.getAllCurrency().then((result) =>
            result.data.map(dir => varList.push({ value: dir, label: dir.name })))
        return varList;
    }
    getAllPayRulesList() {
        var varList = [];
        DirectoiresService.getAllPayRules().then((result) =>
            result.data.map(dir => varList.push({ value: dir, label: dir.code + " - " + dir.name })))
        return varList;
    }

    getAllFinPositions() {
        var varList = [];
        DirectoiresService.getAllFinPositions().then((result) =>
            result.data.map(dir => varList.push({ value: dir, label: dir.name })))
        return varList;
    }

    getAllKreditorsList() {
        var varList = [];
        DirectoiresService.getAllKreditors().then((result) =>
            result.data.map(dir => varList.push({ value: dir, label: dir.name })))
        return varList;
    }

    getAllTendersList() {
        var varList = [];
        DirectoiresService.getAllTenders().then((result) =>
            result.data.map(dir => varList.push({ value: dir, label: dir.name })))
        return varList;
    }

    getAllCostTypesList() {
        var varList = [];
        DirectoiresService.getAllCostTypes().then((result) =>
            result.data.map(dir => varList.push({ value: dir, label: dir.name })))
        return varList;
    }

    getAllDisPrList() {
        var varList = [];
        DirectoiresService.getAllDisProtocols().then((result) =>
            result.data.map(dir => varList.push({ value: dir, label: dir.name })))
        return varList;
    }

    getAllPostPaysList() {
        var varList = [];
        DirectoiresService.getAllPostPays().then((result) =>
            result.data.map(dir => varList.push({ value: dir, label: dir.name })))
        return varList;
    }

    isReadOnly(){
        if(action !== 'read'){
            return(
                <div className="form-group row sticky-top bg-white" style={{ top: 75 }}>
                    <div className="col-lg text-align-left">
                        <h3>Режим редактирования</h3>
                    </div>
                    <div className="justify-content-end">
                    <Button className="mr-3" variant="primary" onClick={this.saveChanges}>Сохранить</Button>
                    <Link to={{ pathname: '/myContracts' }}>
                        <Button variant="secondary">Отмена</Button>
                    </Link>
                    </div>
                </div>
            );
        }else{
            return(
                <div className="form-group row justify-content-start sticky-top bg-white" style={{ top: 75 }}>
                    <div className="col-sm">
                    <Link to={{ pathname: "/contracts" }}>
                        <Button variant="primary">Назад</Button>
                    </Link>
                    </div>
                    <div className="col-lg text-align-right">
                        <h3>Режим чтения</h3>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <Container className="mt-3 mb-3 mb-5" >
                {this.isReadOnly()}
                <div className="form-group row justify-content-end">
                    <label htmlFor="cId" className="col-sm-2 col-form-label">Номер договора</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="cId" value={this.state.contractId}
                            onChange={(value) => {
                                value.target.value.length > 0 ? this.state.errors.contractIdError = false : this.state.errors.contractIdError = true
                                this.setState({ contractId: value.target.value, errors: this.state.errors })
                                contract.contractId = value.target.value
                            }
                            } />
                    </div>
                    <div className="col-sm-10">
                        <Alert className="mt-1" variant="danger" show={this.state.errors.contractIdError}>Укажите номер договора!</Alert>
                    </div>
                </div>
                <div className="form-group row justify-content-end">
                    <label htmlFor="statusSelector" className="col-sm-2 col-form-label">Статус договора</label>
                    <div className="col-sm-10">
                        <Select
                            value={this.state.curentStatus}
                            options={this.state.allStatuses}
                            name='statusSelector'
                            onChange={selected => {
                                this.state.errors.statusError = false
                                this.setState({ curentStatus: selected, errors: this.state.errors })
                                contract.contractStatus = selected.value
                            }
                            }
                        />
                    </div>
                    <div className="col-sm-10">
                        <Alert className="mt-1" variant="danger" show={this.state.errors.statusError}>Укажите статус договора!</Alert>
                    </div>
                </div>
                <div className="form-group row justify-content-end">
                    <label htmlFor="directionSelector" className="col-sm-2 col-form-label">Направление</label>
                    <div className="col-sm-10">
                        <Select
                            value={this.state.curentDirection}
                            options={this.state.allDirections}
                            name='directionSelector'
                            onChange={selected => {
                                this.state.errors.directionError = false
                                this.setState({ curentDirection: selected, errors: this.state.errors })
                                contract.directionId = selected.value
                            }
                            }
                        />
                    </div>
                    <div className="col-sm-10">
                        <Alert className="mt-1" variant="danger" show={this.state.errors.directionError}>Укажите направление деятельности!</Alert>
                    </div>
                </div>
                <div className="form-group row justify-content-end">
                    <label htmlFor="urId" className="col-sm-2 col-form-label">Юридический номер</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="urId" value={this.state.urId}
                            onChange={(value) => {
                                value.target.value.length > 0 ? this.state.errors.urIdError = false : this.state.errors.urIdError = true
                                this.setState({ urId: value.target.value, errors: this.state.errors })
                                contract.urId = value.target.value
                            }
                            }
                        />
                    </div>
                    <div className="col-sm-10">
                        <Alert className="mt-1" variant="danger" show={this.state.errors.urIdError}>Укажите юридический номер договора!</Alert>
                    </div>
                </div>
                <div className="form-group row justify-content-end">
                    <label htmlFor="executorSelector" className="col-sm-2 col-form-label">Оператор</label>
                    <div className="col-sm-10">
                        <Select
                            value={this.state.executor}
                            options={this.state.allExecutors}
                            name='executorSelector'
                            onChange={selected => {
                                this.state.errors.executorError = false
                                this.setState({ executor: selected, errors: this.state.errors })
                                contract.executor = selected.value
                            }
                            }
                        />
                    </div>
                    <div className="col-sm-10">
                        <Alert className="mt-1" variant="danger" show={this.state.errors.executorError}>Укажите оператора договора!</Alert>
                    </div>
                </div>
                <div className="form-group row justify-content-end">
                    <label htmlFor="cDate" className="col-sm-2 col-form-label">Дата договора</label>
                    <div className="col-sm-10">
                        <DatePicker className="form-control" id='cDate' dateFormat="dd.MM.yyyy" selected={this.state.contractDate}
                            onChange={(date) => {
                                this.state.errors.contractDateError = false
                                this.setState({ contractDate: date, errors: this.state.errors})
                                contract.contractDate = moment(date).format("yyyy-MM-DD")
                            }
                            }
                        />
                    </div>
                    <div className="col-sm-10">
                        <Alert className="mt-1" variant="danger" show={this.state.errors.contractDateError}>Укажите дату договора!</Alert>
                    </div>
                </div>
                <div className="form-group row justify-content-end">
                    <label htmlFor="stDate" className="col-sm-2 col-form-label">Дата подписания</label>
                    <div className="col-sm-10">
                        <DatePicker className="form-control" id='stDate' dateFormat="dd.MM.yyyy" selected={this.state.beginContractDate}
                            onChange={(date) => {
                                this.state.errors.beginContractDateError = false
                                this.setState({ beginContractDate: date, errors: this.state.errors})
                                contract.beginContractDate = moment(date).format("yyyy-MM-DD")
                            }
                            }
                        />
                    </div>
                    <div className="col-sm-10">
                        <Alert className="mt-1" variant="danger" show={this.state.errors.beginContractDateError}>Укажите дату подписания договора!</Alert>
                    </div>
                </div>
                <div className="form-group row justify-content-end">
                    <label htmlFor="enDate" className="col-sm-2 col-form-label">Срок дествия</label>
                    <div className="col-sm-10">
                        <DatePicker className="form-control" id='enDate' dateFormat="dd.MM.yyyy" selected={this.state.endContractDate}
                            onChange={(date) => {
                                date <= this.state.contractDate ? this.state.errors.endContractDateError = true : this.state.errors.endContractDateError = false
                                this.setState({ endContractDate: date, errors: this.state.errors })
                                contract.endContractDate = moment(date).format("yyyy-MM-DD")
                            }
                            }
                        />
                    </div>
                    <div className="col-sm-10 ">
                        <Alert className="mt-1" variant="danger" show={this.state.errors.endContractDateError}>Срок действия договора не может быть раньше или равен дате договора!</Alert>
                    </div>
                </div>
                <div className="form-group row justify-content-end">
                    <label htmlFor="contragentSelector" className="col-sm-2 col-form-label">Контрагент</label>
                    <div className="col-sm-10">
                        <Select
                            value={this.state.curentContragent}
                            options={this.state.allContragents}
                            name='contragentSelector'
                            onChange={selection => {
                                this.state.errors.contragentError = false
                                this.setState({ curentContragent: selection, errors: this.state.errors })
                                contract.contragent = selection.value
                            }
                            }
                            isSearchable='true'
                        />
                    </div>
                    <div className="col-sm-10 ">
                        <Alert className="mt-1" variant="danger" show={this.state.errors.contragentError}>Укажите контрагента!</Alert>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="aboutShort" className="col-sm-2 col-form-label">Краткое описание</label>
                    <div className="col-sm-10">
                        <input type="textarea" className="form-control" id="aboutShort" value={this.state.aboutContractShort}
                            onChange={value => {
                                this.setState({ aboutContractShort: value.target.value })
                                contract.aboutContractShort = value.target.value
                            }
                            }
                        />
                    </div>
                </div>
                <div className="form-group row justify-content-end">
                    <label htmlFor="about" className="col-sm-2 col-form-label">Описание</label>
                    <div className="col-sm-10">
                        <input type="textarea" className="form-control" id="about" value={this.state.aboutContract}
                            onChange={(value) => {
                                value.target.value.length > 0 ? this.state.errors.aboutError = false : this.state.errors.aboutError = true
                                this.setState({ aboutContract: value.target.value, errors: this.state.errors })
                                contract.aboutContract = value.target.value
                            }
                            }
                        />
                    </div>
                    <div className="col-sm-10 ">
                        <Alert className="mt-1" variant="danger" show={this.state.errors.aboutError}>Укажите описание договора!</Alert>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="price" className="col-sm-2 col-form-label">Стоимость договора</label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" id="price" value={this.state.contractPrice}
                            onChange={(value) => {
                                this.setState({ contractPrice: value.target.value })
                                contract.contractPrice = value.target.value
                            }
                            }
                        />
                    </div>
                </div>
                <div className="form-group row justify-content-end">
                    <label htmlFor="currencySelector" className="col-sm-2 col-form-label">Валюта</label>
                    <div className="col-sm-10">
                        <Select
                            value={this.state.curentCurrency}
                            options={this.state.allCurrency}
                            name='currencySelector'
                            onChange={selection => {
                                this.state.errors.currencyError = false
                                this.setState({ curentCurrency: selection, errors: this.state.errors })
                                contract.currency = selection.value
                            }
                            }
                        />
                    </div>
                    <div className="col-sm-10 ">
                        <Alert className="mt-1" variant="danger" show={this.state.errors.currencyError}>Укажите валюту!</Alert>
                    </div>
                </div>
                <div className="form-group row justify-content-end">
                    <label htmlFor="payRuleSelector" className="col-sm-2 col-form-label">Условия оплаты</label>
                    <div className="col-sm-10">
                        <Select
                            isMulti
                            closeMenuOnSelect={false}
                            value={this.state.payRules}
                            options={this.state.allPayRules}
                            name='payRuleSelector'
                            onChange={selection => {
                                selection.length > 0 ? this.state.errors.payRulesError = false : this.state.errors.payRulesError = true
                                this.setState({ payRules: selection, errors: this.state.errors })
                                contract.payRules = []
                                selection.map(rule => contract.payRules.push(rule.value))
                            }
                            }
                            isSearchable={true}
                        />
                    </div>
                    <div className="col-sm-10 ">
                        <Alert className="mt-1" variant="danger" show={this.state.errors.payRulesError}>Укажите условия оплаты!</Alert>
                    </div>
                </div>
                <div className="form-group row justify-content-end">
                    <label htmlFor="finPosSelector" className="col-sm-2 col-form-label">Финансовые позиции</label>
                    <div className="col-sm-10">
                        <Select
                            isMulti
                            closeMenuOnSelect={false}
                            value={this.state.finPositions}
                            options={this.state.allFinPositions}
                            name='finPosSelector'
                            onChange={selection => {
                                selection.length > 0 ? this.state.errors.finPositionsError = false : this.state.errors.finPositionsError = true
                                this.setState({ finPositions: selection, errors: this.state.errors })
                                contract.fmPositions = []
                                selection.map(pos => contract.fmPositions.push(pos.value))
                            }
                            }
                            isSearchable={true}
                        />
                    </div>
                    <div className="col-sm-10 ">
                        <Alert className="mt-1" variant="danger" show={this.state.errors.finPositionsError}>Укажите финансовые позиции!</Alert>
                    </div>
                </div>
                <div className="form-group row justify-content-end">
                    <label htmlFor="kreditorSelector" className="col-sm-2 col-form-label">Кредитор</label>
                    <div className="col-sm-10">
                        <Select
                            value={this.state.curentKreditor}
                            options={this.state.allKreditors}
                            name='kreditorSelectorr'
                            onChange={selection => {
                                this.state.errors.kreditorError = false
                                this.setState({ curentKreditor: selection, errors: this.state.errors })
                                contract.kreditor = selection.value
                            }
                            }
                            isSearchable={true}
                        />
                    </div>
                    <div className="col-sm-10 ">
                        <Alert className="mt-1" variant="danger" show={this.state.errors.kreditorError}>Укажите кредитора!</Alert>
                    </div>
                </div>
                <div className="form-group row justify-content-end">
                    <label htmlFor="tenderSelector" className="col-sm-2 col-form-label">Тендер</label>
                    <div className="col-sm-10">
                        <Select
                            value={this.state.curentTender}
                            options={this.state.allTenders}
                            name='tenderSelector'
                            onChange={selection => {
                                this.state.errors.tenderError = false
                                this.setState({ curentTender: selection, errors: this.state.errors })
                                contract.tender = selection.value
                            }
                            }
                            isSearchable={true}
                        />
                    </div>
                    <div className="col-sm-10 ">
                        <Alert className="mt-1" variant="danger" show={this.state.errors.tenderError}>Укажите тип тендера!</Alert>
                    </div>
                </div>
                <div className="form-group row justify-content-end">
                    <label htmlFor="costTypeSelector" className="col-sm-2 col-form-label">Виды затрат</label>
                    <div className="col-sm-10">
                        <Select
                            isMulti
                            closeMenuOnSelect={false}
                            value={this.state.costTypes}
                            options={this.state.allCostTypes}
                            name='costTypeSelector'
                            onChange={selection => {
                                selection.length > 0 ? this.state.errors.costTypesError = false : this.state.errors.costTypesError = true
                                this.setState({ costTypes: selection, errors: this.state.errors })
                                contract.costsTypes = []
                                selection.map(type => contract.costsTypes.push(type.value))
                            }
                            }
                            isSearchable={true}
                        />
                    </div>
                    <div className="col-sm-10 ">
                        <Alert className="mt-1" variant="danger" show={this.state.errors.costTypesError}>Укажите виды затрат!</Alert>
                    </div>
                </div>
                <div className="form-group row justify-content-end">
                    <label htmlFor="disPrSelector" className="col-sm-2 col-form-label">Протокол разногласий</label>
                    <div className="col-sm-10">
                        <Select
                            value={this.state.curentDisPr}
                            options={this.state.allDisProtocols}
                            name='disPrSelector'
                            onChange={selection => {
                                this.state.errors.disProtocolError = false
                                this.setState({ curentDisPr: selection, errors: this.state.errors })
                                contract.disProtocol = selection.value
                            }
                            }
                            isSearchable={true}
                        />
                    </div>
                    <div className="col-sm-10 ">
                        <Alert className="mt-1" variant="danger" show={this.state.errors.disProtocolError}>Укажите тип протокола разногласий!</Alert>
                    </div>
                </div>
                <div className="form-group row justify-content-end">
                    <label htmlFor="postPaySelector" className="col-sm-2 col-form-label">Перенос срока платежа</label>
                    <div className="col-sm-10">
                        <Select
                            value={this.state.curentPostPay}
                            options={this.state.allPostPays}
                            name='postPaySelector'
                            onChange={selection => {
                                this.state.errors.postPayError = false
                                this.setState({ curentPostPay: selection, error: this.state.errors })
                                contract.postPay = selection.value
                            }
                            }
                            isSearchable={true}
                        />
                    </div>
                    <div className="col-sm-10 ">
                        <Alert className="mt-1" variant="danger" show={this.state.errors.postPayError}>Укажите условия переноса платежа!</Alert>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="invest" className="col-sm-2 col-form-label">Инвест. проект</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="invest" value={this.state.investProject}
                            onChange={(value) => {
                                this.setState({ investProject: value.target.value })
                                contract.investProject = value.target.value
                            }
                            } />
                    </div>
                </div>
                <div className="form-group row justify-content-end">
                    <label htmlFor="rks" className="col-sm-2 col-form-label">РКС</label>
                    <div className="col-sm-10">
                        <Select
                            value={this.state.rks}
                            options={[{ value: '1', label: 'Да' }, { valu: '0', label: 'Нет' }]}
                            name='rks'
                            onChange={selection => {
                                this.state.errors.rksError = false
                                this.setState({ rks: selection, errors: this.state.errors })
                                contract.rks = selection.value
                            }
                            }
                        />
                    </div>
                    <div className="col-sm-10 ">
                        <Alert className="mt-1" variant="danger" show={this.state.errors.rksError}>Укажите наличие договора в РКС!</Alert>
                    </div>
                </div>
                <Modal show={this.state.modalError} >
                    <Modal.Header closeButton>
                        <Modal.Title>Ошибка</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Обязательные поля не заполнены!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ modalError: false })}>ОК</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
}

export default ContractInfoComponent;