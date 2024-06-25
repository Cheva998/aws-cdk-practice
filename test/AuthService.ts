import { type CognitoUser } from '@aws-amplify/auth';
import { Amplify, Auth } from 'aws-amplify'
import { CONSTANTS } from '../dev_env'

const awsRegion = CONSTANTS.AWS_REGION;

Amplify.configure({
    Auth: {
        region: awsRegion,
        userPoolId: 'change-me',
        userPoolWebClientId: 'change-me',
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
})

export class AuthService{

    public async login(userName: string, password: string){
        const result = await Auth.signIn(userName, password) as CognitoUser;
        return result;
    }
}