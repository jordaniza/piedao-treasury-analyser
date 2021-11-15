import React from "react"
import {
  Flex,
  FlexProps,
} from "@chakra-ui/react"

interface ComponentCardProps extends FlexProps {
  children: React.ReactNode;
}

const ComponentCard = (props: ComponentCardProps): JSX.Element => {
  return (
    <Flex
      border="1px"
      borderRadius="lg"
      padding={[0, 0, 0, 10]}
      height="500px"
      width="95%"
      justifyContent="center"
      borderColor="gray"
      {...props}
      >
      { props.children }
    </Flex>
  )
};

export default ComponentCard;

