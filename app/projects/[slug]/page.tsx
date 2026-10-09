import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies, getCaseStudy, type CaseStudyImage } from '@/lib/caseStudies';
import { OG_IMAGE, SITE_NAME } from '@/lib/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};

  const title = `${study.title} Case Study | ${SITE_NAME}`;
  return {
    title,
    description: study.tagline,
    alternates: { canonical: `/projects/${study.slug}` },
    openGraph: {
      type: 'article',
      url: `/projects/${study.slug}`,
      siteName: SITE_NAME,
      title,
      description: study.tagline,
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description: study.tagline, images: [OG_IMAGE] },
  };
}

function Figure({ image, priority = false }: { image: CaseStudyImage; priority?: boolean }) {
  return (
    <figure>
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 896px, 100vw"
          priority={priority}
          className="w-full h-auto"
        />
      </div>
      {image.caption && (
        <figcaption className="mt-3 text-sm text-center text-gray-500 dark:text-gray-400">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">{children}</h2>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  const index = caseStudies.indexOf(study);
  const nextStudy = caseStudies[(index + 1) % caseStudies.length];

  return (
    <article className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <span aria-hidden>&larr;</span> All projects
        </Link>

        {/* Header */}
        <header className="mt-8 mb-10">
          <p className="text-primary-600 dark:text-primary-400 font-medium tracking-wider uppercase text-sm mb-3">
            Case study
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">{study.title}</h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            {study.tagline}
          </p>

          <dl className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 ${study.meta.team ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
            {[
              ['Role', study.meta.role],
              ['Timeline', study.meta.timeline],
              ['Type', study.meta.type],
              ['Team', study.meta.team],
            ]
              .filter((item): item is [string, string] => Boolean(item[1]))
              .map(([label, value]) => (
              <div
                key={label}
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
              >
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {label}
                </dt>
                <dd className="mt-1 font-medium text-gray-900 dark:text-white">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap gap-3 mt-6">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                Live demo &#8599;
              </a>
            )}
            {study.githubUrl && (
              <a
                href={study.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-600 hover:text-primary-600 dark:hover:border-primary-400 dark:hover:text-primary-400 rounded-lg font-medium transition-colors"
              >
                Source on GitHub
              </a>
            )}
          </div>

        </header>

        {study.cover && <Figure image={study.cover} priority />}

        <div className="mt-16 space-y-16">
          {/* Overview */}
          <section>
            <SectionHeading>Overview</SectionHeading>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {study.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="flex flex-wrap gap-2 mt-6" aria-label="Tech stack">
              {study.stack.map((tech) => (
                <li
                  key={tech}
                  className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-md text-sm font-medium"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          {/* Features */}
          <section>
            <SectionHeading>What it does</SectionHeading>
            <ul className="grid sm:grid-cols-2 gap-3">
              {study.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300"
                >
                  <svg className="w-5 h-5 shrink-0 mt-0.5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {/* Decisions */}
          <section>
            <SectionHeading>How I built it</SectionHeading>
            <ol className="space-y-6">
              {study.decisions.map((decision, i) => (
                <li key={decision.title} className="flex gap-5">
                  <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-primary-600 text-white font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{decision.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{decision.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Challenge */}
          <section className="p-6 sm:p-8 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-900/50">
            <p className="text-primary-700 dark:text-primary-300 font-semibold uppercase tracking-wider text-sm mb-2">
              The hardest part
            </p>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{study.challenge.title}</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {study.challenge.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Gallery */}
          {study.gallery.length > 0 && (
            <section className="space-y-10">
              <SectionHeading>Screens</SectionHeading>
              {study.gallery.map((image) => (
                <Figure key={image.src} image={image} />
              ))}
            </section>
          )}

          {/* Next */}
          <section>
            <SectionHeading>{study.nextHeading ?? "What's next"}</SectionHeading>
            <ul className="space-y-3">
              {study.next.map((item) => (
                <li key={item} className="flex gap-3 text-gray-700 dark:text-gray-300">
                  <span className="text-primary-500 font-bold" aria-hidden>&rarr;</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Next case study */}
        {nextStudy !== study && (
          <Link
            href={`/projects/${nextStudy.slug}`}
            className="group mt-20 flex items-center justify-between gap-4 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-800 hover:shadow-lg transition-all"
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Next case study</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {nextStudy.title}
              </p>
            </div>
            <span className="text-2xl text-primary-500 transition-transform group-hover:translate-x-1" aria-hidden>
              &rarr;
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}
