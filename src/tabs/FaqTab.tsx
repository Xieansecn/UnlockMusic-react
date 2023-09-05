import { Center, Container, Heading } from '@chakra-ui/react';
import { Header3 } from '~/components/HelpText/Header3';
import { KuwoFAQ } from '~/faq/KuwoFAQ';
import { OtherFAQ } from '~/faq/OtherFAQ';
import { QQMusicFAQ } from '~/faq/QQMusicFAQ';

export function FaqTab() {
  return (
    <Container pb={10} maxW="container.md">
      <Center>
        <Heading as="h2">常见问题解答</Heading>
      </Center>
      <Header3>QQ 音乐</Header3>
      <QQMusicFAQ />
      <Header3>酷我音乐</Header3>
      <KuwoFAQ />
      <Header3>其它问题</Header3>
      <OtherFAQ />
    </Container>
  );
}
