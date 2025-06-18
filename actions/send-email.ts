"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export type ContactFormData = {
  name: string
  email: string
  message: string
}

export async function sendContactEmail(formData: ContactFormData) {
  if (!formData.name || !formData.email || !formData.message) {
    return {
      success: false,
      error: "Please fill out all fields",
    }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "hellomkaebae@gmail.com",
      reply_to: formData.email,
      subject: `New Contact Form Submission from ${formData.name}`,
      text: `
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #E90074;">New Contact Form Submission</h2>
  <p><strong>From:</strong> ${formData.name}</p>
  <p><strong>Email:</strong> ${formData.email}</p>
  <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #E90074;">
    <p><strong>Message:</strong></p>
    <p>${formData.message.replace(/\n/g, "<br>")}</p>
  </div>
</div>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return {
        success: false,
        error: "Failed to send email. Please try again later.",
      }
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    }
  }
}
