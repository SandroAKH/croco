import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import "./styles/app.scss"
import { UserListProvider } from './context/UserContext'

function App() {
  return (
    <UserListProvider>
      <Router>
        <div className='container'>


        </div>
      </Router>
    </UserListProvider>
  );
}

export default App;
