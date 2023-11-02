import { Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react';
import { AndroidADBPullInstruction } from '~/components/AndroidADBPullInstruction/AndroidADBPullInstruction';
import { InstructionsIOS } from './InstructionsIOS';
import { InstructionsMac } from './InstructionsMac';
import { InstructionsPC } from './InstructionsPC';

export function QMCv2QQMusicAllInstructions() {
  return (
    <>
      <TabList>
        <Tab>安卓</Tab>
        <Tab>iOS</Tab>
        <Tab>Mac</Tab>
        <Tab>Windows</Tab>
      </TabList>
      <TabPanels flex={1} overflow="auto">
        <TabPanel>
          <AndroidADBPullInstruction dir="/data/data/com.tencent.qqmusic/databases" file="player_process_db" />
        </TabPanel>
        <TabPanel>
          <InstructionsIOS />
        </TabPanel>
        <TabPanel>
          <InstructionsMac />
        </TabPanel>
        <TabPanel>
          <InstructionsPC />
        </TabPanel>
      </TabPanels>
    </>
  );
}
