import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";
import Layout from "../components/Layout";
import VoteSection from "../components/VoteSection";
import { usePostsQuery } from "../generated/graphql";
import Header from "next/head";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  const { data, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 10,
      cursor: null as null | string,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!data && !loading) {
    return <div>posts couldn't be retrieved from the server</div>;
  }
  return (
    <Layout>
      <Header>
        <title>Happy Octopus - Reddit</title>
      </Header>
      {!data && loading ? (
        <Flex
          flex={1}
          height={"80vh"}
          justifyContent="center"
          alignItems="center"
        >
          <Spinner color="teal.800" />
        </Flex>
      ) : (
        <Stack spacing={8}>
          {data?.posts.posts.map((p) =>
            !p ? null : (
              <Flex
                flex={1}
                key={p.id}
                mt={8}
                p={5}
                shadow="md"
                borderWidth="1px"
              >
                <VoteSection post={p} />
                <Box>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Heading fontSize="sm" mt={2}>
                    Author:
                    <Heading
                      fontSize="medium"
                      color="pink.300"
                      display="inline"
                    >
                      {` ${p.creator.username}`}
                    </Heading>
                  </Heading>
                  <Text mt={4}>{p.textSnippet}</Text>
                </Box>
                <Box ml="auto">
                  <EditDeletePostButtons
                    direction="vertical"
                    id={p.id}
                    creatorId={p.creator.id}
                  />
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex justifyContent="center">
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
              });
            }}
            isLoading={loading}
            colorScheme="teal"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
