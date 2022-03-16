import { format } from 'd3';
import Link from 'next/link';
import styles from '../styles/MatchDetailsScoreboard.module.css';

const MatchDetailsScoreboard = (data: any) => {
    // TODO: Add sort feature
    return (
        <table className={styles.table}>
            <tr>
                <th className={styles.th}>Player</th>
                <th className={styles.th}>Score</th>
                <th className={styles.th}>Kills</th>
                <th className={styles.th}>Deaths</th>
                <th className={styles.th}>Assists</th>
                <th className={styles.th}>Team</th>
                <th className={styles.th}>HS %</th>
                <th className={styles.th}>Avg loadout value</th>
                <th className={styles.th}>Overall loadout value</th>
                <th className={styles.th}>Avg money spent</th>
                <th className={styles.th}>Overall money spent</th>
                <th className={styles.th}>AFK rounds</th>
                <th className={styles.th}>Rounds in spawn</th>
                <th className={styles.th}>Outgoing friendly fire</th>
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
