import React, { Component } from 'react'
import apis from '../../../services/Apis';
import { SecurePost } from '../../../services/axiosCall';
import Alert from '../../common/alert';
import {Button,Row,Col, Card  } from 'antd';
import './conducttes.css';




export default class Questions extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:false
        }
    }

    componentDidMount(){
        this.refreshquestionList();
    }   

    refreshquestionList = ()=>{
        this.setState({
            loading:true
        })
        SecurePost({
            url:`${apis.GET_TEST_QUESTIONS}`,
            data:{
                id:this.props.id
            }
        }).then((response)=>{
            console.log(response);
            if(response.data.success){
                this.props.updateQuestiosnTest(response.data.data);
            }
            else{
                Alert('error','خطأ!',response.data.message)
            }
            this.setState({
                loading:false
            })
        }).catch((error)=>{
            console.log(error);
            Alert('error','خطأ!','خطأ في الخادم!')
            this.setState({
                loading:false
            })
        })
    }

    render() {
        const aMap = ['أ','ب','ج','د','هـ'];
        return (
            <div>
                {
                    this.props.questionsOfTest.map((d,i)=>{
                        return(
                            <div  key={i} style={{paddingBottom:'50px'}}>
                                    <Row type="flex">
                                    <Col span={1} order={1}>
                                        <Button type="primary" shape="circle" >{i+1}</Button>
                                    </Col>
                                    <Col span={d.quesimg?6:0} order={2}>
                                        <img alt="unable to load" src={d.quesimg} style={{width:'100%'}}/>
                                    </Col>
                                    <Col span={d.quesimg?16:22} style={{padding:'10px'}} order={3}>
                                        <b>{d.body}</b>
                                    </Col>
                                    <Col span={1} order={4}>
                                        {d.weightage}
                                    </Col>
                                    <Col offset={1} span={23} order={5}>
                                        <Row type="flex">
                                            {d.options.map((dd,ii)=>{
                                                return(
                                                    <Col key={ii} span={12} style={{paddingBottom:'30px'}} order={1}>
                                                        <Row type="flex" justify="space-between">
                                                            <Col span={1} order={1}>
                                                            {
                                                                dd.isAnswer?<Button className="green" shape="circle">{aMap[ii]}</Button>:<Button type="primary" shape="circle">{aMap[ii]}</Button>
                                                            }
                                                            </Col>
                                                            <Col offset={1} span={dd.optimg?8:0} order={2}>
                                                                <img alt="unable to load" src={dd.optimg} style={{width:'100%'}} />
                                                            </Col>
                                                            <Col offset={1} span={dd.optimg?12:21} order={3}>
                                                                <p>{dd.optbody}</p>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                )
                                            })}
                                        </Row>
                                    </Col>
                                </Row> 

                            </div> 
                        )
                    })
                }
            </div>
        )
    }
}



