// console.log(window.Redux);

const { createStore } = window.Redux

// SETUP REDUX STORE.

// State.
const initialState = JSON.parse(localStorage.getItem('hobby_list')) || [];

// Reducer.
const hobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
      const newList = [...state];
      newList.push(action.payload);
      return newList;

    default:
      return state
  }
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

// HANDLE FORM SUBMIT.
const hobbyFormEle = document.querySelector('#hobbyFormId');

if (hobbyFormEle) {
  const handleFormSubmit = (e) => {
    // Prevent browser from reloading.
    e.preventDefault();

    const hobbyTextEle = hobbyFormEle.querySelector('#hobbyTextId');
    if (!hobbyTextEle) return;


    // console.log('submit', hobbyTextEle.value);

    // Create action.
    const action = {
      type: 'ADD_HOBBY',
      payload: hobbyTextEle.value
    }

    // Dispatch action to reducer.
    store.dispatch(action)

    // Reset form.
    hobbyTextEle.value = '';
    hobbyFormEle.reset();
  }

  hobbyFormEle.addEventListener('submit', handleFormSubmit); // When typing Enter.
}

store.subscribe(() => {
  // Get new state.
  const hobbyList = store.getState();
  renderHobbyList(hobbyList);

  localStorage.setItem('hobby_list', JSON.stringify(hobbyList));
})