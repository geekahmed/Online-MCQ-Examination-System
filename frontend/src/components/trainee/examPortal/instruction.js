import React from 'react'
import { connect } from 'react-redux';
import { Button } from 'antd';
import {ProceedtoTest,fetchTestdata} from '../../../actions/traineeAction';
import './portal.css';

function Instruction(props) {
    return (
        <div>
            <div className="instaruction-page-wrapper">
                <div className="instruction-page-inner">
                    <h2>تعليمات عامة:</h2>
                    <h4>1. جميع الأسئلة إجبارية.</h4>
                    <h4>2. يمكنك وضع إشارة مرجعية على أي سؤال.</h4>
                    <h4>3. يمكن تحديث الإجابات في أي وقت قبل المهلة.</h4>
                    <h4>4. هذا الاختبار محدد زمنيًا ، وهناك مؤقت على اللوحة اليمنى إذا كنت تستخدم "سطح المكتب".</h4>
                    <h4>5. انقر فوق الزر "إنهاء الاختبار" لإرسال الاختبار قبل الوقت المحدد. </h4>
                <h4><b>ملحوظة :</b>لحفظ الإجابات ، انقر فوق الزر "التالي".</h4>
                    <div className="proceed-to-test-button">
                        <Button style={{float:'right'}} type="primary" icon="caret-right" onClick={()=>{props.ProceedtoTest(props.trainee.testid,props.trainee.traineeid,()=>{props.fetchTestdata(props.trainee.testid,props.trainee.traineeid)})}}  loading={props.trainee.proceedingToTest}>
                            بدء الإختبار
                        </Button>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    trainee : state.trainee
});




export default connect(mapStateToProps,{
    ProceedtoTest,
    fetchTestdata
})(Instruction);