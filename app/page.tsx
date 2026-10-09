import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import { getProjects } from '@/lib/projects';

// Rebuild the page with fresh projects from the database at most once an hour
export const revalidate = 3600;

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects projects={projects} />
      <Testimonials />
      <Contact />
    </>
  );
}
