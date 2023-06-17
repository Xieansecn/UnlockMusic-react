import {
  Box,
  Button,
  ButtonGroup,
  Code,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  List,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { kwm2AddKey, kwm2ClearKeys } from '../settingsSlice';
import { selectStagingKWMv2Keys } from '../settingsSelector';
import { useState } from 'react';
import { MdAdd, MdDeleteForever, MdExpandMore, MdFileUpload } from 'react-icons/md';
import { KWMv2EKeyItem } from './KWMv2/KWMv2EKeyItem';
import { ImportSecretModal } from '~/components/ImportSecretModal';

export function PanelKWMv2Key() {
  const toast = useToast();
  const dispatch = useDispatch();
  const kwm2Keys = useSelector(selectStagingKWMv2Keys);
  const [showImportModal, setShowImportModal] = useState(false);

  const addKey = () => dispatch(kwm2AddKey());
  const clearAll = () => dispatch(kwm2ClearKeys());
  const handleSecretImport = () => {
    toast({
      title: '尚未实现',
      isClosable: true,
      status: 'error',
    });
  };

  return (
    <Flex minH={0} flexDir="column" flex={1}>
      <Heading as="h2" size="lg">
        酷我解密密钥（KwmV2）
      </Heading>

      <Text>
        酷我安卓版本的「臻品音质」已经换用 V2 版，后缀名为 <Code>mflac</Code> 或沿用旧的 <Code>kwm</Code>。{''}
        该格式需要提取密钥后才能正常解密。
      </Text>

      <HStack pb={2} pt={2}>
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
      </HStack>

      <Box flex={1} minH={0} overflow="auto" pr="4">
        <List spacing={3}>
          {kwm2Keys.map(({ id, ekey, quality, rid }, i) => (
            <KWMv2EKeyItem key={id} id={id} ekey={ekey} quality={quality} rid={rid} i={i} />
          ))}
        </List>
        {kwm2Keys.length === 0 && <Text>还没有添加密钥。</Text>}
      </Box>

      <ImportSecretModal
        clientName="QQ 音乐"
        show={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleSecretImport}
      >
        尚未实现
      </ImportSecretModal>
    </Flex>
  );
}
