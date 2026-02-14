import { lazy, Suspense } from 'react';
import Hero from '../components/Hero';

const About = lazy(() => import('../components/About'));
const Skills = lazy(() => import('../components/Skills'));
const Projects = lazy(() => import('../components/Projects'));
const Contact = lazy(() => import('../components/Contact'));

function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <About />
        <Skills />
        <Projects />
        <Contact />
      </Suspense>
    </>
  );
}

export default Home;
