import React from 'react';
import { connect } from 'react-redux';
import { Row,Col,Button, } from 'antd';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import Alert from '../../common/alert';
import { Redirect } from 'react-router-dom';
class FinalQuestionView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            testid:null
        }
    }

    createtest =()=>{
        SecurePost({
            url :apis.CREATE_TEST,
            data : {
                type : this.props.test.newtestFormData.testType,
                title : this.props.test.newtestFormData.testTitle,
                questions : this.props.test.newtestFormData.testQuestions,
                duration : this.props.test.newtestFormData.testDuration,
                subjects : this.props.test.newtestFormData.testSubject,
            }
        }).then((response)=>{
            console.log(response.data);
            if(response.data.success){
                Alert('success','تم إنشاء ورقة الاختبار بنجاح!','يرجى الانتظار ، ستتم إعادة توجيهك تلقائيًا لإجراء صفحة الاختبار.');
                setTimeout(()=>{
                    this.setState({
                        testid : response.data.testid
                    })
                },3000);
            }
            else{
                Alert('error','خطأ!',response.data.message);
            }
        }).catch((err)=>{
            console.log(err);
            Alert('error','خطأ!','خطأ في الخادم');
        })
    }

    render(){
        if(this.state.testid){
            return <Redirect to={`/user/conducttest?testid=${this.state.testid}`} />
        }
        else{
            return (
                <div>
                    {this.props.test.newtestFormData.testQuestions.map((d,i)=>{
                        return <Q key={i+1} _id={d} no={i+1}/>
                    })}
                    <div style={{width:'100%',padding:'10px'}}>
                        <Button style={{float:'right'}} type="primary" onClick={this.createtest}>
                        إنشاء اختبار
                        </Button>
                    </div>
                    
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    test : state.test
});

export default connect(mapStateToProps,null)(FinalQuestionView);



function QuestionView(props) {
    var _id=props._id;
    var no = props.no;
    var obj = props.test.questionsAvailablebasedonSubject.filter((hero)=>{
        return hero._id==_id;
    })
    console.log(obj[0].weightage);
    var oo = ['أ','ب','ج','د','ه'];
    return (
        <div style={{marginBottom:'20px'}}>
            <div>
                <div style={{width:'100%'}}>
                    <b style={{float:'left'}}>علامات. {obj[0].weightage}</b>
                    <b style={{float:'right'}}>رقم السؤال. {no}</b>
                </div>
                <div style={{padding:'5px 20px'}}>
                    <br/>
                    {obj[0].body}
                    <br/>
                    {obj[0].quesimg? <img alt="Question" src={obj[0].quesimg} /> : null}
                </div>
            </div>
            <Row type='flex'>
                {obj[0].options.map((d,i)=>{
                    return(
                        <Col key={i} span={12} style={{padding:'5px 20px'}} order={i+1}>
                            <b>{oo[i]}  </b> {d.optbody}
                            {d.optimg? <img alt="Option" src={d.optimg} /> : null}
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

var Q = connect(mapStateToProps,null)(QuestionView);