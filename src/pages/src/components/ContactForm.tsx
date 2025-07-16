export function ContactForm() {
  return (
    <form className="space-y-4 max-w-xl mx-auto mt-10">
      <input type="text" placeholder="Your Name" className="border w-full p-2" />
      <input type="email" placeholder="Your Email" className="border w-full p-2" />
      <select className="border w-full p-2">
        <option>Immigration</option>
        <option>Estate Planning</option>
      </select>
      <textarea placeholder="Tell us more..." className="border w-full p-2 h-32"></textarea>
      <button className="bg-green-700 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}
