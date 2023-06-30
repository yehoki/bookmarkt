'use client';

import useRegisterMode from '@/hooks/useRegisterMode';
import { useEffect } from 'react';

interface ConditionalNavProps {
  navOn?: boolean;
}

const ConditionalNav: React.FC<ConditionalNavProps> = ({ navOn = true }) => {
  const registerModeStore = useRegisterMode();
  useEffect(() => {
    navOn ? registerModeStore.onOpen() : registerModeStore.onClose();
  }, []);
  return <></>;
};

export default ConditionalNav;
