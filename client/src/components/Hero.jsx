function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center section-padding pt-24"
    >
      <div className="container-max text-center">
        <p className="text-primary-600 dark:text-primary-400 font-medium mb-4 animate-fade-in">
          Hello, I'm
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
          <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            John Doe
          </span>
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Full Stack Developer
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg mb-10 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          I build modern, responsive web applications with clean code and great
          user experiences. Passionate about turning ideas into reality through
          technology.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary-600/25"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-400 dark:hover:text-gray-900 rounded-lg font-medium transition-all duration-200"
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
