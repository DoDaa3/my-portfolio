import 'server-only';
import { connectDB } from './db';
import { ProjectModel } from './models';
import { fallbackProjects, type Project } from './projectData';

export type { Project };

export async function getProjects(): Promise<Project[]> {
  try {
    await connectDB();
    const docs = await ProjectModel.find().sort({ order: 1 }).lean();
    if (docs.length === 0) return fallbackProjects;

    return docs.map((doc) => ({
      _id: String(doc._id),
      title: doc.title,
      description: doc.description,
      image: doc.image || undefined,
      imagePosition: doc.imagePosition || undefined,
      techStack: doc.techStack ?? [],
      liveUrl: doc.liveUrl || undefined,
      githubUrl: doc.githubUrl || undefined,
    }));
  } catch (err) {
    console.error('Falling back to built-in projects:', err);
    return fallbackProjects;
  }
}
