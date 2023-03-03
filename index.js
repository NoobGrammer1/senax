const Alexa = require('ask-sdk-core');
const { Configuration, OpenAIApi } = require('openai');
const keys = require('./Keys');
const config = new Configuration({
    apiKey: keys.OPEN_AI_KEY
});
const openai = new OpenAIApi(config);





















const AskChatgptIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AskChatgptIntent';
    },

    async handle(handlerInput) {
        const question = Alexa.getSlotValue(handlerInput.requestEnvelope, 'question');
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: question,
            temperature: 0,
            max_tokens: 1500,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0
        });
        //console.log('response', response.data);
        const speakOutput = response.data.choices[0].text + 'What more would you like to know?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt("What else can I help you with?").getResponse();
    }
};











const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    canHandle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = 'You just triggered ${intentName}';
        return handlerInput.responseBuilder.speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.'; console.log("Error handled: ${JSON.stringify(error)}");
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        AskChatgptIntentHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();