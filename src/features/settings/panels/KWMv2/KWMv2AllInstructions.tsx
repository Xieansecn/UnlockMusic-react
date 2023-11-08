import { Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react';
import { AndroidADBPullInstruction } from '~/components/AndroidADBPullInstruction/AndroidADBPullInstruction';
import { InstructionsPC } from './InstructionsPC';
import { InstructionsIOS } from './InstructionsIOS';

export function KWMv2AllInstructions() {
  return (
    <>
      <TabList>
        <Tab>安卓</Tab>
        <Tab>iOS</Tab>
        <Tab>Windows</Tab>
      </TabList>
      <TabPanels flex={1} overflow="auto">
        <TabPanel>
          <AndroidADBPullInstruction
            dir="/data/data/cn.kuwo.player/files/mmkv"
            file="cn.kuwo.player.mmkv.defaultconfig"
          />
        </TabPanel>
        <TabPanel>
          <InstructionsIOS />
        </TabPanel>
        <TabPanel>
          <InstructionsPC />
        </TabPanel>
      </TabPanels>
    </>
  );
}
