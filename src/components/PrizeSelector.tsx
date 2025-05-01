import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import { Prize } from '../types';

const prizes: Prize[] = ['$40', '$100', '$500', '$1000', 'JACKPOT'];

interface PrizeSelectorProps {
  onPrizeSelected: (prize: Prize) => void;
}

const PrizeSelector: React.FC<PrizeSelectorProps> = ({ onPrizeSelected }) => {
  const [currentPrize, setCurrentPrize] = useState<Prize>(prizes[0]);
  const [isSpinning, setIsSpinning] = useState(true);
  const [showFinalPrize, setShowFinalPrize] = useState(false);

  useEffect(() => {
    if (isSpinning) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * prizes.length);
        setCurrentPrize(prizes[randomIndex]);
      }, 100);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        setIsSpinning(false);
        const finalPrize = prizes[Math.floor(Math.random() * prizes.length)];
        setCurrentPrize(finalPrize);
        setShowFinalPrize(true);
        
        // Wait 3 seconds before transitioning to tournament clock
        setTimeout(() => {
          onPrizeSelected(finalPrize);
        }, 3000);
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isSpinning, onPrizeSelected]);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.paper',
        background: 'linear-gradient(45deg, #1a1a1a 30%, #2a2a2a 90%)',
      }}
    >
      <Typography 
        variant="h2" 
        gutterBottom 
        sx={{ 
          color: 'white',
          textShadow: '0 0 10px rgba(255,255,255,0.5)',
          mb: 4
        }}
      >
        {showFinalPrize ? 'Prize Selected!' : 'Prize Selection'}
      </Typography>
      <Box
        sx={{
          width: '90%',
          height: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '4px solid',
          borderColor: 'primary.main',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 0 20px rgba(25,118,210,0.5)',
          background: 'rgba(0,0,0,0.3)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPrize}
            initial={showFinalPrize ? { scale: 0.5 } : { scale: 0.5, rotate: -180 }}
            animate={{ 
              scale: showFinalPrize ? 1.1 : 1,
              rotate: showFinalPrize ? 0 : 0,
              transition: {
                type: "spring",
                stiffness: showFinalPrize ? 50 : 100,
                damping: showFinalPrize ? 5 : 10,
                duration: showFinalPrize ? 1 : 0.5,
                repeat: showFinalPrize ? Infinity : 0,
                repeatType: "reverse"
              }
            }}
            style={{
              textAlign: 'center',
              width: '100%',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                color: currentPrize === 'JACKPOT' ? 'gold' : 'primary.main',
                textAlign: 'center',
                fontWeight: 'bold',
                textShadow: currentPrize === 'JACKPOT' 
                  ? '0 0 20px gold, 0 0 30px gold' 
                  : '0 0 20px rgba(25,118,210,0.5)',
                fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              {currentPrize}
            </Typography>
          </motion.div>
        </AnimatePresence>
      </Box>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '2rem' }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            textAlign: 'center',
            textShadow: '0 0 10px rgba(255,255,255,0.3)',
          }}
        >
          {isSpinning ? 'Spinning...' : (showFinalPrize ? 'Starting tournament in 3 seconds...' : 'Prize Selected!')}
        </Typography>
      </motion.div>
    </Box>
  );
};

export default PrizeSelector; 