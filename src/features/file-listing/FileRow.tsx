import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Grid,
  GridItem,
  Link,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { DecryptedAudioFile, ProcessState } from './fileListingSlice';
import { useRef } from 'react';

interface FileRowProps {
  id: string;
  file: DecryptedAudioFile;
}

export function FileRow({ id, file }: FileRowProps) {
  const isDecrypted = file.state === ProcessState.COMPLETE;

  const decryptedName = file.fileName.replace(/\.[a-z\d]{3,6}$/, '') + '.' + file.ext;

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

  return (
    <Card w="full">
      <CardBody>
        <Grid
          templateAreas={`
          "cover title title"
          "cover meta  action"
        `}
          gridTemplateRows={'min-content 1fr'}
          gridTemplateColumns={'160px 1fr'}
          gap="1"
        >
          <GridItem area="cover">
            <Center w="160px" h="160px">
              {file.metadata.cover && <Avatar size="sm" name="专辑封面" src={file.metadata.cover} />}
              {!file.metadata.cover && <Text>暂无封面</Text>}
            </Center>
          </GridItem>
          <GridItem area="title">
            <Box w="full" as="h4" fontWeight="semibold" mt="1">
              {file.metadata.name || file.fileName}
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
                  <Button type="button" onClick={() => alert('todo')}>
                    删除
                  </Button>
                </WrapItem>
              </Wrap>
            </VStack>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
}
