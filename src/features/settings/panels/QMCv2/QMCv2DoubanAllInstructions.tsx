import { Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react';
import { AndroidADBPullInstruction } from '~/components/AndroidADBPullInstruction/AndroidADBPullInstruction';

export function QMCv2DoubanAllInstructions() {
  return (
    <>
      <TabList>
        <Tab>安卓</Tab>
      </TabList>
      <TabPanels flex={1} overflow="auto">
        <TabPanel>
          <AndroidADBPullInstruction dir="/data/data/com.douban.radio/databases" file="music_audio_play" />
        </TabPanel>
      </TabPanels>
    </>
  );
}
