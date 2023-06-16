import { Box, Code, Heading, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/react';
import { FilePathBlock } from '~/components/FilePathBlock';

const EXAMPLE_MEDIA_ID = '0011wjLv1bIkvv';
const EXAMPLE_NAME_IOS = '333407709-0011wjLv1bIkvv-1.mgalaxy';
const EXAMPLE_NAME_DB = 'Q0M00011wjLv1bIkvv.mflac';

export function InstructionsIOS() {
  return (
    <>
      <Text>不推荐从该平台客户端提取文件，因为使用者需要对 iOS 设备进行完整备份。</Text>
      <Heading as="h3" size="md" mt="3">
        未越狱用户指南
      </Heading>
      <Text>未越狱用户需要对设备进行完整备份，并能提取备份内的文件。</Text>
      <OrderedList>
        <ListItem>
          <Text>使用你喜欢的备份软件对 iOS 设备进行完整备份；</Text>
        </ListItem>
        <ListItem>
          <Text>打开备份文件，并导航到下述目录：</Text>
          <FilePathBlock>/AppDomain-com.tencent.QQMusic/Documents/mmkv/</FilePathBlock>
        </ListItem>
        <ListItem>
          <Text>
            提取或导出密钥数据库文件 <Code>filenameEkeyMap</Code>；
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            提交导出的 <Code>filenameEkeyMap</Code> 文件；
          </Text>
        </ListItem>
        <ListItem>
          <Text>按下「保存」来应用更改。</Text>
        </ListItem>
      </OrderedList>
      <Heading as="h3" size="md" mt="3">
        获取离线文件
      </Heading>
      <Box>
        <Text>通过客户端下载的音乐文件存储在备份的下述目录：</Text>
        <Code>/AppDomain-com.tencent.QQMusic/Library/Application Support/com.tencent.QQMusic/iData/iMusic</Code>
        <Text>
          该目录又存在数个子目录，其子目录下保存的「<Code>*.mgalaxy</Code>」文件则是最终的加密文件。
        </Text>
        <Text>
          格式：<Code>[随机数字]-[id]-[随机数字].mgalaxy</Code>
        </Text>
        <Text>
          &#x3000;例：<Code>{EXAMPLE_NAME_IOS}</Code>
        </Text>
      </Box>
      <Heading as="h3" size="md" mt="3">
        解密离线文件
      </Heading>
      <Text>勾选设定界面的「使用近似文件名匹配」可跳过该节内容。</Text>
      <Text>⚠ 注意：若密钥过多，匹配过程可能会造成浏览器卡顿或无响应。</Text>
      <OrderedList>
        <ListItem>
          <Text>
            在上方的样例文件的情况下，得知其 id 为 <Code>{EXAMPLE_MEDIA_ID}</Code>；
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            查找密钥表，得到文件名「<Code>{EXAMPLE_NAME_DB}</Code>」；
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            将导出的「<Code>{EXAMPLE_NAME_IOS}</Code>」更名为数据库存储的文件名「
            <Code>{EXAMPLE_NAME_DB}</Code>」；
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            回到主界面，提交离线文件「<Code>{EXAMPLE_NAME_DB}</Code>」。
          </Text>
        </ListItem>
      </OrderedList>
      <Heading as="h3" size="md" mt="3">
        越狱用户参考
      </Heading>
      <Text>该节信息根据网络上公开的信息整理，仅供参考。</Text>
      <UnorderedList>
        <ListItem>
          <Text>密钥数据库文件路径：</Text>
          <FilePathBlock>
            /var/mobile/Containers/Data/Application/&lt;随机&gt;/Documents/mmkv/filenameEkeyMap
          </FilePathBlock>
        </ListItem>
        <ListItem>
          <Text>离线音乐文件下载目录：</Text>
          <FilePathBlock>
            /var/mobile/Containers/Data/Application/&lt;随机&gt;/Library/Application
            Support/com.tencent.QQMusic/iData/iMusic
          </FilePathBlock>
        </ListItem>
      </UnorderedList>
    </>
  );
}
