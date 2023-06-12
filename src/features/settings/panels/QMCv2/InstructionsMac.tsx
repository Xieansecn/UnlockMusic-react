import { Heading, Text, Code, Kbd, OrderedList, ListItem } from '@chakra-ui/react';
import { MacCommandKey } from '~/components/Key/MacCommandKey';
import { ShiftKey } from '~/components/Key/ShiftKey';

export function InstructionsMac() {
  return (
    <>
      <Text>Mac 客户端使用 mmkv 数据库储存密钥。</Text>
      <Text>该密钥文件通常存储在下述路径：</Text>
      <Text as="pre" whiteSpace="pre-wrap" wordBreak="break-word" lang="en">
        <Code>
          ~/Library/Containers/com.tencent.QQMusicMac/Data/Library/Application
          Support/QQMusicMac/mmkv/MMKVStreamEncryptId
        </Code>
      </Text>

      <Heading as="h3" size="md" mt="4">
        导入密钥
      </Heading>
      <OrderedList>
        <ListItem>
          <Text>
            选中并复制上述的 <Code>MMKVStreamEncryptId</Code> 文件路径
          </Text>
        </ListItem>
        <ListItem>
          <Text>点击上方的「文件选择区域」，打开「文件选择框」</Text>
        </ListItem>
        <ListItem>
          <Text>
            按下「
            <ShiftKey />
            {' + '}
            <MacCommandKey />
            {' + '}
            <Kbd>{'G'}</Kbd>」组合键打开「路径输入框」
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            粘贴之前复制的 <Code>MMKVStreamEncryptId</Code> 文件路径
          </Text>
        </ListItem>
        <ListItem>
          <Text>按下「回车键」确认。</Text>
        </ListItem>
      </OrderedList>
    </>
  );
}
