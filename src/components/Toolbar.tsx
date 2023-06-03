import { Button, HStack, Icon, useDisclosure } from '@chakra-ui/react';
import { MdSettings } from 'react-icons/md';
import { SettingsModal } from '~/modals/SettingsModal';

export function Toolbar() {
  const {
    isOpen: isSettingsModalOpen,
    onClose: onSettingsModalClose,
    getButtonProps: getSettingsButtonProps,
  } = useDisclosure();

  return (
    <>
      <HStack alignItems="center" justifyContent="center" p="4">
        <Button {...getSettingsButtonProps()}>
          <Icon as={MdSettings} mr="1" />
          设置
        </Button>
      </HStack>
      <SettingsModal isOpen={isSettingsModalOpen} onClose={onSettingsModalClose} />
    </>
  );
}
