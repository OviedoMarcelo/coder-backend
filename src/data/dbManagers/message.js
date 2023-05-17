import {messageModel} from '../models/message.js';

export default class Message {
    constructor() {
        console.log('Working with messages in the DB');
    }

    getAll = async () => {
        try {
            const messages = await messageModel.find().lean();
            return messages;
        } catch (error) {
            console.log(error);
            throw new Error('Error retrieving messages');
        }
    }

    add = async (message) => {
        try {
            const result = await messageModel.create(message);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error('Error adding message');
        }
    }
}
