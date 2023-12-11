import React, { Component } from 'react'
import './newtrainer.css';
import {
    Form,
    Input,
    Button,
    Select
} from 'antd';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import { connect } from 'react-redux';
import { 
    ChangeTrainerConfirmDirty,
    ChangeTrainerModalState,
    ChangeTrainerTableData
} from '../../../actions/adminAction';
import Alert from '../../../components/common/alert';
const { Option } = Select;
class NewTrainer extends Component {

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('كلمات السر ليست هي نفسها!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.props.admin.TrainerconfirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                
                    SecurePost({
                        url : `${apis.CREATE_TRAINER}`,
                        data : {
                            _id : this.props.admin.trainerId,
                            // rank: values.rank,
                            name :values.name,
                            password : values.password,
                            userid : values.userid,
                            contact : values.prefix+values.contact
                        }
                    }).then((response)=>{
                        if(response.data.success){
                            this.props.ChangeTrainerModalState(false,null,'Register');
                            Alert('success','عملية ناجحة',response.data.message);
                            this.props.ChangeTrainerTableData();
                        }
                        else{
                            console.log(response.data);
                            this.props.ChangeTrainerModalState(false,null,'Register');
                            return Alert('warning','تحذير!',response.data.message);
                        }
                    }).catch((error)=>{
                        this.props.ChangeTrainerModalState(false,null,'Register');
                        return Alert('error','خطأ!','خطأ في الخادم');
                    })
                
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: this.props.admin.trainerdetails.prefix || '+20',
            rules: [{ required: true, message: 'Please enter contact no prefix' }],
          })(
            <Select style={{ width: 70 }}>
              <Option value="+20">+20</Option>
            </Select>,
          );
        return (
            <div className="register-trainer-form">
                <div className="register-trainer-form-body">
                    <Form  onSubmit={this.handleSubmit}>

                   {/*  <Form.Item label="رتبة / درجة" hasFeedback className="input-admin-trainer">
                            {getFieldDecorator('rank', {
                                initialValue : this.props.admin.trainerdetails.rank,
                                rules: [{ required: true, message: 'الرجاء إدخال الرتبة / الدرجة!', whitespace: true }],
                            })(<Input />)}
                        </Form.Item> */}



                        <Form.Item label="الإسم" hasFeedback className="input-admin-trainer">
                            {getFieldDecorator('name', {
                                initialValue : this.props.admin.trainerdetails.name,
                                rules: [{ required: true, message: 'الرجاء إدخال اسمك!', whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                    
                        { !this.props.admin.trainerId ? <Form.Item label="معرف المستخدم" hasFeedback className="input-admin-trainer">
                            {getFieldDecorator('userid', {
                                initialValue : this.props.admin.trainerdetails.userid,
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
                            })(<Input />)}
                        </Form.Item> : null }

                        <Form.Item label="رقم الهاتف" className="input-admin-trainer">
                            {getFieldDecorator('contact', {
                                initialValue : this.props.admin.trainerdetails.contact,
                                rules: [
                                    { 
                                        required: true, 
                                        message: 'الرجاء إدخال رقم هاتفك!' 
                                    },
                                    {
                                        len:10,
                                        message:'يجب أن يتكون رقم الاتصال من 10 أرقام'
                                    }],
                            })(<Input addonBefore={prefixSelector} min={10} max={10} />)}
                        </Form.Item>

                        { !this.props.admin.trainerId ? <div><Form.Item label="كلمة السر" hasFeedback className="input-admin-trainer">
                                {getFieldDecorator('password', {
                                    initialValue : this.props.admin.trainerdetails.password,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'الرجاء إدخال كلمة المرور الخاصة بك!',
                                        },
                                        {
                                            validator: this.validateToNextPassword,
                                        },
                                    ],
                                })(<Input.Password dir='ltr'/>)}
                            </Form.Item>
                        
                            <Form.Item label="تأكيد كلمة السر" hasFeedback className="input-admin-trainer">
                                {getFieldDecorator('confirm', {
                                    initialValue : this.props.admin.trainerdetails.confirmpassword,
                                    rules: [
                                    {
                                        required: true,
                                        message: 'يرجى التأكد من صحة كلمة المرور الخاصة بك!',
                                    },
                                    {
                                        validator: this.compareToFirstPassword,
                                    },
                                    ],
                                })(<Input.Password onBlur={this.handleConfirmBlur} dir='ltr'/>)}
                            </Form.Item></div> : null}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                {this.props.admin.Trainermode == 'Register' ? 'تسجيل' : this.props.admin.Trainermode}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    admin : state.admin
});



const NewTrainerForm = Form.create({ name: 'register' })(NewTrainer);

export default connect(mapStateToProps,{
    ChangeTrainerConfirmDirty,
    ChangeTrainerModalState,
    ChangeTrainerTableData
})(NewTrainerForm);

