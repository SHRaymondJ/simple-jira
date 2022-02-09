import { Table, TableProps } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { IList, IUsers } from '.'

interface ListProps extends TableProps<IList> {
    users: IUsers[]
}
const List = ({ users, ...props }: ListProps) => {
    return (
        <Table
            pagination={false}
            columns={[
                {
                    title: '名称',
                    dataIndex: 'name',
                    sorter: (a, b) => a.name.localeCompare(b.name),
                    render: (value, project) => {
                        return (
                            <Link to={`projects/${String(project.personId)}`}>
                                {project.name}
                            </Link>
                        )
                    },
                },
                {
                    title: '负责人',
                    render: (value, project) => {
                        return users.find(
                            (user) => user.id === project.personId
                        )?.name
                    },
                },
            ]}
            rowKey={(record) => record.id}
            {...props}
        ></Table>
    )
}

export default List
