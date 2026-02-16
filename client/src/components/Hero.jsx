import { useState, useEffect, useRef, useCallback } from 'react';

const roles = ['Frontend Developer', 'React Specialist', 'UI/UX Enthusiast', 'Freelancer'];

function Hero() {
  const [text, setText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const phase = useRef('typing'); // typing | pausing | deleting | waiting
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const timer = useRef(null);

  const tick = useCallback(() => {
    const current = roles[roleIdx.current];

    switch (phase.current) {
      case 'typing':
        charIdx.current++;
        setText(current.slice(0, charIdx.current));
        if (charIdx.current >= current.length) {
          phase.current = 'pausing';
          timer.current = setTimeout(tick, 2000);
        } else {
          timer.current = setTimeout(tick, 90 + Math.random() * 40);
        }
        break;

      case 'pausing':
        phase.current = 'deleting';
        timer.current = setTimeout(tick, 30);
        break;

      case 'deleting':
        charIdx.current--;
        setText(current.slice(0, charIdx.current));
        if (charIdx.current <= 0) {
          phase.current = 'waiting';
          timer.current = setTimeout(tick, 400);
        } else {
          timer.current = setTimeout(tick, 35);
        }
        break;

      case 'waiting':
        roleIdx.current = (roleIdx.current + 1) % roles.length;
        phase.current = 'typing';
        timer.current = setTimeout(tick, 100);
        break;
    }
  }, []);

  useEffect(() => {
    timer.current = setTimeout(tick, 500);
    return () => clearTimeout(timer.current);
  }, [tick]);

  // Separate cursor blink so it doesn't interfere with typing
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center section-padding pt-24 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 dark:bg-primary-400/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-600/10 dark:bg-primary-600/5 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary-200/20 to-transparent dark:from-primary-800/10 rounded-full blur-3xl" />
      </div>

      <div className="container-max text-center relative z-10">
        <p className="text-primary-600 dark:text-primary-400 font-medium mb-4 animate-fade-in tracking-wider uppercase text-sm">
          Hello, I'm
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 animate-slide-up">
          <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-transparent">
            Omar Amine
          </span>
        </h1>
        <h2
          className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-8 animate-slide-up h-9 sm:h-10 md:h-12"
          style={{ animationDelay: '0.2s' }}
        >
          <span>{text}</span>
          <span className={`inline-block w-0.5 h-6 sm:h-7 md:h-8 bg-primary-500 ml-1 align-middle transition-opacity duration-100 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`} />
        </h2>
        <p
          className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg mb-10 animate-slide-up leading-relaxed"
          style={{ animationDelay: '0.4s' }}
        >
          I build modern, responsive web applications with React.js, Next.js, and
          Tailwind CSS. From healthcare platforms to content creation tools,
          I turn designs into polished, performant user experiences.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
          style={{ animationDelay: '0.6s' }}
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary-600/25 hover:-translate-y-0.5"
          >
            View My Work
            <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-400 dark:hover:text-gray-900 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5"
          >
            Contact Me
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <svg
            className="w-6 h-6 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Hero;
