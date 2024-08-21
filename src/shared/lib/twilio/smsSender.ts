import twilio from 'twilio'
import { LocalResponse } from "@/shared/interfaces/localResponse";

interface DataSMS {
  phoneTo: string,
  body: string
}

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.ACCOUNT_SID_TWILIO;
const authToken = process.env.AUTH_TOKEN_TWILIO;
const client = twilio(accountSid, authToken);

export const sendSMS = async( dataSMS: DataSMS, option:  'sms' | 'ws'  ): Promise<LocalResponse> => {

  try {
    const message = await client.messages.create({
      body: dataSMS.body,
      from: `${option === 'ws' ? 'whatsapp:' : ''}${process.env.PHONE_NUMBER}`,
      to: `${option === 'ws' ? 'whatsapp:' : ''}${dataSMS.phoneTo}`
    })

    return {
      message: 'The message has been send successfuly',
      ok: true
    }
    
  } catch (error) {
    console.log(error)

    return{
      message: 'An error ocurred during send the sms, check the phone number of the logs',
      ok: false
    }
  }
}