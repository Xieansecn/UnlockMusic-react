import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { PanelQMC } from './panels/PanelQMC';

export function Settings() {
  return (
    <Tabs orientation="vertical" align="start" variant="line-i" flex={1}>
      <TabList minW={0} width="8em" textAlign="right" justifyContent="center">
        <Tab>QQ 音乐</Tab>
        <Tab>其它</Tab>
      </TabList>

      <TabPanels>
        <PanelQMC />
        <TabPanel>
          <Text>待定</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
