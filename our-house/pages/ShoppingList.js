import React from 'react'
import styles from '../styles/ShoppingList.module.css'
import Navbar from '../components/Navbar.js'
import InputBar from '../components/InputBar.js'
import ShoppingListItem from '../components/ShoppingListItem.js'
import { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0';


const ShoppingList = () => {
  const { user, error, isLoading } = useUser();

  const [listItems, setListItems] = useState([
    {name: "Bread", id:"1", completed: false, icon:"user_avatar_1.svg"},
    {name: "Milk", id:"2", completed: false, icon:"user_avatar_1.svg"}])

  // takes in a value from the input component
  const updateShoppingList = async (value, shopName) => {
    const id = String(Math.floor(Math.random()*100+3))
    const newItem = {name: value, id: id, completed: false, icon:"user_avatar_1.svg"}
    console.log('sdfsdfs',[...listItems, newItem])
    setListItems([newItem, ...listItems])

    const newShopItem = {item: value, shoppingListName: shopName, completed: false, username: user.name}


    const data = await fetch(`${process.env.API_URL}/ShoppingList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newShopItem),
    })
  }

  const deleteListItem = async (id) => {
    const newListItems = listItems.filter((item) => {
      if (item.id === id) {
        return false
      }
      else {
        return true
      }
    }
    )

    
    setListItems(newListItems)
    const data = await fetch(`${process.env.API_URL}/ShoppingList`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: id}),
    })
  }

  // uses item id to toggled between true or false
  const toggleItemAsCompleted = (id) => {
    let newListItems = [];
    // find item by id, update the completed key:value and exit loop
    for(let i=0; i < listItems.length; i++) {
      if (listItems[i].id === id) {
        newListItems = [
          ...listItems.slice(0,i),
          {...listItems[i], completed: !listItems[i].completed },
          ...listItems.slice(i+1, listItems.lenght)
        ];
        break;
      }

    }
    setListItems(newListItems);
  }

  const props = {
    name: "Lidl"
  }
  
  // Input bar create locally... to be replaced by component
  return (
    <div className={styles.shoppinglist}>
    <Navbar/>
    <h1>{props.name} Shopping List</h1>
    <input type="text"/>
    <button onClick={ () => {
      const value = document.querySelector('input')
      updateShoppingList(value.value, props.name)
    }}></button>
    {/* <InputBar updateShoppingList={updateShoppingList}/> */}
    <ul>
      {listItems.map((item, index) => (
        <ShoppingListItem name={item.name} key={index} id={item.id} deleteListItem={deleteListItem} toggleItemAsCompleted={toggleItemAsCompleted} />))}
    </ul>

    </div>
  )
}

export default ShoppingList