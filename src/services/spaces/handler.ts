import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { postSpaces } from './PostSpaces';
import { getSpaces } from './GetSpaces';
import { updateSpace } from './UpdateSpaces';
import { deleteScpace } from './DeleteSpaces';
import { JsonError, MissingFieldError } from '../shared/Validator'
import { captureAWSv3Client } from 'aws-xray-sdk-core'

const ddbClient = captureAWSv3Client(new DynamoDBClient({}));

async function handler(event: APIGatewayProxyEvent, context: Context): 
Promise<APIGatewayProxyResult> {

    let message: string;
    try {
        switch (event.httpMethod) {
            case 'GET':
                const getResponse = await getSpaces(event, ddbClient);
                return getResponse;
            case 'POST':
                const postResponse = await postSpaces(event, ddbClient);
                return postResponse;
            case 'PUT':
                const putResponse = await updateSpace(event, ddbClient);
                return putResponse;
            case 'DELETE':
                const deleteResponse = await deleteScpace(event, ddbClient);
                return deleteResponse;
            default:
                break;
        }
    }
    catch (error) {
        console.log(error);
        if (error instanceof MissingFieldError){
            return {
                statusCode: 400,
                body: JSON.stringify(error.message)
            }
        }
        if (error instanceof JsonError){
            return {
                statusCode: 400,
                body: JSON.stringify(error.message)
            }
        }
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        };
    };
    

    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(message)
    }

    return response;
}

export { handler };