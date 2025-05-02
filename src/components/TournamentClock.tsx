import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Paper, List, ListItem, ListItemText, IconButton, TextField, Button } from '@mui/material';
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
  const [prize, setPrize] = useState<Prize | null>(selectedPrize);

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

  const handleStart = () => {
    // Implementation of handleStart function
  };

  const handlePlayerChange = (index: number, value: string) => {
    // Implementation of handlePlayerChange function
  };

  const handleEliminate = (index: number) => {
    // Implementation of handleEliminate function
  };

  return (
    <Box 
      sx={{ 
        maxWidth: 800, 
        mx: 'auto', 
        p: 4,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        bgcolor: '#121212',
        color: '#ffffff',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #121212 100%)'
      }}
    >
      <Typography 
        variant="h2" 
        align="center" 
        gutterBottom
        sx={{ 
          mb: 4,
          fontWeight: 900,
          background: 'linear-gradient(45deg, #B8860B 30%, #DAA520 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          fontSize: { xs: '2.5rem', sm: '3.5rem' },
          textShadow: '0 0 10px rgba(184,134,11,0.2)'
        }}
      >
        Spin Tourney Clock
      </Typography>

      {!prize && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              mb: 4,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #2a2a2a 0%, #1E1E1E 100%)',
              border: '1px solid rgba(184,134,11,0.2)',
              boxShadow: '0 0 20px rgba(0,0,0,0.3)'
            }}
          >
            <Typography 
              variant="h4" 
              align="center" 
              gutterBottom 
              sx={{ 
                mb: 3,
                fontWeight: 800,
                background: 'linear-gradient(45deg, #B8860B 30%, #DAA520 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.01em',
                textShadow: '0 0 5px rgba(184,134,11,0.2)'
              }}
            >
              Enter Players
            </Typography>
            <Typography 
              variant="subtitle1" 
              align="center" 
              sx={{ 
                mb: 3,
                color: '#A9A9A9',
                fontWeight: 600
              }}
            >
              Add 1-3 players to start the tournament
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
              <TextField
                label="Player 1"
                value={players[0] || ''}
                onChange={(e) => handlePlayerChange(0, e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2,
                    '& .MuiOutlinedInput-input': {
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#ffffff'
                    },
                    '& fieldset': {
                      borderColor: 'rgba(184,134,11,0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(184,134,11,0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#DAA520',
                    },
                    background: 'rgba(0,0,0,0.2)'
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#A9A9A9'
                  }
                }}
              />
              <TextField
                label="Player 2"
                value={players[1] || ''}
                onChange={(e) => handlePlayerChange(1, e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2,
                    '& .MuiOutlinedInput-input': {
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#ffffff'
                    },
                    '& fieldset': {
                      borderColor: 'rgba(184,134,11,0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(184,134,11,0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#DAA520',
                    },
                    background: 'rgba(0,0,0,0.2)'
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#A9A9A9'
                  }
                }}
              />
              <TextField
                label="Player 3"
                value={players[2] || ''}
                onChange={(e) => handlePlayerChange(2, e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2,
                    '& .MuiOutlinedInput-input': {
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#ffffff'
                    },
                    '& fieldset': {
                      borderColor: 'rgba(184,134,11,0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(184,134,11,0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#DAA520',
                    },
                    background: 'rgba(0,0,0,0.2)'
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#A9A9A9'
                  }
                }}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleStart}
              disabled={!players.some(p => p)}
              fullWidth
              sx={{ 
                py: 1.5,
                borderRadius: 2,
                fontSize: '1.1rem',
                fontWeight: 800,
                letterSpacing: '0.02em',
                textTransform: 'none',
                background: 'linear-gradient(45deg, #B8860B 30%, #DAA520 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #DAA520 30%, #B8860B 90%)',
                  boxShadow: '0 0 15px rgba(184,134,11,0.4)'
                },
                '&:disabled': {
                  background: 'linear-gradient(45deg, #444444 30%, #666666 90%)',
                }
              }}
            >
              Start Tournament
            </Button>
          </Paper>
        </motion.div>
      )}

      {prize && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.2, 1],
            opacity: 1,
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 1,
            ease: "easeOut",
            times: [0, 0.5, 0.8, 1]
          }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              mb: 4,
              borderRadius: 2,
              background: 'linear-gradient(45deg, #B8860B 30%, #DAA520 90%)',
              color: '#000000',
              border: '2px solid rgba(255,255,255,0.2)',
              boxShadow: '0 0 20px rgba(184,134,11,0.4)'
            }}
          >
            <Typography 
              variant="h5" 
              align="center" 
              gutterBottom
              sx={{
                fontWeight: 800,
                letterSpacing: '0.02em',
                textShadow: '0 0 5px rgba(0,0,0,0.2)'
              }}
            >
              Selected Prize
            </Typography>
            <Typography 
              variant="h2" 
              align="center"
              sx={{ 
                fontWeight: 900,
                letterSpacing: '-0.02em',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                fontSize: { xs: '2.5rem', sm: '3.5rem' }
              }}
            >
              {prize}
            </Typography>
          </Paper>
        </motion.div>
      )}

      {prize && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              mb: 4,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #2a2a2a 0%, #1E1E1E 100%)',
              border: '1px solid rgba(184,134,11,0.2)',
              boxShadow: '0 0 20px rgba(0,0,0,0.3)'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
              <Typography 
                variant="h5" 
                sx={{
                  fontWeight: 800,
                  letterSpacing: '0.02em',
                  color: '#DAA520',
                  textShadow: '0 0 5px rgba(184,134,11,0.2)'
                }}
              >
                Time: {formatTime(timeRemaining)}
              </Typography>
              <Typography 
                variant="h5"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '0.02em',
                  color: '#DAA520',
                  textShadow: '0 0 5px rgba(184,134,11,0.2)'
                }}
              >
                Blinds: {currentBlindLevel.smallBlind}/{currentBlindLevel.bigBlind}
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      )}

      <List sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
        <AnimatePresence>
          {players.map((player, index) => (
            player && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ListItem
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    textAlign: 'center',
                    p: 2,
                    boxShadow: winner === player ? 4 : 2,
                    border: winner === player ? '2px solid rgba(255,255,255,0.3)' : '1px solid rgba(184,134,11,0.2)',
                    transform: winner === player ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.3s ease',
                    background: winner === player 
                      ? 'linear-gradient(45deg, #B8860B 30%, #DAA520 90%)' 
                      : 'linear-gradient(135deg, #2a2a2a 0%, #1E1E1E 100%)',
                    color: winner === player ? '#000000' : '#DAA520',
                    '&:hover': winner === player ? {
                      transform: 'scale(1.03)',
                      boxShadow: '0 0 20px rgba(184,134,11,0.4)'
                    } : {
                      transform: 'scale(1.01)',
                      boxShadow: '0 0 10px rgba(184,134,11,0.2)'
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="h5"
                        sx={{
                          textAlign: 'center',
                          fontWeight: winner === player ? 900 : 800,
                          color: winner === player ? '#000000' : '#DAA520',
                          letterSpacing: '0.02em',
                          fontSize: { xs: '1.25rem', sm: '1.5rem' },
                          textShadow: winner === player ? '0 0 5px rgba(0,0,0,0.3)' : '0 0 5px rgba(184,134,11,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1
                        }}
                      >
                        {winner === player && (
                          <span style={{ fontSize: '1.5em' }}>🏆</span>
                        )}
                        {player.name}
                      </Typography>
                    }
                  />
                  {!winner && (
                    <Button
                      variant="contained"
                      onClick={() => handleEliminatePlayer(player.id)}
                      sx={{
                        position: 'absolute',
                        right: 16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        fontWeight: 800,
                        letterSpacing: '0.02em',
                        textTransform: 'none',
                        fontSize: '0.9rem',
                        background: 'linear-gradient(45deg, #A9A9A9 30%, #808080 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #808080 30%, #A9A9A9 90%)',
                          boxShadow: '0 0 10px rgba(169,169,169,0.4)'
                        }
                      }}
                    >
                      Eliminate
                    </Button>
                  )}
                </ListItem>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </List>
    </Box>
  );
};

export default TournamentClock; 