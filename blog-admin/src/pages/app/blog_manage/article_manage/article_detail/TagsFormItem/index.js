/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-07-01 14:00:01
 */
import React, { useState } from 'react'
import { Tag } from 'antd'
function TagsFormItem(props) {
    const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3'])

    const tagRemoveHandler = function (tagItem, tagIndex) {
        tags.splice(tagIndex, 1)
    }

    const addNewTagClickHandler =  () => {
      console.log('111');

    }

    return (
        <>
            {tags.map((tagItem, tagIndex) => {
                return (
                    <Tag
                        key={tagIndex}
                        closable
                        onClose={() => tagRemoveHandler(tagItem, tagIndex)}
                    >
                        {tagItem}
                    </Tag>
                )
            })}
            <Tag
                style={{ borderStyle: 'dashed', background: '#fff' }}
                onClick={addNewTagClickHandler}
            >
                New Tag
            </Tag>
        </>
    )
}

export default TagsFormItem
