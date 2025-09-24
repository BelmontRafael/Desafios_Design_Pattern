import { IResumeFormatter, Resume } from '../interfaces';

export class JsonFormatter implements IResumeFormatter {
  format(resume: Resume): string {
    return JSON.stringify(resume, null, 2);
  }

  getFileExtension(): string {
    return 'json';
  }
}