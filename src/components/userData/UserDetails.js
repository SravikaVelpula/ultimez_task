import { useEffect } from 'react';
import { useNavigate , useLocation} from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function UserDetails(){
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userData = JSON.parse(localStorage.getItem("userData"));

    useEffect(()=>{
        if(!isLoggedIn){
            navigate("/register");
        }
    }, isLoggedIn);

    return(
        <div className='table-data'>
            <h4>User Details</h4>
            <Table striped bordered hover>
      <thead>
        <tr>
          <th>Fullname</th>
          <th>Username</th>
          <th>Country</th>
          <th>Email id</th>
          <th>Mobile number</th>
          <th>Referral id</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{userData?.full_name}</td>
          <td>{userData?.username}</td>
          <td>{userData?.country_row_id}</td>
          <td>{userData?.email_id}</td>
          <td>{userData?.mobile_number}</td>
          <td>{userData?.referral_row_id}</td>
        </tr>
      </tbody>
    </Table>
        </div>
    );
}
export default UserDetails;