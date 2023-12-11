import React from 'react'
import { connect } from 'react-redux';
import { Tabs,Button } from 'antd';
import { changeStep,changeBasicNewTestDetails } from '../../../actions/testAction';
import GeneraterandomQuestion from'./generaterandomquestion';
import './newtest.css';
const { TabPane } = Tabs;



function SelectQuestion(props){
    const questionCount = <Button>السؤال المحدد: {props.test.newtestFormData.testQuestions.length}</Button>;
    return (
        <div>
            <Tabs defaultActiveKey="1" tabBarExtraContent={questionCount} type="card">
                <TabPane tab="أسئلة عشوائية" key="1">
                    <GeneraterandomQuestion mode="random"/>
                </TabPane>
                <TabPane tab="أسئلة-يدويا" key="2">
                    <GeneraterandomQuestion mode="manual" />
                </TabPane>
            </Tabs>
            <div style={{width:'100%',padding:'10px'}}>
                <Button style={{float:'right'}} type="primary" onClick={()=>props.changeStep(2)}>
                    التالي
                </Button>
            </div>
            
        </div>
    )  
}


const mapStateToProps = state => ({
    test : state.test
});

export default connect(mapStateToProps,{
    changeStep,
    changeBasicNewTestDetails
})(SelectQuestion);