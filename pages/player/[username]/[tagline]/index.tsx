import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PlayerSummary from '../../../../components/PlayerSummary';
import RecentMatches from '../../../../components/RecentMatches';

const Player: NextPage = () => {
    const router = useRouter();
    const { username, tagline } = router.query;

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

    // TODO: Check for rate limit and 404 player not found responses
    const runQuery = async (
        username: string | string[],
        tagline: string | string[]
    ) => {
        let promises = [];

        promises.push(getPlayerData(username, tagline));

        promises.push(getMmrData(username, tagline));

        promises.push(getRecentMatchData(username, tagline));

        Promise.all(promises).then(() => {
            setIsLoaded(true);
        });
    };

    useEffect(() => {
        if (username && tagline) {
            runQuery(username, tagline);
        }
    }, [username]);

    const getMmrData = async (
        username: string | string[],
        tagline: string | string[]
    ) => {
        // TODO: Currently only queries na region
        const resMmrData = await fetch(
            `https://api.henrikdev.xyz/valorant/v1/mmr/na/${username}/${tagline}`
        );

        await resMmrData.json().then((d) => {
            console.log(d);
            setMmrData(d.data);
        });
    };

    const getPlayerData = async (
        username: string | string[],
        tagline: string | string[]
    ) => {
        const resPlayerData = await fetch(
            `https://api.henrikdev.xyz/valorant/v1/account/${username}/${tagline}`
        );

        await resPlayerData.json().then((d) => {
            setPlayerData(d.data);
        });
    };

    const getRecentMatchData = async (
        username: string | string[],
        tagline: string | string[]
    ) => {
        // TODO: Currently only queries na region and unrated matches
        const resPlayerData = await fetch(
            `https://api.henrikdev.xyz/valorant/v3/matches/na/${username}/${tagline}?filter=unrated`
        );

        await resPlayerData.json().then((d) => {
            setRecentMatchData(d.data);
            console.log(d.data);
        });
    };

    return (
        <div>
            <h1>Player details page</h1>{' '}
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

export default Player;
