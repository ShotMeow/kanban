import React from 'react';
import { ProviderId } from 'firebase/auth';

import { GithubIcon, GoogleIcon } from '@/shared/ui';

export const getOAuthProviderIcon = (provider: string): React.ReactNode => {
  switch (provider) {
    case ProviderId.GOOGLE:
      return <GoogleIcon />;
    case ProviderId.GITHUB:
      return <GithubIcon />;
  }
};
