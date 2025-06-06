import { useNavigate } from 'react-router-dom';
import { LogOut, UserCircle2 } from 'lucide-react'; // or any icon lib
import '../../styles/Styles.css';

export default function Header({ title }) {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || "Guest";
  const role = localStorage.getItem('role') || "N/A";

  const handleLogout = () => {
    localStorage.clear();
    alert("👋 Logged out!");
    navigate('/auth');
  };

  return (
    <header className="app-header">
      <h1 className="header-title">{title}</h1>
      <div className="user-info">
        <UserCircle2 className="user-icon" />
        <span className="user-text">{username}</span>
        <span className="role-badge">{role}</span>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </header>
  );
}
