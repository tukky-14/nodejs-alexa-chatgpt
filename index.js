const Alexa = require('ask-sdk-core');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

// OpenAI APIの設定
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const personality = '回答はできるだけ簡潔にして。';

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'なんでもアシスタントです。なんでも聞いてください。';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('なんでもアシスタントです。なんでも聞いてください。', speechText)
            .getResponse();
    },
};

const AskEverythingIntentHandler = {
    canHandle(handlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'AskEverythingIntent'
        );
    },
    async handle(handlerInput) {
        const questionSlot = Alexa.getSlot(handlerInput.requestEnvelope, 'question');
        let question = '';
        if (questionSlot && questionSlot.value) {
            question = questionSlot.value;
        }

        console.log('question:', question);

        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            temperature: 0.5,
            messages: [
                { role: 'system', content: personality },
                { role: 'user', content: question },
            ],
        });

        const replyMessage = completion.data.choices[0].message.content;

        console.log('replyMessage:', replyMessage);

        return handlerInput.responseBuilder
            .speak(replyMessage)
            .reprompt('他に質問がありますか？')
            .getResponse();
    },
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent'
        );
    },
    handle(handlerInput) {
        const speechText = '何でも私に聞いてください。';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('何でも私に聞いてください。', speechText)
            .getResponse();
    },
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent' ||
                Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent')
        );
    },
    handle(handlerInput) {
        const speechText = 'さようなら。';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('さようなら。', speechText)
            .withShouldEndSession(true)
            .getResponse();
    },
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // クリーンアップロジックをここに追加します。
        return handlerInput.responseBuilder.getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`処理されたエラー： ${error.message}`);

        return handlerInput.responseBuilder
            .speak('すみません。コマンドを理解できませんでした。もう一度言ってください。')
            .reprompt('すみません。コマンドを理解できませんでした。もう一度言ってください。')
            .getResponse();
    },
};

let skill;

exports.handler = async function (event, context) {
    console.log(`REQUEST++++${JSON.stringify(event)}`);
    if (!skill) {
        skill = Alexa.SkillBuilders.custom()
            .addRequestHandlers(
                LaunchRequestHandler,
                AskEverythingIntentHandler,
                HelpIntentHandler,
                CancelAndStopIntentHandler,
                SessionEndedRequestHandler
            )
            .addErrorHandlers(ErrorHandler)
            .create();
    }

    const response = await skill.invoke(event, context);
    console.log(`RESPONSE++++${JSON.stringify(response)}`);

    return response;
};
