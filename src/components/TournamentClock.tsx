import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Paper, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Prize, BlindLevel, Player } from '../types';

const blindLevels: BlindLevel[] = [
  { level: 1, smallBlind: 25, bigBlind: 50 },
  { level: 2, smallBlind: 50, bigBlind: 100 },
  { level: 3, smallBlind: 100, bigBlind: 200 },
  { level: 4, smallBlind: 200, bigBlind: 400 },
  { level: 5, smallBlind: 300, bigBlind: 600 },
  { level: 6, smallBlind: 400, bigBlind: 800 },
  { level: 7, smallBlind: 500, bigBlind: 1000 },
  { level: 8, smallBlind: 1000, bigBlind: 2000 },
  { level: 9, smallBlind: 1500, bigBlind: 3000 },
  { level: 10, smallBlind: 2000, bigBlind: 4000 },
];

interface TournamentClockProps {
  selectedPrize: Prize;
  initialPlayers: Player[];
}

const TournamentClock: React.FC<TournamentClockProps> = ({ selectedPrize, initialPlayers }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [winner, setWinner] = useState<Player | null>(null);

  useEffect(() => {
    if (!winner) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setCurrentLevel((prevLevel) => {
              if (prevLevel < blindLevels.length - 1) {
                return prevLevel + 1;
              }
              return prevLevel;
            });
            return 300; // Reset to 5 minutes
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [winner]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEliminatePlayer = (playerId: string) => {
    setPlayers(prevPlayers => {
      const remainingPlayers = prevPlayers.filter(p => p.id !== playerId);
      if (remainingPlayers.length === 1) {
        setWinner(remainingPlayers[0]);
      }
      return remainingPlayers;
    });
  };

  const currentBlindLevel = blindLevels[currentLevel];

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 800,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Tournament Prize: {selectedPrize}
        </Typography>
        <Typography variant="h2" color="primary" gutterBottom>
          {formatTime(timeRemaining)}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Level {currentBlindLevel.level}
        </Typography>
        <Typography variant="h4" color="secondary">
          Blinds: {currentBlindLevel.smallBlind}/{currentBlindLevel.bigBlind}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            {winner ? 'Winner!' : 'Players'}
          </Typography>
          <List>
            {players.map((player) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: winner?.id === player.id ? 1.1 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: winner?.id === player.id ? 50 : 100,
                  damping: winner?.id === player.id ? 5 : 10,
                  repeat: winner?.id === player.id ? Infinity : 0,
                  repeatType: "reverse"
                }}
              >
                <ListItem
                  sx={{
                    bgcolor: winner?.id === player.id ? 'rgba(255,215,0,0.2)' : 'transparent',
                    borderRadius: 2,
                    mb: 1,
                    border: winner?.id === player.id ? '2px solid gold' : 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{
                          color: winner?.id === player.id ? 'gold' : 'inherit',
                          textShadow: winner?.id === player.id ? '0 0 10px gold' : 'none',
                          textAlign: 'center',
                        }}
                      >
                        {player.name}
                      </Typography>
                    }
                    sx={{ textAlign: 'center' }}
                  />
                  {!winner && (
                    <IconButton
                      edge="end"
                      aria-label="eliminate"
                      onClick={() => handleEliminatePlayer(player.id)}
                      sx={{
                        color: 'error.main',
                        '&:hover': {
                          bgcolor: 'rgba(244,67,54,0.1)',
                        },
                        position: 'absolute',
                        right: 0,
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>X</Typography>
                    </IconButton>
                  )}
                </ListItem>
              </motion.div>
            ))}
          </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default TournamentClock; 