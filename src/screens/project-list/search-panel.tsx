import { Form, Input, Select } from 'antd'
import React, { Dispatch, SetStateAction } from 'react'
import { IParam, IUsers } from '.'

interface PSearchPanelProps {
    users: IUsers[]
    param: IParam
    setParam: Dispatch<SetStateAction<IParam>>
}

const SearchPanel = ({ users, param, setParam }: PSearchPanelProps) => {
    return (
        <Form
            style={{
                marginBottom: '2rem',
            }}
            layout={'inline'}
        >
            <Form.Item>
                <Input
                    type="text"
                    value={param.name}
                    onChange={(ext) =>
                        setParam({
                            ...param,
                            name: ext.target.value,
                        })
                    }
                />
            </Form.Item>
            <Form.Item>
                <Select
                    value={param.personId}
                    onChange={(value) =>
                        setParam({
                            ...param,
                            personId: value,
                        })
                    }
                >
                    <Select.Option value="">
                        负责人
                    </Select.Option>
                    {users.map((user) => (
                        <Select.Option value={user.id} key={user.id}>
                            {user.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    )
}

export default SearchPanel
