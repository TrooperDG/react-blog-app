import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components";

function ContactPage() {
  const { register, handleSubmit, reset } = useForm();
  async function sendMessage(data) {
    alert("Thanks for contacting us");
    reset();
  }
  return (
    <div className="w-full md:pb-12 md:pt-2 ">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h1>

        <div className="space-y-8">
          {/* Contact Form */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit(sendMessage)} className="space-y-4">
              <div>
                <Input
                  label="Name"
                  type="text"
                  placeholder="Your Name"
                  required
                  {...register("name")}
                />
              </div>

              <div>
                <Input
                  label="Email"
                  type="email"
                  placeholder="Your Email"
                  required
                  {...register("email")}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-1 text-gray-600 font-semibold"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  placeholder="Your Message"
                  required
                  {...register("message")}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Our Contact Information
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <strong>Email:</strong> support@blogstore.com
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong> +1 (123) 456-7890
              </p>
              <p className="text-gray-600">
                <strong>Address:</strong> 123 Blog Street, Tech City, TC 12345
              </p>
            </div>
          </section>

          {/* Map (Optional) */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Find Us on the Map
            </h2>
            <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                title="BlogStore Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d144.95373531531664!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d6a32f4f4b1!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1633033226784!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
