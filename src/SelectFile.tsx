import { Box, Stack, Text } from '@chakra-ui/react';
import { UnlockIcon } from '@chakra-ui/icons';
import { useId } from 'react';
import { PointerLabel } from './PointerLabel';

export function SelectFile() {
  const id = useId();

  return (
    <Box borderWidth="1px" borderRadius="lg" p="6">
      <Stack alignItems="center">
        <UnlockIcon />
        <Box>
          将文件拖到此处，或
          <PointerLabel htmlFor={id}>
            <Text as="span" color="teal.400">
              点击选择
            </Text>
          </PointerLabel>
          <input id={id} type="file" hidden multiple />
        </Box>
      </Stack>
    </Box>
  );
}
