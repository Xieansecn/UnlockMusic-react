import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Collapse,
  Grid,
  GridItem,
  Image,
  Link,
  Text,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { DecryptedAudioFile, deleteFile, ProcessState } from './fileListingSlice';
import { useCallback, useRef } from 'react';
import { useAppDispatch } from '~/hooks';

interface FileRowProps {
  id: string;
  file: DecryptedAudioFile;
}

export function FileRow({ id, file }: FileRowProps) {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const dispatch = useAppDispatch();
  const isDecrypted = file.state === ProcessState.COMPLETE;

  const nameWithoutExt = file.fileName.replace(/\.[a-z\d]{3,6}$/, '');
  const decryptedName = nameWithoutExt + '.' + file.ext;

  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const togglePlay = useCallback(() => {
    const player = audioPlayerRef.current;
    if (!player) {
      return;
    }

    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  }, []);

  const handleDeleteRow = useCallback(() => {
    onClose();
    setTimeout(() => {
      dispatch(deleteFile({ id }));
    }, 500);
  }, [dispatch, id, onClose]);

  return (
    <Collapse in={isOpen} animateOpacity unmountOnExit startingHeight={0} style={{ width: '100%' }}>
      <Card w="full">
        <CardBody>
          <Grid
            templateAreas={{
              base: `
              "cover"
              "title"
              "meta"
              "action"
            `,
              md: `
              "cover title title"
              "cover meta  action"
            `,
            }}
            gridTemplateRows={{
              base: 'repeat(auto-fill)',
              md: 'min-content 1fr',
            }}
            gridTemplateColumns={{
              base: '1fr',
              md: '160px 1fr',
            }}
            gap="1"
          >
            <GridItem area="cover">
              <Center w="160px" h="160px" m="auto">
                <Image
                  boxSize='160px'
                  objectFit='cover'
                  src={file.metadata.cover}
                  alt={file.metadata.album}
                  fallbackSrc='https://via.placeholder.com/160'
                />
              </Center>
            </GridItem>
            <GridItem area="title">
              <Box w="full" as="h4" fontWeight="semibold" mt="1" textAlign={{ base: 'center', md: 'left' }}>
                {file.metadata.name || nameWithoutExt}
              </Box>
            </GridItem>
            <GridItem area="meta">
              {isDecrypted && (
                <Box>
                  <Text>专辑: {file.metadata.album}</Text>
                  <Text>艺术家: {file.metadata.artist}</Text>
                  <Text>专辑艺术家: {file.metadata.albumArtist}</Text>
                </Box>
              )}
            </GridItem>
            <GridItem area="action">
              <VStack>
                {file.decrypted && <audio controls autoPlay={false} src={file.decrypted} ref={audioPlayerRef} />}

                <Wrap>
                  {isDecrypted && (
                    <WrapItem>
                      <Button type="button" onClick={togglePlay}>
                        播放/暂停
                      </Button>
                    </WrapItem>
                  )}
                  <WrapItem>
                    {file.decrypted && (
                      <Link isExternal href={file.decrypted} download={decryptedName}>
                        <Button as="span">下载</Button>
                      </Link>
                    )}
                  </WrapItem>
                  <WrapItem>
                    <Button type="button" onClick={handleDeleteRow}>
                      删除
                    </Button>
                  </WrapItem>
                </Wrap>
              </VStack>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    </Collapse>
  );
}
