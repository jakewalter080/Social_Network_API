import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
  friendCount?: number;
}

export interface IReaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  userId: Types.ObjectId;
  reactions: IReaction[];
  reactionCount?: number;
}

export interface ErrorResponse {
  message: string;
  stack?: string;
}