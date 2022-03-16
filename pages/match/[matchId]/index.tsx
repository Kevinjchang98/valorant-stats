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
    const playerTable = (data: any) => {
        return (
            <table>
                <tr>
                    <td>Name</td>
                    <td>Score</td>
                    <td>Kills</td>
                    <td>Deaths</td>
                    <td>Assists</td>
                    <td>Team</td>
                    <td>HS %</td>
                    <td>Avg loadout value</td>
                    <td>Overall loadout value</td>
                    <td>Avg money spent</td>
                    <td>Overall money spent</td>
                    <td>AFK rounds</td>
                    <td>Rounds in spawn</td>
                    <td>Outgoing friendly fire</td>
                </tr>
                {data.map((d: any) => (
                    <tr>
                        <Link href={`/player/${d.name}/${d.tag}`} key={d.name}>
                            {d.name}
                        </Link>
                        <td>{d.stats.score}</td>
                        <td>{d.stats.kills}</td>
                        <td>{d.stats.deaths}</td>
                        <td>{d.stats.assists}</td>
                        <td>{d.team}</td>

                        {/* TODO: Check if headshot % calc is correct */}
                        <td>{`${format('.0%')(
                            isNaN(
                                d.stats.headshots /
                                    (d.stats.bodyshots +
                                        d.stats.headshots +
                                        d.stats.legshots)
                            )
                                ? 0
                                : d.stats.headshots /
                                      (d.stats.bodyshots +
                                          d.stats.headshots +
                                          d.stats.legshots)
                        )}`}</td>

                        <td>{d.economy.loadout_value.average}</td>
                        <td>{d.economy.loadout_value.overall}</td>
                        <td>{d.economy.spent.average}</td>
                        <td>{d.economy.spent.overall}</td>

                        <td>{`${format('.0%')(d.behavior.afk_rounds)}`}</td>
                        <td>{`${format('.0%')(
                            d.behavior.rounds_in_spawn
                        )}`}</td>
                        <td>{`${format('.0%')(
                            d.behavior.friendly_fire.outgoing
                        )}`}</td>
                    </tr>
                ))}
            </table>
        );
    };

    return (
        <>
            {isLoaded ? (
                <>
                    <h1>{matchData.data.metadata.map}</h1>
                    <h2>{matchData.data.metadata.cluster}</h2>
                    <h2>{matchData.data.metadata.mode}</h2>
                    <h2>{matchData.data.metadata.game_start_patched}</h2>

                    {playerTable(matchData.data.players.all_players)}
                </>
            ) : (
                <p>Loading</p>
            )}
        </>
    );
};

export default Match;
