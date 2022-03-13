interface Props {
    playerData: any;
    mmrData: any;
}

const PlayerSummary = ({ playerData, mmrData }: Props) => {
    return (
        <div>
            <h1>{playerData.name}</h1>
            <img src={playerData.card.small} alt="player icon" />
            <h2>Account Level: {playerData.account_level}</h2>
            <h2>Rank: {mmrData.currenttierpatched}</h2>
            <h2>Elo: {mmrData.elo}</h2>
        </div>
    );
};

export default PlayerSummary;
