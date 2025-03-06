import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./App.css";
import Layout from "./components/layout";

function App() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}

export default App;
