import { Alert, AlertIcon, Container, Flex, List, ListItem, Text, UnorderedList, chakra } from '@chakra-ui/react';
import { Header4 } from '~/components/HelpText/Header4';
import { SegmentTryOfficialPlayer } from './SegmentTryOfficialPlayer';
import { QMCv2QQMusicAllInstructions } from '~/features/settings/panels/QMCv2/QMCv2QQMusicAllInstructions';
import { SegmentKeyImportInstructions } from './SegmentKeyImportInstructions';
import { ExtLink } from '~/components/ExtLink';

export function QQMusicFAQ() {
  return (
    <>
      <Header4>解锁失败</Header4>
      <List spacing={2}>
        <ListItem>
          <SegmentTryOfficialPlayer />
        </ListItem>
        <ListItem>
          <Text>
            <chakra.strong>2、检查您的平台</chakra.strong>
          </Text>
          <Text>
            日前，仅 Windows 客户端 19.43 或更低版本下载的歌曲文件无需密钥，其余平台的官方正式版本均需要提取密钥。
            你可以通过下方的链接获取 QQ 音乐 Windows 客户端 v19.43 的安装程序：
          </Text>
          <UnorderedList pl={3}>
            <ListItem>
              <Text>
                <ExtLink href="https://dldir1v6.qq.com/music/clntupate/QQMusic_Setup_1943.exe">
                  <code>qq.com</code> 官方下载地址（推荐）
                </ExtLink>
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <ExtLink href="https://web.archive.org/web/2023/https://dldir1v6.qq.com/music/clntupate/QQMusic_Setup_1943.exe">
                  <code>Archive.org</code> 存档
                </ExtLink>
              </Text>
            </ListItem>
          </UnorderedList>

          <Container p={2}>
            <Alert status="warning" borderRadius={5}>
              <AlertIcon />
              <Flex flexDir="column">
                <Text>iOS 用户提取歌曲困难，建议换用电脑操作；</Text>
                <Text>安卓用户提取密钥需要root，也建议用电脑操作。</Text>
              </Flex>
            </Alert>
          </Container>

          <Container p={2} pt={0}>
            <Alert status="info" borderRadius={5}>
              <AlertIcon />
              重复下载同一首的歌曲不重复扣下载配额，但是同一首歌的两个版本会重复扣下载配额，请仔细分辨。
            </Alert>
          </Container>

          <SegmentKeyImportInstructions tab="QMCv2 密钥" clientInstructions={<QMCv2QQMusicAllInstructions />} />
        </ListItem>
      </List>
    </>
  );
}
