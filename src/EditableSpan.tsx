import React, {useState, ChangeEvent, KeyboardEvent} from 'react';

type EditableSpanPropsType = {
    title: string
    setNewTitle: (title:string) => void
}

export const EditableSpan = (props:EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.setNewTitle(title);
    }
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        editMode
        ? <input
                value={title}
                onBlur={offEditMode}
                autoFocus
                onChange={changeTitle}/>
        : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}