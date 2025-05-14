import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from '@mui/material';

interface PlayerScore {
  rank: number;
  name: string;
  kills: number;
  score: number;
}

const Leaderboard: React.FC = () => {
  const [players, setPlayers] = useState<PlayerScore[]>([]);

  // Simulate fetching leaderboard data
  useEffect(() => {
    // Example data - replace with actual API call
    const mockData: PlayerScore[] = [
      { rank: 1, name: 'WarChief', kills: 25, score: 2500 },
      { rank: 2, name: 'OrcHunter', kills: 20, score: 2000 },
      { rank: 3, name: 'BattleMaster', kills: 18, score: 1800 },
      { rank: 4, name: 'TribalLord', kills: 15, score: 1500 },
      { rank: 5, name: 'ArenaKing', kills: 12, score: 1200 },
    ];

    setPlayers(mockData);
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Typography variant="h6" sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        Top Warriors
      </Typography>

      <TableContainer sx={{ flex: 1 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Rank
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Warrior</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Kills
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Score
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map(player => (
              <TableRow
                key={player.rank}
                sx={{
                  '&:nth-of-type(odd)': {
                    backgroundColor: 'action.hover',
                  },
                  '&:first-of-type': {
                    '& .MuiTableCell-root': {
                      color: 'warning.main',
                      fontWeight: 'bold',
                    },
                  },
                }}
              >
                <TableCell align="center">{player.rank}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell align="right">{player.kills}</TableCell>
                <TableCell align="right">{player.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Updated every 5 minutes
        </Typography>
      </Box>
    </Paper>
  );
};

export default Leaderboard;