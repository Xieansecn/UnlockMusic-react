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
  Text,
  VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { qmc2AddKey, qmc2ClearKeys, qmc2DeleteKey, qmc2UpdateKey } from '../settingsSlice';
import { selectStagingQMCv2Settings } from '../settingsSelector';
import React, { useState } from 'react';
import { MdAdd, MdDelete, MdDeleteForever, MdExpandMore, MdFileUpload, MdVpnKey } from 'react-icons/md';
import { ImportFileModal } from './QMCv2/ImportFileModal';

export function PanelQMCv2Key() {
  const dispatch = useDispatch();
  const qmc2Keys = useSelector(selectStagingQMCv2Settings).keys;
  const [showImportModal, setShowImportModal] = useState(false);

  const addKey = () => dispatch(qmc2AddKey());
  const updateKey = (prop: 'name' | 'key', id: string, e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(qmc2UpdateKey({ id, field: prop, value: e.target.value }));
  const deleteKey = (id: string) => dispatch(qmc2DeleteKey({ id }));
  const clearAll = () => dispatch(qmc2ClearKeys());

  return (
    <Flex minH={0} flexDir="column" flex={1}>
      <Heading as="h2" size="lg">
        QMCv2 密钥
      </Heading>

      <Text>
        QQ 音乐目前采用的加密方案（QMCv2）。在使用「QQ 音乐」安卓、Mac 或 iOS
        客户端的情况下，其「离线加密文件」对应的「密钥」储存在独立的数据库文件内。
      </Text>

      <Box pb={2} pt={2}>
        <ButtonGroup isAttached colorScheme="purple" variant="outline">
          <Button onClick={addKey} leftIcon={<Icon as={MdAdd} />}>
            添加一条密钥
          </Button>
          <Menu>
            <MenuButton as={IconButton} icon={<MdExpandMore />}></MenuButton>
            <MenuList>
              <MenuItem onClick={() => setShowImportModal(true)} icon={<Icon as={MdFileUpload} boxSize={5} />}>
                从文件导入密钥
              </MenuItem>
              <MenuDivider />
              <MenuItem color="red" onClick={clearAll} icon={<Icon as={MdDeleteForever} boxSize={5} />}>
                清空密钥
              </MenuItem>
            </MenuList>
          </Menu>
        </ButtonGroup>
      </Box>

      <Box flex={1} minH={0} overflow="auto" pr="4">
        <List spacing={3}>
          {qmc2Keys.map(({ id, key, name }, i) => (
            <ListItem key={id} mt={0} pt={2} pb={2} _even={{ bg: 'gray.50' }}>
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

                <IconButton
                  aria-label="删除该密钥"
                  icon={<Icon as={MdDelete} boxSize={6} />}
                  variant="ghost"
                  colorScheme="red"
                  type="button"
                  onClick={() => deleteKey(id)}
                />
              </HStack>
            </ListItem>
          ))}
        </List>
        {qmc2Keys.length === 0 && <Text>还没有添加密钥。</Text>}
      </Box>

      <ImportFileModal show={showImportModal} onClose={() => setShowImportModal(false)} />
    </Flex>
  );
}
