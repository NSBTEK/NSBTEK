export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-12">
      <h1 className="text-3xl font-bold text-primary mb-4">Contact Us</h1>
      <p className="text-text-soft mb-6">Ready to transform your IT strategy and team? Fill the form below and we’ll get back to you within one business day.</p>

      <form className="space-y-4 bg-white p-6 rounded-xl shadow-soft-lg border border-outline" onSubmit={(e)=>{ e.preventDefault(); alert('Form submitted — implement your backend or use email link.'); }}>
        <div className="grid md:grid-cols-2 gap-4">
          <input required placeholder="Full name" className="border border-outline rounded-md px-4 py-2" />
          <input required placeholder="Email address" type="email" className="border border-outline rounded-md px-4 py-2" />
        </div>
        <input placeholder="Company" className="w-full border border-outline rounded-md px-4 py-2" />
        <textarea required placeholder="How can we help?" rows="5" className="w-full border border-outline rounded-md px-4 py-2" />
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-accent text-white px-6 py-3 rounded-md font-medium">Send Message</button>
          <a href="mailto:nsbtek@gmail.com" className="text-text-soft underline">Or email us directly</a>
        </div>
      </form>
    </div>
  );
}
