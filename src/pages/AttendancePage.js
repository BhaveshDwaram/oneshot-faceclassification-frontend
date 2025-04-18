// src/pages/AttendancePage.js
import { useState, useRef, useCallback } from 'react';
import {
  Container,
  Title,
  Box,
  Button,
  Card,
  Text,
  Group,
  LoadingOverlay,
  Image,  // Added Image import
} from '@mantine/core';
import { markAttendance } from '../utils/api'; 
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { showNotification } from '@mantine/notifications';
import { FaCamera } from 'react-icons/fa';

export default function AttendancePage() {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const videoConstraints = {
    width: 720,
    height: 720,
    facingMode: "user"
  };

  // In the capture function, update the notifications:
  const capture = useCallback(async () => {
    if (!webcamRef.current) return;
    
    try {
      setLoading(true);
      showNotification({
        id: 'verify-notification',
        title: 'Verifying',
        message: 'Please wait while we verify your face...',
        loading: true,
        autoClose: 3000,
      });

      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
  
      const base64Data = imageSrc.split(',')[1];
      const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(res => res.blob());
  
      const result = await markAttendance(blob);

      if (result.message === "No matching user found" || result.message === "No registered users found") {
        setResult(null);
        setCapturedImage(null);
        showNotification({
          title: 'Registration Required',
          message: 'No matching face found. Please register yourself in the system first.',
          color: 'red',
          autoClose: 5000,
        });
      } else if (result.user_id) {
        setResult(result);
        showNotification({
          title: 'Success',
          message: 'Attendance marked successfully!',
          color: 'green',
          autoClose: 3000,
        });
      }
    } catch (error) {
      setResult(null);
      setCapturedImage(null);
      showNotification({
        title: 'Error',
        message: 'Face verification failed. Please try again.',
        color: 'red',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }, [webcamRef]);

  return (
    <Container size="md" py="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title order={1} align="center" mb={50}>
          Mark Attendance
        </Title>

        {!result ? (
          <Card shadow="sm" p="xl" radius="md" withBorder>
            <Box 
              sx={{ 
                position: 'relative',
                width: 720,
                height: 720,
                maxWidth: '100%',
                margin: '0 auto',
                '@media (max-width: 768px)': {
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '1/1',
                },
              }}
            >
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

            {capturedImage && (
              <Box mt="xl">
                <Text size="sm" weight={500} align="center" mb="md">
                  Captured Image
                </Text>
                <Image
                  src={capturedImage}
                  width={200}
                  height={200}
                  radius="md"
                  mx="auto"
                  alt="Captured face"
                />
              </Box>
            )}

            <Group position="center" mt="xl">
              <Button
                size="xl"
                leftIcon={<FaCamera size={20} />}
                onClick={capture}
                loading={loading}
              >
                Capture
              </Button>
            </Group>
          </Card>
        ) : (
          <>
            <Card shadow="sm" p="xl" radius="md" withBorder>
              <Title order={3} align="center" mb="xl" color="green">
                Attendance Marked Successfully!
              </Title>
              
              <Group position="apart" align="flex-start">
                <Box>
                  <Text size="lg" weight={500} mb="md">User Details</Text>
                  <Text size="md">Name: {result.name}</Text>
                  <Text size="md">User ID: {result.user_id}</Text>
                  <Text size="md">Time: {result.timestamp}</Text>
                  <Text size="md">Confidence: {(result.confidence * 100).toFixed(2)}%</Text>
                  <Text size="md" color="green.7" mt="md" weight={500}>
                    Attendance marked for {result.name} today
                  </Text>
                </Box>
                
                {result.registered_face_image && (
                  <Image
                    src={result.registered_face_image}
                    width={200}
                    height={200}
                    radius="md"
                    alt="Registered face"
                  />
                )}
              </Group>
            </Card>

            <Card shadow="sm" p="xl" radius="md" withBorder mt="xl">
              <Title order={4} align="center" mb="xl">
                Captured Image
              </Title>
              <Group position="center">
                <Image
                  src={capturedImage}
                  width={200}
                  height={200}
                  radius="md"
                  alt="Captured face"
                />
              </Group>
            </Card>
          </>
        )}

        <LoadingOverlay visible={loading} />
      </motion.div>
    </Container>
  );
}
