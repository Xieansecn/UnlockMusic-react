import { Center, Link, Text } from '@chakra-ui/react';

export function Footer() {
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
        <Text>音乐解锁 (x.x.x) - 移除已购音乐的加密保护。</Text>
        <Text>
          Copyright © 2019 - 2023{' '}
          <Link href="https://git.unlock-music.dev/um" isExternal>
            UnlockMusic 团队
          </Link>{' '}
          | 音乐解锁授权基于
          <Link href="https://git.unlock-music.dev/um/um-react/src/branch/main/LICENSE" isExternal>
            MIT许可协议
          </Link>
          。
        </Text>
      </Center>
    </Center>
  );
}
