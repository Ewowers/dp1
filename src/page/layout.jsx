import { Outlet } from "react-router-dom";
import Header from "../component/header";
import { createStore } from "redux";
import { Provider } from "react-redux";
const initialState = JSON.parse(localStorage.getItem("basket")) || [];
const reducer = (state = initialState || [], action) => {
  const { payload } = action;
  switch (action.type) {
    case "add":
      const body = {
        title: payload?.title,
        prise: payload?.prise,
        image: payload?.image[0],
        que: 1,
        _id: payload?._id,
      };
      if (state.findIndex((item) => item._id === body._id) !== -1) state[state.findIndex((item) => item._id === body._id)].que += 1;
      else state.push(body);
      localStorage.setItem("basket", JSON.stringify(state));
      return state;
    case "destroy":
      state.splice(
        state.findIndex((item) => item._id === action.pyaload._id),
        1
      );
      localStorage.setItem("basket", JSON.stringify(state));
      return state;
    default:
      return state;
  }
};
export const stor = createStore(reducer);
export const Layouts = ({ get }) => {
  return (
    <>
      <Provider store={stor}>
        <Header get={get} />
        <Outlet />
      </Provider>
    </>
  );
};
