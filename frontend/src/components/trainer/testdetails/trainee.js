import React from 'react';
import { Table, Tag, Card } from 'antd';





export default function Trainee(props) {
    let maxMarks=props.maxmMarks || 2;
    const columns = [
        {
            title: 'الإسم',
            dataIndex: 'userid.name',
            key: 'userid.name'
        },
        {
            title: 'معرف المستخدم',
            dataIndex: 'userid.userid',
            key: 'userid.userid',
        },
        {
            title:'النتيجة',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title:'الحالة',
            dataIndex:'score',
            key: '_id',
            render: tag => (
                <span>
                    <Tag color={tag >= maxMarks/2 ? 'green' : 'red'} key={tag}>
                        {tag >= maxMarks/2 ? 'Pass' : 'Fail'}
                    </Tag>
                </span>
            )
        }
    ];
    return (
        <div>
            <Card>
                <div className="download-section">
                    <Table pagination={false} rowKey="_id" columns={columns} dataSource={props.stats}/>
                </div>
            </Card>
        </div>
    )
}
