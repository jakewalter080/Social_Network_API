import { Schema, model, Types } from 'mongoose';
import { IUser } from '../types';

const UserSchema = new Schema<IUser>(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
            ],
        },
        {
          toJSON: {
            virtuals: true,
            getters: true,
          },
          id: false,
        }
      );
      UserSchema.virtual('friendCount').get(function () {
        return this.friends.length;
      });
      
      const User = model<IUser>('User', UserSchema);
      
      export default User;