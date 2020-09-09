/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-26 19:43:20
 */
import React, { useState } from 'react'
import Editor from 'for-editor'

const MdEditor = ({ value = {}, onChange }) => {
    const [content, setContent] = useState('')
    const triggerChange = changedValue => {
        if (onChange) {
            onChange({
                content,
                ...value,
                ...changedValue,
            })
        }
    }
    const onContentChange = newContent => {
        if (!('content' in value)) {
            setContent(newContent)
        }
        triggerChange({
            content: newContent,
        })
    }
    const addImgHandler = (file) => {
      console.log('file',file);

    }
    const onSaveHandler = (value) => {
      console.log('value',value);

    }
    return (
        <Editor
            value={value.content || content}
            addImg={addImgHandler}
            onChange={onContentChange}
            onSave={onSaveHandler}
        />
    )
}

export default MdEditor
