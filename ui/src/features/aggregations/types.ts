import { IUser } from "../user/userModels";

export enum GenericAnswerValueType {
  STRING = "STRING",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
  BASE64 = "BASE64",
  JSON = "JSON",
}
export enum GenericQuestionClassificationType {
  PUBLIC = "PUBLIC",
}
export interface GenericQuestion {
  id: string;
  name: string;
  humanReadableQuestion: string;
  valueType: GenericAnswerValueType;
  classification: GenericQuestionClassificationType;
  createdAt?: string;
  createdBy?: string;
}
export interface GenericAnswer {
  id: string;
  idpUserId: IUser["id"];
  questionId: GenericQuestion["id"];
  valueType: GenericAnswerValueType;
  valueString?: string;
  valueNumber?: number;
  valueBoolean?: boolean;
  valueJSON?: unknown;
  createdAt?: string;
  createdBy?: string;
}
export interface QuestionAggregation {
  id: string;
  name: string;
  description: string;
  genericQuestions: GenericQuestion[];
  genericQuestionIds?: GenericQuestion["id"][];
  createdAt?: string;
  createdBy?: string;
}

export interface AnswerAggregation {
  id: string;
  idpUserId: IUser["id"];
  questionAggregationId: QuestionAggregation["id"];
  genericAnswers: GenericAnswer[];
  genericAnswerIds?: GenericAnswer["id"][];
  createdAt?: string;
  createdBy?: string;
}

export interface AllDataAnswerAggregation {
  id: AnswerAggregation["id"];
  idpUserId: IUser["id"];
  questionAggregationId: QuestionAggregation["id"];
  questionAggregationName: QuestionAggregation["name"];
  items: {
    [key: GenericQuestion["name"]]: {
      question: GenericQuestion;
      answer: GenericAnswer | null;
    };
  };
}
