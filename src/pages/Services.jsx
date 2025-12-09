export default function Services() {
  const services = [
    { title: "IT Consulting", body: "Tailored strategies to optimize your technology, improve operations, and accelerate business growth." },
    { title: "Staffing Solutions", body: "Access highly skilled IT professionals ready to join your team and drive results." },
    { title: "Cloud & DevOps", body: "Seamless cloud solutions and DevOps practices for modern, scalable businesses." },
    { title: "Cybersecurity & Data Analytics", body: "Protect your data and unlock actionable insights to make smarter decisions." },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-primary">Our Services</h1>
      <p className="text-text-soft">We offer services across the entire IT lifecycle — strategy, implementation, and staffing.</p>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {services.map(s => (
          <div key={s.title} className="bg-white p-6 rounded-xl shadow-soft-lg border border-outline">
            <h3 className="font-semibold text-lg text-text-main mb-2">{s.title}</h3>
            <p className="text-text-soft">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a href="#/contact" className="inline-block bg-accent text-white px-6 py-3 rounded-md">Request a Consultation</a>
      </div>
    </div>
  );
}
