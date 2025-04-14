// src/components/Common/LoadingOverlay.js
import { Box, Loader, Text } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingOverlay({ visible, message }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.7)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
          >
            <Loader size="xl" color="blue" />
            {message && (
              <Text color="white" size="xl" mt="md">
                {message}
              </Text>
            )}
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
