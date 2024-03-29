import * as actionCreators from '../actions/actionCreators.js'

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      console.log("LOGIN_SUCCESS");
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
    })).then(() => {
        dispatch(actionCreators.registerSuccess);
    }).catch((err) => {
        dispatch(actionCreators.registerError);
    });
};

export const deleteListHandler = (todoList, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('todoLists').doc(todoList.id).delete().then(() => {
      dispatch(actionCreators.deleteSuccess);
    });
};

export const addItemHandler = (todoList, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('todoLists').doc(todoList.id).set({name: todoList.name, owner: todoList.owner,
       items: todoList.items, created: new Date()}).then(() => {
         dispatch(actionCreators.addItemSuccess);
       });
};

export const sortByTaskHandler = (todoList, firebase, sortedItems) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();

  firestore.collection('todoLists').doc(todoList.id).set({name: todoList.name, owner: todoList.owner,
     items: todoList.items, created: new Date()}).then(() => {
       dispatch(actionCreators.sortSuccess);
     });
};

export const sortByDueDateHandler = (todoList, firebase, sortedItems) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();

  firestore.collection('todoLists').doc(todoList.id).set({name: todoList.name, owner: todoList.owner,
     items: todoList.items, created: new Date()}).then(() => {
       dispatch(actionCreators.sortSuccess);
     });
};

export const sortByStatusHandler = (todoList, firebase, sortedItems) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();

  firestore.collection('todoLists').doc(todoList.id).set({name: todoList.name, owner: todoList.owner,
     items: todoList.items, created: new Date()}).then(() => {
       dispatch(actionCreators.sortSuccess);
     });
};

export const moveUpHandler = (todoList, firebase, newItems) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();

  firestore.collection('todoLists').doc(todoList.id).set({name: todoList.name, owner: todoList.owner,
     items: todoList.items, created: new Date()}).then(() => {
       dispatch(actionCreators.moveUpSuccess);
     });
};

export const moveDownHandler = (todoList, firebase, newItems) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();

  firestore.collection('todoLists').doc(todoList.id).set({name: todoList.name, owner: todoList.owner,
     items: todoList.items, created: new Date()}).then(() => {
       dispatch(actionCreators.moveDownSuccess);
     });
};

export const deleteItemHandler = (todoList, firebase, newItems) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();

  firestore.collection('todoLists').doc(todoList.id).set({name: todoList.name, owner: todoList.owner,
     items: todoList.items, created: new Date()}).then(() => {
       dispatch(actionCreators.deleteItemSuccess);
     });
};