import { App } from 'aws-cdk-lib';
import { MonitorStack } from "../../src/infra/stacks/MonitorStack"
import { Capture, Match, Template } from "aws-cdk-lib/assertions";


describe('Test suite for monitor stack', () => {

    let monitorStackTemplate: Template;

    beforeAll(() => {
        const testApp = new App({
            outdir: 'cdk.out'
        });
        const monitorStack = new MonitorStack(testApp, 'MonitorStack');
        monitorStackTemplate = Template.fromStack(monitorStack);
    })

    test('Test sns topic properties', () => {
        monitorStackTemplate.hasResourceProperties('AWS::SNS::Topic', {
            DisplayName: 'AlarmTopic',
            TopicName: 'AlarmTopic'
        });
    });

    test('Test alarm properties', () => {
        monitorStackTemplate.hasResourceProperties('AWS::CloudWatch::Alarm',{
            AlarmName: "SpacesApi4xxAlarm",
            ComparisonOperator: "GreaterThanOrEqualToThreshold",
            EvaluationPeriods: 1,
            MetricName: "4XXError",
            Namespace: "AWS/ApiGateway",
            Period: 60,
            Statistic: "Sum",
            Threshold: 5,
            Unit: "Count",
            Dimensions: [{
                Name: "ApiName",
                Value: "SpacesApi"
            }]
        });
    });

    test('Test subscription properties - with matchers', ()=> {
        monitorStackTemplate.hasResourceProperties('AWS::SNS::Subscription', 
            Match.objectEquals(
                {
                    Protocol: "email",
                    TopicArn: {
                        Ref: Match.stringLikeRegexp('AlarmTopic')
                    },
                    Endpoint: Match.stringLikeRegexp('@gmail.com')
                }
            )
        )
    });

    test('Test subscription properties - with exact values', () => {
        const snsTopic = monitorStackTemplate.findResources('AWS::SNS::Topic');
        const snsTopicName = Object.keys(snsTopic)[0]
        monitorStackTemplate.hasResourceProperties('AWS::SNS::Subscription', {
            Protocol: 'email',
            TopicArn: {
                Ref: snsTopicName
            }
        });
    });

    test('Alarm actions', () => {
        const alarmActionsCapture = new Capture();
        monitorStackTemplate.hasResourceProperties('AWS::CloudWatch::Alarm', {
            AlarmActions: alarmActionsCapture
        });

        expect(alarmActionsCapture.asArray()).toEqual([{
            Ref: expect.stringMatching(/^AlarmTopic/)
        }]);
    });

    test('Monitor stack snapshot', () => {
        expect(monitorStackTemplate.toJSON()).toMatchSnapshot();
    });

    test('Alarm snapshot', () => {
        const alarmResource = monitorStackTemplate.findResources('AWS::CloudWatch::Alarm');
        expect(alarmResource).toMatchSnapshot();
    })
});