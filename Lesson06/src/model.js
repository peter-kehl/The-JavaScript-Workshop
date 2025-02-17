let todos = [];

function modelFindIndex(state, id) {
  for (let i=0; i<state.length; i++) {
    if (state[i].id == id) {
      return i;
    }
  }
  return -1;
}
function modelStateChange(state, action, data) {
  if (action == "CREATE") {
    console.log("created:", data);
    return state.concat(data);
  }
  if (action == "REMOVE") {
    let data = modelFindIndex(todos, ev.detail);
    if (i > -1) {
      state = state.splice(i, 1);
      console.log("removed", data);
      return state
    }
  }
  if (action == "MODIFY") {
    let data = Object.assign({}, ev.detail),
        i = data && data.id ? modelFindIndex(todos, data.id) : -1;
    if (i > -1) {
      delete data.created_at;
      let original = Object.assign({}, state[i]),
          updated = Object.assign(original, data),
          updated_with_index = {};
      updated_with_index[i] = updated;
      state = Object.assign([], state, updated_with_index);
      console.log("modified:", original, "with:", updated);
      return state;
    }
  }
}
function modelInit() {
  document.addEventListener("CREATE", modelCreateHandler);
  document.addEventListener("REMOVE", modelRemoveHandler);
  document.addEventListener("MODIFY", modelModifyHandler);
}
function modelCreateHandler(ev) {
  todos = modelStateChange(todos, "CREATE", ev.detail);
  document.dispatchEvent(new Event("CHANGED", {detail: {type: "added", value: ev.detail}}));
}
function modelRemoveHandler(ev) {
  todos = modelStateChange(todos, "REMOVE", ev.detail);
  document.dispatchEvent(new Event("CHANGED", {detail: {type: "removed", value: ev.detail}}));
}
function modelModifyHandler(ev) {
  todos = modelStateChange(todos, "MODIFY", ev.detail);
  document.dispatchEvent(new Event("CHANGED", {detail: {type: "modified", value: ev.detail}}));
}