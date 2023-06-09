import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  TabPanel,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectQM2CSettings } from '../settingsSlice';
import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { produce } from 'immer';
import { MdAdd, MdDeleteForever, MdExpandMore, MdFileUpload, MdVpnKey } from 'react-icons/md';

interface InternalQMCKeys {
  id: string;
  name: string;
  key: string;
}

export function PanelQMC() {
  const qmcSettings = useSelector(selectQM2CSettings);
  const [qmcKeys, setQMCKeys] = useState<InternalQMCKeys[]>([]);
  const resetQmcKeys = () => {
    const result: InternalQMCKeys[] = [];
    for (const [name, key] of Object.entries(qmcSettings.keys)) {
      result.push({ id: name, name, key });
    }
    setQMCKeys(result);
  };
  const addRow = () => {
    setQMCKeys((prev) => [...prev, { id: nanoid(), key: '', name: '' }]);
  };
  const updateKey = (prop: 'name' | 'key', id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setQMCKeys((prev) =>
      produce(prev, (draft) => {
        const item = draft.find((item) => item.id === id);
        if (item) {
          item[prop] = e.target.value;
        }
      })
    );
  };
  const applyChanges = () => {
    //
  };
  const clearAll = () => setQMCKeys([]);
  useEffect(resetQmcKeys, [qmcSettings.keys]);

  return (
    <Flex as={TabPanel} flexDir="column" h="100%">
      <Box flex={1} minH={0} overflow="auto">
        <Heading as="h2" size="lg">
          密钥
        </Heading>

        <Box p="4" pr="0" borderStart="2px solid" borderColor="gray.200">
          <List spacing={3}>
            {qmcKeys.map(({ id, key, name }, i) => (
              <ListItem key={id}>
                <HStack>
                  <Text w="2em" textAlign="center">
                    {i + 1}
                  </Text>

                  <VStack flex={1}>
                    <Input
                      variant="flushed"
                      placeholder="文件名"
                      value={name}
                      onChange={(e) => updateKey('name', id, e)}
                    />

                    <InputGroup size="xs">
                      <InputLeftElement pr="2">
                        <Icon as={MdVpnKey} />
                      </InputLeftElement>
                      <Input
                        variant="flushed"
                        placeholder="密钥"
                        value={key}
                        onChange={(e) => updateKey('key', id, e)}
                      />
                      <InputRightElement>
                        <Text pl="2" color={key.length ? 'green.500' : 'red.500'}>
                          <code>{key.length || '?'}</code>
                        </Text>
                      </InputRightElement>
                    </InputGroup>
                  </VStack>
                </HStack>
              </ListItem>
            ))}
          </List>
          {qmcKeys.length === 0 && <Text>还没有添加密钥。</Text>}
        </Box>
      </Box>

      <VStack mt="4" alignItems="flex-start">
        <Text>密钥填充完毕后，按下「应用」来使用新的设置。</Text>
        <Flex flexDir="row" gap="2" w="full">
          <Box>
            <ButtonGroup isAttached variant="outline">
              <Button onClick={addRow}>
                <Icon as={MdAdd} />
                添加密钥
              </Button>
              <Menu>
                <MenuButton as={IconButton} icon={<MdExpandMore />}>
                  <Icon as={MdExpandMore} />1
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => alert('TODO!')} icon={<Icon as={MdFileUpload} h={18} w={18} />}>
                    从文件导入 (JSON)
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem color="red" onClick={clearAll} icon={<Icon as={MdDeleteForever} h={18} w={18} />}>
                    清空
                  </MenuItem>
                </MenuList>
              </Menu>
            </ButtonGroup>
          </Box>
          <Spacer />
          <Box>
            <Button onClick={resetQmcKeys} colorScheme="red" variant="ghost">
              放弃
            </Button>
            <Button onClick={applyChanges}>应用</Button>
          </Box>
        </Flex>
      </VStack>
    </Flex>
  );
}
