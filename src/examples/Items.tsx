import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import {
    SortableContainer,
    SortableElement,
    arrayMove,
    SortableContainerProps,
    SortableElementProps,
    SortableHandle,
} from 'react-sortable-hoc'
import './styles.scss'

interface ISortableHandleElement {
    children: React.ReactNode
    className?: string
}

interface ISortableItem extends SortableElementProps {
    children: React.ReactNode
    className?: string
}

interface ISortableContainer extends SortableContainerProps {
    children: React.ReactNode
    className?: string
}

const DndTrigger: React.ComponentClass<ISortableHandleElement, any> = SortableHandle(
    ({ children, className }: { children: React.ReactNode; className: string }) => (
        <div className={className || ''}>
            {children}
        </div>
    )
)

const DndItem: React.ComponentClass<ISortableItem, any> = SortableElement(
    ({ children, className }: { children: React.ReactNode; className: string }) => (
        <div className={className || ''}>{children}</div>
    )
)

const DndList: React.ComponentClass<ISortableContainer, any> = SortableContainer(
    ({ children, className }: { children: React.ReactNode; className: string }) => {
        return <div className={className || ''}>{children}</div>
    }
)

const Items = (): JSX.Element => {
    const [state, setState] = useState<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'])

    const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }): void => {
        setState(arrayMove(state, oldIndex, newIndex))
    }

    return (
        <DndList
            lockAxis="y"
            lockToContainerEdges={true}
            useDragHandle
            onSortEnd={onSortEnd}
            className="itemsContainer"
        >
            {state.map((value: any, index: number) => (
                <DndItem key={`item-${index}`} index={index} className="item">
                    <DndTrigger className="itemTrigger">
                        <GiHamburgerMenu />
                    </DndTrigger>
                    <div className="itemContent">{value}</div>
                </DndItem>
            ))}
        </DndList>
    )
}

export default Items
