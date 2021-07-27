import React, { Component } from 'react';
import { Container, Alert} from 'react-bootstrap';
import UserService from "../../../services/UserService";
import ParallaxMousemove from 'react-parallax-mousemove'
import logo from '../../../components/Resources/loginLogo.jpg'



class LoginPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            login: "",
            password: "",
            loginError: false
        }
        window.localStorage.setItem('hasUserAccess', JSON.stringify(false));
    }

    login(){

        UserService.logon({user: this.state.login, pass: this.state.password}).then(res => {
            if (res.data !== ""){
                window.localStorage.setItem('hasUserAccess', JSON.stringify(true));
                window.localStorage.setItem('user', JSON.stringify(res.data));
                this.setState({loginError: false})
                if(res.data.role === "ADMIN"){
                    this.props.history.push('/userAdmin')
                }else{
                    this.props.history.push('/myContracts')
                }
            }else{
                this.setState({loginError: true})
            }
        });
       
        
    }

    render() {

        return (
           
            <Container className="col-sm-5 mt-5 justify-content-center">
                <h3>Авторизация</h3>

                <div className="form-group">
                    <label>Логин</label>
                    <input type="login" className="form-control" placeholder="Логин" value = {this.state.login}
                    onChange = {value => this.setState({login: value.target.value})}
                    />
                </div>

                <div className="form-group">
                    <label>Пароль</label>
                    <input type="password" className="form-control" placeholder="******"
                    onChange = {value => this.setState({password: value.target.value})}
                    />
                </div>
                <div className="col-sm-10">
                        <Alert className="mt-1" variant="danger" show={this.state.loginError}>Не верный логин или пароль!</Alert>
                </div>

                <button type="submit" className="btn btn-primary btn-block" 
                onClick = {() => this.login()}
                >Войти</button>
               
            </Container>
        );
    }
}
export default LoginPage;