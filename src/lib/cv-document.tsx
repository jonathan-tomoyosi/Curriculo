import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import type { Locale } from '@/content/types'
import { competencies, education, languages, profile } from '@/content/profile'
import { experiences } from '@/content/experience'
import { projects } from '@/content/projects'
import { stackGroups } from '@/content/stack'
import { ui } from '@/content/ui'
import { formatPeriod } from './i18n'

/**
 * Currículo em PDF.
 *
 * Lê exatamente os mesmos módulos de `src/content` que alimentam o site — é isso que
 * garante que o PDF nunca fique defasado em relação à página. Layout de coluna única,
 * sem tabela e sem caixa de texto, para permanecer legível por leitor automático (ATS).
 */

const COLORS = {
  ink: '#111111',
  body: '#3d3d3d',
  muted: '#6b6b6b',
  rule: '#d8d8d8',
  accent: '#1d4ed8',
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 48,
    paddingHorizontal: 46,
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: COLORS.body,
    lineHeight: 1.5,
  },
  name: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: COLORS.ink, letterSpacing: -0.4 },
  headline: { fontSize: 11, color: COLORS.accent, marginTop: 12, fontFamily: 'Helvetica-Bold' },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12, gap: 4 },
  contactItem: { fontSize: 8.5, color: COLORS.muted },
  rule: { borderBottomWidth: 1, borderBottomColor: COLORS.rule, marginVertical: 14 },
  sectionTitle: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.accent,
    letterSpacing: 1.4,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  section: { marginBottom: 14 },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  entryTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: COLORS.ink },
  entryMeta: { fontSize: 8.5, color: COLORS.muted },
  entryRole: { fontSize: 9.5, color: COLORS.accent, marginTop: 1, marginBottom: 4 },
  entry: { marginBottom: 10 },
  bulletRow: { flexDirection: 'row', marginBottom: 2.5, paddingRight: 6 },
  bulletMark: { width: 9, color: COLORS.accent },
  bulletText: { flex: 1 },
  tag: { fontSize: 8, color: COLORS.muted, marginTop: 4 },
  twoColumn: { flexDirection: 'row', gap: 22 },
  column: { flex: 1 },
  stackRow: { marginBottom: 5 },
  stackLabel: { fontFamily: 'Helvetica-Bold', color: COLORS.ink, fontSize: 9 },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 46,
    right: 46,
    fontSize: 7.5,
    color: COLORS.muted,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

function Bullet({ children }: { children: string }) {
  return (
    <View style={styles.bulletRow} wrap={false}>
      <Text style={styles.bulletMark}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  )
}

export function CvDocument({ locale }: { locale: Locale }) {
  const present = ui.labels.present[locale]
  const generated = new Date().toLocaleDateString(locale === 'pt' ? 'pt-BR' : 'en-GB')

  return (
    <Document
      title={`${profile.name} — ${profile.headline[locale]}`}
      author={profile.name}
      subject={profile.headline[locale]}
      keywords={stackGroups.flatMap((group) => group.items.map((item) => item.name)).join(', ')}
    >
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.headline}>{profile.headline[locale]}</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{profile.email}</Text>
            <Text style={styles.contactItem}>·</Text>
            <Text style={styles.contactItem}>{profile.phone.display}</Text>
            <Text style={styles.contactItem}>·</Text>
            <Text style={styles.contactItem}>{profile.location[locale]}</Text>
            <Text style={styles.contactItem}>·</Text>
            <Text style={styles.contactItem}>linkedin.com/in/jonathan-gamez-tomoyosi</Text>
            <Text style={styles.contactItem}>·</Text>
            <Text style={styles.contactItem}>github.com/jonathan-tomoyosi</Text>
          </View>
        </View>

        <View style={styles.rule} />

        <Section title={ui.sections.about.title[locale]}>
          <Text>{profile.summary[locale]}</Text>
          <Text style={{ marginTop: 6 }}>{profile.objective[locale]}</Text>
        </Section>

        <Section title={ui.sections.experience.title[locale]}>
          {experiences.map((experience) => (
            <View key={experience.id} style={styles.entry} wrap={false}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{experience.company}</Text>
                <Text style={styles.entryMeta}>
                  {experience.period ? formatPeriod(experience.period, locale, present) : ''}
                </Text>
              </View>
              <Text style={styles.entryRole}>{experience.role[locale]}</Text>
              {experience.highlights[locale].map((highlight) => (
                <Bullet key={highlight}>{highlight}</Bullet>
              ))}
              <Text style={styles.tag}>{experience.stack.join(' · ')}</Text>
            </View>
          ))}
        </Section>

        <Section title={ui.sections.projects.title[locale]}>
          {projects.map((project) => (
            <View key={project.slug} style={styles.entry} wrap={false}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{project.name}</Text>
                <Text style={styles.entryMeta}>{ui.status[project.status][locale]}</Text>
              </View>
              <Text style={styles.entryRole}>{project.tagline[locale]}</Text>
              {/* Dois destaques por projeto: o estudo de caso completo vive no site, e
                  o PDF precisa caber no que um recrutador realmente lê. */}
              {project.highlights[locale].slice(0, 2).map((highlight) => (
                <Bullet key={highlight}>{highlight}</Bullet>
              ))}
              <Text style={styles.tag}>
                {project.stack.join(' · ')}
                {project.links?.live ? `  —  ${project.links.live}` : ''}
              </Text>
            </View>
          ))}
        </Section>

        <Section title={ui.sections.stack.title[locale]}>
          {stackGroups.map((group) => (
            <View key={group.id} style={styles.stackRow}>
              <Text>
                <Text style={styles.stackLabel}>{group.label[locale]}: </Text>
                {group.items.map((item) => item.name).join(', ')}
              </Text>
            </View>
          ))}
        </Section>

        <View style={styles.twoColumn}>
          <View style={styles.column}>
            <Section title={ui.sections.education.title[locale]}>
              {education.map((item) => (
                <View key={item.institution} style={{ marginBottom: 8 }}>
                  <Text style={styles.stackLabel}>{item.institution}</Text>
                  <Text>{item.degree[locale]}</Text>
                  <Text style={styles.entryMeta}>
                    {formatPeriod(item.period, locale, present)} · {item.status[locale]}
                  </Text>
                </View>
              ))}
            </Section>
          </View>

          <View style={styles.column}>
            <Section title={ui.language.label[locale]}>
              {languages.map((language) => (
                <Text key={language.name.pt}>
                  {language.name[locale]} — {language.level[locale]}
                </Text>
              ))}
            </Section>

            <Section title={locale === 'pt' ? 'Competências' : 'Competencies'}>
              <Text>{competencies.map((competency) => competency[locale]).join(' · ')}</Text>
            </Section>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text>
            {profile.name} — {generated}
          </Text>
          <Text
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  )
}
