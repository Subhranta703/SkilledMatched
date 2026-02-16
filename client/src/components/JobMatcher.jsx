import React, { useState, useMemo } from 'react';

// --- Helper Icon Components (using inline SVG) ---
const SearchIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const MapPinIcon = ({ className = "w-5 h-5" }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const BriefcaseIcon = ({ className = "w-5 h-5" }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
const RupeeIcon = ({ className = "w-5 h-5" }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 3h12"></path><path d="M6 8h12"></path><path d="M6 13h12"></path><path d="M6 18h12"></path><path d="M8.67 3L12 13L15.33 3"></path></svg>;
const ChevronDownIcon = ({ className = "w-5 h-5" }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>;
const BookmarkIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>;
const UsersIcon = ({ className = "w-5 h-5" }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const LinkIcon = ({ className = "w-5 h-5" }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>;
const LinkedinIcon = ({ className = "w-5 h-5" }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;


// --- Updated Mock Data (Localized for India) ---
const mockJobs = [
  { id: 1, title: 'Senior Frontend Developer', company: 'InnovateTech India', location: 'Bengaluru, KA', type: 'Full-time', salary: '₹25,00,000 - ₹35,00,000 LPA', skills: ['React', 'TypeScript', 'GraphQL'], recommended: true, openings: 2, applicants: 48, logo: 'https://placehold.co/100x100/7c3aed/ffffff?text=I',
    description: 'We are looking for a seasoned Frontend Developer to build and scale our user-facing applications. You will work with a talented team to create high-performance, responsive, and engaging web experiences.',
    requirements: ['5+ years of experience with React and its ecosystem.', 'Deep understanding of TypeScript, HTML5, and CSS3.', 'Experience with state management libraries like Redux or Zustand.', 'Familiarity with GraphQL and Apollo Client.'],
    companyDetails: { description: 'InnovateTech India is a leading product company, building the next generation of SaaS tools for a global audience from our Bengaluru R&D center.', links: { website: '#', linkedin: '#' } }
  },
  { id: 2, title: 'UX/UI Designer', company: 'Creative Minds', location: 'Mumbai, MH', type: 'Full-time', salary: '₹18,00,000 - ₹24,00,000 LPA', skills: ['Figma', 'Prototyping', 'User Research'], recommended: true, openings: 1, applicants: 72, logo: 'https://placehold.co/100x100/f59e0b/ffffff?text=C',
    description: 'Join our design team to craft intuitive and beautiful user interfaces for our mobile and web products. You will own the design process from concept to final hand-off.',
    requirements: ['A strong portfolio showcasing your UI/UX skills.', 'Proficiency in Figma, Sketch, or Adobe XD.', 'Experience conducting user research and usability testing.'],
    companyDetails: { description: 'Creative Minds is a design-first agency based in Mumbai, working with top brands in the e-commerce and fintech space.', links: { website: '#', linkedin: '#' } }
  },
  { id: 3, title: 'Backend Engineer (Python)', company: 'DataConnect', location: 'Hyderabad, TS', type: 'Full-time', salary: '₹22,00,000 - ₹30,00,000 LPA', skills: ['Python', 'Django', 'AWS'], recommended: false, openings: 4, applicants: 112, logo: 'https://placehold.co/100x100/10b981/ffffff?text=D',
    description: 'We are seeking a Python Backend Engineer to develop and maintain the server-side logic of our data platform. You will be responsible for API development, database management, and cloud infrastructure.',
    requirements: ['3+ years of experience with Python and Django/Flask.', 'Strong knowledge of SQL and NoSQL databases (PostgreSQL, MongoDB).', 'Hands-on experience with AWS services (EC2, S3, RDS).'],
    companyDetails: { description: 'DataConnect is a fast-growing startup in the data analytics space, helping businesses make smarter decisions.', links: { website: '#', linkedin: '#' } }
  },
  { id: 4, title: 'Product Manager', company: 'NextGen Solutions', location: 'Remote', type: 'Full-time', salary: '₹30,00,000 - ₹45,00,000 LPA', skills: ['Agile', 'Roadmapping', 'JIRA'], recommended: true, openings: 1, applicants: 95, logo: 'https://placehold.co/100x100/3b82f6/ffffff?text=N',
    description: 'As a Product Manager, you will define the product vision, strategy, and roadmap. You will work closely with engineering, design, and marketing to launch new features and products.',
    requirements: ['Proven experience as a Product Manager in a tech company.', 'Excellent communication and leadership skills.', 'Ability to translate business needs into technical requirements.'],
    companyDetails: { description: 'NextGen Solutions is a fully remote company dedicated to building innovative software for the future of work.', links: { website: '#', linkedin: '#' } }
  },
];

// --- Reusable Components ---

const JobDetailModal = ({ job, onClose }) => {
    const [activeTab, setActiveTab] = useState('description');

    if (!job) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="p-6 border-b">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <img src={job.logo} alt={`${job.company} logo`} className="w-16 h-16 rounded-xl" />
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                                <p className="text-gray-600">{job.company} • {job.location}</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="px-6 border-b flex">
                    <button onClick={() => setActiveTab('description')} className={`py-3 px-4 font-semibold ${activeTab === 'description' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Job Description</button>
                    <button onClick={() => setActiveTab('company')} className={`py-3 px-4 font-semibold ${activeTab === 'company' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>About Company</button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-grow">
                    {activeTab === 'description' && (
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-lg text-gray-800 mb-2">Job Description</h4>
                                <p className="text-gray-600 leading-relaxed">{job.description}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-gray-800 mb-2">Requirements</h4>
                                <ul className="list-disc list-inside space-y-2 text-gray-600">
                                    {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
                                </ul>
                            </div>
                        </div>
                    )}
                    {activeTab === 'company' && (
                        <div className="space-y-6">
                             <div>
                                <h4 className="font-bold text-lg text-gray-800 mb-2">About {job.company}</h4>
                                <p className="text-gray-600 leading-relaxed">{job.companyDetails.description}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-gray-800 mb-2">Links</h4>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href={job.companyDetails.links.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline font-semibold">
                                        <LinkIcon /> Official Website
                                    </a>
                                    <a href={job.companyDetails.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline font-semibold">
                                        <LinkedinIcon /> LinkedIn Profile
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Footer with Apply Button */}
                <div className="p-6 border-t bg-gray-50 rounded-b-2xl">
                    <div className="flex justify-end items-center gap-4">
                        <button className="font-semibold text-gray-700 bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
                            Save Job
                        </button>
                        <button className="font-semibold text-white bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const JobCard = ({ job, isRecommended = false, onViewDetails }) => {
  const [isSaved, setIsSaved] = useState(false);
  
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-4 transition-all duration-300 hover:shadow-lg hover:border-blue-500 ${isRecommended ? 'min-w-[320px] flex-shrink-0' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <img src={job.logo} alt={`${job.company} logo`} className="w-14 h-14 rounded-xl" />
          <div>
            <p className="text-sm text-gray-500">{job.company}</p>
            <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
            <p className="text-sm text-gray-600 mt-1 flex items-center gap-1"><MapPinIcon className="w-4 h-4" /> {job.location}</p>
          </div>
        </div>
        <button onClick={() => setIsSaved(!isSaved)} className={`p-2 rounded-full transition-colors ${isSaved ? 'text-blue-600 bg-blue-100' : 'text-gray-400 hover:bg-gray-100'}`}>
          <BookmarkIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {job.skills.map(skill => (
          <span key={skill} className="text-xs font-medium bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">{skill}</span>
        ))}
      </div>
       <div className="flex items-center gap-6 text-sm text-gray-600 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2" title="Open Positions">
                <BriefcaseIcon />
                <span className="font-medium">{job.openings} Openings</span>
            </div>
            <div className="flex items-center gap-2" title="Total Applicants">
                <UsersIcon />
                <span className="font-medium">{job.applicants} Applicants</span>
            </div>
        </div>
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold text-green-600">{job.salary}</p>
        <button onClick={() => onViewDetails(job)} className="font-semibold text-white bg-blue-600 px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          View Details
        </button>
      </div>
    </div>
  );
};

const SearchBar = ({ onSearchChange }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-200 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Job title, keywords, or company" className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" onChange={e => onSearchChange('keyword', e.target.value)} />
        </div>
        <div className="relative">
          <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="City, state, or remote" className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" onChange={e => onSearchChange('location', e.target.value)} />
        </div>
        <div className="relative">
            <BriefcaseIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select className="w-full appearance-none pl-12 pr-10 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" onChange={e => onSearchChange('type', e.target.value)}>
                <option value="">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
            </select>
            <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
        <button className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all shadow-lg transform hover:scale-105">
          Find Jobs
        </button>
      </div>
    </div>
  );
};


// --- Main Page Component ---
export default function JobSearchPage() {
  const [filters, setFilters] = useState({ keyword: '', location: '', type: '' });
  const [selectedJob, setSelectedJob] = useState(null);

  const handleSearchChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const keywordMatch = filters.keyword.toLowerCase() === '' || job.title.toLowerCase().includes(filters.keyword.toLowerCase()) || job.company.toLowerCase().includes(filters.keyword.toLowerCase()) || job.skills.some(skill => skill.toLowerCase().includes(filters.keyword.toLowerCase()));
      const locationMatch = filters.location.toLowerCase() === '' || job.location.toLowerCase().includes(filters.location.toLowerCase());
      const typeMatch = filters.type === '' || job.type === filters.type;
      return keywordMatch && locationMatch && typeMatch;
    });
  }, [filters]);

  const recommendedJobs = useMemo(() => mockJobs.filter(job => job.recommended), []);

  return (
    <>
      <div className="bg-gray-50 min-h-screen font-sans">
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="text-left mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">Find Your Next Opportunity</h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-600">Search through thousands of open positions in India to find your perfect match.</p>
          </div>
          <SearchBar onSearchChange={handleSearchChange} />
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">✨ Recommended For You</h2>
            <div className="flex gap-6 pb-4 -mx-4 px-4 overflow-x-auto">
              {recommendedJobs.map(job => (
                <JobCard key={job.id} job={job} isRecommended={true} onViewDetails={setSelectedJob} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Showing {filteredJobs.length} Job Matches</h2>
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} onViewDetails={setSelectedJob} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">No Jobs Found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </main>
      </div>
      <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </>
  );
}
