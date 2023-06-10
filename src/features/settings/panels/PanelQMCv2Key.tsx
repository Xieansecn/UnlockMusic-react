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
import React from 'react';
import { MdAdd, MdDelete, MdDeleteForever, MdExpandMore, MdFileUpload, MdVpnKey } from 'react-icons/md';

export function PanelQMCv2Key() {
  const dispatch = useDispatch();
  const qmc2Keys = useSelector(selectStagingQMCv2Settings).keys;

  const addKey = () => dispatch(qmc2AddKey());
  const updateKey = (prop: 'name' | 'key', id: string, e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(qmc2UpdateKey({ id, field: prop, value: e.target.value }));
  const deleteKey = (id: string) => dispatch(qmc2DeleteKey({ id }));
  const clearAll = () => dispatch(qmc2ClearKeys());

  return (
    <Flex minH={0} flexDir="column" flex={1}>
      <Heading as="h2" size="lg">
        密钥
      </Heading>

      <Box pb={2} pt={2}>
        <ButtonGroup isAttached variant="outline">
          <Button onClick={addKey} leftIcon={<Icon as={MdAdd} />}>
            添加
          </Button>
          <Menu>
            <MenuButton as={IconButton} icon={<MdExpandMore />}></MenuButton>
            <MenuList>
              {/* 目前的想法是弹出一个 modal，给用户一些信息（如期待的格式、如何导出或寻找对应的文件） */}
              {/* 但是这样的话就不太方便放在这个分支里面做了，下次一定。 */}
              <MenuItem hidden onClick={() => alert('TODO!')} icon={<Icon as={MdFileUpload} boxSize={5} />}>
                从文件导入
              </MenuItem>
              <MenuDivider hidden />
              <MenuItem color="red" onClick={clearAll} icon={<Icon as={MdDeleteForever} boxSize={5} />}>
                清空
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
    </Flex>
  );
}
