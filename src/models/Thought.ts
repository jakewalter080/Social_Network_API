import { Schema, model, Types } from 'mongoose';
import { IThought, IReaction } from '../types';
import { formatDate } from '../utils/dateFormat';

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
        get: (timestamp: Date) => formatDate(timestamp),
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
          get: (timestamp: Date) => formatDate(timestamp),
        },
        username: {
            type: String,
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