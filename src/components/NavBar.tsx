import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import React, { LegacyRef, useRef } from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const router = useRouter();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  let body = null;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  if (loading) {
  } else if (!data?.me) {
    body = isLargerThan600 ? (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">register</Link>
        </NextLink>
      </>
    ) : (
      <>
        <Button
          ref={btnRef as LegacyRef<HTMLButtonElement>}
          colorScheme="teal"
          onClick={onOpen}
        >
          Menu
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader></DrawerHeader>
              <DrawerBody>
                <Flex flexDirection="column">
                  <Button
                    onClick={() => {
                      router.push("/login");
                    }}
                    colorScheme="pink"
                    mt={2}
                  >
                    login
                  </Button>
                  <Button
                    onClick={() => {
                      router.push("/register");
                    }}
                    colorScheme="teal"
                    mt={2}
                  >
                    register
                  </Button>
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </>
    );
  } else {
    body = isLargerThan600 ? (
      <Flex alignItems="center">
        <NextLink href="/create-post">
          <Button colorScheme="pink" as={Link} mr={4}>
            Create Post
          </Button>
        </NextLink>
        <Box color="white" mr={2}>
          <Text fontSize="xl">{data?.me?.username}</Text>
        </Box>
        <Button
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
          isLoading={logoutFetching}
          variant="link"
          color="pink.300"
        >
          <Text fontSize="xl">logout</Text>
        </Button>
      </Flex>
    ) : (
      <>
        <Button
          ref={btnRef as LegacyRef<HTMLButtonElement>}
          colorScheme="teal"
          onClick={onOpen}
        >
          Menu
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>
                <Text color="black" fontSize="xl">
                  Hi, {data?.me?.username}!
                </Text>
              </DrawerHeader>

              <DrawerBody>
                <Flex flexDirection="column" alignItems="start">
                  <NextLink href="/create-post">
                    <Button colorScheme="pink" as={Link} ml={-0.5}>
                      Create Post
                    </Button>
                  </NextLink>
                  <Button
                    mt={4}
                    onClick={async () => {
                      await logout();
                      router.reload();
                    }}
                    isLoading={logoutFetching}
                    variant="link"
                    color="pink.300"
                  >
                    <Text fontSize="lg">logout</Text>
                  </Button>
                </Flex>
              </DrawerBody>

              <DrawerFooter mr="auto"></DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </>
    );
  }
  return (
    <Flex
      justifyContent="center"
      zIndex={1}
      position="sticky"
      top={0}
      bg="teal"
      p={4}
    >
      <Flex flex={1} alignItems="center" maxW={800}>
        <Box mr={"auto"} color="white">
          <NextLink href="/">
            <Link>
              <Heading fontSize="xl">Reddit</Heading>
            </Link>
          </NextLink>
        </Box>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
