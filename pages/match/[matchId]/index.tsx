import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MatchDetailsScoreboard from '../../../components/MatchDetailsScoreboard';

const Match: NextPage = () => {
    const router = useRouter();
    const { matchId } = router.query;

    // TODO: Consider useState<any> instead of initializing empty object of correct format
    const [matchData, setMatchData] = useState<any>({});
    const [isLoaded, setIsLoaded] = useState(false);

    const runQuery = async () => {
        const res = await fetch(
            `https://api.henrikdev.xyz/valorant/v2/match/${matchId}`
        );

        await res.json().then((d) => {
            console.log(d);
            setMatchData(d); // TODO: d.data gives error; have to only use d
            setIsLoaded(true);
        });
    };

    useEffect(() => {
        if (matchId) {
            runQuery();
        }
    }, [matchId]);

    // TODO: Consider Context for if we need myPuuid here too

    return (
        <>
            {isLoaded ? (
                <>
                    <h1>{matchData.data.metadata.map}</h1>
                    <h2>{matchData.data.metadata.cluster}</h2>
                    <h2>{matchData.data.metadata.mode}</h2>
                    <h2>{matchData.data.metadata.game_start_patched}</h2>

                    {MatchDetailsScoreboard(matchData.data.players.all_players)}
                </>
            ) : (
                <p>Loading</p>
            )}
        </>
    );
};

export default Match;
