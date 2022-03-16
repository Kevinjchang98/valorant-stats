import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { format } from 'd3';

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

    // TODO: Possibly refactor into separate component file
    const playerList = (arr: any) => {
        return arr.map((d: any) => {
            return (
                <div key={d.name}>
                    <Link href={`/player/${d.name}/${d.tag}`} key={d.name}>
                        <a>
                            <h3>{d.name}</h3>
                        </a>
                    </Link>

                    <p>{d.character}</p>

                    <p>{`KDA: ${d.stats.kills}/${d.stats.deaths}/${d.stats.assists}`}</p>

                    {/* TODO: Correct headshot percentage calculation; currently allows for over 100% */}
                    <p>{`Headshot percentage: ${format('.0%')(
                        isNaN(d.stats.headshots / d.stats.kills)
                            ? 0
                            : d.stats.headshots / d.stats.kills
                    )}`}</p>

                    <p>{`Loadout value overall: ${d.economy.loadout_value.overall} average: ${d.economy.loadout_value.average}`}</p>

                    <p>{`Money spent overall: ${d.economy.spent.overall} average: ${d.economy.spent.average}`}</p>

                    {/* TODO: Check if following behavior values are percentages */}
                    {d.behavior.afk_rounds > 0 ? (
                        <p>{`Rounds AFK: ${format('.0%')(
                            d.behavior.afk_rounds
                        )}`}</p>
                    ) : null}

                    {d.behavior.rounds_in_spawn > 0 ? (
                        <p>{`Rounds in spawn: ${format('.0%')(
                            d.behavior.rounds_in_spawn
                        )}`}</p>
                    ) : null}

                    {d.behavior.friendly_fire.outgoing > 0 ? (
                        <p>{`Outgoing friendly fire damage: ${d.behavior.friendly_fire.outgoing}`}</p>
                    ) : null}
                </div>
            );
        });
    };

    return (
        <>
            {isLoaded ? (
                <>
                    <h1>{matchData.data.metadata.map}</h1>
                    <h2>{matchData.data.metadata.cluster}</h2>
                    <h2>{matchData.data.metadata.mode}</h2>
                    <h2>{matchData.data.metadata.game_start_patched}</h2>

                    <h2>Blue team</h2>
                    {playerList(matchData.data.players.blue)}

                    <h2>Red team</h2>
                    {playerList(matchData.data.players.red)}
                </>
            ) : (
                <p>Loading</p>
            )}
        </>
    );
};

export default Match;
