import React, { Component } from 'react'
import { Skeleton} from 'antd';
import { connect } from 'react-redux';
import {updateScoresActiveTrainee } from '../../../actions/trainerAction';
import { SecurePost, SecureGet } from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import  Alert  from '../../common/alert';
import TraineeStats from './traneeStats';


class TraineeDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.trainer.DataActiveTraineesDetails.traineeDetailsId,
            stats:null,
            loading:true,
            mainlink:'',
        }
        
    }

    tabChange = (key)=>{
        console.log(key)
    }
    componentDidMount(){
        var link = window.location.href.split('/').splice(0,3);
        var mainlink="";
        link.forEach((d,i)=>{
            mainlink=mainlink+d+"/"
        });
        this.setState({mainlink});
        var p1 = SecureGet({
            url:`${apis.FETCH_OWN_RESULT}/${this.state.id}`,
        })
        Promise.all([p1]).then((response)=>{
            console.log(response[0].data.data)
            if(response[0].data.success){
                this.setState({
                    stats:response[0].data.data,
                    loading:false,
                })
            }
            else{
                Alert('error','Error !',response[0].data.message)
            }
        }).catch((error)=>{
            console.log(error);
            Alert('error','Error !','خطأ في الخادم!.')
        })
    }

    render() {
        if(this.state.loading){
            return(
                <div className="skeletor-wrapper">
                    <Skeleton active />
                    <Skeleton active />
                </div>
            )
        }
        else{
            let { stats ,id }=this.state;      
            return (
                <div>

                    <TraineeStats id={id} stats={stats}/>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    trainer : state.trainer
});

export default connect(mapStateToProps,{
    updateScoresActiveTrainee
})(TraineeDetails);
