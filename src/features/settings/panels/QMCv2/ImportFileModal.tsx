import {
  Button,
  Center,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { FileInput } from '~/components/FileInput';
import mdHelpAndroid from './DocAndroid.md?raw';
import { MarkdownContent } from '~/components/MarkdownContent';
import { qmc2ImportKeys } from '../../settingsSlice';
import { useAppDispatch } from '~/hooks';
import { DatabaseKeyExtractor } from '~/util/DatabaseKeyExtractor';

export interface ImportFileModalProps {
  show: boolean;
  onClose: () => void;
}

export function ImportFileModal({ onClose, show }: ImportFileModalProps) {
  const dispatch = useAppDispatch();
  const handleFileReceived = async (files: File[]) => {
    try {
      const file = files[0];
      const fileBuffer = await file.arrayBuffer();

      if (/[_.]db$/i.test(file.name)) {
        const extractor = await DatabaseKeyExtractor.getInstance();
        const qmc2Keys = extractor.extractQmAndroidDbKeys(fileBuffer);
        if (qmc2Keys) {
          dispatch(qmc2ImportKeys(qmc2Keys));
          onClose();
          return;
        }
        alert(`不是支持的 SQLite 数据库文件。\n表名：${qmc2Keys}`);
      } else {
        alert(`不支持的文件：${file.name}`);
      }
    } catch (e) {
      console.error('error during import: ', e);
      alert(`导入数据库时发生错误：${e}`);
    }
  };

  return (
    <Modal isOpen={show} onClose={onClose} scrollBehavior="inside" size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>导入数据库</ModalHeader>
        <ModalCloseButton />
        <Flex as={ModalBody} gap={2} flexDir="column">
          <Center>
            <FileInput onReceiveFiles={handleFileReceived}>拖放或点我选择含有密钥的数据库文件</FileInput>
          </Center>

          <Heading as="h2" size="md" mt="4">
            使用说明
          </Heading>

          <Tabs variant="enclosed">
            <TabList>
              <Tab>安卓</Tab>
              {/* <Tab>Two</Tab> */}
            </TabList>
            <TabPanels>
              <TabPanel>
                <MarkdownContent>{mdHelpAndroid}</MarkdownContent>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            关闭
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
