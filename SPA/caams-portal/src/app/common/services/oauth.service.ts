import { Injectable } from '@angular/core';

import { OAuth2AuthCodePKCE } from '../custom-lib/oauth2-auth-code-PKCE';
import { authorizationServerUrl } from '../constants/server-settings';

@Injectable()
export class OAuth2Service {

    oAuth2: OAuth2AuthCodePKCE = new OAuth2AuthCodePKCE({
        authorizationUrl: `${authorizationServerUrl}/oauth/authorize`,
        tokenUrl: `${authorizationServerUrl}/oauth/token`,
        clientId: 'web',
        scopes: ['read'],
        redirectUrl: `${window.location.origin}/login/`,
        onAccessTokenExpiry(refreshAccessToken) {

            return refreshAccessToken();
        },
        onInvalidGrant(refreshAuthCodeOrRefreshToken) {

            // return refreshAuthCodeOrRefreshToken();
        }
    });

}
