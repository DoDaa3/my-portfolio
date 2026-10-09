function Hero() {
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-green-500/30 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm font-medium animate-fade-in">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          Open to new opportunities
        </div>
        <p className="text-primary-600 dark:text-primary-400 font-medium mb-4 animate-fade-in tracking-wider uppercase text-sm">
          Hello, I'm
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 animate-slide-up">
          <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-transparent">
            Omar Amine
          </span>
        </h1>
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          Frontend Engineer building fast, accessible web apps
        </h2>
        <p
          className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg mb-10 animate-slide-up leading-relaxed"
          style={{ animationDelay: '0.4s', textWrap: 'balance' }}
        >
          3+ years shipping React and Next.js products, from healthcare
          platforms and AI tools to nonprofit websites. I turn Figma designs
          into polished, performant interfaces.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
          style={{ animationDelay: '0.6s' }}
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView();
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
              document.querySelector('#contact')?.scrollIntoView();
            }}
            className="px-8 py-3 border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-400 dark:hover:text-gray-900 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5"
          >
            Contact Me
          </a>
          <a
            href="/Omar-Amine-CV.pdf"
            download="Omar-Amine-CV.pdf"
            className="group px-8 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-600 hover:text-primary-600 dark:hover:border-primary-400 dark:hover:text-primary-400 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
          >
            Download CV
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16" />
            </svg>
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
