import { useNavigate } from 'react-router-dom';
import '../../styles/Styles.css';

export default function Header({ title }) {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    alert("👋 Logged out!");
    navigate('/auth');
  };

  return (
    <div className="header">
      <h1>{title}</h1>
      <div className='user-info'>
      {username || "Guest"} 😎 |  {role || "N/A"} <span>   . </span>
        <button onClick={handleLogout} className="logout-btn">
           Logout
        </button>
      </div>
    </div>
  );
}
