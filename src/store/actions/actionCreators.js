// THIS FILE KNOWS HOW TO MAKE ALL THE ACTION
// OBJECDTS THAT WE WILL USE. ACTIONS ARE SIMPLE
// LITTLE PACKAGES THAT REPRESENT SOME EVENT
// THAT WILL BE DISPATCHED TO THE STORE, WHICH
// WILL TRIGGER THE EXECUTION OF A CORRESPONDING
// REDUCER, WHICH ADVANCES STATE

// THESE ARE ALL THE TYPE OF ACTIONS WE'LL BE CREATING
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const CREATE_TODO_LIST = 'CREATE_TODO_LIST';
export const CREATE_TODO_LIST_ERROR = 'CREATE_TODO_LIST_ERROR';
export const GO_HOME = 'GO_HOME';
export const EDIT_LIST_NAME_OWNER = 'EDIT_LIST_NAME_OWNER';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const SORT_SUCCESS = 'SORT_SUCCESS';
export const MOVE_UP_SUCCESS = 'MOVE_UP_SUCCESS';
export const MOVE_DOWN_SUCCESS = 'MOVE_DOWN_SUCCESS';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';


// THESE CREATORS MAKE ACTIONS ASSOCIATED WITH USER ACCOUNTS

export function registerSuccess() {
    return { type: 'REGISTER_SUCCESS' }
};
export function registerError(error) { 
    return { type: 'REGISTER_ERROR', error }
};
export function loginSuccess() {
    return { type: 'LOGIN_SUCCESS' }
};
export function loginError(error) {
    return { type: 'LOGIN_ERROR', error }
};
export function logoutSuccess() {
    return { type: 'LOGOUT_SUCCESS' }
};

// THESE CREATORS MAKE ACTIONS FOR ASYNCHRONOUS TODO LIST UPDATES
export function createTodoList(todoList) {
    return (dispatch, getState, { getFirestore }) => {
        const fireStore = getFirestore();
        fireStore.collection('todoLists').add({
            ...todoList,
            created: new Date()
        }).then((documentRef) => {
            dispatch( { type: 'CREATE_TODO_LIST', payload: documentRef.id });
        }).catch(error => {
            dispatch({ type: 'CREATE_TODO_LIST_ERROR' });
        });
    }
}
export function createTodoListError(error) {
    return {
        type: 'CREATE_TODO_LIST_ERROR',
        error
    }
}
export function goHome() {
    return {
        type: 'GO_HOME'
    }
}
export function prependList(id){
    return (dispatch, getState, { getFirestore }) => {
        const fireStore = getFirestore();
        const ref = fireStore.collection('todoLists').doc(id);
        ref.get().then(function (doc) {
            if (doc.exists) {
                const name = doc.data().name;
                const owner = doc.data().owner;
                const items = doc.data().items;
                fireStore.collection('todoLists').doc(id).set({
                    name: name,
                    owner: owner,
                    items: items,
                    created: new Date()
                })
            } else {
                console.log("There is no such document in existence.");
            }
        }).catch(function (error) {
            console.log("There was an error in getting the document:", error);
        });
    }
}
export function editNameandOwner (todoList, state) 
{
    return (dispatch, getState, { getFirestore }) => {
        const fireStore = getFirestore();
        const ref = fireStore.collection('todoLists').doc(todoList.id);
        ref.get().then(function(doc) {
            if (doc.exists)
            {
                const name = state.name;
                const owner = state.owner;
                const items = doc.data().items;
                fireStore.collection('todoLists').doc(todoList.id).set({
                    name: name,
                    owner: owner,
                    items: items,
                    created: new Date()
                })
            }
            else
            {
                console.log("There is no such document in existence.");
            }
        }).catch(function(error) {
            console.log("There was an error in getting the document:", error);
        });
    }
}
export function deleteSuccess()
{
    return { type: 'DELETE_SUCCESS' }
};
export function deleteList(todoList)
{
    return {
        type: 'DELETE_TODO_LIST',
        todoList
    }
};
export function addItemSuccess()
{
    return { type: 'ADD_ITEM_SUCCESS' }
};
export function sortSuccess()
{
    return { type: 'SORT_SUCCESS' }
};
export function moveUpSuccess()
{
    return { type: 'MOVE_UP_SUCCESS' }
};
export function moveDownSuccess()
{
    return { type: 'MOVE_DOWN_SUCCESS' }
};
export function deleteItemSuccess()
{
    return { type: 'DELETE_ITEM_SUCCESS' }
};
