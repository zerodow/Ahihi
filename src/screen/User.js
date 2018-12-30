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
import CreateMemberDialog from '../component/CreateMemberDialog';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
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
                <CreateMemberDialog ref={ref => this.createMemberDialog = ref} getAllUser={(e) =>this.getAllUser()}></CreateMemberDialog>
            </div>
        );
    }

    updateMember(user) {
        if (user == null) {
            this.createMemberDialog.setState({
                open: true,
                titleModal: 'Tạo mới thành viên',
                user: {}
            });
        } else {
            this.createMemberDialog.setState({
                open: true,
                titleModal: 'Sửa thành viên',
                user: user
            });
        }
    }

    saveMember = () => {
        console.log('this.refs.account ', this.refs.account)
        let account = this.refs.account.input.value
        let email = this.refs.email.input.value
        let permission = this.refs.permission.input.value
        console.log('acc: ', account, 'email ', email, 'per ', permission)
    }

    componentDidMount() {
       this.getAllUser()
    }

    getAllUser(){
        fetch('https://farmproject.herokuapp.com/get-all-users', {//link api
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


