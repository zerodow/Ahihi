import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import './account.css'
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    componentDidMount(){
        //this.login();
    }

    login = () => {
        var obj = {
            account: this.state.username,
            password: this.state.password
        }
        fetch('https://farmproject.herokuapp.com/login', {//link api
            method: 'POST', //method
            headers: { // config header
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        })
            .then(response => response.json()) // data trả về ngay lập tức chuyển sang json
            .then(res => { // res chính là dữ liệu đã được chuyển sang json
                console.log(res)
                if(res.loginCode === 0) {
                    this.props.dispatch({
                        type:'LOGINSUCCESS'
                    })
                } else if(res.loginCode === 1){
                    alert('Sai mật khẩu !! Vui lòng thử lại')
                } else {
                    alert('Tài khoản không tồn tại')
                }
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="account">
                <FormGroup style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <h1>Login</h1>
                </FormGroup>
                <FormGroup>
                    <FormGroup row
                        style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <h3>Username</h3>
                        <Input
                            required={true}
                            placeholder='Tên đăng nhập'
                            style={{ marginLeft: 20, height: '20%' }}
                            onChange={(event) => this.setState({ username: event.target.value })} />
                    </FormGroup>
                    <FormGroup row
                        style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <h3>Password</h3>
                        <Input
                            required={true}
                            placeholder='Mật khẩu'
                            style={{ marginLeft: 20 }}
                            onChange={(event) => this.setState({ password: event.target.value })} />
                    </FormGroup>
                </FormGroup>
                <FormGroup style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Button style={{ height: 50, width: 100, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }} text={"Login"} onClick={this.login}>
                        <h4>button</h4>
                    </Button>
                </FormGroup>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        password: state.password
    }
}

export default connect(mapStateToProps)(Account)
