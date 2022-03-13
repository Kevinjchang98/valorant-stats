import { useState } from 'react';

interface Props {
    setIsLoaded: Function;
    setPlayerData: Function;
    setMmrData: Function;
    setRecentMatchData: Function;
}

const UsernameInput = ({
    setIsLoaded,
    setPlayerData,
    setMmrData,
    setRecentMatchData,
}: Props) => {
    const [isCurrentlyLoading, setIsCurrentLoading] = useState(false);

    // TODO: Check for rate limit response
    const runQuery = async (event: any) => {
        event.preventDefault();
        let promises = [];
        setIsCurrentLoading(true);

        promises.push(
            getPlayerData(
                event.target.username.value,
                event.target.tagline.value
            )
        );

        promises.push(
            getMmrData(event.target.username.value, event.target.tagline.value)
        );

        promises.push(
            getRecentMatchData(
                event.target.username.value,
                event.target.tagline.value
            )
        );

        Promise.all(promises).then(() => {
            setIsLoaded(true);
            setIsCurrentLoading(false);
        });
    };

    const getMmrData = async (username: string, tagline: string) => {
        // TODO: Currently only queries na region
        const resMmrData = await fetch(
            `https://api.henrikdev.xyz/valorant/v1/mmr/na/${username}/${tagline}`
        );

        await resMmrData.json().then((d) => {
            console.log(d);
            setMmrData(d.data);
        });
    };

    const getPlayerData = async (username: string, tagline: string) => {
        const resPlayerData = await fetch(
            `https://api.henrikdev.xyz/valorant/v1/account/${username}/${tagline}`
        );

        await resPlayerData.json().then((d) => {
            setPlayerData(d.data);
        });
    };

    const getRecentMatchData = async (username: string, tagline: string) => {
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
            <form onSubmit={runQuery}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    required
                />

                <label htmlFor="username">Tagline</label>
                <input
                    id="tagline"
                    type="text"
                    autoComplete="tagline"
                    required
                />

                <button type="submit">Go</button>
            </form>

            {isCurrentlyLoading ? <h2>Loading</h2> : null}
        </div>
    );
};

export default UsernameInput;
