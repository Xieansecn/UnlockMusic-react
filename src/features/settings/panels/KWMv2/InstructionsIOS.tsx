import { Code, ListItem, OrderedList, Text, chakra } from '@chakra-ui/react';

const KUWO_IOS_DIR = '/var/mobile/Containers/Data/Application/<酷我数据目录>/mmkv';

export function InstructionsIOS() {
  return (
    <>
      <Text>你需要越狱来访问 iOS 应用的私有数据。</Text>
      <Text>
        ⚠️ 请注意，越狱通常意味着你的设备
        <chakra.span color="red.400">将失去保修资格</chakra.span>。
      </Text>
      <OrderedList>
        <ListItem>
          <Text>
            访问设备的这个目录：
            <Code wordBreak="break-word">{KUWO_IOS_DIR}</Code>
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            提取密钥数据库文件 <Code>kw_ekey</Code> 至浏览器可访问的目录，如下载目录。
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            提交刚刚提取的 <Code>kw_ekey</Code> 密钥数据库。
          </Text>
        </ListItem>
      </OrderedList>
    </>
  );
}
