import { Box, Center, Container } from '@chakra-ui/react';
import { SelectFile } from './SelectFile';

import { FileListing } from './features/file-listing/FileListing';
import { Footer } from './Footer';

function App() {
  return (
    <Box height="full" width="full" pt="4">
      <Container maxW="container.large">
        <Center>
          <SelectFile />
        </Center>
        <Box mt="8">
          <FileListing />
        </Box>
        <Footer />
      </Container>
    </Box>
  );
}

export default App;
