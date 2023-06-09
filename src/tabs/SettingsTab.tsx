import { Container, Flex } from '@chakra-ui/react';
import { Settings } from '~/features/settings/Settings';

export function SettingsTab() {
  return (
    <Container as={Flex} maxW="container.lg">
      <Settings />
    </Container>
  );
}
