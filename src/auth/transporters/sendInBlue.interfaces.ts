export type SendInBlueReceiverParams = {
    name: string;
    email: string;
}

export type SendInBluePayloadParams = {
    FIRSTNAME: string;
    LASTNAME: string;
    PASSWORD_RESET_LINK: string;
}

export type SendInBluePayload = {
    templateId: number;
    params: SendInBluePayloadParams;
    to: SendInBlueReceiverParams[];
}

export type SendInBlueSuccessResponse = {
    messageId: string;
}