import type { NextPage } from 'next';
import { useState } from 'react';
import UsernameInput from '../components/usernameInput';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [playerData, setPlayerData] = useState({
        account_level: 0,
        card: {
            id: '',
            large: '',
            small: '',
            wide: '',
        },
        last_update: '',
        name: '',
        puuid: '',
        region: '',
        tag: '',
    });
    const [mmrData, setMmrData] = useState({
        currenttier: 0,
        currenttierpatched: '',
        ranking_in_tier: 0,
        mmr_change_to_last_game: 0,
        elo: 0,
        name: '',
        tag: '',
    });

    return (
        <div className={styles.container}>
            <h1>Test</h1>
            <UsernameInput
                setIsLoaded={setIsLoaded}
                setPlayerData={setPlayerData}
                setMmrData={setMmrData}
            />

            {isLoaded ? (
                <div>
                    <h1>{playerData.name}</h1>
                    <img src={playerData.card.small} alt="player icon" />
                    <h2>Account Level: {playerData.account_level}</h2>
                    <h2>Rank: {mmrData.currenttierpatched}</h2>
                    <h2>Elo: {mmrData.elo}</h2>
                </div>
            ) : null}
        </div>
    );
};

export default Home;
