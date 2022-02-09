import React, { useState } from 'react'
import SearchPanel from './SearchPanel'
import List from './ListModel'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { Button, Typography } from 'antd'
import { useProjects } from 'utils/useProjects'
import { useUsers } from 'utils/useUsers'
import { useProjectSearchParams } from './utils'
import { Row } from 'components/libs'
export interface User {
    id: number
    name: string
    token: string
}
export interface Project {
    id: number
    name: string
    personId: number
    organization: string
    created: number
    pin: boolean
}

export const ProjectListScreen = (props: {openProjectModal: () => void}) => {
    useDocumentTitle('项目列表', false)

    // 基本类型，可以放到依赖里，组件状态，可以放到依赖里，非组件状态的对象，绝对不能放到依赖里
    const [param, setParam] = useProjectSearchParams()
    const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 200))
    const { data: users } = useUsers()

    return (
        <Container>
            <Row between={true}>
                <h1>项目列表</h1>
                <Button onClick={props.openProjectModal}>创建项目</Button>
            </Row>
            <SearchPanel
                param={param}
                setParam={setParam}
                users={users || []}
            />
            {error ? (
                <Typography.Text type={'danger'}>
                    {error.message}
                </Typography.Text>
            ) : null}
            <List
                refresh={retry}
                dataSource={list || []}
                users={users || []}
                loading={isLoading}
                openProjectModal={props.openProjectModal}
            />
        </Container>
    )
}

ProjectListScreen.WhyDidYouRender = true

const Container = styled.div`
    padding: 3.2rem;
`
