export default function Services() {
  return (
    <div className="pt-24 px-6 max-w-5xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-primary mb-6">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold text-secondary mb-2">Cloud Solutions</h3>
          <p className="text-gray-600">Seamless migration and cloud management solutions.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold text-secondary mb-2">Data Engineering</h3>
          <p className="text-gray-600">Building data pipelines and real-time analytics platforms.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold text-secondary mb-2">Automation</h3>
          <p className="text-gray-600">Optimizing workflows through AI and automation tools.</p>
        </div>
      </div>
    </div>
  );
}
