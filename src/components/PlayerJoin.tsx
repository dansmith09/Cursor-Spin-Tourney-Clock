import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { Player } from '../types';

interface PlayerJoinProps {
  onPlayerJoin: (player: Player) => void;
  players: Player[];
}

const PlayerJoin: React.FC<PlayerJoinProps> = ({ onPlayerJoin, players }) => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onPlayerJoin({
        id: Date.now().toString(),
        name: playerName.trim()
      });
      setPlayerName('');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Join the Game
      </Typography>
      <Typography variant="body1" gutterBottom>
        Players joined: {players.length}/3
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Your Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          margin="normal"
          disabled={players.length >= 3}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={!playerName.trim() || players.length >= 3}
        >
          Join Game
        </Button>
      </form>
      {players.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Current Players:</Typography>
          {players.map((player) => (
            <Typography key={player.id}>{player.name}</Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PlayerJoin; 