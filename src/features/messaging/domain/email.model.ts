export interface EmailPayload {
    to: string;
    subject: string;
    message: string;
}

export interface EmailSender {
    sendEmail(payload: EmailPayload): Promise<void>;
}
