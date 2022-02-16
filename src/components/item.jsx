import React from 'react'
import { Checkbox } from 'antd'
import { DeleteFilled } from '@ant-design/icons'

import './item.scss'

const Item = props => {

    const {
        id,
        text,
        read,
        CheckedItem,
        DeleteItem
    } = props

    return (
        <div className='item-wrapper'>
            <div className='item-wrapper__checkbox'>
                <Checkbox
                    style={{ padding: 5 }}
                    checked={read}
                    onChange={CheckedItem.bind(this, id)}
                />
            </div>
            <div className='item-wrapper__text'>
                <p className={`${read ? "text-decor" : ""}`}>{text}</p>
            </div>
            <div className='item-wrapper__delete'>
                <DeleteFilled
                    style={{ fontSize: 16, cursor: 'pointer', padding: 5 }}
                    onClick={DeleteItem.bind(this, id)}
                />
            </div>
        </div>
    )
}

export default Item