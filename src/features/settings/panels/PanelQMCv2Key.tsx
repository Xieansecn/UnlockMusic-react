import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
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
  Tooltip,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { qmc2AddKey, qmc2AllowFuzzyNameSearch, qmc2ClearKeys } from '../settingsSlice';
import { selectStagingQMCv2Settings } from '../settingsSelector';
import React, { useState } from 'react';
import { MdAdd, MdDeleteForever, MdExpandMore, MdFileUpload } from 'react-icons/md';
import { ImportFileModal } from './QMCv2/ImportFileModal';
import { KeyInput } from './QMCv2/KeyInput';
import { InfoOutlineIcon } from '@chakra-ui/icons';

export function PanelQMCv2Key() {
  const dispatch = useDispatch();
  const { keys: qmc2Keys, allowFuzzyNameSearch } = useSelector(selectStagingQMCv2Settings);
  const [showImportModal, setShowImportModal] = useState(false);

  const addKey = () => dispatch(qmc2AddKey());
  const clearAll = () => dispatch(qmc2ClearKeys());

  const handleAllowFuzzyNameSearchCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(qmc2AllowFuzzyNameSearch({ enable: e.target.checked }));
  };

  return (
    <Flex minH={0} flexDir="column" flex={1}>
      <Heading as="h2" size="lg">
        QMCv2 密钥
      </Heading>

      <Text>
        QQ 音乐目前采用的加密方案（QMCv2）。在使用「QQ 音乐」安卓、Mac 或 iOS
        客户端的情况下，其「离线加密文件」对应的「密钥」储存在独立的数据库文件内。
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

        <HStack>
          <Checkbox isChecked={allowFuzzyNameSearch} onChange={handleAllowFuzzyNameSearchCheckbox}>
            <Text>匹配相似文件名</Text>
          </Checkbox>
          <Tooltip
            hasArrow
            closeOnClick={false}
            label={
              <Box>
                <Text>若文件名匹配失败，则使用相似文件名的密钥。</Text>
                <Text>
                  使用「
                  <ruby>
                    莱文斯坦距离
                    <rp> (</rp>
                    <rt>Levenshtein distance</rt>
                    <rp>)</rp>
                  </ruby>
                  」算法计算相似程度。
                </Text>
                <Text>若密钥数量过多，匹配时可能会造成浏览器卡顿或无响应一段时间。</Text>
              </Box>
            }
          >
            <InfoOutlineIcon />
          </Tooltip>
        </HStack>
      </HStack>

      <Box flex={1} minH={0} overflow="auto" pr="4">
        <List spacing={3}>
          {qmc2Keys.map(({ id, key, name }, i) => (
            <KeyInput key={id} id={id} ekey={key} name={name} i={i} />
          ))}
        </List>
        {qmc2Keys.length === 0 && <Text>还没有添加密钥。</Text>}
      </Box>

      <ImportFileModal show={showImportModal} onClose={() => setShowImportModal(false)} />
    </Flex>
  );
}
