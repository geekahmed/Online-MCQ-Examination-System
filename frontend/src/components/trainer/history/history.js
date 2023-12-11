import React, { Component } from 'react';
import { Table, Input, Button, Icon, Typography, Modal,Tag   } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { 
    ChangeTraineeSearchText,
    ChangeTraineeTableData,
    ChangeTraineeDetailsModalState
} from '../../../actions/trainerAction';
import './history.css';
import moment from 'moment';

import TraineeDetails from './traneeDetails';




class History extends Component {

    openModal = (id)=>{
      this.props.ChangeTraineeDetailsModalState(true,id);
    }
    
    closeModal = ()=>{
        this.props.ChangeTraineeDetailsModalState(false,null);
    }
    componentDidMount(){
      this.props.ChangeTraineeTableData();
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
            searchWords={[this.props.trainer.TestsearchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
      });
    
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.props.ChangeTraineesSearchText(selectedKeys[0])
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.props.ChangeTraineesSearchText('')
      };

    render() {
      const { Title } = Typography;
      const columns = [
        {
          title: 'الإسم',
          dataIndex: 'name',
          key: 'name',
          ...this.getColumnSearchProps('name', 'الإسم'),
        },
        {
          title: 'معرف المستخدم',
          dataIndex: 'userid',
          key: 'userid',
          ...this.getColumnSearchProps('userid', 'النوع'),
        },
        {
          title: 'تحليل الإختبارات السابقة',
          key: '_id',
          dataIndex: 'userid',
          render: (key) => (
            
            <span>
              <Button type="primary" shape="circle" icon="info-circle" onClick={()=>this.openModal(key)}/>
            </span> 
          ),
        },
      ];
        return (
            <div className="admin-table-container">
              <div className="register-trainer-form-header">
                <Title level={4} style={{color:'#fff',textAlign:'center'}}>قائمة المتدربين</Title>
              </div>
              <Table 
                bordered={true} 
                columns={columns} 
                dataSource={this.props.trainer.TraineesTableData} 
                size="medium" 
                pagination={{ pageSize: 5 }}
                loading={this.props.trainer.TraineesTableLoading}
                rowKey="_id" 
              />;
              <Modal
                visible={this.props.trainer.TraineeDetailsmodalOpened}
                title="تحليل نتائج الإختبار"
                onOk={this.handleOk}
                onCancel={this.closeModal}
                afterClose={this.closeModal}
                style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
                width="90%"
                destroyOnClose={true}
                footer={[
                  
                ]}
              >
                <TraineeDetails />
              </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    trainer : state.trainer
});

export default connect(mapStateToProps,{
    ChangeTraineeSearchText,
    ChangeTraineeTableData,
    ChangeTraineeDetailsModalState
})(History);