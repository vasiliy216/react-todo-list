import orderBy from 'lodash/orderBy'
import { Item, AddItem } from './components'

import './scss/style.scss'

const App = props => {

  const {
    items,
    text,
    OnNewItem,
    ChangeData,
    handleSend,
    CheckedItem,
    DeleteItem
  } = props

  return (
    <div className='container'>
      <div className='add-item'>
        <AddItem
          text={text}
          OnNewItem={OnNewItem}
          ChangeData={ChangeData}
          handleSend={handleSend}
        />
      </div>
      <div className='body-item'>
        {
          orderBy(items, ['createdAt'], ['desc']).map(item => {
            return (
              <Item
                key={item._id}
                id={item._id}
                text={item.text}
                read={item.read}
                CheckedItem={CheckedItem}
                DeleteItem={DeleteItem}
              />
            )
          })
        }
      </div>
    </div>
  )

}

export default App;