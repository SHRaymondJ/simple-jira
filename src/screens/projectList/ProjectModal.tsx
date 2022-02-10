import { Drawer } from 'antd'
import { useProjectModal } from './utils'

export const ProjectModal = () => {
    const { projectModalOpen, close } = useProjectModal()
    return (
        <Drawer width={'100%'} visible={projectModalOpen} onClose={close}>
            Project Modal
        </Drawer>
    )
}
