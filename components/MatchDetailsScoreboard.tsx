import { format } from 'd3';
import Link from 'next/link';
import styles from '../styles/MatchDetailsScoreboard.module.css';

const MatchDetailsScoreboard = (data: any) => {
    // TODO: Add sort feature
    return (
        <table className={styles.table}>
            <tr>
                <th>Player</th>
                <th>Score</th>
                <th>Kills</th>
                <th>Deaths</th>
                <th>Assists</th>
                <th>Team</th>
                <th>HS %</th>
                <th>Avg loadout value</th>
                <th>Overall loadout value</th>
                <th>Avg money spent</th>
                <th>Overall money spent</th>
                <th>AFK rounds</th>
                <th>Rounds in spawn</th>
                <th>Outgoing friendly fire</th>
            </tr>
            {data.map((d: any) => (
                <tr>
                    <td className={styles.td}>
                        <Link href={`/player/${d.name}/${d.tag}`} key={d.name}>
                            {d.name}
                        </Link>
                    </td>
                    <td className={styles.td}>{d.stats.score}</td>
                    <td className={styles.td}>{d.stats.kills}</td>
                    <td className={styles.td}>{d.stats.deaths}</td>
                    <td className={styles.td}>{d.stats.assists}</td>
                    <td className={styles.td}>{d.team}</td>

                    {/* TODO: Check if headshot % calc is correct */}
                    <td className={styles.td}>{`${format('.0%')(
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

                    <td className={styles.td}>
                        {d.economy.loadout_value.average}
                    </td>
                    <td className={styles.td}>
                        {d.economy.loadout_value.overall}
                    </td>
                    <td className={styles.td}>{d.economy.spent.average}</td>
                    <td className={styles.td}>{d.economy.spent.overall}</td>

                    <td className={styles.td}>{`${format('.0%')(
                        d.behavior.afk_rounds
                    )}`}</td>
                    <td className={styles.td}>{`${format('.0%')(
                        d.behavior.rounds_in_spawn
                    )}`}</td>
                    <td className={styles.td}>{`${format('.0%')(
                        d.behavior.friendly_fire.outgoing
                    )}`}</td>
                </tr>
            ))}
        </table>
    );
};

export default MatchDetailsScoreboard;
