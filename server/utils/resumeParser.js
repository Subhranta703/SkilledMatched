import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export const parseResume = async (fileBuffer, fileType) => {
  try {
    let text = '';
    
    if (fileType === 'application/pdf') {
      const pdfData = await pdfParse(fileBuffer);
      text = pdfData.text;
    } else if (fileType.includes('word') || fileType.includes('document')) {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      text = result.value;
    } else if (fileType === 'text/plain') {
      text = fileBuffer.toString('utf-8');
    } else {
      throw new Error(`Unsupported file type: ${fileType}. Please use PDF, DOC, DOCX, or TXT.`);
    }
    
    // Clean the text
    const cleanedText = text
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();
    
    // Basic validation
    if (cleanedText.length < 50) {
      throw new Error('Resume text is too short (less than 50 characters). Please upload a valid resume.');
    }
    
    return {
      rawText: text,
      cleanedText,
      wordCount: cleanedText.split(/\s+/).length,
      charCount: cleanedText.length,
      hasEmail: /\S+@\S+\.\S+/.test(cleanedText),
      hasPhone: /(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/.test(cleanedText)
    };
    
  } catch (error) {
    console.error('Resume parsing error:', error);
    
    // Provide more helpful error messages
    if (error.message.includes('PDF')) {
      throw new Error('Failed to parse PDF. The file might be corrupted or password-protected.');
    } else if (error.message.includes('word')) {
      throw new Error('Failed to parse Word document. Please try converting to PDF.');
    } else {
      throw new Error(`Failed to parse document: ${error.message}`);
    }
  }
};

export default { parseResume };