console.log(window.Redux);

const { createStore } = window.Redux

// SETUP REDUX STORE.

// State.
const initialState = [
  'Listen to music',
];

// Reducer.
const hobbyReducer = (state = initialState, action) => {
  return state
}

// Store: có thể nhận 1 hoặc nhiều reducer.
const store = createStore(hobbyReducer)

// RENDER REDUX HOBBY LIST.
const renderHobbyList = (hobbyList) => {
  if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;

  const ulElement = document.getElementById('hobbyListId');
  if (!ulElement) return;

  // Reset previous content of ul.
  ulElement.innerHTML = '';

  // Render hobby list.
  for (const hobby of hobbyList) {
    const liElement = document.createElement('li');
    liElement.textContent = hobby;
    ulElement.appendChild(liElement);
  }
}

//  Render initial hobby list.
// store lúc này chỉ có 1 reducer là hobbyReducer, trong hobbyReducer chỉ có 1 state là initialState, nên có thể gọi trực tiếp getState để lấy state.
const initialHobbyList = store.getState();
renderHobbyList(initialHobbyList)