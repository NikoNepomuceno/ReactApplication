import { useAuth } from '../../hooks/useAuth';

const Home = () => {
    const { user, logout } = useAuth();

    return (
        <div style={{padding: '2rem', textAlign: 'center' }}>
            <h1>Welcome, {user.name}!</h1>


            <button onClick={logout} style={{marginTop: '1rem', padding:'0.5rem 1rem' }}>
                Logout
            </button>
        </div>
    );
};

export default Home;