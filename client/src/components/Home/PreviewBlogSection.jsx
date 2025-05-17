import {
  RocketLaunchIcon,
  PencilSquareIcon,
  CommandLineIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid'

export default function PreviewBlogSection() {
  const features = [
  {
    title: 'Instant Publishing',
    desc: 'Hit “Publish” and your words are live — no build step, no wait.',
    icon: RocketLaunchIcon,
  },
  {
    title: 'Markdown ✨',
    desc: 'Write naturally in Markdown, see rich previews instantly.',
    icon: PencilSquareIcon,
  },
  {
    title: 'Developer-friendly',
    desc: 'Export your posts as JSON, RSS, or Markdown — integrate anywhere.',
    icon: CommandLineIcon,
  },
  {
    title: 'AI-powered Drafts',
    desc: 'Stuck? One click to get AI-generated outlines or title ideas.',
    icon: SparklesIcon,
  },
]
    return (
    <section id="features" className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-slate-600">
              Built for writers
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need — nothing you don’t
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              PurePost keeps the interface minimal so you can focus on the words.
              No clutter, no distractions, just a seamless writing flow.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
