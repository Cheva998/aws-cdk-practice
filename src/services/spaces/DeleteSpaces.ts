import { DeleteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { headers } from "./headers";



export async function deleteScpace(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient):
Promise<APIGatewayProxyResult> {
    
    if (event.queryStringParameters && ('id' in event.queryStringParameters)){
        const spaceId = event.queryStringParameters.id;

        await ddbClient.send(new DeleteItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                'id': {S: spaceId}
            }
        }));

        return {
            statusCode: 200,
            body: JSON.stringify(`Deleted space with id ${spaceId}`),
            headers: headers
        }


    }
    return {
        statusCode: 400,
        body: JSON.stringify('Please provide correct args')

    }
}