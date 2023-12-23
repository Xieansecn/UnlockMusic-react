import { Img, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { ExtLink } from '~/components/ExtLink';
import { Header4 } from '~/components/HelpText/Header4';
import { VQuote } from '~/components/HelpText/VQuote';
import { ProjectIssue } from '~/components/ProjectIssue';
import LdPlayerSettingsScreen from './assets/ld_settings_misc.webp';

export function OtherFAQ() {
  return (
    <>
      <Header4>解密后没有封面等信息</Header4>
      <Text>该项目进行解密处理。如果加密前的资源没有内嵌元信息或封面，解密的文件也没有。</Text>
      <Text>请使用第三方工具进行编辑或管理元信息。</Text>
      <Header4>如何批量下载</Header4>
      <Text>
        {'暂时没有实现，不过你可以在 '}
        <ProjectIssue id={34} title="[UI] 全部下载功能" />
        {' 以及 '}
        <ProjectIssue id={43} title="批量下载" />
        {' 追踪该问题。'}
      </Text>
      <Header4>安卓 root 相关</Header4>
      <Text>
        对安卓设备获取 root 特权通常会破坏系统的完整性并导致部分功能无法使用。
        例如部分厂商的安卓设备会在解锁后丧失保修资格，或导致无法使用 NFC 移动支付功能等限制。
      </Text>
      <Text>如果希望不破坏系统完整性，你可以考虑使用模拟器。</Text>
      <Text>
        目前常见的带有 root 特权支持的的安卓模拟器方案，分别是雷电模拟器（※ 官方版有内置广告）和微软在 Windows 11
        开始支援的
        <ExtLink href="https://learn.microsoft.com/zh-cn/windows/android/wsa/">
          <ruby>
            适用于 Android™ 的 Windows 子系统 (WSA)
            <rp> (</rp>
            <rt>
              <code>Windows Subsystem for Android</code>
            </rt>
            <rp>)</rp>
          </ruby>
        </ExtLink>
        。
      </Text>
      <UnorderedList>
        <ListItem>
          <Text>
            {'WSA 可以参考 '}
            <ExtLink href="https://github.com/LSPosed/MagiskOnWSALocal">MagiskOnWSALocal</ExtLink>
            {' 的说明操作。'}
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            雷电模拟器可以在<VQuote>模拟器设置</VQuote> → <VQuote>其他设置</VQuote>中启用。
          </Text>
          <Img borderRadius={5} border="1px solid #ccc" src={LdPlayerSettingsScreen}></Img>
        </ListItem>
      </UnorderedList>
      <Header4>有更多问题？</Header4>
      <Text>
        {'欢迎进入 '}
        <ExtLink href={'https://t.me/unlock_music_chat'}>Telegram “音乐解锁-交流” 交流群</ExtLink>
        {' 一起探讨。'}
      </Text>
    </>
  );
}
