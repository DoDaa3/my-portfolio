function About() {
  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-max">
        <h2 className="section-title">
          About{" "}
          <span className="text-primary-600 dark:text-primary-400">Me</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile image placeholder */}
          <div className="flex justify-center">
            <div className="w-64 h-64 sm:w-80 sm:h-96 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center shadow-xl">
              <img
                src="/images/profile.png"
                alt="Omar Amine"
                className="w-64 h-64 sm:w- sm:h-80 rounded-2xl object-cover object-[center_20%] shadow-xl"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  3+
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Years Experience
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  20+
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Projects Completed
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  10+
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Happy Clients
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  5+
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Open Source
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
