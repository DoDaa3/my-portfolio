import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const projectSchema = new Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  description: { type: String, required: [true, 'Description is required'], trim: true },
  image: { type: String, default: '' },
  imagePosition: { type: String, default: 'top' },
  techStack: { type: [String], default: [] },
  liveUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
});

const contactSchema = new Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 100 },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    maxlength: 254,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  message: { type: String, required: [true, 'Message is required'], trim: true, maxlength: 5000 },
  createdAt: { type: Date, default: Date.now },
});

type ProjectDoc = InferSchemaType<typeof projectSchema>;
type ContactDoc = InferSchemaType<typeof contactSchema>;

// Guard against model recompilation on hot reload
export const ProjectModel: Model<ProjectDoc> =
  mongoose.models.Project || mongoose.model<ProjectDoc>('Project', projectSchema);

export const ContactModel: Model<ContactDoc> =
  mongoose.models.Contact || mongoose.model<ContactDoc>('Contact', contactSchema);
