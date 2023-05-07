import { useId } from 'react';

import { Box, Text } from '@chakra-ui/react';
import { UnlockIcon } from '@chakra-ui/icons';

export function SelectFile() {
  const id = useId();

  return (
    <Box
      as="label"
      htmlFor={id}
      w="100%"
      maxW={480}
      borderWidth="1px"
      borderRadius="lg"
      transitionDuration="0.5s"
      p="6"
      cursor="pointer"
      display="flex"
      flexDir="column"
      alignItems="center"
      _hover={{
        borderColor: 'gray.400',
        bg: 'gray.50',
      }}
    >
      <Box pb={3}>
        <UnlockIcon boxSize={8} />
      </Box>
      <Box textAlign="center">
        {/* 将文件拖到此处，或 */}
        <Text as="span" color="teal.400">
          点我选择
        </Text>
        需要解密的文件
        <input id={id} type="file" hidden multiple />
        <Text fontSize="sm" opacity="50%">
          仅在浏览器内对文件进行解锁，无需消耗流量
        </Text>
      </Box>
    </Box>
  );
}
