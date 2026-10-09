// Replaces all projects in MongoDB with the list in lib/projectData.ts.
// Usage: npm run seed   (reads MONGODB_URI from .env.local)
import mongoose from 'mongoose';
import { connectDB } from '../lib/db';
import { ProjectModel } from '../lib/models';
import { fallbackProjects } from '../lib/projectData';

async function seed() {
  await connectDB();
  console.log('Connected to MongoDB');

  await ProjectModel.deleteMany({});
  console.log('Cleared existing projects');

  const docs = fallbackProjects.map(({ _id, ...project }, i) => ({
    ...project,
    featured: true,
    order: i + 1,
  }));
  await ProjectModel.insertMany(docs);
  console.log(`Seeded ${docs.length} projects`);

  await mongoose.connection.close();
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
