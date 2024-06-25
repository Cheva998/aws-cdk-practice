import { AuthService } from "./AuthService";

async function testAuth() {
    const service = new AuthService();
    const loginResult = await service.login(
        'change-me',
        'change-me'
    );
    console.log(loginResult.getSignInUserSession().getIdToken().getJwtToken());
};

testAuth();