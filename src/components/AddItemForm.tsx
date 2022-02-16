import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {Button, IconButton, TextField} from '@material-ui/core';
import {Add, AddBox} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title:string) => void
}

export const AddItemForm = React.memo((props:AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

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
            <TextField
                style={{width:"180px"}}
                size={'small'}
                variant={"outlined"}
                value={title}
                onChange={changeTitle}
                onKeyPress={addTaskUsingEnter}
                label={"Title"}
                error={error}
                helperText={error && "title is required!"}
                disabled={true}
            />
{/*            <input
                style={error ? errorInputStyle : undefined}
                className={error ? 'error' : ''}
                value={title}
                placeholder="Enter a value..."
                onChange={changeTitle}
                onKeyPress={addTaskUsingEnter}
            />*/}
            <IconButton onClick={addItem} color={"primary"} size={"small"}>
                <AddBox fontSize={"large"}/>
            </IconButton>
            {/*{errorMessage}*/}
        </div>
    )
})
