import { useRef } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Collapse,
  GridItem,
  Image,
  Link,
  Text,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { FileRowResponsiveGrid } from './FileRowResponsiveGrid';
import { DecryptedAudioFile, deleteFile, ProcessState } from './fileListingSlice';
import { useAppDispatch } from '~/hooks';
import noCoverFallbackImageURL from '~/assets/no-cover.svg';

interface FileRowProps {
  id: string;
  file: DecryptedAudioFile;
}

export function FileRow({ id, file }: FileRowProps) {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const dispatch = useAppDispatch();
  const isDecrypted = file.state === ProcessState.COMPLETE;
  const metadata = file.metadata;

  const nameWithoutExt = file.fileName.replace(/\.[a-z\d]{3,6}$/, '');
  const decryptedName = nameWithoutExt + '.' + file.ext;

  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const togglePlay = () => {
    const player = audioPlayerRef.current;
    if (!player) {
      return;
    }

    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  };

  const handleDeleteRow = useCallback(() => {
    onClose();
    setTimeout(() => {
      dispatch(deleteFile({ id }));
    }, 500);
  }, [dispatch, id, onClose]);

  return (
    <Collapse in={isOpen} animateOpacity unmountOnExit startingHeight={0} style={{ width: '100%', padding: '0.25rem' }}>
      <Card w="full" data-testid="file-row">
        <CardBody>
          <FileRowResponsiveGrid>
            <GridItem area="cover">
              <Center w="160px" h="160px" m="auto">
                <Image
                  objectFit="cover"
                  src={metadata?.cover || noCoverFallbackImageURL}
                  alt={`${metadata?.album} 的专辑封面`}
                />
              </Center>
            </GridItem>
            <GridItem area="title">
              <Box w="full" as="h4" fontWeight="semibold" mt="1" textAlign={{ base: 'center', md: 'left' }}>
                <span data-testid="audio-meta-song-name">{metadata?.name ?? nameWithoutExt}</span>
              </Box>
            </GridItem>
            <GridItem area="meta">
              {isDecrypted && metadata && (
                <Box>
                  <Text>
                    专辑: <span data-testid="audio-meta-album-name">{metadata.album}</span>
                  </Text>
                  <Text>
                    艺术家: <span data-testid="audio-meta-song-artist">{metadata.artist}</span>
                  </Text>
                  <Text>
                    专辑艺术家: <span data-testid="audio-meta-album-artist">{metadata.albumArtist}</span>
                  </Text>
                </Box>
              )}
            </GridItem>
            <GridItem area="action" alignSelf="center">
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
          </FileRowResponsiveGrid>
        </CardBody>
      </Card>
    </Collapse>
  );
}
