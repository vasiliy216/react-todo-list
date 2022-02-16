import React, { useEffect, useState } from 'react'
import Api from '../utils/api'
import App from '../App'

const AppContainer = () => {

    const [items, setItems] = useState({})
    const [text, setText] = useState('')

    const ChangeData = data => {
        setText(data)
    }

    const handleSend = e => {
        if (e.keyCode === 13) {
            OnNewItem();
        }
    }

    const OnNewItem = () => {
        Api
            .create({ text: text })
            .then((item) => {

                const { data } = item;

                setText('')
                setItems(prevData => ([ ...prevData, data ]))
            })
            .catch()
    }

    const CheckedItem = id => {
        Api
            .update(id)
            .then(() => {
                const newItem = items.map(item => {
                    if (item._id === id) item.read = !item.read;
                    return item
                })
                setItems(newItem)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const DeleteItem = id => {
        Api
            .delete(id)
            .then(() => {
                const newItem = items.filter(item => item._id !== id)
                setItems(newItem)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        Api
            .findAll()
            .then(items => {

                const { data } = items;

                setItems(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <App
            items={items}
            text={text}
            OnNewItem={OnNewItem}
            ChangeData={ChangeData}
            handleSend={handleSend}
            CheckedItem={CheckedItem}
            DeleteItem={DeleteItem}
        />
    )
}

export default AppContainer