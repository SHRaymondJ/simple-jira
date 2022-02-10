import { Button, Dropdown, Menu, Popover, Table, TableProps } from 'antd'
import { ButtonNoPadding } from 'components/libs'
import { Pin } from 'components/pin'
import dayjs from 'dayjs'
import React from 'react'
import { Link } from 'react-router-dom'
import { useEditProjects } from 'utils/useProjects'
import { Project, User } from './Index'
import { useProjectModal } from './utils'

interface ListProps extends TableProps<Project> {
    users: User[]
    refresh?: () => void
    openProjectModal?: () => void
}

const List = ({ users, ...props }: ListProps) => {
    const { mutate } = useEditProjects()
    const { open } = useProjectModal()
    const pinProject = (id: number) => (pin: boolean) =>
        mutate({ id, pin })
    const columns = [
        {
            title: <Pin checked={true} disabled={true} />,
            render(value: any, project: Project) {
                return (
                    <Pin
                        checked={project.pin}
                        onCheckedChange={pinProject(project.id)}
                    />
                )
            },
        },
        {
            title: '名称',
            dataIndex: 'name',
            rowKey: 'name',
            sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
            render(value: any, project: Project) {
                return (
                    <Link to={`projects/${String(project.id)}`}>
                        {project.name}
                    </Link>
                )
            },
        },
        {
            title: '小组',
            dataIndex: 'organization',
            rowKey: 'organization',
            sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
        },
        {
            title: '负责人',
            rowKey: '负责人',
            render(value: any, project: Project) {
                return (
                    <span>
                        {
                            users.find(
                                (user) => user.id === Number(project.personId)
                            )?.name
                        }
                    </span>
                )
            },
        },
        {
            title: '创建时间',
            dataIndex: 'created',
            rowKey: 'created',
            sorter: (a: Project, b: Project) => a.created - b.created,
            render(value: any, project: Project) {
                return (
                    <span>
                        {project.created
                            ? dayjs(project.created).format('YYYY-MM-DD')
                            : '无'}
                    </span>
                )
            },
        },
        {
            title: '操作',
            render(value: any, project: Project) {
                return (
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item key={'edit'}>
                                    <ButtonNoPadding type="link" onClick={open}>
                                        编辑
                                    </ButtonNoPadding>
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <ButtonNoPadding type="link">...</ButtonNoPadding>
                    </Dropdown>
                )
            },
        },
    ]
    return (
        <Table
            pagination={false}
            columns={columns}
            rowKey={(record) => record.id}
            {...props}
        />
    )
}

export default List
