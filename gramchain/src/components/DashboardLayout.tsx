'use client';

import { ReactNode, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  useDisclosure,
  Drawer,
  DrawerContent,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import Link from 'next/link';

interface DashboardLayoutProps {
  children: ReactNode;
  userName: string;
  role: 'investor' | 'entrepreneur';
}

export default function DashboardLayout({ children, userName, role }: DashboardLayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const menuItems = role === 'investor' 
    ? [
        { label: 'Available Startups', href: '/investor/startups' },
        { label: 'My Investments', href: '/investor/investments' },
        { label: 'Available Communities', href: '/investor/communities' },
        { label: 'My Communities', href: '/investor/my-communities' },
        { label: 'Profile', href: '/investor/profile' },
      ]
    : [
        { label: 'Create Startup', href: '/entrepreneur/create-startup' },
        { label: 'My Startups', href: '/entrepreneur/my-startups' },
        { label: 'Available Communities', href: '/entrepreneur/communities' },
        { label: 'Profile', href: '/entrepreneur/profile' },
      ];

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Mobile Navigation */}
      <Flex
        bg={bgColor}
        p={4}
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px"
        borderColor={borderColor}
        display={{ base: 'flex', md: 'none' }}
      >
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          onClick={onOpen}
        />
        <Text fontSize="xl" fontWeight="bold">
          GramChain
        </Text>
        <Box w={8} />
      </Flex>

      {/* Desktop Navigation */}
      <Flex>
        {/* Sidebar */}
        <Box
          w={{ base: 'full', md: 64 }}
          pos="fixed"
          h="full"
          bg={bgColor}
          borderRight="1px"
          borderColor={borderColor}
          display={{ base: 'none', md: 'block' }}
        >
          <VStack h="full" p={4} spacing={4} align="stretch">
            <Text fontSize="xl" fontWeight="bold" mb={8}>
              GramChain
            </Text>
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  as="a"
                  variant="ghost"
                  justifyContent="flex-start"
                  w="full"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </VStack>
        </Box>

        {/* Main Content */}
        <Box flex={1} ml={{ base: 0, md: 64 }}>
          {/* Top Bar */}
          <Flex
            bg={bgColor}
            p={4}
            justifyContent="flex-end"
            alignItems="center"
            borderBottom="1px"
            borderColor={borderColor}
          >
            <HStack spacing={4}>
              <Text>Welcome, {userName}</Text>
              <Button onClick={handleLogout} size="sm">
                Logout
              </Button>
            </HStack>
          </Flex>

          {/* Page Content */}
          <Box p={4}>
            {children}
          </Box>
        </Box>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerContent>
          <Box p={4}>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Text fontSize="xl" fontWeight="bold">
                GramChain
              </Text>
              <IconButton
                aria-label="Close menu"
                icon={<CloseIcon />}
                onClick={onClose}
              />
            </Flex>
            <VStack spacing={4} align="stretch">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href} passHref>
                  <Button
                    as="a"
                    variant="ghost"
                    justifyContent="flex-start"
                    w="full"
                    onClick={onClose}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </VStack>
          </Box>
        </DrawerContent>
      </Drawer>
    </Box>
  );
} 