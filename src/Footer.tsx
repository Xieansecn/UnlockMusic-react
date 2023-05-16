import { Center, Flex, Link, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { Suspense, useMemo } from 'react';
import { SDKVersion } from './SDKVersion';

export function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <Center height="footer.container">
      <Center
        height="footer.content"
        fontSize="sm"
        textAlign="center"
        position="fixed"
        bottom="0"
        w="full"
        bg="gray.100"
        color="gray.800"
        left="0"
        flexDir="column"
      >
        <Flex as={Text}>
          音乐解锁 (__APP_VERSION_SHORT__
          <Suspense>
            <SDKVersion />
          </Suspense>
          ) - 移除已购音乐的加密保护
        </Flex>
        <Wrap>
          <WrapItem>Copyright © 2019 - {year}</WrapItem>
          <WrapItem>
            <Link href="https://git.unlock-music.dev/um" isExternal>UnlockMusic 团队</Link>
          </WrapItem>
          <WrapItem>|</WrapItem>
          <WrapItem>音乐解锁授权基于</WrapItem>
          <WrapItem>
            <Link href="https://git.unlock-music.dev/um/um-react/src/branch/main/LICENSE" isExternal>MIT许可协议</Link>
          </WrapItem>
        </Wrap>
      </Center>
    </Center>
  );
}
