import React, { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useMount } from '../../utils'
import List from './list'
import SearchPanel from './search-panel'
import { useHttp } from '../../utils/http'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useAsync } from 'utils/useAsync'
import { useProjects } from 'utils/useProjects'
import { useUsers } from 'utils/useUsers'

export interface IUsers {
    id: string
    name: string
    token: string
}
export interface IList {
    id: number
    name: string
    personId: string
    organization: string
    created: number
}
export interface IParam {
    [key: string]: unknown
    name: string
    personId: string
}
const ProjectListScreen = () => {
    const [param, setParam] = useState<IParam>({
        name: '',
        personId: '',
    })
    const debouncedParam = useDebounce(param, 200)
    const { isLoading, data: list, error } = useProjects(debouncedParam)
    const { data: users } = useUsers()

    return (
        <Container>
            <SearchPanel users={users || []} param={param} setParam={setParam} />
            {error ? (
                <Typography.Text type={'danger'}>
                    {error.message}
                </Typography.Text>
            ) : null}
            <List users={users || []} dataSource={list || []} loading={isLoading} />
        </Container>
    )
}

const Container = styled.div`
    padding: 3.2rem;
`
export default ProjectListScreen
