import { Box } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "./NavBar";
import Wrapper, { WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
}
const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <Box>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </Box>
  );
};

export default Layout;
