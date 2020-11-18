import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'Administrator',
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
