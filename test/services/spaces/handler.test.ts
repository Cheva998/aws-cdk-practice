import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb"
import { handler } from "../../../src/services/spaces/handler";
import { captureAWSv3Client } from "aws-xray-sdk-core";


const someItems = [{
    id: {
        S: '123'
    },
    location: {
        S: 'Paris'
    }
}]

jest.mock('@aws-sdk/client-dynamodb', () => {
    return {
        DynamoDBClient: jest.fn().mockImplementation(() => {
            return {
                send: jest.fn().mockImplementation(() => {
                    return {
                        Items: someItems
                    }
                })
            }
        }),
        ScanCommand: jest.fn()
    }
});

jest.mock('aws-xray-sdk-core', () => {
    return {
        captureAWSv3Client: jest.fn().mockImplementation(() => {
            return new DynamoDBClient({})
        })
    }
});


describe('Spaces handler test suite', () => {

    test('Returns spaces from dynamoDb', async () => {
        const result = await handler({
            httpMethod: 'GET',
        } as any, {} as any);

        expect(result.statusCode).toBe(200);
        const expectedResult = [{
            id: '123',
            location: 'Paris'
        }];
        const parsedResultBody = JSON.parse(result.body);
        expect(parsedResultBody).toEqual(expectedResult);

        expect(DynamoDBClient).toHaveBeenCalledTimes(2);
        expect(ScanCommand).toHaveBeenCalledTimes(1);
    });
})