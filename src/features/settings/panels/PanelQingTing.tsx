import {
  Box,
  Code,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchParakeet } from '@jixun/libparakeet';
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
        <VQuote>蜻蜓 FM</VQuote>的安卓版本需要获取设备密钥，并以此来生成解密密钥。
      </Text>
      <Box mt={3} mb={3}>
        <FormControl>
          <FormLabel>设备密钥</FormLabel>
          <Input type="text" onPaste={handleDataPaste} value={secretKey} onChange={handleDataInput} />
          <FormHelperText>
            {'粘贴含有设备密钥的信息的内容时将自动提取密钥（如通过 '}
            <ExtLink href={QTFM_DEVICE_ID_URL}>
              <Code>qtfm-device-id</Code>
            </ExtLink>
            {' 获取的设备信息）。'}
          </FormHelperText>
        </FormControl>
      </Box>

      <Heading as="h3" size="md" pt={3} pb={2}>
        注意事项
      </Heading>
      <UnorderedList>
        <ListItem>
          <Text>
            下载的文件位于
            <Code>[内部储存]/Android/data/fm.qingting.qtradio/files/Music/</Code>
          </Text>

          <UnorderedList>
            <ListItem>
              <Text>
                你可能需要使用有
                <ruby>
                  特权
                  <rp> (</rp>
                  <rt>root</rt>
                  <rp>)</rp>
                </ruby>
                的文件浏览器访问。
              </Text>
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          <Text>
            音频文件文件名为「<Code>.p~!</Code>」前缀。
          </Text>
        </ListItem>
        <ListItem>
          <Text>因为解密密钥与文件名相关，因此解密前请不要更改文件名。</Text>
        </ListItem>
      </UnorderedList>
    </Flex>
  );
}
