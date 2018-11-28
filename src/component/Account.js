import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import './account.css'
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            open: false,
            click: false
        };
    }

    login = () => {
        this.handleOpen()
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
                // console.log(res)
                if (res.loginCode === 0) {
                    alert('Đăng nhập thành công')
                    this.props.dispatch({
                        type: 'LOGINSUCCESS',
                        user: res
                    })
                } else if (res.loginCode === 1) {
                    alert('Sai mật khẩu !! Vui lòng thử lại')
                } else {
                    alert('Tài khoản không tồn tại')
                }

                this.setState({ open: false, click: false });
            })
            .catch(error => this.setState({ open: false, click: false }))
    }

    handleOpen = () => {
        this.setState({ open: true, click: true });
    };

    render() {
        return (
            <FormGroup style={styles.container}>
                <FormGroup style={styles.formLogin}>
                    <FormGroup style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <h1 style={{ color: 'gray' }}>Project</h1>
                    </FormGroup>
                    <FormGroup className='wrap_input'>
                        <FormGroup className='input_element'>
                            <Input
                                disabled={this.state.click}
                                style={{ padding: 5, paddingLeft: 20 }}
                                disableUnderline={true}
                                className='input'
                                required={true}
                                placeholder='Tên đăng nhập'
                                onChange={(event) => this.setState({ username: event.target.value })} />
                        </FormGroup>
                        <FormGroup className='input_element'>
                            <Input
                                disabled={this.state.click}
                                type='password'
                                style={{ padding: 5, paddingLeft: 20 }}
                                disableUnderline={true}
                                className='input'
                                required={true}
                                placeholder='Mật khẩu'
                                onChange={(event) => this.setState({ password: event.target.value })} />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className='wrap_button'>
                        {this.state.click
                            ? <CircularProgress />
                            : <Button
                                className='button'
                                fullWidth={true}
                                style={styles.button}
                                text={"Login"}
                                onClick={this.login}>
                                <h3 style={{ color: 'white' }}>Đăng nhập</h3>
                            </Button>}
                    </FormGroup>
                </FormGroup>
            </FormGroup>
        );
    }
}

const styles = {
    container: {
        backgroundSize: 'cover',
        overflow: 'hidden',
        backgroundColor: '#328ACB',
        height: window.innerHeight,
        width: window.innerWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formLogin: {
        backgroundColor: 'white',
        height: '40%',
        width: '30%',
        borderRadius: 5,
        alignItems: 'center',
    },
    formInput: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    button: {
        height: 50, width: '100', backgroundColor: '#83C87A',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        password: state.password,
        user: state.userInfo
    }
}

export default connect(mapStateToProps)(Account)
