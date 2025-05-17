export default function CallToAction (){

 return (
  <section className="relative isolate overflow-hidden bg-gradient-to-tr from-slate-600 to-indigo-200 py-24 sm:py-28">
    {/* background blur blobs */}
    <div
      className="absolute -z-10 inset-0 opacity-30 [mask-image:radial-gradient(transparent,white)]"
      aria-hidden="true"
    />
    <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Ready to start writing?
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
        Create your first post in under a minute and join our growing community
        of distraction-free writers.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
  href="#"
  className="inline-block rounded-xl bg-white px-6 py-3 text-base font-semibold text-slate-600 shadow transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-400"
>
  Start Writing
</a>

        <a
          href="#features"
          className="text-base font-semibold leading-7 text-white hover:text-indigo-200"
        >
          Learn more →
        </a>
      </div>
    </div>
  </section>
)
}