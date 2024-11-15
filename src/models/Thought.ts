import { Schema, model, Types } from 'mongoose';
import { IThought, IReaction } from '../types';

const ReactionSchema = new Schema<IReaction>(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: Date) => new Date(timestamp),
      },
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );
const ThoughtSchema = new Schema<IThought>(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: Date) => new Date(timestamp),
      },
      username: {
        type: String,
        required: true,
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      reactions: [ReactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );

  ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

  const Thought = model<IThought>('Thought', ThoughtSchema);

  export default Thought;