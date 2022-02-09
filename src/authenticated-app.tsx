import { useAuth } from './context/AuthContext'
import ProjectListScreen from './screens/project-list'
import styled from '@emotion/styled'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Row } from 'components/libs'
import { Button, Dropdown, Menu } from 'antd'
import { Route, Routes } from 'react-router-dom'
import { ProjectScreen } from 'screens/projects'

export const AuthenticatedApp = () => {
    return (
        <Container>
            <PageHeader></PageHeader>
            <Main>
                <Routes>
                    <Route path={'/projects'} element={<ProjectListScreen/>} />
                    <Route path={'/projects/:projectId/*'} element={<ProjectScreen/>} />
                    <Route index element={<ProjectListScreen />}/>

                </Routes>
            </Main>
        </Container>
    )
}

export const PageHeader = () => {
    const { user, logout } = useAuth()
    return (
        <Header between={true}>
            <HeaderLeft gap={true}>
                <Button type={'link'}>
                    <SoftwareLogo width={'10rem'} color={'rgb(38,132,255)'} />
                </Button>
                <h2>项目</h2>
                <h2>用户</h2>
            </HeaderLeft>
            <HeaderRight>
                {/* <Button onClick={logout} type="default"> */}
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
                {/* </Button> */}
            </HeaderRight>
        </Header>
    )
}

const Container = styled.div`
    width: 100%;
`
const Header = styled(Row)`
    padding: 1.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
`

const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``

const Main = styled.main`
    grid-area: main;
`
