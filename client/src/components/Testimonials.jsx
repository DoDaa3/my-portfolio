import { useScrollAnimation } from '../hooks/useScrollAnimation';

const testimonials = [
  {
    name: 'El Mehdi Karami',
    role: 'Co-Founder',
    company: 'Metaverse',
    relationship: 'Managed Omar directly',
    quote:
      'I had the pleasure of working with Omar during his time at Metaverse, and I can confidently say he is an exceptional frontend developer. Omar consistently demonstrated strong problem-solving skills, a keen eye for design, and a deep understanding of modern web technologies. He was always proactive, eager to learn, and contributed meaningfully to every project he was part of. His ability to collaborate effectively with the team and deliver high-quality work on time made him a valuable asset. I highly recommend Omar to any team looking for a dedicated and talented developer.',
    linkedIn: 'https://www.linkedin.com/in/omar-amine-460807207/',
  },
];

function TestimonialCard({ testimonial, index }) {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`scroll-hidden ${isVisible ? 'scroll-visible' : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative bg-white dark:bg-gray-800/50 rounded-xl p-8 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
        {/* Quote mark */}
        <svg
          className="absolute top-6 right-6 w-10 h-10 text-primary-100 dark:text-primary-900/40"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
        </svg>

        {/* Quote text */}
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 relative">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Divider */}
        <div className="h-px bg-gray-100 dark:bg-gray-700/50 mb-5" />

        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar with initials */}
            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">
                {testimonial.name}
              </h4>
              <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                {testimonial.role} at {testimonial.company}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {testimonial.relationship}
              </p>
            </div>
          </div>

          {/* LinkedIn source badge */}
          <a
            href={testimonial.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            via LinkedIn
          </a>
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

        <div className="max-w-3xl mx-auto space-y-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>

        {/* LinkedIn CTA */}
        <div className="text-center mt-8">
          <a
            href="https://www.linkedin.com/in/omar-amine-460807207/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            See all recommendations on LinkedIn
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
