import styled from '@emotion/styled'
import { Button, Spin, Typography } from 'antd'
// import { DevTools } from 'jira-dev-tool'

export const Row = styled.div<{
    gap?: number | boolean
    between?: boolean
    marginBottom?: number
}>`
    display: flex;
    justify-content: ${(props) =>
        props.between ? 'space-between' : undefined};
    align-items: center;
    margin-bottom: ${(props) =>
        props.marginBottom ? props.marginBottom + 'rem' : undefined};
    > * {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        margin-right: ${(props) =>
            typeof props.gap === 'number'
                ? props.gap + 'rem'
                : props.gap
                ? '2rem'
                : undefined};
    }
`

export const FullPageLoading = () => {
    return (
        <FullPageContainer>
            <Spin size={'large'} />
        </FullPageContainer>
    )
}

const FullPageContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
    return (
        <FullPageContainer>
            {/* <DevTools /> */}
            <ErrorBox error={error}></ErrorBox>
        </FullPageContainer>
    )
}

// 类型守卫
// 返回值 value is Error, typescript 后面会把他当成 Error 类型
const isError = (value: any): value is Error => value?.message

export const ErrorBox = ({ error }: { error: unknown }) => {
    if (isError(error)) {
        return (
            <Typography.Text type={'danger'}>{error.message}</Typography.Text>
        )
    }
    return null
}

export const ButtonNoPadding = styled(Button)`
    padding: 0;
`
