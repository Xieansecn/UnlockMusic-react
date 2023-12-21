import {
  Box,
  Button,
  Code,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Input,
  Text,
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchParakeet } from '@jixun/libparakeet';
import { MdLock } from 'react-icons/md';
import { ExtLink } from '~/components/ExtLink';
import { ChangeEvent, ClipboardEvent } from 'react';
import { VQuote } from '~/components/HelpText/VQuote';
import { selectStagingQtfmAndroidKey } from '../settingsSelector';
import { qtfmAndroidUpdateKey } from '../settingsSlice';

const QTFM_DEVICE_ID_URL = 'https://github.com/parakeet-rs/qtfm-device-id/releases/latest';

export function PanelQingTing() {
  const dispatch = useAppDispatch();
  const secretKey = useAppSelector(selectStagingQtfmAndroidKey);
  const setSecretKey = (secretKey: string) => {
    dispatch(qtfmAndroidUpdateKey({ deviceKey: secretKey }));
  };

  const handleDataPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const plainText = e.clipboardData.getData('text/plain');
    const matchDeviceSecret = plainText.match(/^DEVICE_SECRET: ([0-9a-fA-F]+)/m);
    if (matchDeviceSecret) {
      e.preventDefault();
      setSecretKey(matchDeviceSecret[1]);
      return;
    }

    const dataMap = new Map();
    for (const [_unused, key, value] of plainText.matchAll(
      /^(PRODUCT|DEVICE|MANUFACTURER|BRAND|BOARD|MODEL): (.+)/gim,
    )) {
      dataMap.set(key.toLowerCase(), value);
    }

    const product = dataMap.get('product') ?? null;
    const device = dataMap.get('device') ?? null;
    const manufacturer = dataMap.get('manufacturer') ?? null;
    const brand = dataMap.get('brand') ?? null;
    const board = dataMap.get('board') ?? null;
    const model = dataMap.get('model') ?? null;
    if (
      product !== null &&
      device !== null &&
      manufacturer !== null &&
      brand !== null &&
      board !== null &&
      model !== null
    ) {
      e.preventDefault();
      fetchParakeet().then((parakeet) => {
        setSecretKey(parakeet.qtfm.createDeviceKey(product, device, manufacturer, brand, board, model));
      });
    }
  };

  const handleDataInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSecretKey(e.target.value);
  };

  return (
    <Flex minH={0} flexDir="column" flex={1}>
      <Heading as="h2" size="lg">
        <VQuote>蜻蜓 FM</VQuote>
        设备密钥
      </Heading>

      <Text>
        <VQuote>蜻蜓 FM</VQuote>安卓版本需要获取设备密钥，并以此来生成解密密钥。
      </Text>
      <Box display="none">
        {/* TODO: 解密弹窗、带步骤说明 */}
        <Box p={2} pt={4} pb={4}>
          <Button onClick={() => {}} leftIcon={<Icon as={MdLock} boxSize={5} />} variant="outline">
            获取解密密钥
          </Button>
        </Box>
      </Box>

      <Box mt={3} mb={3}>
        <FormControl>
          <FormLabel>设备密钥</FormLabel>
          <Input type="text" onPaste={handleDataPaste} value={secretKey} onChange={handleDataInput} />
          <FormHelperText>
            {'粘贴含有密钥的信息时将自动提取密钥（如通过 '}
            <ExtLink href={QTFM_DEVICE_ID_URL}>
              <Code>qtfm-device-id</Code>
            </ExtLink>
            {' 获取的内容）。'}
          </FormHelperText>
        </FormControl>
      </Box>

      {/* TODO: 填入内部储存开始的完整路径 */}
      <Text>
        注：<VQuote>蜻蜓 FM</VQuote>下载的文件储存在 <Code>QTDownloadRadio</Code> 目录下，并使用
        <VQuote>
          <Code>.</Code>
        </VQuote>
        开始的文件名。
      </Text>
      <Text>因为解密密钥与文件名相关，因此解密前请不要更改文件名。</Text>
    </Flex>
  );
}
