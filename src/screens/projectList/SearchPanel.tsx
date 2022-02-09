import { Form, Input, Select } from 'antd'
import { IdSelect } from 'components/IdSelect'
import React from 'react'
import { Project, User } from './Index'

interface SearchPanelProps {
    param: Partial<Pick<Project, 'name' | 'personId'>>
    users: User[]
    setParam: (param: SearchPanelProps['param']) => void
}

const SearchPanel = ({ param, users, setParam }: SearchPanelProps) => {
    return (
        <Form style={{ marginBottom: '2rem' }} layout={'inline'}>
            <Form.Item>
                <Input
                    placeholder="项目名"
                    type="text"
                    value={param.name}
                    onChange={(evt) =>
                        setParam({
                            ...param,
                            name: evt.currentTarget.value,
                        })
                    }
                />
            </Form.Item>
            <Form.Item>
                <IdSelect
                    value={param.personId}
                    onChange={(value) =>
                        setParam({
                            ...param,
                            personId: value,
                        })
                    }
                    defaultOptionName={'负责人'}
                    options={users}
                ></IdSelect>
            </Form.Item>
        </Form>
    )
}

export default SearchPanel
