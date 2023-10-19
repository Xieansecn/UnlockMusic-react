import { Flex, IconButton } from '@chakra-ui/react';
import { MdExpandMore } from 'react-icons/md';
import { HiWord } from '~/components/HelpText/HiWord';
import { VQuote } from '~/components/HelpText/VQuote';

export function SegmentAddKeyDropdown() {
  return (
    <Flex as="span" alignItems="center" flexWrap="wrap">
      按下<VQuote>添加一条密钥</VQuote>按钮
      <HiWord>右侧</HiWord>的
      <IconButton
        colorScheme="purple"
        variant="outline"
        size="sm"
        icon={<MdExpandMore />}
        ml="2"
        borderTopLeftRadius={0}
        borderBottomLeftRadius={0}
        pointerEvents="none"
        aria-label="下拉按钮"
      />
    </Flex>
  );
}
