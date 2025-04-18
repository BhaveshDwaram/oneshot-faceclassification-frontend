import { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import { Box, Button, Group } from '@mantine/core';
import { motion } from 'framer-motion';
import { FaCamera, FaRedo } from 'react-icons/fa';

export default function WebcamCapture({ onImageCapture }) {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const videoConstraints = {
    width: 720,
    height: 720,
    facingMode: "user"
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    onImageCapture(imageSrc);
  }, [webcamRef, onImageCapture]);

  const retake = () => {
    setCapturedImage(null);
    onImageCapture(null);
  };

  return (
    <Box>
      {!capturedImage ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Box sx={{ position: 'relative' }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <Box
              sx={(theme) => ({
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '200px',
                border: '2px solid ' + theme.colors.blue[6],
                borderRadius: '8px',
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
              })}
            />
          </Box>
          <Group position="center" mt="md">
            <Button
              onClick={capture}
              leftIcon={<FaCamera size={16} />}
              size="lg"
            >
              Capture Photo
            </Button>
          </Group>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <img
            src={capturedImage}
            alt="Captured face"
            style={{ width: '100%', borderRadius: '8px' }}
          />
          <Group position="center" mt="md">
            <Button
              onClick={retake}
              leftIcon={<FaRedo size={16} />}
              variant="outline"
              size="lg"
            >
              Retake Photo
            </Button>
          </Group>
        </motion.div>
      )}
    </Box>
  );
}
