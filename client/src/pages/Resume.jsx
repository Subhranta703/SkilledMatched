import ResumeBuilder from '../components/ResumeBuilder';

const Resume = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Resume Generator</h2>
      <ResumeBuilder />
    </div>
  );
};

export default Resume;
