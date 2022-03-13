import type { NextPage } from 'next';
import { useState } from 'react';
import PlayerSummary from '../components/PlayerSummary';
import RecentMatches from '../components/RecentMatches';
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
    const [recentMatchData, setRecentMatchData] = useState({});

    return (
        <div className={styles.container}>
            <h1>Test</h1>
            <UsernameInput
                setIsLoaded={setIsLoaded}
                setPlayerData={setPlayerData}
                setMmrData={setMmrData}
                setRecentMatchData={setRecentMatchData}
            />

            {isLoaded ? (
                <div>
                    <PlayerSummary playerData={playerData} mmrData={mmrData} />
                    <RecentMatches
                        recentMatchData={recentMatchData}
                        myPuuid={playerData.puuid}
                    />
                </div>
            ) : null}
        </div>
    );
};

export default Home;
