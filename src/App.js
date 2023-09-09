import './App.css';
import '@rainbow-me/rainbowkit/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import { RouterProvider } from "react-router-dom";
import PageRouter from 'router';

import BaseLayout from 'layouts/BaseLayout';


function App() {
  return (
    <BaseLayout>
      <RouterProvider router={PageRouter} />
    </BaseLayout>

  );
}

export default App;
