import { useEffect, useState } from "react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
}

interface LeaderboardPageProps {
  userScore: number;
  userName: string;
}

const LeaderboardPage = ({ userScore, userName }: LeaderboardPageProps) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number>(0);

  useEffect(() => {
    // Generate mock leaderboard data
    const mockScores = [
      { name: "CyberHacker", score: 9 },
      { name: "QuantumCoder", score: 8 },
      { name: "NeuralNet", score: 8 },
      { name: "DataMiner", score: 7 },
      { name: "AlgoMaster", score: 7 },
      { name: "BitWizard", score: 6 },
      { name: "CodeNinja", score: 6 },
      { name: "TechGuru", score: 5 },
      { name: "PixelPioneer", score: 5 },
      { name: "DigitalDragon", score: 4 }
    ];
    
    // Add user score
    const allScores = [...mockScores, { name: userName, score: userScore }];
    
    // Sort by score (descending) and assign ranks
    const sorted = allScores
      .sort((a, b) => b.score - a.score)
      .map((entry, index) => ({ ...entry, rank: index + 1 }));
    
    setLeaderboard(sorted);
    
    // Find user rank
    const userEntry = sorted.find(entry => entry.name === userName);
    setUserRank(userEntry?.rank || 0);
  }, [userScore, userName]);

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-400";
    if (score >= 6) return "text-yellow-400";
    if (score >= 4) return "text-orange-400";
    return "text-destructive";
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "bg-yellow-500/20 border-yellow-500 text-yellow-400";
    if (rank === 2) return "bg-gray-400/20 border-gray-400 text-gray-300";
    if (rank === 3) return "bg-orange-500/20 border-orange-500 text-orange-400";
    return "bg-muted/10 border-muted/30 text-foreground";
  };

  return (
    <div className="min-h-screen bg-background cyberpunk-grid p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-4xl font-bold text-primary glitch-text" data-text="Neon Leaderboard">
            Neon Leaderboard
          </h1>
          <h2 className="text-xl text-secondary">Top Performers</h2>
        </div>
        
        {/* User Score Highlight */}
        <div className="hologram rounded-lg p-6 text-center">
          <h3 className="text-lg text-muted-foreground mb-2">Your Performance</h3>
          <div className="flex justify-center items-center space-x-8">
            <div>
              <div className="text-3xl font-bold text-primary">{userScore}/10</div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary">#{userRank}</div>
              <div className="text-sm text-muted-foreground">Rank</div>
            </div>
          </div>
        </div>
        
        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {leaderboard.slice(0, 3).map((entry, index) => {
            const positions = [1, 0, 2]; // Second, First, Third
            const actualIndex = positions[index];
            const actualEntry = leaderboard[actualIndex];
            const heights = ["h-24", "h-32", "h-20"];
            
            return (
              <div key={actualEntry.rank} className="text-center">
                <div className={`hologram rounded-lg p-4 ${heights[index]} flex flex-col justify-end ${getRankStyle(actualEntry.rank)}`}>
                  <div className="text-2xl font-bold">#{actualEntry.rank}</div>
                  <div className="text-sm font-medium truncate">{actualEntry.name}</div>
                  <div className={`text-lg font-bold ${getScoreColor(actualEntry.score)}`}>
                    {actualEntry.score}/10
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Full Leaderboard */}
        <div className="hologram rounded-lg p-6">
          <h3 className="text-xl font-bold text-foreground mb-6">All Participants</h3>
          <div className="space-y-3">
            {leaderboard.map((entry) => (
              <div 
                key={`${entry.name}-${entry.rank}`}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  entry.name === userName 
                    ? 'bg-primary/20 border-primary neon-glow' 
                    : 'bg-muted/10 border-muted/30'
                } transition-all duration-300`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${getRankStyle(entry.rank)}`}>
                    {entry.rank}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{entry.name}</div>
                    {entry.name === userName && (
                      <div className="text-xs text-primary">You</div>
                    )}
                  </div>
                </div>
                <div className={`text-xl font-bold ${getScoreColor(entry.score)}`}>
                  {entry.score}/10
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="hologram rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{leaderboard.length}</div>
            <div className="text-sm text-muted-foreground">Total Participants</div>
          </div>
          <div className="hologram rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-secondary">
              {Math.round((leaderboard.reduce((sum, entry) => sum + entry.score, 0) / leaderboard.length) * 10) / 10}
            </div>
            <div className="text-sm text-muted-foreground">Average Score</div>
          </div>
          <div className="hologram rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent">{Math.max(...leaderboard.map(e => e.score))}</div>
            <div className="text-sm text-muted-foreground">Highest Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;