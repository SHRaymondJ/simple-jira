import styled from '@emotion/styled'
import { Button, Divider, List, Popover, Typography } from 'antd'
import { useProjects } from 'utils/useProjects'
import { ButtonNoPadding } from './libs'

export const ProjectPopover = (props: {openProjectModal: () => void}) => {
    const { data: projects, isLoading } = useProjects()
    const pinProject = projects?.filter((project) => project.pin)
    const content = (
        <ContentContainer>
            <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
            <List>
                {pinProject?.map((project) => (
                    <List.Item>
                        <List.Item.Meta title={project.name} />
                    </List.Item>
                ))}
            </List>
            <Divider />
            <ButtonNoPadding onClick={props.openProjectModal} type="link">创建项目</ButtonNoPadding>
        </ContentContainer>
    )

    return (
        <Popover placement="bottom" content={content}>
            <span>项目</span>
        </Popover>
    )
}

const ContentContainer = styled.div`
min-width: 30rem;
`