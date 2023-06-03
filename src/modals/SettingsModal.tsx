import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

export interface SettingsModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} closeOnOverlayClick={false} scrollBehavior="inside" size="full" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>应用设置</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Hallo</p>
          <p>Thank you, thank you very much.</p>
          <p>Ha-Halo, thank you</p>
          <p>Thank you very much!</p>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button onClick={onClose} variant="ghost" colorScheme="red">
              放弃
            </Button>
            <Button onClick={onClose}>应用</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
