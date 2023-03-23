import React from 'react';
import { ProviderId } from 'firebase/auth';

import { FacebookIcon, GithubIcon, GoogleIcon, TwitterIcon } from '@/shared/ui';

export const getOAuthProviderIcon = (provider: string): React.ReactNode => {
  switch (provider) {
    case ProviderId.GOOGLE:
      return <GoogleIcon />;
    case ProviderId.GITHUB:
      return <GithubIcon />;
    case ProviderId.TWITTER:
      return <TwitterIcon />;
    case ProviderId.FACEBOOK:
      return <FacebookIcon />;
  }
};
