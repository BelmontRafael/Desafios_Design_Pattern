import { Resume, Experience, Education } from '../interfaces';

export class ResumeBuilder {
  private resume!: Resume;

  constructor() {
    this.reset();
  }

  reset(): ResumeBuilder {
    this.resume = {
      name: '',
      contact: '',
      experiences: [],
      education: []
    };
    return this;
  }

  withName(name: string): ResumeBuilder {
    this.resume.name = name;
    return this;
  }

  withContact(contact: string): ResumeBuilder {
    this.resume.contact = contact;
    return this;
  }

  addExperience(position: string, company: string, period: string): ResumeBuilder {
    this.resume.experiences.push({ position, company, period });
    return this;
  }

  addEducation(degree: string, institution: string, period: string): ResumeBuilder {
    this.resume.education.push({ degree, institution, period });
    return this;
  }

  build(): Resume {
    const result = { ...this.resume };
    this.reset();
    return result;
  }
}