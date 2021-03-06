import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false);

	const [title, setTitle] = useState<string>(props.title);

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value);
	};

    const onEditMode = () => { setEditMode(true) }
    const offEditMode = () => { 
        setEditMode(false)
        props.changeTitle(title)
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			props.changeTitle(title)
            setEditMode(false)
		}
	};
    return (
        editMode ?
            <input
				value={title}
                autoFocus
                onBlur={offEditMode}
				onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
			/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}

export default EditableSpan;
