import { Flex, Icon, ListItem, OrderedList, Tabs, Text } from '@chakra-ui/react';
import { SegmentTopNavSettings } from './SegmentTopNavSettings';
import { VQuote } from '~/components/HelpText/VQuote';
import { SegmentAddKeyDropdown } from './SegmentAddKeyDropdown';
import React from 'react';
import { MdFileUpload } from 'react-icons/md';

export interface SegmentKeyImportInstructionsProps {
  clientInstructions: React.ReactNode;
  tab: string;
}

export function SegmentKeyImportInstructions({ clientInstructions, tab }: SegmentKeyImportInstructionsProps) {
  return (
    <>
      <Text>导入密钥可以参考下面的步骤：</Text>
      <OrderedList>
        <ListItem>
          <SegmentTopNavSettings />
        </ListItem>
        <ListItem>
          设定区域选择<VQuote>{tab}</VQuote>
        </ListItem>
        <ListItem>
          <SegmentAddKeyDropdown />
        </ListItem>
        <ListItem>
          <Flex flexDir="row" alignItems="center">
            {'选择 '}
            <VQuote>
              <Icon as={MdFileUpload} boxSize={5} mr={2} /> 从文件导入密钥…
            </VQuote>
          </Flex>
        </ListItem>
        <ListItem>
          <Text>选择你的客户端平台来查看密钥提取说明：</Text>
          <Tabs display="flex" flexDir="column" border="1px solid" borderColor="gray.300" borderRadius={5}>
            {clientInstructions}
          </Tabs>
        </ListItem>
      </OrderedList>
    </>
  );
}
