// src/pages/RegistrationPage.js
import { useState } from 'react';
import {
  Container,
  Title,
  TextInput,
  Button,
  Card,
  Image,
  Text,
  Group,
  List,
  ThemeIcon,
  Box,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { generateUniqueId } from '../utils/helpers';
import { registerUser } from '../utils/api';
import WebcamCapture from '../components/Attendance/WebcamCapture';

export default function RegistrationPage() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      userId: generateUniqueId(),
    },
    validate: {
      firstName: (value) => !value && 'First name is required',
      lastName: (value) => !value && 'Last name is required',
      email: (value) => !/^\S+@\S+$/.test(value) && 'Invalid email',
      phone: (value) => !/^\d{10}$/.test(value) && 'Invalid phone number',
    },
  });

  const handleWebcamCapture = (imageSrc) => {
    setImage(imageSrc);
  };

  const handleSubmit = async (values) => {
    if (!image) {
      showNotification({
        title: 'Error',
        message: 'Please capture a face image',
        color: 'red',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await registerUser({ ...values, image });
      
      if (response && response.error) {
        throw new Error(response.error);
      }
      
      showNotification({
        title: 'Success',
        message: 'Registration successful!',
        color: 'green',
      });
      
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Registration error:', error);
      showNotification({
        title: 'Error',
        message: error.message || 'Registration failed. Please try again.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="md" py="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title order={1} align="center" mb={50}>
          User Registration
        </Title>
        <Card shadow="sm" p="xl" radius="md" withBorder>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Group grow align="flex-start" spacing={50}>
              <Box>
                <TextInput
                  required
                  label="First Name"
                  placeholder="Enter first name"
                  {...form.getInputProps('firstName')}
                />
                <TextInput
                  required
                  label="Last Name"
                  placeholder="Enter last name"
                  mt="md"
                  {...form.getInputProps('lastName')}
                />
                <TextInput
                  required
                  label="Email"
                  placeholder="Enter email"
                  mt="md"
                  {...form.getInputProps('email')}
                />
                <TextInput
                  required
                  label="Phone"
                  placeholder="Enter phone number"
                  mt="md"
                  {...form.getInputProps('phone')}
                />
                <TextInput
                  label="Unique ID"
                  value={form.values.userId}
                  readOnly
                  mt="md"
                />
              </Box>
              <Box>
                <Text size="sm" weight={500} mb="sm">
                  Face Image Guidelines
                </Text>
                <List
                  spacing="xs"
                  size="sm"
                  center
                  icon={
                    <ThemeIcon color="teal" size={24} radius="xl">
                      <FaCheck size={16} />
                    </ThemeIcon>
                  }
                >
                  <List.Item>Face should be straight and centered</List.Item>
                  <List.Item>Look directly into the camera</List.Item>
                  <List.Item>Ensure proper lighting</List.Item>
                  <List.Item>Remove glasses and face coverings</List.Item>
                  <List.Item>Maintain neutral expression</List.Item>
                </List>
                <Box 
                  mt="xl"
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
                  <WebcamCapture onImageCapture={handleWebcamCapture} />
                </Box>
                {image && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Box mt="md">
                      <Image
                        src={image}
                        alt="Face preview"
                        width={200}
                        mx="auto"
                        radius="md"
                        caption="Preview of captured image"
                      />
                    </Box>
                  </motion.div>
                )}
              </Box>
            </Group>
            <Group position="center" mt="xl">
              <Button type="submit" size="lg" loading={loading}>
                Register
              </Button>
            </Group>
          </form>
        </Card>
      </motion.div>
    </Container>
  );
}
