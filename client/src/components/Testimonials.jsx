import { useScrollAnimation } from '../hooks/useScrollAnimation';

const testimonials = [
  {
    name: 'El Mehdi Karami',
    role: 'Lead Software Engineer',
    company: 'Freelance Client — Hey Tajine',
    relationship: 'Omar built Hey Tajine for El Mehdi',
    quote:
      'Omar is a talented frontend engineer with a keen eye for design and a proactive mindset. He not only builds clean, well-crafted interfaces but also suggests valuable improvements that enhance user experience. A great collaborator and problem solver—highly recommended!',
    linkedIn: 'https://www.linkedin.com/in/omar-amine-460807207/',
    avatar: '/images/el mahdi karami.jpeg',
    date: 'March 2025',
  },
];

function StarRating() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-amber-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, index }) {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`scroll-hidden ${isVisible ? 'scroll-visible' : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative group">
        {/* Gradient border glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-400 rounded-2xl opacity-0 group-hover:opacity-20 dark:group-hover:opacity-15 blur transition-opacity duration-500" />

        <div className="relative bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-gray-200/80 dark:border-gray-700/50 shadow-sm hover:shadow-xl transition-all duration-500">
          {/* Top accent line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary-400/50 to-transparent" />

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            {/* Left side — Author info */}
            <div className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-3 sm:min-w-[140px] sm:pt-2">
              {/* Avatar with gradient ring */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full opacity-75" />
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white dark:border-gray-800"
                  />
                ) : (
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/40 flex items-center justify-center border-2 border-white dark:border-gray-800">
                    <span className="text-primary-600 dark:text-primary-300 font-bold text-xl sm:text-2xl">
                      {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-left sm:text-center">
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium leading-snug">
                  {testimonial.role}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                  {testimonial.company}
                </p>
              </div>
            </div>

            {/* Right side — Quote */}
            <div className="flex-1 sm:border-l sm:border-gray-100 sm:dark:border-gray-700/50 sm:pl-8">
              {/* Quote icon */}
              <svg
                className="w-8 h-8 text-primary-200 dark:text-primary-800/60 mb-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
              </svg>

              {/* Quote text */}
              <blockquote className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px] sm:text-base mb-5 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Bottom row — Stars, date, LinkedIn */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-4">
                  <StarRating />
                  {testimonial.date && (
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {testimonial.date}
                    </span>
                  )}
                </div>

                {/* LinkedIn badge */}
                <a
                  href={testimonial.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/40 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Verified on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const [titleRef, titleVisible] = useScrollAnimation();

  return (
    <section id="testimonials" className="section-padding">
      <div className="container-max">
        <h2
          ref={titleRef}
          className={`section-title scroll-hidden ${titleVisible ? 'scroll-visible' : ''}`}
        >
          What People{' '}
          <span className="text-primary-600 dark:text-primary-400">Say</span>
        </h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>

        {/* LinkedIn CTA */}
        <div className="text-center mt-10">
          <a
            href="https://www.linkedin.com/in/omar-amine-460807207/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
          >
            See all recommendations on LinkedIn
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
