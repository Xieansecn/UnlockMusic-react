import { Box, Flex, Heading, Input, Table, Tbody, Td, Text, Th, Tr } from '@chakra-ui/react';

import { qtfmAndroidUpdateKey } from '../settingsSlice';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { selectStagingQtfmAndroidDevice } from '../settingsSelector';
import type { QingTingDeviceInfo } from '@jixun/libparakeet';

const QTFM_ANDROID_DEVICE_PROPS = ['product', 'device', 'manufacturer', 'brand', 'board', 'model'] as const;

export function PanelQingTing() {
  const dispatch = useAppDispatch();
  const qingTingAndroidDeviceInfo = useAppSelector(selectStagingQtfmAndroidDevice);
  const handleChangeDeviceInfo = (name: keyof QingTingDeviceInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(qtfmAndroidUpdateKey({ field: name, value: e.target.value }));
  };

  return (
    <Flex minH={0} flexDir="column" flex={1}>
      <Heading as="h2" size="lg">
        「蜻蜓 FM」设备信息
      </Heading>

      <Text>「蜻蜓 FM」安卓版本需要获取设备信息用于生成解密密钥。</Text>

      <Box flex={1} minH={0} overflow="auto" pr="4">
        <Table>
          <Tbody>
            {QTFM_ANDROID_DEVICE_PROPS.map((name) => (
              <Tr key={name}>
                <Th w="1px" p={1} textAlign="right">
                  {name}
                </Th>
                <Td pl={1} pr={1}>
                  <Input value={qingTingAndroidDeviceInfo[name]} onChange={handleChangeDeviceInfo(name)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
}
