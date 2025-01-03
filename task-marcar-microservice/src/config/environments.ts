import * as joi from 'joi';
import 'dotenv/config'

interface EnvironmentVariables{
    NATS_SERVER : string    
}

const environmentSchema = joi.object({
    NATS_SERVER: joi.string().required()
}).unknown()

const {error, value} = environmentSchema.validate({
    ...process.env

});

if (error) {
   throw new Error(`Check you Environment variables ${error}`) 
}

const environmentVariables: EnvironmentVariables = value
export const environments={
    natsServer: environmentVariables.NATS_SERVER
}