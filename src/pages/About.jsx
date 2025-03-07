import React from "react";

function AboutPage() {
  return (
    <div className="w-full md:pb-12 md:pt-2 ">
      <div className="max-w-4xl bg-white mx-auto p-6  shadow-lg rounded-lg mt-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          About Us
        </h1>

        <div className="space-y-6">
          {/* Blog Description */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Welcome to BlogStore
            </h2>
            <p className="text-gray-600 leading-relaxed">
              BlogStore is your go-to destination for insightful articles,
              tutorials, and stories on a wide range of topics. Whether you're a
              developer, designer, or just someone who loves to learn, we've got
              something for you. Our mission is to provide high-quality content
              that inspires, educates, and entertains.
            </p>
          </section>

          {/* Author Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Meet the Author
            </h2>
            <div className="flex items-center space-x-4">
              <img
                src="/images/user.svg" // Replace with your image URL
                alt="Author"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-medium text-gray-800">
                  Vishal Pandit
                </h3>
                <p className="text-gray-600">
                  I am a passionate developer and writer with over 2 years of
                  experience in the tech industry. I love sharing my knowledge
                  and helping others grow.
                </p>
              </div>
            </div>
          </section>

          {/* Call-to-Action */}
          <section className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Join Our Community
            </h2>
            <p className="text-gray-600 mb-6">
              Stay updated with the latest posts and connect with like-minded
              individuals.
            </p>
            <button
              onClick={() => alert("Thanks for joining!")}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Subscribe Now
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
