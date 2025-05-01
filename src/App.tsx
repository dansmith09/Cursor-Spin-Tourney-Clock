import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import PlayerJoin from './components/PlayerJoin';
import PrizeSelector from './components/PrizeSelector';
import TournamentClock from './components/TournamentClock';
import { Player, Prize, GameState } from './types';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    selectedPrize: null,
    currentBlindLevel: 1,
    gameStarted: false,
  });

  const handlePlayerJoin = (player: Player) => {
    setGameState((prev) => ({
      ...prev,
      players: [...prev.players, player],
    }));
  };

  const handlePrizeSelected = (prize: Prize) => {
    setGameState((prev) => ({
      ...prev,
      selectedPrize: prize,
      gameStarted: true,
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!gameState.gameStarted ? (
        gameState.players.length < 3 ? (
          <PlayerJoin
            onPlayerJoin={handlePlayerJoin}
            players={gameState.players}
          />
        ) : (
          <PrizeSelector onPrizeSelected={handlePrizeSelected} />
        )
      ) : (
        <TournamentClock 
          selectedPrize={gameState.selectedPrize!} 
          initialPlayers={gameState.players}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
