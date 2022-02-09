import styled from '@emotion/styled'
import { Button, Dropdown, Menu } from 'antd'
import { ButtonNoPadding, Row } from 'components/libs'
import { useAuth } from 'context/AuthContext'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Link, Route, Routes } from 'react-router-dom'
import { ProjectListScreen } from 'screens/projectList/Index'
import { ProjectScreen } from 'screens/projects/Index'
import { resetRoute } from 'utils'
import { useState } from 'react'
import { ProjectModal } from 'screens/projectList/ProjectModal'
import { ProjectPopover } from 'components/ProjectPopOver'
import { useDispatch } from 'react-redux'

export const AuthenticatedApp = () => {
    return (
        <Container>
            <PageHeader />
            <ProjectModal />
            <Main>
                <Routes>
                    <Route path={'/projects'} element={<ProjectListScreen />} />
                    <Route
                        path={'/projects/:projectId/*'}
                        element={<ProjectScreen />}
                    />
                    <Route index element={<ProjectListScreen />} />
                </Routes>
            </Main>
        </Container>
    )
}

const PageHeader = () => {
    return (
        <Header between={true}>
            <HeaderLeft gap={true}>
                <ButtonNoPadding type={'link'} onClick={resetRoute}>
                    <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
                </ButtonNoPadding>
                <ProjectPopover />
                <span>用户</span>
            </HeaderLeft>
            <HeaderRight>
                <User />
            </HeaderRight>
        </Header>
    )
}
export const User = () => {
    const { user, logout } = useAuth()
    return (
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item key="1">
                        <Button type={'link'} onClick={logout}>
                            登出
                        </Button>
                    </Menu.Item>
                </Menu>
            }
        >
            <Button type={'link'} onClick={(e) => e.preventDefault()}>
                Hi, {user?.name}
            </Button>
        </Dropdown>
    )
}
const Container = styled.div`
    width: 100%;
`
const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
`

const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``

const Main = styled.main`
    grid-area: main;
`
