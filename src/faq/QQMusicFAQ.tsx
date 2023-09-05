import { Alert, AlertIcon, Container, Flex, List, ListItem, Text, chakra } from '@chakra-ui/react';
import { Header4 } from '~/components/HelpText/Header4';
import { SegmentTryOfficialPlayer } from './SegmentTryOfficialPlayer';
import { QMCv2AllInstructions } from '~/features/settings/panels/QMCv2/QMCv2AllInstructions';
import { SegmentKeyImportInstructions } from './SegmentKeyImportInstructions';

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
          <Text>日前，仅Windows客户端下载的歌曲无需密钥，其余平台的官方正式版本均需要提取密钥。</Text>

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

          <SegmentKeyImportInstructions tab="QMCv2 密钥" clientInstructions={<QMCv2AllInstructions />} />
        </ListItem>
      </List>
    </>
  );
}
