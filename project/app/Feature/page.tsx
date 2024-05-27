import React from "react";

const Feature: React.FC = () => {
  return (
    <div className="bg-black h-screen">
      <div className="bg-purple-400 w-full h-[150px] rounded-b-[50px]">
        <div className="w-full h-[50px] bg-purple-500 flex items-center">
          <span className="text-white font-semibold text-2xl pl-4">
            Math Genie
          </span>
        </div>
        <div className="flex justify-center items-center">
          <span className="text-white font-bold text-3xl pt-7">Feature</span>
        </div>
      </div>
      <div className="flex justify-around text-white text-sm px-8 py-4 pt-[6%] ">
        <div className="w-[30%]">
          <div className="flex items-start mb-4">
            <img
              src="./asserts/img1.png"
              alt="Feature 1"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h1 className="feature-heading">Fully Responsive</h1>
              <p>
                Experience the power of our website's fully functional design,
                where user-friendly interface meets cutting-edge features for a
                seamless and enjoyable online experience.
              </p>
            </div>
          </div>
          <div className="flex items-start mb-4">
            <img
              src="./asserts/img2.png"
              alt="Feature 2"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h1 className="feature-heading">Creative Design</h1>
              <p>
                Immerse yourself in the innovation of our website's creative
                design feature, where aesthetics blend seamlessly with
                functionality.
              </p>
            </div>
          </div>
          <div className="flex items-start mb-4">
            <img
              src="./asserts/img3.png"
              alt="Feature 3"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h1 className="feature-heading">Easy to Use</h1>
              <p>
                Discover the simplicity of our website's design, providing a
                hassle-free and intuitive interface for effortless navigation
                and interaction.
              </p>
            </div>
          </div>
          <div className="flex items-start mb-4">
            <img
              src="./asserts/img4.png"
              alt="Feature 4"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h1 className="feature-heading">Data Driven Insights</h1>
              <p>
                Explore our website's data-driven insights for informed
                decisions and personalized experiences.
              </p>
            </div>
          </div>
        </div>
        <div className="w-[30%]">
          <div className="flex items-start mb-4">
            <img
              src="./asserts/img5.png"
              alt="Feature 5"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h1 className="feature-heading">Well Documented</h1>
              <p>
                Benefit from our well-documented feature, ensuring clarity and
                accessibility in navigating through valuable resources and
                information on our website.
              </p>
            </div>
          </div>
          <div className="flex items-start mb-4">
            <img
              src="./asserts/img6.png"
              alt="Feature 6"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h1 className="feature-heading">Personalized Teaching</h1>
              <p>
                Experience personalized teaching on our platform for tailored
                learning journeys.
              </p>
            </div>
          </div>
          <div className="flex items-start mb-4">
            <img
              src="./asserts/img7.png"
              alt="Feature 7"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h1 className="feature-heading">Regular Evaluation</h1>
              <p>
                Engage in continuous improvement with our feature of regular
                evaluations, providing insightful assessments to enhance your
                experience and progress on our platform.
              </p>
            </div>
          </div>
          <div className="flex items-start mb-4">
            <img
              src="./asserts/img8.png"
              alt="Feature 8"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h1 className="feature-heading">Adaptive Learning</h1>
              <p>
                Immerse yourself in adaptive learning where personalized
                experiences dynamicallydynamically adjust to your progress and
                individual needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
