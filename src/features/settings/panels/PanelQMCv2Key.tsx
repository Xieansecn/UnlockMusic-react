import {
  Box,
  Button,
  ButtonGroup,
  Center,
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
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectQM2CSettings, updateQMC2Keys } from '../settingsSlice';
import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { produce } from 'immer';
import { MdAdd, MdAndroid, MdDeleteForever, MdExpandMore, MdFileUpload, MdVpnKey } from 'react-icons/md';
import { objectify } from 'radash';

interface InternalQMCKeys {
  id: string;
  name: string;
  key: string;
}

export function PanelQMCv2Key() {
  const toast = useToast();
  const dispatch = useDispatch();
  const qmcSettings = useSelector(selectQM2CSettings);
  const [isModified, setIsModified] = useState(false);
  const [qmcKeys, setQMCKeys] = useState<InternalQMCKeys[]>([]);
  const resetQmcKeys = () => {
    const result: InternalQMCKeys[] = [];
    for (const [name, key] of Object.entries(qmcSettings.keys)) {
      result.push({ id: name, name, key });
    }
    setQMCKeys(result);
  };
  const addRow = () => {
    setIsModified(true);
    setQMCKeys((prev) => [...prev, { id: nanoid(), key: '', name: '' }]);
  };
  const updateKey = (prop: 'name' | 'key', id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setIsModified(true);
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
    dispatch(
      updateQMC2Keys(
        objectify(
          qmcKeys,
          (item) => item.name,
          (item) => item.key
        )
      )
    );

    toast({
      title: 'QMCv2 密钥的更改已保存。',
      status: 'success',
      isClosable: true,
      duration: 2500,
    });
  };
  const clearAll = () => setQMCKeys([]);
  useEffect(resetQmcKeys, [qmcSettings.keys]);

  return (
    <Flex as={TabPanel} flexDir="column" h="100%">
      <Heading as="h2" size="lg">
        密钥
      </Heading>

      <Box pb="2">
        <ButtonGroup isAttached variant="outline">
          <Button onClick={addRow} leftIcon={<Icon as={MdAdd} />}>
            添加
          </Button>
          <Menu>
            <MenuButton as={IconButton} icon={<MdExpandMore />}></MenuButton>
            <MenuList>
              <MenuItem onClick={() => alert('TODO!')} icon={<Icon as={MdFileUpload} boxSize={5} />}>
                从文件导入（JSON）
              </MenuItem>
              {/* 需要加入 SQL.js 再处理 */}
              <MenuItem hidden onClick={() => alert('TODO!')} icon={<Icon as={MdAndroid} boxSize={5} />}>
                从文件导入（安卓数据库）
              </MenuItem>
              <MenuDivider />
              <MenuItem color="red" onClick={clearAll} icon={<Icon as={MdDeleteForever} boxSize={5} />}>
                清空
              </MenuItem>
            </MenuList>
          </Menu>
        </ButtonGroup>
      </Box>

      <Box flex={1} minH={0} overflow="auto" pr="4">
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
                    <Input variant="flushed" placeholder="密钥" value={key} onChange={(e) => updateKey('key', id, e)} />
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

      <VStack mt="4" alignItems="flex-start" w="full">
        <Flex flexDir="row" gap="2" w="full">
          <Center>
            <Text as={Box} color="gray">
              重复项只保留最后一项。
            </Text>
          </Center>
          <Spacer />
          <HStack gap="2" justifyContent="flex-end">
            <Button
              disabled={!isModified}
              onClick={resetQmcKeys}
              colorScheme="red"
              variant="ghost"
              title="重置为更改前的状态"
            >
              重置
            </Button>
            <Button disabled={!isModified} onClick={applyChanges}>
              应用
            </Button>
          </HStack>
        </Flex>
      </VStack>
    </Flex>
  );
}
