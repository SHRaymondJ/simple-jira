import { Button, Card, Divider, Typography } from 'antd'
import React, { useState } from 'react'
import LoginScreen from './login'
import RegisterScreen from './register'
import styled from '@emotion/styled'
import logo from 'assets/logo.svg'
import left from 'assets/left.svg'
import right from 'assets/right.svg'

const UnauthenticatedApp = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    return (
        <Container>
            <Header></Header>
            <Background />
            <ShadowCard>
                <h2>{isLogin ? '请登录' : '请注册'}</h2>
                {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : ''}
                {isLogin ? (
                    <LoginScreen onError={(err) => setError(err)}></LoginScreen>
                ) : (
                    <RegisterScreen onError={(err) => setError(err)}></RegisterScreen>
                )}
                <Divider />
                <Button type={'link'} onClick={() => setIsLogin(!isLogin)}>{`${
                    isLogin ? '已经有账号了？直接登录' : '没有账号？注册新账号'
                }`}</Button>
            </ShadowCard>
        </Container>
    )
}
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
`

const ShadowCard = styled(Card)`
    width: 40rem;
    min-height: 10rem;
    padding: 3.2rem 4rem;
    border-radius: 0.3rem;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
    text-align: center;
`

const Background = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: left bottom, right bottom;
    background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
        calc(((100vw - 40rem) / 2) - 3.2rem), cover;
    background-image: url(${left}), url(${right});
`

const Header = styled.header`
    background: url(${logo}) no-repeat center;
    padding: 5rem 0;
    background-size: 8rem;
    width: 100%;
`

export default UnauthenticatedApp
