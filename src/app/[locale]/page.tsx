import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/content/types'
import { profile, education } from '@/content/profile'
import { allStackItems } from '@/content/stack'
import { Hero } from '@/components/hero'
import { AboutSection } from '@/components/sections/about-section'
import { StackSection } from '@/components/sections/stack-section'
import { ExperienceSection } from '@/components/sections/experience-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { EducationSection } from '@/components/sections/education-section'
import { ContactSection } from '@/components/sections/contact-section'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale: Locale = raw

  // Dados estruturados: é o que permite ao buscador entender que a página descreve
  // uma pessoa, e não um texto qualquer.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.headline[locale],
    description: profile.summary[locale],
    email: `mailto:${profile.email}`,
    telephone: `+${profile.phone.e164}`,
    image: profile.photo,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'São Caetano do Sul',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
    url: profile.links.linkedin,
    sameAs: [profile.links.github, profile.links.linkedin],
    knowsAbout: allStackItems.map((item) => item.name),
    alumniOf: education.map((item) => ({
      '@type': 'EducationalOrganization',
      name: item.institution,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero locale={locale} />
      <AboutSection locale={locale} />
      <StackSection locale={locale} />
      <ExperienceSection locale={locale} />
      <ProjectsSection locale={locale} />
      <EducationSection locale={locale} />
      <ContactSection locale={locale} />
    </>
  )
}
