
class Session {
    public getIdToken():Session {
        return new Session();
    } 
    public getJwtToken(): string {
        return 'jwtToken-....';
    }
}

export class CognitoUser {
    public getSignInUserSession() {
        return new Session();
    };
    public getUsername() {
        return 'cheva';
    };
};


export class Amplify {
    public static configure(args: object) {
        return args;
    }
};


export class Auth {
    public static signIn(...args: any[]): CognitoUser {
        return new CognitoUser();
    }
};

export class AuthStack {
    public SpaceUserPoolClientId: string = 'user-pool-id';
    public SpaceIdentityPoolId: string = 'identity-pool-id';
};

