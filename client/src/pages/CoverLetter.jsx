import React, { useState, useRef } from 'react';

// --- MOCK ICONS ---
// In a real app, you would import these from a library like lucide-react
const Clipboard = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path></svg>;
const Check = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-500"><path d="M20 6 9 17l-5-5"></path></svg>;
const Wand2 = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.71 0L11.4 9.61a1.21 1.21 0 0 0 0 1.71l8.29 8.29a1.21 1.21 0 0 0 1.71 0l1.28-1.28a1.21 1.21 0 0 0 0-1.71L14.25 10l7.39-7.39a1.21 1.21 0 0 0 0-1.71Z"></path><path d="M11 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6"></path><path d="m22 12-2-2"></path><path d="m16 6-2-2"></path><path d="m7.5 13.5 2 2"></path><path d="m13.5 7.5 2 2"></path></svg>;
const UploadCloud = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m16 16-4-4-4 4"></path></svg>;
const FileText = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-green-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>;
const Download = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;
const RefreshCw = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M3 12a9 9 0 0 1 15-6.74L15 8"/><path d="M3 21v-5h5"/></svg>

// IMPORTANT: For this component to work, you need to add these scripts to your main index.html file
// <script src="https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/html-to-doc-js@1.0.0/dist/html-to-doc.min.js"></script>

const CoverletterAdvanced = () => {
    const [formData, setFormData] = useState({
        jobDescription: '',
        userName: '',
        tone: 'Professional',
        resumeText: '',
        resumeFileName: '',
    });
    const [generatedLetter, setGeneratedLetter] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [editedLetter, setEditedLetter] = useState('');

    const resultRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData(prev => ({
                    ...prev,
                    resumeText: event.target.result,
                    resumeFileName: file.name
                }));
            };
            reader.readAsText(file);
        }
    };

    const handleGenerateLetter = async (e) => {
        e.preventDefault();
        if (!formData.jobDescription || !formData.userName || !formData.resumeText) {
            setError('Please fill in your name, upload a resume, and paste the job description.');
            return;
        }
        setError('');
        setIsLoading(true);
        setGeneratedLetter(null);

        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

        const { userName, resumeText, jobDescription, tone } = formData;
        const skillsMatch = resumeText.match(/Skills: (.*)/i);
        const skills = skillsMatch ? skillsMatch[1] : "the skills mentioned in my resume";
        const company = jobDescription.match(/Company: (.*)/i)?.[1] || "your esteemed company";
        const role = jobDescription.match(/Role: (.*)/i)?.[1] || "the advertised position";

        let openingLine = `I am writing to express my enthusiastic interest in the ${role} position at ${company}, which I discovered on [Platform].`;
        if (tone === 'Formal') openingLine = `I am writing to formally apply for the ${role} position at ${company}.`;
        if (tone === 'Creative') openingLine = `I was thrilled to see the opening for a ${role} at ${company}, a team whose work in [mention specific work] I've long admired.`;

        let closingLine = `Thank you for your time and consideration. I am eager to discuss how my background can benefit your team.`;
        if (tone === 'Enthusiastic') closingLine = `I am incredibly excited about this opportunity and confident I can make a real impact. I look forward to hearing from you!`;
        
        const mainLetter = `Dear Hiring Manager,\n\n${openingLine} With a strong background in areas such as ${skills}, I am confident that I possess the experience and drive necessary to excel in this role.\n\nMy experience has equipped me with a robust skill set that aligns perfectly with the requirements outlined in your job description. I am particularly drawn to ${company}'s commitment to [Mention a company value or project] and believe my contributions would be a valuable asset to your team.\n\n${closingLine}\n\nSincerely,\n${userName}`;
        
        const suggestions = {
            opening: [
                `My background in [Your Key Area] makes me a strong candidate for the ${role} role at ${company}, which I learned about via [Platform].`,
                `I am writing to submit my application for the ${role} position, confident that my skills are an excellent match for your requirements.`
            ],
            closing: [
                `I have attached my resume for your review and welcome the opportunity to speak with you further.`,
                `I am available for an interview at your earliest convenience and look forward to discussing my qualifications in more detail.`
            ]
        };

        setGeneratedLetter({ main: mainLetter, suggestions });
        setEditedLetter(mainLetter);
        setIsLoading(false);
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(editedLetter);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };
    
    const handleExportPDF = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ format: 'a4' });
        doc.setFontSize(12);
        const lines = doc.splitTextToSize(editedLetter, 180); // 180mm width on A4
        doc.text(lines, 15, 20);
        doc.save(`${formData.userName.replace(' ', '_')}_Cover_Letter.pdf`);
    };

    const handleExportDOC = () => {
        const content = `<pre style="font-family: 'Times New Roman', Times, serif; font-size: 12pt;">${editedLetter}</pre>`;
        const docExporter = window.htmlToDoc;
        docExporter.create(content, null, `${formData.userName.replace(' ', '_')}_Cover_Letter.doc`);
    };
    
    const applySuggestion = (text, type) => {
        let newLetter = editedLetter;
        if (type === 'opening') {
            const regex = /(Dear Hiring Manager,[\s\S]*?)(With a strong background)/;
            newLetter = editedLetter.replace(regex, `$1${text}\n\n$2`);
        } else if (type === 'closing') {
             const regex = /(My experience has equipped me[\s\S]*?)(Sincerely,)/;
             newLetter = editedLetter.replace(regex, `$1${text}\n\n$2`);
        }
        setEditedLetter(newLetter);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="relative bg-white pt-16 pb-12">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-blue-500 opacity-5"></div>
                </div>
                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                        AI Cover Letter Suite
                    </h1>
                    <p className="mt-4 text-lg text-gray-500">
                        Craft the perfect cover letter with advanced AI assistance and export options.
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    
                    {/* --- LEFT COLUMN: FORM --- */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleGenerateLetter} className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                            <div>
                                <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Your Name</label>
                                <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} placeholder="e.g., Jane Doe" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
                            </div>
                            
                            <div>
                                <label htmlFor="tone" className="block text-sm font-medium text-gray-700">Tone of Voice</label>
                                <select name="tone" value={formData.tone} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white">
                                    <option>Professional</option>
                                    <option>Enthusiastic</option>
                                    <option>Formal</option>
                                    <option>Creative</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Your Resume</label>
                                <div className="mt-1">
                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".txt,.md" className="hidden"/>
                                    <button type="button" onClick={() => fileInputRef.current.click()} className="w-full flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-blue-500 hover:text-blue-500 transition duration-150">
                                        <UploadCloud />
                                        <span>{formData.resumeFileName || 'Upload .txt or .md file'}</span>
                                    </button>
                                </div>
                                {formData.resumeFileName && <div className="mt-2 flex items-center text-sm text-gray-600"><FileText /><span>{formData.resumeFileName}</span></div>}
                            </div>

                            <div>
                                <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">Job Description</label>
                                <textarea name="jobDescription" rows="8" value={formData.jobDescription} onChange={handleInputChange} placeholder="Paste job description here..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"></textarea>
                            </div>

                            {error && <p className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">{error}</p>}

                            <div className="text-center pt-2">
                                <button type="submit" disabled={isLoading} className="w-full inline-flex items-center justify-center bg-blue-600 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-150 ease-in-out disabled:bg-blue-400 disabled:transform-none disabled:cursor-not-allowed">
                                    {isLoading ? (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Generating...</span></>) : (<><Wand2 /><span>Generate Cover Letter</span></>)}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* --- RIGHT COLUMN: EDITOR --- */}
                    <div ref={resultRef} className="lg:col-span-3">
                        <div className="sticky top-24">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Your Cover Letter is here</h3>
                                    <div className="flex items-center space-x-2">
                                        <ActionButton onClick={handleCopy} icon={isCopied ? <Check /> : <Clipboard />} text={isCopied ? 'Copied!' : 'Copy'} />
                                        <ActionButton onClick={handleExportPDF} icon={<Download />} text="PDF" />
                                        <ActionButton onClick={handleExportDOC} icon={<Download />} text="DOC" />
                                    </div>
                                </div>
                                
                                <div className="relative">
                                    <textarea 
                                        value={editedLetter}
                                        onChange={(e) => setEditedLetter(e.target.value)}
                                        className="w-full h-[50vh] p-4 border rounded-lg resize-none text-sm leading-relaxed focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="Your generated letter will appear here..."
                                    />
                                    {isLoading && <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex justify-center items-center"><p className="text-gray-500 font-semibold">Generating your letter...</p></div>}
                                </div>

                                {generatedLetter && (
                                    <div className="mt-4 space-y-4">
                                        <SuggestionBox title="Alternative Opening Lines" suggestions={generatedLetter.suggestions.opening} onSelect={(text) => applySuggestion(text, 'opening')}/>
                                        <SuggestionBox title="Alternative Closing Lines" suggestions={generatedLetter.suggestions.closing} onSelect={(text) => applySuggestion(text, 'closing')}/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const SuggestionBox = ({ title, suggestions, onSelect }) => (
    <div>
        <h4 className="text-sm font-semibold mb-2 flex items-center text-gray-600"><RefreshCw /> {title}</h4>
        <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
                <button key={i} onClick={() => onSelect(s)} className="text-xs text-blue-800 bg-blue-100 py-1 px-3 rounded-full hover:bg-blue-200 hover:text-blue-900 transition-all duration-150">
                    {s.substring(0, 40)}...
                </button>
            ))}
        </div>
    </div>
);

const ActionButton = ({ onClick, icon, text }) => (
    <button onClick={onClick} className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-3 py-1.5 rounded-md transition-colors duration-150 text-xs">
        {icon}
        <span>{text}</span>
    </button>
);

export default CoverletterAdvanced;
