import { Container, Title, Text, Button, Group, Box, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserPlus, FaUserCheck } from 'react-icons/fa';
import { RiUser5Fill } from 'react-icons/ri';  // Changed to a different icon

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Container size="lg" py={100}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Stack align="center" spacing={50}>
          <Box sx={{ textAlign: 'center' }}>
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <RiUser5Fill size={100} color="#228BE6" />  {/* Changed icon component */}
            </motion.div>
            
            <Title
              order={1}
              size={48}
              mb={20}
              sx={(theme) => ({
                background: `linear-gradient(45deg, ${theme.colors.blue[6]}, ${theme.colors.cyan[6]})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              })}
            >
              Face Recognition Attendance System
            </Title>
            
            <Text size="xl" color="dimmed" maw={600} mx="auto" mb={40}>
              Experience the future of attendance management with our advanced face recognition technology
            </Text>
          </Box>

          <Group position="center" spacing={30}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="xl"
                leftIcon={<FaUserPlus size={20} />}
                onClick={() => navigate('/register')}
                sx={(theme) => ({
                  background: theme.fn.linearGradient(45, theme.colors.blue[6], theme.colors.cyan[6]),
                  '&:hover': {
                    background: theme.fn.linearGradient(45, theme.colors.blue[7], theme.colors.cyan[7]),
                  },
                })}
              >
                Register New User
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="xl"
                variant="outline"
                leftIcon={<FaUserCheck size={20} />}
                onClick={() => navigate('/attendance')}
                sx={(theme) => ({
                  borderColor: theme.colors.blue[6],
                  color: theme.colors.blue[6],
                  '&:hover': {
                    backgroundColor: theme.colors.blue[0],
                  },
                })}
              >
                Mark Attendance
              </Button>
            </motion.div>
          </Group>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Group position="center" spacing={50} mt={30}>
              <Feature
                icon="🔒"
                title="Secure"
                description="Advanced face recognition algorithms ensure accurate identification"
              />
              <Feature
                icon="⚡"
                title="Fast"
                description="Mark attendance in seconds with real-time processing"
              />
              <Feature
                icon="📱"
                title="Easy to Use"
                description="Simple interface for quick registration and attendance"
              />
            </Group>
          </motion.div>
        </Stack>
      </motion.div>
    </Container>
  );
}

function Feature({ icon, title, description }) {
  return (
    <Box
      sx={(theme) => ({
        textAlign: 'center',
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        backgroundColor: theme.white,
        boxShadow: theme.shadows.sm,
        width: 250,
      })}
    >
      <Text size={40} mb={10}>{icon}</Text>
      <Text size="lg" weight={500} mb={5}>{title}</Text>
      <Text size="sm" color="dimmed">{description}</Text>
    </Box>
  );
}
