import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import "./styles/app.scss"
import { UserListProvider } from './context/UserContext'

import UserTable from "./components/table/UserTable";

function App() {
  return (
    <UserListProvider>
      <Router>
        <div className='container'>

          <UserTable />
        </div>
      </Router>
    </UserListProvider>
  );
}

export default App;
