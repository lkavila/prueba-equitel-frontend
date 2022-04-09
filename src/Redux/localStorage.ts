// convert object to string and store in localStorage
export function saveToLocalStorage(state: any) {
  try {
    const { userReducer } = state;
    const saveState = {
      userReducer,
    };
    const serialisedState = JSON.stringify(saveState);
    localStorage.setItem("redux-user", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
export function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("redux-user");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}