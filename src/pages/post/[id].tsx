import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import Layout from "../../components/Layout";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { withApollo } from "../../utils/withApollo";

const Post = ({}) => {
  const { data, loading } = useGetPostFromUrl();

  if (loading) {
    return (
      <Layout>
        <Flex
          flex={1}
          height={"80vh"}
          justifyContent="center"
          alignItems="center"
        >
          <Spinner />
        </Flex>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Post not found</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box>
        <Heading my={4} mb={2} fontSize="x-large">
          {data.post.title}
        </Heading>
        <Flex alignItems="center" flex={1}>
          <Heading fontSize="sm">
            Author:
            <Heading fontSize="medium" color="pink" display="inline">
              {` ${data.post.creator.username}`}
            </Heading>
          </Heading>
          <Box ml="auto">
            <EditDeletePostButtons
              id={data.post.id}
              creatorId={data.post.creator.id}
            />
          </Box>
        </Flex>

        <Text mt={4}>{data.post.text}</Text>
      </Box>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
