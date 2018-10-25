import React, { Component } from 'react';
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users : [],
            open : false,
            titleModal : '',
            userUpdate : {},
        };
    }

    render() {
        return (
            <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FormGroup style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <h1>User</h1>
                </FormGroup>
                <FormGroup style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Paper style={{ width: '60%', }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tài khoản</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Quyền</TableCell>
                                    <TableCell>Sửa Thông tin</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ justifyContent: 'center', alignItems: 'center' }}>
                                {this.state.users.map((user, key) => {
                                    return (
                                        <TableRow key={key}>
                                            <TableCell>{user.account}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.roleType}</TableCell>
                                            <TableCell onClick={() => this.updateMember(user)}>Sửa</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>

                    </Paper>
                </FormGroup>
                <FormGroup style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="contained" color="primary" onClick={() => this.updateMember(null)}>Thêm thành viên</Button>
                </FormGroup>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                    >
                    <div style={{top: '50%', left: '50%', background: 'white', transform: 'translate(-50%, -50%)', width: '400px', padding: '32px', position: 'absolute', boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12),background-color: #fff'}}>
                        <Typography variant="h6" id="modal-title">
                            {this.state.titleModal}
                        </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                        <FormGroup row
                            style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <h3>Tài khoản</h3>
                            <Input
                                required={true}
                                placeholder='Tài khoản'
                                style={{ marginLeft: 20, height: '20%' }}
                                value={this.state.userUpdate.account}
                                ref={"account"} />
                        </FormGroup>
                        <FormGroup row
                            style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <h3>Email</h3>
                            <Input
                                required={true}
                                placeholder='Email'
                                style={{ marginLeft: 20 }}
                                value={this.state.userUpdate.email}
                                ref={"email"} />
                        </FormGroup>
                        <FormGroup row
                            style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <h3>Quyền</h3>
                            <Input
                                required={true}
                                placeholder='permission'
                                style={{ marginLeft: 20 }}
                                value={this.state.userUpdate.roleType}
                                ref={"permission"} />
                                
                        </FormGroup>
                        </Typography>
                    </div>
                    </Modal>
            </div>
        );
    }

    handleOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

    updateMember(user){
        if(user == null){
            this.setState({ 
                open: true,
                titleModal : 'Tạo mới thành viên',
                userUpdate : {}
            });
        } else{
            this.setState({ 
                open: true,
                titleModal : 'Sửa thành viên',
                userUpdate : user
            });
        }
        this.handleOpen()
    }

    saveMember = () =>{
        console.log('this.refs.account ', this.refs.account)
        let account = this.refs.account.input.value
        let email = this.refs.email.input.value
        let permission = this.refs.permission.input.value
        console.log('acc: ', account , 'email ', email, 'per ', permission)
    }

    componentDidMount(){
        fetch('http://localhost:3001/get-all-users', {//link api
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json()) // data trả về ngay lập tức chuyển sang json
            .then(res => { // res chính là dữ liệu đã được chuyển sang json
                console.log('res: ', res)
                this.setState({
                    users: res // dữ liệu trả về sẽ được gán cho state có tên data để hiển thị lên list
                })
            })
            .catch(error => console.log(error))
    }

    
}

export default connect()(User)


function getModalStyle() {
    const top = 50 ;
    const left = 50 ;
  
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