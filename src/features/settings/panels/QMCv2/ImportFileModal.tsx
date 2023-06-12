import {
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from '@chakra-ui/react';

import { FileInput } from '~/components/FileInput';
import { qmc2ImportKeys } from '../../settingsSlice';
import { useAppDispatch } from '~/hooks';
import { DatabaseKeyExtractor } from '~/util/DatabaseKeyExtractor';

import { InstructionsAndroid } from './InstructionsAndroid';
import { MMKVParser } from '~/util/MMKVParser';
import { getFileName } from '~/util/pathHelper';
import { InstructionsMac } from './InstructionsMac';

export interface ImportFileModalProps {
  show: boolean;
  onClose: () => void;
}

interface KeyEntry {
  name: string;
  key: string;
}

export function ImportFileModal({ onClose, show }: ImportFileModalProps) {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const handleFileReceived = async (files: File[]) => {
    try {
      const file = files[0];
      const fileBuffer = await file.arrayBuffer();

      let qmc2Keys: null | KeyEntry[] = null;

      if (/[_.]db$/i.test(file.name)) {
        const extractor = await DatabaseKeyExtractor.getInstance();
        qmc2Keys = extractor.extractQmAndroidDbKeys(fileBuffer);
        if (!qmc2Keys) {
          alert(`不是支持的 SQLite 数据库文件。\n表名：${qmc2Keys}`);
          return;
        }
      } else if (/MMKVStreamEncryptId/i.test(file.name)) {
        const fileBuffer = await file.arrayBuffer();
        const map = MMKVParser.toStringMap(new DataView(fileBuffer));
        qmc2Keys = Array.from(map.entries(), ([name, key]) => ({ name: getFileName(name), key }));
      }

      if (qmc2Keys) {
        dispatch(qmc2ImportKeys(qmc2Keys));
        onClose();
        toast({
          title: `导入成功 (${qmc2Keys.length})`,
          description: '记得保存更改来应用。',
          isClosable: true,
          duration: 5000,
          status: 'success',
        });
      } else {
        alert(`不支持的文件：${file.name}`);
      }
    } catch (e) {
      console.error('error during import: ', e);
      alert(`导入数据库时发生错误：${e}`);
    }
  };

  return (
    <Modal isOpen={show} onClose={onClose} closeOnOverlayClick={false} scrollBehavior="inside" size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>导入密钥数据库</ModalHeader>
        <ModalCloseButton />
        <Flex as={ModalBody} gap={2} flexDir="column" flex={1}>
          <Center>
            <FileInput onReceiveFiles={handleFileReceived}>拖放或点我选择含有密钥的数据库文件</FileInput>
          </Center>

          <Flex as={Tabs} variant="enclosed" flexDir="column" mt={4} flex={1} minH={0}>
            <TabList>
              <Tab>安卓客户端</Tab>
              <Tab>Mac 客户端</Tab>
            </TabList>
            <TabPanels flex={1} overflow="auto">
              <TabPanel>
                <InstructionsAndroid />
              </TabPanel>
              <TabPanel>
                <InstructionsMac />
              </TabPanel>
            </TabPanels>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
}
