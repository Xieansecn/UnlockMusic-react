import { useEffect } from 'react';
import { Avatar, Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, Wrap, WrapItem } from '@chakra-ui/react';

import { addNewFile, selectFiles } from './fileListingSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

export function FileListing() {
  const dispatch = useAppDispatch();
  const files = useAppSelector(selectFiles);

  useEffect(() => {
    // FIXME: Remove test data
    if (files.length === 0) {
      dispatch(addNewFile({ id: String(Date.now()), fileName: '测试文件名.mgg', blobURI: '' }));
    }
  }, []);

  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th w="1%">封面</Th>
            <Th>元信息</Th>
            <Th>操作</Th>
          </Tr>
        </Thead>
        <Tbody>
          {files.map((file) => (
            <Tr key={file.id}>
              <Td>
                {file.metadata.cover && <Avatar size="sm" name="专辑封面" src={file.metadata.cover} />}
                {!file.metadata.cover && <Text>暂无封面</Text>}
              </Td>
              <Td>
                <Box as="h4" fontWeight="semibold" mt="1">
                  {file.metadata.name || file.fileName}
                </Box>
                <Text>专辑: {file.metadata.album}</Text>
                <Text>艺术家: {file.metadata.artist}</Text>
                <Text>专辑艺术家: {file.metadata.albumArtist}</Text>
              </Td>
              <Td>
                <Wrap>
                  <WrapItem>播放</WrapItem>
                  <WrapItem>下载</WrapItem>
                  <WrapItem>删除</WrapItem>
                </Wrap>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
