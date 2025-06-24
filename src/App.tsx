import { Provider } from "react-redux";
import { Router } from "./components/Router";
import { store } from "./app/store";

export const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};
