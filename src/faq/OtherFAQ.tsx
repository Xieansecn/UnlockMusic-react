import { Text } from '@chakra-ui/react';
import { ExtLink } from '~/components/ExtLink';
import { Header4 } from '~/components/HelpText/Header4';
import { ProjectIssue } from '~/components/ProjectIssue';

export function OtherFAQ() {
  return (
    <>
      <Header4>解密后没有封面等信息</Header4>
      <Text>该项目进行解密处理。如果加密前的资源没有内嵌元信息或封面，解密的文件也没有。</Text>
      <Text>请使用第三方工具进行编辑或管理元信息。</Text>
      <Header4>如何批量下载</Header4>
      <Text>
        暂时没有实现，不过你可以在 <ProjectIssue id={34} title="[UI] 全部下载功能" /> 以及{' '}
        <ProjectIssue id={43} title="批量下载" /> 追踪该问题。
      </Text>
      <Header4>有更多问题？</Header4>
      <Text>
        {'欢迎进入 '}
        <ExtLink href={'https://t.me/unlock_music_chat'}>Telegram “音乐解锁-交流” 交流群</ExtLink>
        {' 一起探讨。'}
      </Text>
    </>
  );
}
