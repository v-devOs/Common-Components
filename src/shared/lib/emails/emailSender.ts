import nodemailer from 'nodemailer';
import { DataMailHTML, templateHTML } from './templateHTML';
import { LocalResponse } from '@/shared/interfaces/localResponse';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.email",
  port: 587,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.USER_PASSWORD,
  },
});

interface EmailDirections {
  to: string[],
  from: string
}

export const sendEmail = async( emailDirections: EmailDirections, dataHTML: DataMailHTML  ): Promise<LocalResponse> => {

  try {

    await transporter.sendMail({
      to: emailDirections.to,
      from: emailDirections.from,
      html: templateHTML( dataHTML )
    })

    return {
      message: 'The emails has send successfully',
      ok: true
    }
    
  } catch (error) {
    
    console.log({error})

    return {
      message: 'An error ocurred, check logs',
      ok: false
    }
  }
}