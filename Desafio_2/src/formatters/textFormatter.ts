import { IResumeFormatter, Resume } from '../interfaces';

export class TextFormatter implements IResumeFormatter {
  format(resume: Resume): string {
    let result = '=== CURRÍCULO ===\n\n';
    
    result += `Nome: ${resume.name}\n`;
    result += `Contato: ${resume.contact}\n\n`;
    
    if (resume.experiences.length > 0) {
      result += 'EXPERIÊNCIA PROFISSIONAL:\n';
      resume.experiences.forEach(exp => {
        result += `• ${exp.position} - ${exp.company} (${exp.period})\n`;
      });
      result += '\n';
    }
    
    if (resume.education.length > 0) {
      result += 'FORMAÇÃO ACADÊMICA:\n';
      resume.education.forEach(edu => {
        result += `• ${edu.degree} - ${edu.institution} (${edu.period})\n`;
      });
    }
    
    return result;
  }

  getFileExtension(): string {
    return 'txt';
  }
}