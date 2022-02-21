import React, { useEffect, useState } from 'react'
import Api from '../utils/api'
import socket from '../core/socket'
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
                const newData = { type: "CREATE", payload: item.data };
                socket.emit("SERVER:ITEM_UPDATE", newData)
                UpdateTodoList(newData);
                setText('')
            })
            .catch()
    }

    const CheckedItem = id => {
        Api
            .update(id)
            .then(() => {
                const newData = { type: "UPDATE", payload: id };
                socket.emit("SERVER:ITEM_UPDATE", newData)
                UpdateTodoList(newData);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const DeleteItem = id => {
        Api
            .delete(id)
            .then(() => {
                const newData = { type: "DELETE", payload: id };
                socket.emit("SERVER:ITEM_UPDATE", newData)
                UpdateTodoList(newData);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const UpdateTodoList = ({ type, payload }) => {
        switch (type) {
            case "UPDATE":
                setItems(prevData => {
                    return prevData.map(item => {
                        if (item._id === payload) {
                            return {
                                ...item,
                                read: !item.read
                            }
                        }
                        return item;
                    })
                }); break;
            case "CREATE": setItems(prevData => ([...prevData, payload])); break;
            case "DELETE":
                setItems(prevData => {
                    return prevData.filter(item => item._id !== payload)
                }); break;
            default: return null;
        }
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

        socket.on("SERVER:ITEM_UPDATE", UpdateTodoList)

        return () => {
            socket.removeListener("SERVER:ITEM_UPDATE")
        }

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