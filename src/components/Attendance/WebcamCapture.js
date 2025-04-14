// src/components/Registration/RegistrationForm.js
import { useState } from 'react';
import {
  TextInput,
  Button,
  Card,
  Image,
  Text,
  Group,
  List,
  ThemeIcon,
  Box,
  Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { FaCheck, FaCloudUploadAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { generateUniqueId } from '../../utils/helpers';

export default function RegistrationForm({ onSubmit }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showNotification({
          title: 'Error',
          message: 'Image size should be less than 5MB',
          color: 'red',
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values) => {
    if (!image) {
      showNotification({
        title: 'Error',
        message: 'Please upload a face image',
        color: 'red',
      });
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ ...values, image });
    } catch (error) {
      showNotification({
        title: 'Error',
        message: error.message,
        color: 'red',
      });
    }
    setLoading(false);
  };

  return (
    <Card shadow="sm" p="xl" radius="md" withBorder>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group grow align="flex-start" spacing={50}>
          <Stack spacing="md">
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
              {...form.getInputProps('lastName')}
            />
            <TextInput
              required
              label="Email"
              placeholder="Enter email"
              {...form.getInputProps('email')}
            />
            <TextInput
              required
              label="Phone"
              placeholder="Enter phone number"
              {...form.getInputProps('phone')}
            />
            <TextInput
              label="Unique ID"
              value={form.values.userId}
              readOnly
              description="Auto-generated unique identifier"
            />
          </Stack>

          <Stack spacing="md">
            <Text size="sm" weight={500}>
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

            <Box mt="md">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id="imageUpload"
              />
              <label htmlFor="imageUpload">
                <Button
                  component="span"
                  fullWidth
                  leftIcon={<FaCloudUploadAlt size={20} />}
                  variant="outline"
                >
                  Upload Face Image
                </Button>
              </label>

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
                      caption="Preview of uploaded image"
                    />
                  </Box>
                </motion.div>
              )}
            </Box>
          </Stack>
        </Group>

        <Group position="center" mt="xl">
          <Button
            type="submit"
            size="lg"
            loading={loading}
          >
            Register
          </Button>
        </Group>
      </form>
    </Card>
  );
}
