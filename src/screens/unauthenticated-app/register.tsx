import styled from '@emotion/styled'
import { Form, Button, Input } from 'antd'
import React, { Dispatch, FormEvent, SetStateAction } from 'react'
import { useAsync } from 'utils/useAsync'
import { useAuth } from '../../context/AuthContext'

const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
    const { register } = useAuth()
    const { isLoading, run } = useAsync()
    const handleSubmit = async ({
        cpassword,
        ...values
    }: {
        password: string
        username: string
        cpassword: string
    }) => {
        if (cpassword !== values.password) {
            onError(new Error('请确认两次密码一致'))
            return
        }
        try {
            await run(register(values))
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
            <Form.Item
                name="cpassword"
                rules={[{ required: true, message: '请确认密码' }]}
            >
                <Input
                    placeholder="请确认密码"
                    type="password"
                    id="cpassword"
                ></Input>
            </Form.Item>
            <Form.Item>
                <LongButton
                    loading={isLoading}
                    type="primary"
                    htmlType="submit"
                >
                    注册
                </LongButton>
            </Form.Item>
        </Form>
    )
}

const LongButton = styled(Button)`
    width: 100%;
`
export default RegisterScreen
