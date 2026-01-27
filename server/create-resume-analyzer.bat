@echo off
echo Creating Resume Analyzer Files...

REM Create directories
if not exist "modules\resume-analysis" mkdir modules\resume-analysis
if not exist "uploads" mkdir uploads

echo 1. Creating resume.routes.js...
(
echo import express from 'express'^;
echo^
echo const router = express.Router(^)^;
echo^
echo // Upload and analyze resume
echo router.post('/upload', (req, res^) =^> ^{
echo   try ^{
echo     res.json(^{
echo       success: true,
echo       message: 'Resume upload endpoint ready!',
echo       note: 'File upload functionality will be added next'
echo     }^)^;
echo   ^} catch (error^) ^{
echo     res.status(500^).json(^\{ error: error.message ^}^)^;
echo   ^}
echo ^}^)^;
echo^
echo // Analyze text resume
echo router.post('/analyze-text', (req, res^) =^> ^{
echo   try ^{
echo     const ^\{ resumeText ^} = req.body^;
echo     ^
echo     if (!resumeText^) ^{
echo       return res.status(400^).json(^\{ error: 'Resume text is required' ^}^)^;
echo     ^}
echo     ^
echo     // Mock analysis for now
echo     const analysis = ^{
echo       score: 75,
echo       strengths: ['Good technical foundation', 'Clear communication'],
echo       weaknesses: ['Could add more project details', 'Needs quantifiable metrics'],
echo       jobMatches: [
echo         ^\{ role: 'Frontend Developer', match: 85 ^},
echo         ^\{ role: 'Full Stack Engineer', match: 78 ^}
echo       ],
echo       suggestions: [
echo         'Add GitHub links to projects',
echo         'Include specific achievements with numbers',
echo         'Tailor skills to job descriptions'
echo       ]
echo     ^}^;
echo     ^
echo     res.json(^{
echo       success: true,
echo       analysis: analysis,
echo       wordCount: resumeText.split(/\s+/^).length
echo     }^)^;
echo   ^} catch (error^) ^{
echo     res.status(500^).json(^\{ error: error.message ^}^)^;
echo   ^}
echo ^}^)^;
echo^
echo // Health check for resume module
echo router.get('/health', (req, res^) =^> ^{
echo   res.json(^{
echo     status: 'Resume analyzer module is working!',
echo     endpoints: [
echo       'POST /upload - Upload resume file',
echo       'POST /analyze-text - Analyze text resume',
echo       'GET /health - Module health check'
echo     ]
echo   }^)^;
echo ^}^)^;
echo^
echo export default router^;
) > modules\resume-analysis\resume.routes.js

echo 2. Creating simplified app.js...
(
echo // server/app.js - SIMPLIFIED WITH RESUME ANALYZER
echo import express from 'express'^;
echo import cors from 'cors'^;
echo import path from 'path'^;
echo import ^\{ fileURLToPath ^} from 'url'^;
echo^
echo const __filename = fileURLToPath(import.meta.url^)^;
echo const __dirname = path.dirname(__filename^)^;
echo^
echo const app = express(^)^;
echo^
echo // Middleware
echo app.use(cors(^)^)^;
echo app.use(express.json(^)^)^;
echo app.use(express.urlencoded(^\{ extended: true ^}^)^)^;
echo^
echo // Serve uploaded files
echo app.use('/uploads', express.static(path.join(__dirname, 'uploads'^)^)^)^;
echo^
echo // Resume Analyzer Routes
echo import resumeRoutes from './modules/resume-analysis/resume.routes.js'^;
echo app.use('/api/resume', resumeRoutes^)^;
echo^
echo // Health check
echo app.get('/api/health', (req, res^) =^> ^{
echo   res.json(^{
echo     status: 'OK',
echo     service: 'SkillMatched Resume Analyzer',
echo     version: '1.0.0',
echo     timestamp: new Date(^).toISOString(^)
echo   }^)^;
echo ^}^)^;
echo^
echo // Root endpoint
echo app.get('/', (req, res^) =^> ^{
echo   res.json(^{
echo     message: 'SkillMatched Backend API',
echo     endpoints: [
echo       'GET  /api/health - Health check',
echo       'GET  /api/resume/health - Resume module health',
echo       'POST /api/resume/upload - Upload resume file',
echo       'POST /api/resume/analyze-text - Analyze text resume'
echo     ]
echo   }^)^;
echo ^}^)^;
echo^
echo // 404 handler
echo app.use('*', (req, res^) =^> ^{
echo   res.status(404^).json(^\{ error: 'Endpoint not found' ^}^)^;
echo ^}^)^;
echo^
echo export default app^;
) > app.js

echo 3. Creating updated index.js...
(
echo // server/index.js
echo import dotenv from 'dotenv'^;
echo dotenv.config(^)^;
echo^
echo import app from './app.js'^;
echo^
echo const PORT = process.env.PORT || 5000^;
echo^
echo app.listen(PORT, (^) =^> ^{
echo   console.log(`
echo   🚀 SkillMatched Backend Started!
echo   📍 Port: ^${PORT}
echo   🔗 URL: http://localhost:^${PORT}
echo   📊 Health: http://localhost:^${PORT}/api/health
echo   `^)^;
echo   console.log('🎯 Available Endpoints:');
echo   console.log('   GET  /              - API information');
echo   console.log('   GET  /api/health    - Health check');
echo   console.log('   POST /api/resume/upload    - Upload resume');
echo   console.log('   POST /api/resume/analyze-text - Analyze text resume');
echo ^}^)^;
) > index.js

echo 4. Creating .env file...
if not exist ".env" (
  echo PORT=5000 > .env
  echo MONGO_URI=mongodb://127.0.0.1:27017/skillmatched >> .env
  echo GOOGLE_API_KEY=your_api_key_here >> .env
  echo JWT_SECRET=your_jwt_secret_here >> .env
  echo CORS_ORIGIN=http://localhost:3000 >> .env
  echo NODE_ENV=development >> .env
)

echo.
echo ✅ All files created successfully!
echo.
echo To start the server:
echo   node index.js
echo.
echo To test the API:
echo   curl http://localhost:5000/api/health
echo   curl -X POST http://localhost:5000/api/resume/analyze-text -H "Content-Type: application/json" -d "{\"resumeText\":\"Software developer with React experience\"}"
pause