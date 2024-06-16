import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";



export async function updateSpace(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient):
Promise<APIGatewayProxyResult> {

    if (event.queryStringParameters && ('id' in event.queryStringParameters) && event.body) {
        const spaceId = event.queryStringParameters.id;
        const bodyData = JSON.parse(event.body);
        const requestBodyKey = Object.keys(bodyData)[0];
        const requestBodyValue = bodyData[requestBodyKey];

        const updateResult = await ddbClient.send(new UpdateItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                'id': {S: spaceId}
            },
            UpdateExpression: 'set #zzzNew = :new',
            ExpressionAttributeValues: {
                ':new': {
                    S: requestBodyValue
                }
            },
            ExpressionAttributeNames: {
                '#zzzNew': requestBodyKey
            },
            ReturnValues: 'UPDATED_NEW'
        }));
        return {
            statusCode: 204,
            body: JSON.stringify(updateResult.Attributes)
        }
    }
    return {
        statusCode: 400,
        body: JSON.stringify('Please provide corrects args')
    }
}