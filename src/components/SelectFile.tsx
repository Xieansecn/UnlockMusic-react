import { useDropzone } from 'react-dropzone';
import { chakra, Box, Text } from '@chakra-ui/react';
import { UnlockIcon } from '@chakra-ui/icons';

import { useAppDispatch } from '~/hooks';
import { addNewFile, processFile } from '~/features/file-listing/fileListingSlice';
import { nanoid } from 'nanoid';

export function SelectFile() {
  const dispatch = useAppDispatch();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    onDropAccepted(files, _event) {
      console.debug(
        'react-dropzone/onDropAccepted(%o, %o)',
        files.length,
        files.map((x) => x.name)
      );

      for (const file of files) {
        const blobURI = URL.createObjectURL(file);
        const fileName = file.name;
        const fileId = 'file://' + nanoid();

        // FIXME: this should be a single action/thunk that first adds the item, then updates it.
        dispatch(
          addNewFile({
            id: fileId,
            blobURI,
            fileName,
          })
        );
        dispatch(processFile({ fileId }));
      }
    },
  });

  return (
    <Box
      {...getRootProps()}
      w="100%"
      maxW={480}
      borderWidth="1px"
      borderRadius="lg"
      transitionDuration="0.5s"
      p="6"
      cursor="pointer"
      display="flex"
      flexDir="column"
      alignItems="center"
      _hover={{
        borderColor: 'gray.400',
        bg: 'gray.50',
      }}
      {...(isDragActive && {
        bg: 'blue.50',
        borderColor: 'blue.700',
      })}
    >
      <input {...getInputProps()} />

      <Box pb={3}>
        <UnlockIcon boxSize={8} />
      </Box>
      <Text textAlign="center">
        拖放或
        <chakra.span as="span" color="teal.400">
          点我选择
        </chakra.span>
        需要解密的文件
        <Text fontSize="sm" opacity="50%">
          在浏览器内对文件进行解锁，零上传
        </Text>
      </Text>
    </Box>
  );
}
