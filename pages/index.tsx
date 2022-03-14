import type { NextPage } from 'next';
import UsernameInput from '../components/UsernameInput';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <h1>Test</h1>
            <UsernameInput />
        </div>
    );
};

export default Home;
