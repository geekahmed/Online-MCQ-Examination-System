import React from "react";
import { Form, Input, Icon, Button } from 'antd';
import './login.css';
import { connect } from 'react-redux';
import { login, logout } from '../../../actions/loginAction';
import auth from '../../../services/AuthServices';
import Alert from '../../common/alert';
import { Redirect } from 'react-router-dom';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoggedIn :false
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                auth.LoginAuth(values.userid,values.password).then((response)=>{
                    console.log(response);
                    if(response.data.success){
                        this.props.login(response.data.user)
                        auth.storeToken(response.data.token);
                        this.setState({
                            isLoggedIn : true
                        })
                    }
                    else{
                        return Alert('error','خطأ!',response.data.message);
                    }
                }).catch((error)=>{
                    console.log(error);
                    return Alert('error','خطأ!','خطأ في الخادم!');
                })              
            }
        });
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        if(this.state.isLoggedIn){
            return <Redirect to={this.props.user.userOptions[0].link} />
        }
        else{
            return(
                <div className="login-container">
                    <div className="login-inner">
                        <Form  onSubmit={this.handleSubmit}>
                            <Form.Item label="معرف المستخدم" hasFeedback>
                                {getFieldDecorator('userid', {
                                    rules: [
                                        {
                                            type: 'string',
                                            message: 'الإدخال ليس بريدًا إلكترونيًا صالحًا!',
                                        },
                                        {
                                            required: true,
                                            message: 'الرجاء إدخال البريد الإلكتروني الخاص بك!',
                                        },
                                    ],
                                })(<Input 
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="معرف المستخدم"/>)}
                            </Form.Item>
                            <Form.Item label="كلمة السر" hasFeedback>
                                {getFieldDecorator('password', {
                                    rules: [
                                        { 
                                            required: true, message: 'Please input your Password!' 
                                        }
                                    ],
                                })(
                                    <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="كلمة السر"
                                    />,
                                )}
        </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    تسجيل دخول
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>  
                </div>
            )
        }
    }

}

const LoginForm = Form.create({ name: 'login' })(Login);


const mapStateToProps = state => ({
    user : state.user
});

export default connect(mapStateToProps,{
    login, 
    logout
})(LoginForm);