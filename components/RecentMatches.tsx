interface Props {
    recentMatchData: any;
    myPuuid: string;
}
const RecentMatches = ({ recentMatchData, myPuuid }: Props) => {
    const summary = recentMatchData.map((d: any, i: number) => {
        let myTeam = '';
        for (let i = 0; i < 10; i++) {
            if (d.players.all_players[i].puuid === myPuuid) {
                myTeam = d.players.all_players[i].team.toLowerCase();
            }
        }

        return (
            <div key={i}>
                <h2>{d.metadata.map}</h2>
                <h3>
                    {d.teams[myTeam].has_won ? 'Victory' : 'Loss'}{' '}
                    {d.teams[myTeam].rounds_won} - {d.teams[myTeam].rounds_lost}
                </h3>
            </div>
        );
    });

    return (
        <div>
            <h1>Recent Matches</h1>
            {summary}
        </div>
    );
};

export default RecentMatches;
