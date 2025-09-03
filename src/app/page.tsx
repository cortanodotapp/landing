export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <section className="w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row items-stretch gap-6 justify-center">
          {/* Beelliant project card */}
          <article className="flex-1 bg-card border border-border rounded-2xl shadow-md overflow-hidden">
            <img
              src="https://static.beelliant.com/og.png"
              alt="Beelliant preview"
              className="w-full h-44 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">Beelliant.com</h2>
              <p className="text-sm text-muted-foreground mb-4">A project by Cortano — visit the site to learn more.</p>
              <a
                href="https://beelliant.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:opacity-95"
              >
                Visit project
              </a>
            </div>
          </article>
          <article className="flex-1 flex justify-center items-center bg-card border border-border rounded-2xl shadow-md overflow-hidden p-6">
            <h2 className="text-2xl font-semibold text-center">Coming soon</h2>
          </article>
        </div>

        <footer className="mt-8 text-center text-xs text-muted-foreground">
          <a className="text-white rounded-md hover:opacity-95" href="https://find-and-update.company-information.service.gov.uk/company/16596976" target="_blank" rel="noopener noreferrer">© Cortano Limited</a>
        </footer>
      </section>
    </main>
  )
}
