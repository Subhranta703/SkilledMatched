import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Briefcase, ChevronRight, Map, Check, Search, BookCopy, Link, MessageSquare, Send, X } from "lucide-react";

// --- NEW: Detailed Roadmap Data with Real Resource Links ---
const roadmapData = {
  Technical: [
    { title: "Frontend Developer", topics: [
        { name: "Phase 1: The Foundations", description: "Master the essential building blocks of the web.", resources: [{name: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web"}, {name: "freeCodeCamp", url: "https://www.freecodecamp.org/learn/"}] },
        { name: "Phase 2: JavaScript Deep Dive", description: "Go beyond the basics to understand asynchronous programming, modern ES6+ features, and the DOM.", resources: [{name: "JavaScript.info", url: "https://javascript.info/"}, {name: "Eloquent JavaScript", url: "https://eloquentjavascript.net/"}] },
        { name: "Phase 3: Component-Based Architecture", description: "Learn React for building modern, scalable user interfaces.", resources: [{name: "Official React Docs", url: "https://react.dev/"}, {name: "Scrimba - Learn React", url: "https://scrimba.com/learn/learnreact"}] },
        { name: "Phase 4: State Management", description: "Tame complex application state with tools like Redux Toolkit or Zustand.", resources: [{name: "Redux Toolkit Docs", url: "https://redux-toolkit.js.org/"}, {name: "Zustand Docs", url: "https://docs.pmnd.rs/zustand/getting-started/introduction"}] },
        { name: "Phase 5: Styling & Design Systems", description: "Explore advanced CSS, pre-processors like SASS, and component libraries.", resources: [{name: "Tailwind CSS Docs", url: "https://tailwindcss.com/docs"}, {name: "Storybook", url: "https://storybook.js.org/"}] },
        { name: "Phase 6: Testing & Optimization", description: "Ensure your applications are robust, bug-free, and performant using Jest and React Testing Library.", resources: [{name: "Testing Library Docs", url: "https://testing-library.com/"}, {name: "web.dev by Google", url: "https://web.dev/learn/performance/"}] },
    ]},
    { title: "Backend Developer", topics: [
        { name: "Phase 1: Language & Runtime", description: "Choose a language and runtime, like Node.js, Python (Django/Flask), or Go.", resources: [{name: "Node.js Guides", url: "https://nodejs.org/en/docs/guides"}, {name: "The Go Tour", url: "https://go.dev/tour/"}] },
        { name: "Phase 2: Frameworks & APIs", description: "Learn a web framework like Express to build REST or GraphQL APIs.", resources: [{name: "Express.js Docs", url: "https://expressjs.com/"}, {name: "GraphQL Docs", url: "https://graphql.org/learn/"}] },
        { name: "Phase 3: Databases", description: "Master both SQL (PostgreSQL) and NoSQL (MongoDB) databases.", resources: [{name: "MongoDB University", url: "https://learn.mongodb.com/"}, {name: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com/"}] },
        { name: "Phase 4: Authentication & Security", description: "Implement secure user authentication using JWT, OAuth, and other best practices.", resources: [{name: "OWASP Cheat Sheet Series", url: "https://cheatsheetseries.owasp.org/"}, {name: "JWT.io", url: "https://jwt.io/"}] },
        { name: "Phase 5: Caching & Performance", description: "Optimize database queries and use caching strategies with tools like Redis.", resources: [{name: "Redis University", url: "https://redis.com/try-free/"}] },
        { name: "Phase 6: Deployment & Containers", description: "Learn to containerize your application with Docker and deploy it to the cloud.", resources: [{name: "Docker Docs", url: "https://docs.docker.com/"}, {name: "DigitalOcean Deployment Guides", url: "https://www.digitalocean.com/community/tutorials/how-to-deploy-a-node-js-app-to-ubuntu-20-04"}] },
    ]},
    { title: "DevOps Engineer", topics: [
        { name: "Phase 1: Linux & Networking", description: "Gain a deep understanding of the Linux command line and networking fundamentals.", resources: [{name: "Linux Journey", url: "https://linuxjourney.com/"}, {name: "Networking basics by IBM", url: "https://www.ibm.com/topics/networking"}] },
        { name: "Phase 2: Infrastructure as Code (IaC)", description: "Automate your infrastructure provisioning with tools like Terraform or Ansible.", resources: [{name: "Terraform Learn", url: "https://developer.hashicorp.com/terraform/tutorials"}, {name: "Ansible Docs", url: "https://docs.ansible.com/"}] },
        { name: "Phase 3: CI/CD Pipelines", description: "Master continuous integration and deployment with GitHub Actions or Jenkins.", resources: [{name: "GitHub Actions Docs", url: "https://docs.github.com/en/actions"}, {name: "Jenkins Docs", url: "https://www.jenkins.io/doc/"}] },
        { name: "Phase 4: Containerization & Orchestration", description: "Learn Docker for containerizing apps and Kubernetes for managing them at scale.", resources: [{name: "Kubernetes Docs", url: "https://kubernetes.io/docs/home/"}, {name: "Docker Curriculum", url: "https://docker-curriculum.com/"}] },
        { name: "Phase 5: Cloud Platforms", description: "Become proficient in a major cloud provider like AWS, GCP, or Azure.", resources: [{name: "AWS Skill Builder", url: "https://explore.skillbuilder.aws/learn"}, {name: "Google Cloud Skills Boost", url: "https://www.cloudskillsboost.google/"}] },
        { name: "Phase 6: Monitoring & Observability", description: "Implement logging, monitoring, and alerting with tools like Prometheus and Grafana.", resources: [{name: "Prometheus Docs", url: "https://prometheus.io/docs/introduction/overview/"}, {name: "Grafana Docs", url: "https://grafana.com/docs/"}] },
    ]},
    { title: "Data Scientist", topics: [
        { name: "Phase 1: Foundational Math & Stats", description: "Solidify your understanding of Linear Algebra, Calculus, and Probability.", resources: [{name: "Khan Academy - Math", url: "https://www.khanacademy.org/math"}, {name: "StatQuest with Josh Starmer", url: "https://www.youtube.com/c/statquest"}] },
        { name: "Phase 2: Python for Data Science", description: "Master Python and its core data libraries: Pandas, NumPy, Matplotlib.", resources: [{name: "Dataquest.io", url: "https://www.dataquest.io/"}, {name: "Kaggle Learn", url: "https://www.kaggle.com/learn"}] },
        { name: "Phase 3: Machine Learning Fundamentals", description: "Learn about supervised vs. unsupervised learning, and implement algorithms with Scikit-Learn.", resources: [{name: "Scikit-Learn User Guide", url: "https://scikit-learn.org/stable/user_guide.html"}, {name: "Google's Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course"}] },
        { name: "Phase 4: Deep Learning", description: "Dive into neural networks using frameworks like TensorFlow or PyTorch.", resources: [{name: "DeepLearning.AI", url: "https://www.deeplearning.ai/"}, {name: "PyTorch Tutorials", url: "https://pytorch.org/tutorials/"}] },
        { name: "Phase 5: Data Engineering & Pipelines", description: "Understand SQL, data warehousing, and how to build ML pipelines.", resources: [{name: "SQLZoo", url: "https://sqlzoo.net/"}, {name: "The Data Engineering Cookbook", url: "https://github.com/andkret/Cookbook"}] },
        { name: "Phase 6: Specialization & Deployment", description: "Focus on an area like NLP or Computer Vision and learn to deploy models as APIs.", resources: [{name: "Hugging Face Courses", url: "https://huggingface.co/learn/nlp-course"}, {name: "FastAPI Docs", url: "https://fastapi.tiangolo.com/"}] },
    ]},
    { title: "Mobile Developer (React Native)", topics: [
        { name: "Phase 1: Core Concepts", description: "Master React Native fundamentals, including components, state, and props.", resources: [{name: "Official React Native Docs", url: "https://reactnative.dev/docs/getting-started"}] },
        { name: "Phase 2: Navigation", description: "Implement robust screen transitions and complex navigation flows with React Navigation.", resources: [{name: "React Navigation Docs", url: "https://reactnavigation.org/docs/getting-started/"}] },
        { name: "Phase 3: Advanced State Management", description: "Manage global app state with tools like Redux Toolkit or Zustand.", resources: [{name: "Zustand GitHub", url: "https://github.com/pmndrs/zustand"}] },
        { name: "Phase 4: Interacting with Native APIs", description: "Learn to use native device features like the camera, GPS, and notifications.", resources: [{name: "Expo Docs", url: "https://docs.expo.dev/"}] },
        { name: "Phase 5: Performance & Optimization", description: "Profile your app and learn techniques to ensure a smooth, native-like experience.", resources: [{name: "React Native Performance", url: "https://reactnative.dev/docs/performance"}] },
        { name: "Phase 6: Testing & Deployment", description: "Test your components and logic, and learn the process for App Store and Play Store submission.", resources: [{name: "Apple App Store Submission Guide", url: "https://developer.apple.com/app-store/submissions/"}, {name: "Google Play Store Submission Guide", url: "https://developer.android.com/studio/publish"}] },
    ]},
    { title: "Cybersecurity Analyst", topics: [
        { name: "Phase 1: IT & Networking Fundamentals", description: "Build a strong foundation in networking (TCP/IP, OSI model) and operating systems.", resources: [{name: "Professor Messer's CompTIA Training", url: "https://www.professormesser.com/"}] },
        { name: "Phase 2: Security Principles", description: "Learn the core concepts of the CIA Triad, risk management, and security policies.", resources: [{name: "SANS Institute Reading Room", url: "https://www.sans.org/reading-room/"}] },
        { name: "Phase 3: Ethical Hacking & Pen Testing", description: "Understand offensive security to better build defenses. Learn tools like Nmap and Metasploit.", resources: [{name: "TryHackMe", url: "https://tryhackme.com/"}, {name: "HackTheBox", url: "https://www.hackthebox.com/"}] },
        { name: "Phase 4: Defensive Security", description: "Master defensive tools and concepts like firewalls, IDS/IPS, and SIEM systems.", resources: [{name: "Splunk Training", url: "https://www.splunk.com/en_us/training.html"}] },
        { name: "Phase 5: Incident Response & Forensics", description: "Learn the process for handling security breaches and analyzing digital evidence.", resources: [{name: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework"}] },
        { name: "Phase 6: Cloud Security", description: "Understand the unique security challenges of cloud platforms like AWS and Azure.", resources: [{name: "AWS Security Documentation", url: "https://aws.amazon.com/security/"}] },
    ]},
  ],
  "Non-Tech": [
    { title: "UI/UX Designer", topics: [
        { name: "Phase 1: Foundations of Design", description: "Learn core principles like color theory, typography, and hierarchy.", resources: [{name: "Laws of UX", url: "https://lawsofux.com/"}, {name: "Canva Design School", url: "https://www.canva.com/designschool/"}] },
        { name: "Phase 2: User Research & Empathy", description: "Master techniques like user interviews and persona creation to understand your audience.", resources: [{name: "Nielsen Norman Group", url: "https://www.nngroup.com/"}] },
        { name: "Phase 3: Wireframing & Prototyping", description: "Become proficient in Figma or Sketch to create low and high-fidelity designs.", resources: [{name: "Figma Learn", url: "https://www.figma.com/learn/"}] },
        { name: "Phase 4: Interaction Design & Usability Testing", description: "Design intuitive user flows and validate them with real users.", resources: [{name: "Interaction Design Foundation", url: "https://www.interaction-design.org/"}] },
        { name: "Phase 5: Visual Design & Design Systems", description: "Refine your visual aesthetic and learn to build scalable design systems.", resources: [{name: "Material Design", url: "https://m3.material.io/"}] },
        { name: "Phase 6: Accessibility (A11y)", description: "Ensure your designs are inclusive and usable by people with disabilities (WCAG).", resources: [{name: "The A11Y Project", url: "https://www.a11yproject.com/"}] },
    ]},
    { title: "Product Manager", topics: [
        { name: "Phase 1: Core Concepts & Methodologies", description: "Understand the product lifecycle and master Agile/Scrum frameworks.", resources: [{name: "Atlassian Agile Coach", url: "https://www.atlassian.com/agile"}] },
        { name: "Phase 2: Market & User Research", description: "Learn to identify user needs, analyze competitors, and find market opportunities.", resources: [{name: "Product School Blog", url: "https://productschool.com/blog/"}] },
        { name: "Phase 3: Strategy & Roadmapping", description: "Define a product vision, set goals, and create a strategic roadmap.", resources: [{name: "Aha! Roadmaps Guide", url: "https://www.aha.io/roadmapping/guide"}] },
        { name: "Phase 4: Feature Prioritization & Specs", description: "Use frameworks like RICE or MoSCoW to prioritize features and write clear specifications.", resources: [{name: "ProductPlan Blog", url: "https://www.productplan.com/blog/"}] },
        { name: "Phase 5: Data Analysis & Metrics", description: "Use data to make informed decisions. Learn about A/B testing and key metrics (KPIs).", resources: [{name: "Mixpanel Blog", url: "https://mixpanel.com/blog/"}] },
        { name: "Phase 6: Leadership & Communication", description: "Master the soft skills of stakeholder management, communication, and leading a team.", resources: [{name: "SVPG Insights Blog", url: "https://www.svpg.com/articles/"}] },
    ]},
  ],
};

// --- Modal Component ---
const RequestModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: '', email: '', roadmap: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Roadmap Request Submitted:", formData);
        setIsSubmitted(true);
        setTimeout(() => {
            onClose();
            setIsSubmitted(false);
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
                <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-xl relative" onClick={(e) => e.stopPropagation()}>
                    <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"><X size={24} /></button>
                    {isSubmitted ? (
                        <div className="text-center py-8">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring' }}><Check className="w-16 h-16 bg-green-100 text-green-600 rounded-full p-3 mx-auto" /></motion.div>
                            <h3 className="text-2xl font-bold mt-4 text-slate-800">Request Sent!</h3>
                            <p className="text-slate-500 mt-2">Thank you! We'll get to work on your roadmap.</p>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">Request a New Roadmap</h3>
                            <p className="text-slate-500 mb-6">Let us know what you're looking for, and we'll do our best to create it.</p>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div><label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Your Name</label><input type="text" name="name" id="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500" /></div>
                                <div><label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Your Email</label><input type="email" name="email" id="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500" /></div>
                                <div><label htmlFor="roadmap" className="block text-sm font-medium text-slate-700 mb-1">What roadmap are you missing?</label><textarea name="roadmap" id="roadmap" required rows="3" value={formData.roadmap} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"></textarea></div>
                                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors transform hover:scale-105"><Send size={18} /> Submit Request</button>
                            </form>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// --- Main Roadmap Component ---
const LearningRoadmap = () => {
  const [selectedRoadmap, setSelectedRoadmap] = useState(roadmapData.Technical[0]);
  const [completedTopics, setCompletedTopics] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectRoadmap = (roadmap) => {
    setSelectedRoadmap(null);
    setTimeout(() => setSelectedRoadmap(roadmap), 150);
  };

  const toggleTopicCompletion = (roadmapTitle, topicName) => {
    const currentCompleted = completedTopics[roadmapTitle] || [];
    const isCompleted = currentCompleted.includes(topicName);
    const newCompleted = isCompleted ? currentCompleted.filter(t => t !== topicName) : [...currentCompleted, topicName];
    setCompletedTopics({ ...completedTopics, [roadmapTitle]: newCompleted });
  };

  const filteredRoadmapData = useMemo(() => {
    if (!searchTerm) return roadmapData;
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = {};
    for (const type in roadmapData) {
      const roles = roadmapData[type].filter(role => role.title.toLowerCase().includes(lowercasedFilter));
      if (roles.length > 0) filtered[type] = roles;
    }
    return filtered;
  }, [searchTerm]);

  const progress = useMemo(() => {
    if (!selectedRoadmap) return 0;
    const completedCount = (completedTopics[selectedRoadmap.title] || []).length;
    const totalTopics = selectedRoadmap.topics.length;
    return totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0;
  }, [selectedRoadmap, completedTopics]);

  return (
    <>
      <RequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="min-h-screen bg-slate-50 font-sans">
        <div className="text-center py-16 px-4 bg-gradient-to-br from-sky-50 to-indigo-100">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-white/80 text-indigo-600 font-semibold px-4 py-2 rounded-full mb-4 shadow-sm"><Map size={18} /><span>Your Learning Journey</span></div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Interactive Roadmaps</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">Search for a role, select a path, and track your progress toward mastery.</p>
          </motion.div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-12 gap-8">
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-24 space-y-8">
                <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} /><input type="text" placeholder="Search for a role..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" /></div>
                {Object.keys(filteredRoadmapData).length > 0 ? Object.entries(filteredRoadmapData).map(([type, roles]) => (
                  <div key={type}>
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">{type === "Technical" ? <Code className="text-indigo-500" /> : <Briefcase className="text-green-500" />} {type} Roles</h2>
                    <div className="space-y-2">{roles.map((role) => (<button key={role.title} onClick={() => handleSelectRoadmap(role)} className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex justify-between items-center ${selectedRoadmap?.title === role.title ? "bg-indigo-600 text-white shadow-lg" : "bg-white text-slate-700 hover:bg-slate-100"}`}><span className="font-medium">{role.title}</span><ChevronRight size={18} className={`transition-transform ${selectedRoadmap?.title === role.title ? 'translate-x-1' : ''}`} /></button>))}</div>
                  </div>
                )) : <p className="text-slate-500 text-center">No roles found.</p>}
              </div>
            </aside>
            <main className="lg:col-span-8 xl:col-span-9 space-y-8">
              <AnimatePresence mode="wait">
                {selectedRoadmap ? (
                  <motion.div key={selectedRoadmap.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                      <div className="mb-8"><div className="flex items-center gap-4 mb-4"><div className="bg-indigo-100 text-indigo-600 p-3 rounded-full"><BookCopy size={24} /></div><div><h2 className="text-3xl font-bold text-slate-900">{selectedRoadmap.title}</h2><p className="text-slate-500">A step-by-step guide to mastering this role.</p></div></div><div className="w-full bg-slate-200 rounded-full h-2.5"><motion.div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }} transition={{ duration: 0.5 }}></motion.div></div><p className="text-right text-sm text-slate-500 mt-1">{Math.round(progress)}% Complete</p></div>
                      <div className="relative border-l-2 border-slate-200 ml-4">
                        {selectedRoadmap.topics.map((topic, index) => {
                          const isCompleted = (completedTopics[selectedRoadmap.title] || []).includes(topic.name);
                          return (
                            <motion.div key={topic.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="mb-8 pl-10 relative">
                              <div className={`absolute -left-4 top-1 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isCompleted ? 'bg-green-500' : 'bg-indigo-500'}`}><span className="text-white font-bold text-xs">{index + 1}</span></div>
                              <div className="flex items-start justify-between">
                                <div><h3 className="font-semibold text-lg text-slate-800">{topic.name}</h3><p className="text-sm text-slate-500 mt-1">{topic.description}</p></div>
                                <button onClick={() => toggleTopicCompletion(selectedRoadmap.title, topic.name)} className={`ml-4 flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${isCompleted ? 'bg-green-500 border-green-500' : 'bg-white border-slate-300'}`}>{isCompleted && <Check className="text-white" size={16} />}</button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mt-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Learning Resources</h3>
                        <div className="space-y-4">
                            {selectedRoadmap.topics.map((topic) => (
                                <div key={topic.name}>
                                    <h4 className="font-semibold text-slate-700">{topic.name}</h4>
                                    <div className="mt-2 space-y-2">
                                        {topic.resources.map(resource => (
                                            <a href={resource.url} target="_blank" rel="noopener noreferrer" key={resource.name} className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors group">
                                                <div className="flex items-center gap-3"><Link className="text-slate-400" size={16} /><span className="text-slate-600">{resource.name}</span></div>
                                                <button className="text-indigo-500 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">Visit</button>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center h-96 bg-white rounded-2xl shadow-xl border border-slate-100"><p className="text-slate-500">Select a role to view its roadmap.</p></div>
                )}
              </AnimatePresence>
            </main>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }} className="bg-gradient-to-r from-indigo-500 to-sky-500 text-white p-8 rounded-2xl text-center shadow-lg">
              <div className="flex justify-center mb-4"><MessageSquare size={32} /></div>
              <h3 className="text-2xl font-bold">Can't Find Your Roadmap?</h3>
              <p className="mt-2 max-w-2xl mx-auto opacity-90">Let us know what role you're interested in. We are constantly expanding our library and will prioritize community requests.</p>
              <button onClick={() => setIsModalOpen(true)} className="mt-6 inline-flex items-center gap-2 bg-white text-indigo-600 font-bold px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-transform">
                  <Send size={18} />
                  Request a Path
              </button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LearningRoadmap;
