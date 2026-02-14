import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function About() {
  const [zoomed, setZoomed] = useState(false);
  const [titleRef, titleVisible] = useScrollAnimation();
  const [imageRef, imageVisible] = useScrollAnimation(0.2);
  const [bioRef, bioVisible] = useScrollAnimation(0.2);
  const [statsRef, statsVisible] = useScrollAnimation(0.3);

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-max">
        <h2
          ref={titleRef}
          className={`section-title scroll-hidden ${titleVisible ? 'scroll-visible' : ''}`}
        >
          About{' '}
          <span className="text-primary-600 dark:text-primary-400">Me</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile image */}
          <div
            ref={imageRef}
            className={`flex justify-center scroll-hidden-left ${imageVisible ? 'scroll-visible-x' : ''}`}
          >
            <div className="relative group">
              {/* Decorative ring behind image */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-400 to-primary-700 rounded-2xl opacity-20 group-hover:opacity-30 blur-lg transition-opacity duration-500" />
              <div
                onClick={() => setZoomed(!zoomed)}
                className={`relative w-64 h-64 sm:w-80 sm:h-96 rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all duration-500 ease-out ${
                  zoomed
                    ? 'scale-110 shadow-2xl shadow-primary-600/30'
                    : 'scale-100 hover:scale-[1.03]'
                }`}
              >
                <img
                  src="/images/profile.png"
                  alt="Omar Amine"
                  className="w-full h-full object-cover object-[center_20%]"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div
            ref={bioRef}
            className={`scroll-hidden-right ${bioVisible ? 'scroll-visible-x' : ''}`}
          >
            <h3 className="text-2xl font-semibold mb-4">
              A passionate developer based in Casablanca, Morocco
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              I'm a full-stack developer with 3+ years of experience building
              web applications. I specialize in the MERN stack and love creating
              intuitive, performant user interfaces.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or writing technical blog
              posts. I believe in continuous learning and building products that
              make a difference.
            </p>

            <div
              ref={statsRef}
              className={`grid grid-cols-2 gap-4 scroll-hidden ${statsVisible ? 'scroll-visible' : ''}`}
            >
              {[
                { value: '3+', label: 'Years Experience' },
                { value: '20+', label: 'Projects Completed' },
                { value: '10+', label: 'Happy Clients' },
                { value: '5+', label: 'Open Source' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300 inline-block">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
