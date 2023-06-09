import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { PanelQMCv2Key } from './panels/PanelQMCv2Key';
import { useState } from 'react';
import { MdExpandMore, MdMenu } from 'react-icons/md';

const TABS: { name: string; Tab: () => JSX.Element }[] = [
  { name: 'QMCv2 密钥', Tab: PanelQMCv2Key },
  {
    name: '其它／待定',
    Tab: () => (
      <TabPanel>
        <Text>这里空空如也～</Text>
      </TabPanel>
    ),
  },
];

export function Settings() {
  const isLargeWidthDevice =
    useBreakpointValue({
      base: false,
      lg: true,
    }) ?? false;

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (idx: number) => {
    setTabIndex(idx);
  };

  return (
    <Flex flexDir="column" flex={1}>
      <Menu>
        <MenuButton
          as={Button}
          leftIcon={<MdMenu />}
          rightIcon={<MdExpandMore />}
          colorScheme="gray"
          variant="outline"
          w="full"
          flexShrink={0}
          hidden={isLargeWidthDevice}
          mb="4"
        >
          {TABS[tabIndex].name}
        </MenuButton>
        <Portal>
          <MenuList w="100px">
            {TABS.map(({ name }, i) => (
              <MenuItem key={name} onClick={() => setTabIndex(i)}>
                {name}
              </MenuItem>
            ))}
          </MenuList>
        </Portal>
      </Menu>

      <Tabs
        orientation={isLargeWidthDevice ? 'vertical' : 'horizontal'}
        align="start"
        variant="line-i"
        display="flex"
        flex={1}
        index={tabIndex}
        onChange={handleTabChange}
      >
        <TabList hidden={!isLargeWidthDevice} minW="8em" width="8em" textAlign="right" justifyContent="center">
          {TABS.map(({ name }) => (
            <Tab key={name}>{name}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {TABS.map(({ name, Tab }) => (
            <Tab key={name} />
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
