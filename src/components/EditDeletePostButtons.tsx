import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Link, Spacer } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
  direction?: string | null;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
  direction = null,
}) => {
  const [deletePost] = useDeletePostMutation();
  const { data: meData } = useMeQuery();

  if (meData?.me?.id !== creatorId) {
    return null;
  }
  return (
    <Flex
      height={"100%"}
      flexDirection={direction === "vertical" ? "column" : "row"}
    >
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          mr={direction === "vertical" ? 0 : 2}
          as={Link}
          aria-label="edit post"
          icon={<EditIcon />}
        />
      </NextLink>
      <Spacer />
      <IconButton
        onClick={() => {
          deletePost({
            variables: { id },
            update: (cache) => {
              cache.evict({
                id: "Post:" + id,
              });
            },
          });
        }}
        aria-label="delte post"
        icon={<DeleteIcon />}
      />
    </Flex>
  );
};
