import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Match: NextPage = () => {
    const router = useRouter();
    const { matchId } = router.query;

    // TODO: Finish initialization formatting
    const [matchData, setMatchData] = useState({
        data: {
            metadata: { map: '', game_start_patched: '' },
            players: {},
            rounds: {},
            teams: {},
        },
    });
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
                    <h2>{matchData.data.metadata.game_start_patched}</h2>
                </>
            ) : null}
        </>
    );
};

export default Match;
