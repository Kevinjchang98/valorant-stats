import Image from 'next/image';

interface Props {
    playerData: any;
    mmrData: any;
}

const PlayerSummary = ({ playerData, mmrData }: Props) => {
    return (
        <div>
            <h1>{playerData.name}</h1>
            <Image
                src={playerData.card.small}
                alt="player icon"
                width={100}
                height={100}
            />
            <h2>Account Level: {playerData.account_level}</h2>
            <h2>Rank: {mmrData.currenttierpatched}</h2>
            <h2>Elo: {mmrData.elo}</h2>
        </div>
    );
};

export default PlayerSummary;
