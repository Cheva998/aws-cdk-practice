// import { type CognitoUser } from '@aws-amplify/auth';
// import { Amplify, Auth } from 'aws-amplify';
// import { AuthStack } from '../../../outputs.json';
// import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
// import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

import { Amplify, CognitoUser, Auth, AuthStack } from './mocked_imports'
import { AWS_REGION } from '../dev_env.json'

Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: AWS_REGION,
        userPoolWebClientId: AuthStack.SpaceUserPoolClientId,
        identityPoolId: AuthStack.SpaceIdentityPoolId,
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
})

export class AuthService {

    private user: CognitoUser | undefined;
    public jwtToken: string | undefined;
    private temporaryCredentials: object | undefined;

    public isAuthorized() {};

    public async login(userName: string, password: string):Promise<Object | undefined> {
        try {
            this.user = await Auth.signIn(userName, password) as CognitoUser;
            this.jwtToken = this.user?.getSignInUserSession().getIdToken().getJwtToken();
            return this.user;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    public async getTemporaryCredentials(){
        if (this.temporaryCredentials) {
            return this.temporaryCredentials;
        }
        this.temporaryCredentials = await this.generateTemporaryCredentials();
        return this.temporaryCredentials;
    };

    private async generateTemporaryCredentials() {
        // const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazon.com/${AuthStack.SpaceUserPoolId}`;
        // const cognitoIdentity = new CognitoIdentityClient({
        //     credentials: fromCognitoIdentityPool({
        //         clientConfig: {
        //             region: awsRegion
        //         },
        //         identityPoolId: AuthStack.SpaceIdentityPoolId,
        //         logins: {
        //             [cognitoIdentityPool]: this.jwtToken!
        //         }
        //     })
        // });
        // const credentials = await cognitoIdentity.config.credentials();
        const credentials = {};
        return credentials;
    };

    public getUserName(){
        return this.user.getUsername();
    }
}