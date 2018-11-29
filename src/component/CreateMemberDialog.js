import React, { Component } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import HTextInput from '../common/HTextInput';
import HSelect from '../common/HSelect'


class CreateMemberDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            titleModal: '',
            user : {},
        };
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    doSaveMember() {
        let userObj = this.state.user;
        let account = this.account.state.value
        let password = this.password.state.value
        let email = this.email.state.value

        if(account){
            alert('Tài khoản không được để trống!')
            return 
        }
        if(password){
            alert('Mật khẩu không đươc để trống!')
            return 
        }
        if(email){
            alert('Email không được để trống!')
            return 
        }
        
        userObj.account = this.account.state.value
        userObj.password = this.password.state.value
        userObj.email = this.email.state.value
        userObj.roleType = this.roleType.state.value
        console.log('save obj: ', userObj)
        fetch('https://farmproject.herokuapp.com/updateUser', {//link api
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(userObj)
        })
            .then(response => response.json()) // data trả về ngay lập tức chuyển sang json
            .then(res => { // res chính là dữ liệu đã được chuyển sang json
                console.log('res: ', res)
                this.handleClose()
                this.props.getAllUser()
            })
            .catch(error => console.log(error))
        //save
    }

    datas() {
        return  [[0,'admin'],[1, 'Quản lí'], [2, 'Người dùng']];
    }


    render(){
        let account = this.state.user.account !== undefined ? this.state.user.account : '';
        let password = this.state.user.password !== undefined ? this.state.user.password : '';
        let email = this.state.user.email !== undefined ? this.state.user.email : '';
        let roleType = this.state.user.roleType !== undefined ? this.state.user.roleType : 0;
        console.log('acc ', account, 'pass ', password , 'email ', email, 'role ', roleType)
        return (
            <div>
            <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={{ top: '50%', left: '50%', background: 'white', transform: 'translate(-50%, -50%)', width: '400px', padding: '32px', position: 'absolute', boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12),background-color: #fff' }}>
                        <Typography variant="h6" id="modal-title">
                            {this.state.titleModal}
                        </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            <FormGroup row
                                style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <h3
                                    style={{ width: 100, height: '20%' }}
                                >Tài khoản</h3>
                                <HTextInput
                                    required={true}
                                    placeholder='Tài khoản'
                                    style={{ width: 300, height: '20%' }}
                                    ref={ref => this.account = ref}
                                    value={account} />
                            </FormGroup>
                            <FormGroup row
                                style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <h3
                                     style={{ width: 100, height: '20%' }}
                                >Mật khẩu</h3>
                                <HTextInput
                                    required={true}
                                    placeholder='Mật khẩu'
                                    style={{ width: 300 }}
                                    ref={ref => this.password = ref}
                                    value={password} />
                            </FormGroup>
                            <FormGroup row
                                style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <h3
                                     style={{ width: 100, height: '20%' }}
                                >Email</h3>
                                <HTextInput
                                    required={true}
                                    placeholder='Email'
                                    style={{ width: 300 }}
                                    ref={ref => this.email = ref}
                                    value={email}  />
                            </FormGroup>
                            <FormGroup row
                                style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <h3
                                     style={{ width: 100, height: '20%' }}
                                >Quyền</h3>
                                <HSelect
                                    style={{width: 300, height: '20%' }}
                                    value={roleType}
                                    ref={ref => this.roleType = ref}
                                    datas={this.datas()}
                                >
                                </HSelect>
                            </FormGroup>
                            <FormGroup>
                                <Button variant="contained" color="primary" onClick={() => this.doSaveMember()}>Xác nhận</Button>
                            </FormGroup>
                        </Typography>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default CreateMemberDialog;

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});