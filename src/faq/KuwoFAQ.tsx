import { Alert, AlertIcon, Container, Flex, List, ListItem, Text, chakra } from '@chakra-ui/react';
import { Header4 } from '~/components/HelpText/Header4';
import { VQuote } from '~/components/HelpText/VQuote';
import { SegmentTryOfficialPlayer } from './SegmentTryOfficialPlayer';
import { HiWord } from '~/components/HelpText/HiWord';
import { KWMv2AllInstructions } from '~/features/settings/panels/KWMv2/KWMv2AllInstructions';
import { SegmentKeyImportInstructions } from './SegmentKeyImportInstructions';

export function KuwoFAQ() {
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
            日前，仅<HiWord>手机客户端</HiWord>下载的
            <VQuote>
              <strong>至臻全景声</strong>
            </VQuote>
            及
            <VQuote>
              <strong>至臻母带</strong>
            </VQuote>
            {'音质的音乐文件采用新版加密。'}
          </Text>
          <Text>其他音质目前不需要提取密钥。</Text>
          <Text>PC平台暂未推出使用新版加密的音质。</Text>

          <Container p={2}>
            <Alert status="warning" borderRadius={5}>
              <AlertIcon />
              <Flex flexDir="column">
                <Text>安卓用户提取密钥需要 root 权限，或注入文件提供器。</Text>
                <Text>
                  <strong>注意</strong>：已知部分第三方修改版会破坏密钥写入功能，导致无法正常导入密钥。
                </Text>
                <Text>
                  <strong>注意</strong>：项目组不提倡使用第三方修改版应用亦不会提供，使用前请自行评估风险。
                </Text>
              </Flex>
            </Alert>
          </Container>

          <SegmentKeyImportInstructions tab="KWMv2 密钥" clientInstructions={<KWMv2AllInstructions />} />
        </ListItem>
      </List>
    </>
  );
}
