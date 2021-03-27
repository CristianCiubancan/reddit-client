import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import gql from "graphql-tag";
import {
  PostSnippetFragment,
  useVoteMutation,
  VoteMutation,
} from "../generated/graphql";
import { ApolloCache } from "@apollo/client";

interface VoteSectionProps {
  post: PostSnippetFragment;
}

const updateAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: "Post:" + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        voteStatus
      }
    `,
  });
  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment __ on Post {
          points
          voteStatus
        }
      `,
      data: { points: newPoints, voteStatus: value },
    });
  }
};

const VoteSection: React.FC<VoteSectionProps> = ({ post }) => {
  const [voteLoading, setVoteLoading] = useState<
    "vote-loading" | "downvote-loading" | "not-loading"
  >();
  const [vote] = useVoteMutation();
  return (
    <Flex
      justifyContent="space-between"
      direction="column"
      alignItems="center"
      mr={4}
    >
      <IconButton
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setVoteLoading("vote-loading");
          await vote({
            variables: {
              postId: post.id,
              value: 1,
            },
            update: (cache) => updateAfterVote(1, post.id, cache),
          });
          setVoteLoading("not-loading");
        }}
        colorScheme={post.voteStatus === 1 ? "teal" : undefined}
        aria-label="Vote up"
        isLoading={voteLoading === "vote-loading" ? true : false}
        icon={<ChevronUpIcon />}
      />
      {post.points}
      <IconButton
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setVoteLoading("downvote-loading");
          await vote({
            variables: {
              postId: post.id,
              value: -1,
            },
            update: (cache) => updateAfterVote(-1, post.id, cache),
          });
          setVoteLoading("not-loading");
        }}
        colorScheme={post.voteStatus === -1 ? "pink" : undefined}
        aria-label="Vote down"
        isLoading={voteLoading === "downvote-loading" ? true : false}
        icon={<ChevronDownIcon />}
      />
    </Flex>
  );
};

export default VoteSection;
