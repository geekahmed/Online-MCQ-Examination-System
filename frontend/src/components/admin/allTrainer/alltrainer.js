import React, { Component } from 'react';
import { Table, Input, Button, Icon, Typography, Divider, Modal, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { 
    ChangeTrainerSearchText,
    ChangeTrainerTableData,
    ChangeTrainerModalState
} from '../../../actions/adminAction';
import './alltrainer.css'
import Alert from '../../../components/common/alert';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import NewTrainerForm from '../newTrainer/newtrainer';


class AllTrainer extends Component {

  constructor(props){
    super(props);
    this.state={
      TrainertableLoading : false
    }
  }

  openModal = (id,mode)=>{
    this.props.ChangeTrainerModalState(true,id,mode);
  }

  closeModal = ()=>{
    this.props.ChangeTrainerModalState(false,null,'Register');
  }

  componentDidMount(){
    this.props.ChangeTrainerTableData();
  }

  deleteTrainer = (id)=>{
    SecurePost({
      url : `${apis.DELETE_TRAINER}`,
      data : {
          _id : id
      }
    }).then((response)=>{
      if(response.data.success){
        Alert('success','عملية ناجحة',response.data.message);
        this.props.ChangeTrainerTableData();
      }
      else{
        return Alert('warning','تحذير!',response.data.message);
      }
    }).catch((error)=>{
      return Alert('error','خطأ!','خطأ في الخادم');
    })
  }

    getColumnSearchProps = (dataIndex,title) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`بحث ${title}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              بحث
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              إعادة ضبط
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: text => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.props.admin.TrainersearchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
      });
    
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.props.ChangeTrainerSearchText(selectedKeys[0])
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.props.ChangeTrainerSearchText('')
      };

    render() {
      const { Title } = Typography;
      const columns = [
       /*  {
          title: 'رتبة / درجة',
          dataIndex: 'rank',
          key: 'rank',
          width: '25%',
          
          ...this.getColumnSearchProps('rank', 'رتبة / درجة'),
        }, */
        {
          title: 'الإسم',
          dataIndex: 'name',
          key: 'name',
          width: '25%',
          
          ...this.getColumnSearchProps('name', 'الإسم'),
        },
        {
          title: 'معرف المستخدم',
          dataIndex: 'userid',
          key: 'userid',
          width: '25%',
          ...this.getColumnSearchProps('userid', 'معرف المستخدم'),
        },
        {
          title: 'رقم الاتصال',
          dataIndex: 'contact',
          key: 'contact',
          ...this.getColumnSearchProps('contact', 'رقم الإتصال'),
        },
        {
          title: 'فعل',
          key: '_id',
          dataIndex: '_id',
          render: (key) => (
            <span>
              <Button type="primary" shape="circle" icon="edit" onClick={()=>this.openModal(key,'Save Changes')}/>
                <Divider type="vertical" />
                <Popconfirm
                  title="هل أنت متأكد؟"
                  cancelText="لا"
                  okText="نعم"
                  onConfirm={()=>{this.deleteTrainer(key)}}
                  icon={<Icon type="delete" style={{ color: 'red' }} />}
                >
                  <Button type="danger" shape="circle" icon="delete" />
                </Popconfirm>
              
            </span>
          ),
        },
      ];
        return (
            <div className="admin-table-container">
              <Button type="primary" icon="user-add" style={{marginBottom:'10px'}} onClick={()=>this.openModal(null,'Register')}>
                إضافة مدرب جديد
              </Button> 
              <div className="register-trainer-form-header">
                <Title level={4} style={{color:'#fff',textAlign:'center'}}>قائمة المدربين</Title>
              </div>
              <Table
                dir='rtl' 
                bordered={true} 
                columns={columns} 
                dataSource={this.props.admin.trainerTableData} 
                size="medium" 
                pagination={{ pageSize: 5 }}
                loading={this.props.admin.trainerTableLoadingStatus}
                rowKey="_id" 
              />;
              <Modal
                visible={this.props.admin.TrainermodalOpened}
                title={false}
                onOk={this.handleOk}
                onCancel={this.closeModal}
                style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
                width="40%"
                destroyOnClose={true}
                footer={[
                  
                ]}
              >
                <NewTrainerForm />
              </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    admin : state.admin
});

export default connect(mapStateToProps,{
    ChangeTrainerSearchText,
    ChangeTrainerTableData,
    ChangeTrainerModalState
})(AllTrainer);