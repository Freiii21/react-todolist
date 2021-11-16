import React, {useState, ChangeEvent, KeyboardEvent} from 'react';

type AddItemFormPropsType = {
    addItem: (title:string) => void
}

export const AddItemForm = (props:AddItemFormPropsType) => {
    const errorInputStyle = {border:"2px solid red", outline:"none"}
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const errorMessage = error ? <div style={{color: 'red'}}>Title is required</div> : null;

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {                  // string with any value true and empty string is false
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    };
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false);
    }
    const addTaskUsingEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <input
                style={error ? errorInputStyle : undefined}
                className={error ? 'error' : ''}
                value={title}
                placeholder="Enter a value..."
                onChange={changeTitle}
                onKeyPress={addTaskUsingEnter}
            />
            <button onClick={addItem}>+</button>
            {errorMessage}
        </div>
    )
}
