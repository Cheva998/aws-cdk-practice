import { APIGatewayProxyEvent } from "aws-lambda";
import { hasAdminGroup } from "../../src/infra/Utils";


describe('Utils tests', () => {

    const fetchSpy = jest.spyOn(global, 'fetch');
    fetchSpy.mockImplementation(()=> Promise.resolve({} as any));

    test('has admin group', () => {
        const event: APIGatewayProxyEvent = {
            body: '',
            headers: {},
            httpMethod: '',
            isBase64Encoded: false,
            multiValueHeaders: {},
            multiValueQueryStringParameters: {},
            path: '',
            pathParameters: {},
            queryStringParameters: {},
            resource: '',
            stageVariables: {},
            requestContext: {
                authorizer: {claims: {'cognito:groups': 'admins'}},
                accountId: '',
                apiId: '',
                protocol: 'http',
                httpMethod: 'GET',
                identity: '' as any,
                path: '',
                requestId: '',
                requestTimeEpoch: 1,
                resourceId: '',
                resourcePath: '',
                stage: ''
            }
        };
        const hasAdmin = hasAdminGroup(event);
        console.log(hasAdmin);
        expect(hasAdmin).toBeTruthy();
        // expect(fetchSpy).toHaveBeenCalledTimes(1);
        // expect(fetchSpy).toHaveBeenCalledWith()
    })
})