import React from 'react'
import { Input, Button } from 'antd'

import './add-item.scss'

const AddItem = props => {

    const {
        text,
        OnNewItem,
        ChangeData,
        handleSend
    } = props

    return (
        <div className='group'>
            <Input
                placeholder='New Item'
                style={{width: '100%'}}
                value={text}
                onChange={e => ChangeData(e.target.value)}
                onKeyUp={handleSend}
            />
            <Button
                type='primary'
                onClick={OnNewItem}
            >
                Add Item
            </Button>
        </div>
    )
}

export default AddItem