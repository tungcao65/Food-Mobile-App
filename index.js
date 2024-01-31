

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from 
"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-e4900-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
     push(shoppingListInDB, inputValue)

   clearInputField()
    

})

onValue(shoppingListInDB, function(snapshot) {


    if(snapshot.exists()){
    let itemArray = Object.entries(snapshot.val())

    clearShoppingListEl()

    for (let i= 0; i< itemArray.length; i++){
        let currentItem = itemArray[i]

        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]

        appendItemToShoppingListEl(currentItem)
    }
}else{
    shoppingListEl.innerHTML = "No item here yet"
}
})

function clearShoppingListEl(){ 
    shoppingListEl.innerHTML = ""
}

function clearInputField(){
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item){
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function(){
     let exactLocationOfItemInDB = ref (database, `Food/${itemID}`)

remove(exactLocationOfItemInDB)
    })
    shoppingListEl.append(newEl)
}