import React, { Component } from 'react';
import './trainerRegister.css';
import {Row,Col,Form, Icon, Input, Button,Select,Typography  } from 'antd';
import queryString from 'query-string';
import apis from '../../../services/Apis';
import { Post } from '../../../services/axiosCall';
import Alert from '../../common/alert';
import { Redirect } from 'react-router-dom';
const { Option } = Select;
const { Title } = Typography;
class TraineeRegisterForm extends Component {
    constructor(props){
        super(props);
        this.state={
            inform:true,
            testid:null,
            user:null
        }
    }

    componentDidMount(){
        let params = queryString.parse(this.props.location.search)
        console.log(params)
        this.setState({
            testid:params.testid
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log(this.state.testid);
                Post({
                    url:apis.REGISTER_TRAINEE_FOR_TEST,
                    data:{
                        name:values.name,
                        userid:values.userid,
                        testid:this.state.testid,
                        
                    }
                }).then((data)=>{
                    console.log(data.data);
                    if(data.data.success){
                        this.setState({
                            inform:false,
                            user:data.data.user
                        })
                    }
                    else{
                        this.props.form.resetFields();
                        Alert('error','خطأ!',data.data.message);
                    }
                }).catch((error)=>{
                    console.log(error);
                    this.props.form.resetFields();
                    Alert('error','خطأ!',"خطأ في الخادم!");
                })
            }
        });
    };

    resendMail =()=>{
        console.log(this.state.testid)
        return <Redirect to={`/trainee/taketest?testid=${this.state.testid}&traineeid=${this.state.user._id}`} />
      //  window.location.href=`http://localhost:5000/trainee/taketest?testid=${this.state.testid}&traineeid=${this.state.user._id}`;
        /* Post({
            url:apis.RESEND_TRAINER_REGISTRATION_LINK,
            data:{
                id:this.state.user._id
            }
        }).then((response)=>{
            if(response.data.success){
                Alert('success','Success!',"Email has been sent to your email");
            }
            else{
                Alert('error','خطأ!',response.data.message);
            }
        }).catch((error)=>{
            console.log(error);
            Alert('error','خطأ!',"خطأ في الخادم!");
        }) */
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="trainee-registration-form-wrapper">
                {this.state.inform?
                    <div className="trainee-registration-form-inner">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Row>
                                <Col span={12} style={{padding:'5px'}}>
                                    <Form.Item label="الإسم" hasFeedback>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: 'Please input your name' }],
                                        })(
                                            <Input
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="الإسم"
                                            />,
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={{padding:'5px'}}>
                                    <Form.Item label="معرف المستخدم" hasFeedback>
                                        {getFieldDecorator('userid', {
                                            rules: [{
                                                type: 'string',
                                                message: 'معرف المستخدم المدخل غير صحيح',
                                            },
                                            {
                                                required: true,
                                                message: 'الرجاء إدخال رقمك العسكري',
                                            }],
                                        })(
                                            <Input
                                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="معرف المستخدم"
                                            />,
                                        )}
                                    </Form.Item>
                                </Col>
                            
                                
                                <Col span={12} style={{paddingTop:'33px'}}>
                                    <Form.Item>
                                        <Button style={{width:'100%'}} type="primary" htmlType="submit" className="login-form-button">
                                            تسجيل
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>              
                        </Form>
                    </div>:
                    <div className="reasendmail-container-register">
                        <Title style={{color:'#fff'}} level={4}>اضغط علي الزر التالي لبدء الإختبار</Title>                        
                        <Button type="primary" href={`/trainee/taketest?testid=${this.state.testid}&traineeid=${this.state.user._id}`}>ابدأ الإختبار</Button>
                    </div>}
                </div>  
        )
    }
}

const TraineeRegister = Form.create({ name: 'Trainee Registration' })(TraineeRegisterForm);
export default TraineeRegister;