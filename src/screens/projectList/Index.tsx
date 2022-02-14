import React, { useState } from 'react'
import SearchPanel from './SearchPanel'
import List from './ListModel'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { Button, Typography } from 'antd'
import { useProjects } from 'utils/useProjects'
import { useUsers } from 'utils/useUsers'
import { useProjectModal, useProjectSearchParams } from './utils'
import { ErrorBox, Row } from 'components/libs'
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

export const ProjectListScreen = () => {
    useDocumentTitle('项目列表', false)

    const { open } = useProjectModal()
    // 基本类型，可以放到依赖里，组件状态，可以放到依赖里，非组件状态的对象，绝对不能放到依赖里
    const [param, setParam] = useProjectSearchParams()
    const {
        isLoading,
        error,
        data: list,
    } = useProjects(useDebounce(param, 200))
    const { data: users } = useUsers()

    return (
        <Container>
            <Row between={true}>
                <h1>项目列表</h1>
                <Button onClick={open}>创建项目</Button>
            </Row>
            <SearchPanel
                param={param}
                setParam={setParam}
                users={users || []}
            />
            <ErrorBox error={error}></ErrorBox>
            <List
                dataSource={list || []}
                users={users || []}
                loading={isLoading}
            />
        </Container>
    )
}

ProjectListScreen.WhyDidYouRender = true

const Container = styled.div`
    padding: 3.2rem;
`
