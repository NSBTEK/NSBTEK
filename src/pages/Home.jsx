export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-16">
      {/* Hero */}
      <section className="mt-10 rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-accent text-white rounded-xl p-12 md:p-20 shadow-soft-lg">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Powering Your Business with Top IT Talent & Innovative Solutions
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              We connect organizations with skilled IT professionals and deliver consulting solutions that drive growth, efficiency, and digital transformation.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#/contact" className="inline-block bg-white text-primary px-6 py-3 rounded-md font-medium shadow hover:scale-[1.02] transition">
                Get Started
              </a>
              <a href="#/contact" className="inline-block bg-white/20 text-white border border-white/30 px-6 py-3 rounded-md font-medium hover:bg-white/25 transition">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-6">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard title="IT Consulting" body="Tailored strategies to optimize your technology, improve operations, and accelerate business growth." />
          <ServiceCard title="Staffing Solutions" body="Access highly skilled IT professionals ready to join your team and drive results." />
          <ServiceCard title="Cloud & DevOps" body="Seamless cloud solutions and DevOps practices for modern, scalable businesses." />
          <ServiceCard title="Cybersecurity & Data Analytics" body="Protect your data and unlock actionable insights to make smarter decisions." />
        </div>
        <div className="text-center mt-8">
          <a href="#/services" className="inline-block bg-accent text-white px-6 py-3 rounded-md font-medium shadow">Explore Services</a>
        </div>
      </section>

      {/* Why Choose */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-6">Why Choose NSBTEK?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <WhyCard title="Expert Talent Network" desc="Experienced IT professionals across multiple industries." />
          <WhyCard title="Customized Solutions" desc="Solutions designed to fit your unique business needs." />
          <WhyCard title="Proven Results" desc="Successful projects delivered with measurable outcomes." />
          <WhyCard title="Trusted Partnership" desc="Long-term relationships built on integrity and excellence." />
        </div>
        <div className="text-center mt-8">
          <a href="#/contact" className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium">Partner With Us</a>
        </div>
      </section>

      {/* About */}
      <section className="bg-white rounded-xl p-8 shadow-soft-lg">
        <div className="md:flex md:items-center md:gap-8">
          <div className="md:flex-1">
            <h3 className="text-2xl font-bold text-primary mb-3">About Us</h3>
            <p className="text-text-soft mb-4">
              We are an IT consulting and staffing firm dedicated to helping businesses thrive in the digital era. From delivering strategic IT solutions to connecting you with the right talent, we turn your challenges into opportunities.
            </p>
            <a href="#/about" className="inline-block bg-accent text-white px-5 py-2 rounded-md">Learn More About Us</a>
          </div>
          <div className="md:w-1/3 mt-6 md:mt-0">
            <div className="bg-gradient-to-br from-accent/10 to-primary/10 p-6 rounded-lg border border-outline">
              <p className="text-sm text-text-soft">
                Need help with cloud migration, data engineering, or staffing? Let’s talk — we’ll identify the fastest path to value for your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer / Contact */}
      <section className="bg-primary text-white rounded-xl p-12 shadow-soft-lg">
        <div className="md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h3 className="text-2xl font-bold">Ready to transform your IT strategy and team?</h3>
            <p className="text-white/90 mt-2">Contact us today to discover how we can help your business grow.</p>
          </div>
          <div className="mt-6 md:mt-0">
            <a href="#/contact" className="inline-block bg-white text-primary px-6 py-3 rounded-md font-medium">Get in Touch</a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* Small helper components inside same file for convenience */
function ServiceCard({ title, body }) {
  return (
    <div className="bg-card p-6 rounded-xl shadow-soft-lg border border-outline hover:translate-y-[-4px] transition">
      <div className="h-12 w-12 bg-accent/10 text-accent rounded-md flex items-center justify-center mb-4 font-semibold">{title.charAt(0)}</div>
      <h4 className="font-semibold text-text-main mb-2">{title}</h4>
      <p className="text-text-soft text-sm">{body}</p>
    </div>
  );
}

function WhyCard({ title, desc }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-outline">
      <h4 className="font-semibold text-text-main mb-2">{title}</h4>
      <p className="text-text-soft text-sm">{desc}</p>
    </div>
  );
}
