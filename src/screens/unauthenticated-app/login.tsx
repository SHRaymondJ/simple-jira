import React, { Dispatch, FormEvent, SetStateAction } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Form, Input, Button } from 'antd'
import styled from '@emotion/styled'
import { useAsync } from 'utils/useAsync'

const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
    const { login } = useAuth()
    const {isLoading, run} = useAsync()
    const handleSubmit = async (values: {
        username: string
        password: string
    }) => {
        try {
            await run(login(values))
        } catch (error) {
            onError(error as Error)
        }
    }
    
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入用户名' }]}
            >
                <Input
                    placeholder="请输入用户名"
                    type="text"
                    id="username"
                ></Input>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
            >
                <Input
                    placeholder="请输入密码"
                    type="password"
                    id="password"
                ></Input>
            </Form.Item>
            <Form.Item>
                <LongButton loading={isLoading} type="primary" htmlType="submit">
                    登录
                </LongButton>
            </Form.Item>
        </Form>
    )
}

const LongButton = styled(Button)`
    width: 100%;
`

export default LoginScreen
