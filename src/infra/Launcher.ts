import { App } from 'aws-cdk-lib';
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from './stacks/LambdaStack';
import { APIStack } from './stacks/APIStack'


const app = new App();
const dataStack = new DataStack(app, 'DataStack');
const lambdaStack = new LambdaStack(app, 'LambdaStack', {
    spacesTable: dataStack.spacesTable
});
new APIStack(app, 'ApiStack', {
    spacesLambdaIntegration: lambdaStack.spacesLambdaIntegration
})