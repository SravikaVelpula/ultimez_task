import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import UserDetails from './components/userData/UserDetails';

function App() {
  return (
    <Router>
      <Container fluid className='p-0'>
        <Row>
          <div className="App">
            <Routes>
              <Route exact path='/' element={< Register />}></Route>
              <Route exact path='/login' element={< Login />}></Route>
              <Route exact path='/register' element={< Register />}></Route>
              <Route exact path='/userDetails' element={< UserDetails />}></Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Row>
      </Container>
    </Router>

  );
}

export default App;
