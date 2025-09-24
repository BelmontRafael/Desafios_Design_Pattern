import * as fs from 'fs';
import { ResumeBuilder } from './builder/resumeeBuilder';
import { UserInputHelper } from './utils/userInputHelper';
import { IResumeFormatter } from './interfaces';
import { TextFormatter } from './formatters/textFormatter';
import { JsonFormatter } from './formatters/jsonFormatter';

export class ResumeApp {
  private builder: ResumeBuilder;
  private inputHelper: UserInputHelper;
  private formatters: IResumeFormatter[];

  constructor() {
    this.builder = new ResumeBuilder();
    this.inputHelper = UserInputHelper.getInstance();
    this.formatters = [new TextFormatter(), new JsonFormatter()];
  }

  async run(): Promise<void> {
    console.log('=== GERADOR DE CURRÍCULOS ===\n');
    
    while (true) {
      const command = await this.inputHelper.question('Digite "criar" para novo currículo ou "sair" para encerrar');
      
      if (command.toLowerCase() === 'sair') {
        this.inputHelper.close();
        console.log('Encerrando...');
        break;
      }
      
      if (command.toLowerCase() === 'criar') {
        await this.createResume();
      } else if (command) {
        console.log('Comando inválido! Use "criar" ou "sair".\n');
      }
    }
  }

  private async createResume(): Promise<void> {
    try {
      console.log('\n--- Criando Currículo ---');
      
      const name = await this.inputHelper.question('Nome completo');
      const contact = await this.inputHelper.question('Contato (email/telefone)');
      
      this.builder.withName(name).withContact(contact);
      
      await this.addExperiences();
      
      await this.addEducation();
      
      const resume = this.builder.build();
      await this.saveResume(resume);
      
      console.log('\nCurrículo criado com sucesso!\n');
      
    } catch (error) {
      console.log(`Erro ao criar currículo: ${error}\n`);
    }
  }

  private async addExperiences(): Promise<void> {
    console.log('\n--- Experiência Profissional ---');
    
    while (true) {
      const add = await this.inputHelper.question('Adicionar experiência? (s/n)');
      
      if (add.toLowerCase() !== 's') break;
      
      const position = await this.inputHelper.question('Cargo');
      const company = await this.inputHelper.question('Empresa');
      const period = await this.inputHelper.question('Período (ex: 2020-2024)');
      
      this.builder.addExperience(position, company, period);
    }
  }

  private async addEducation(): Promise<void> {
    console.log('\n--- Formação Acadêmica ---');
    
    while (true) {
      const add = await this.inputHelper.question('Adicionar formação? (s/n)');
      
      if (add.toLowerCase() !== 's') break;
      
      const degree = await this.inputHelper.question('Curso/Grau');
      const institution = await this.inputHelper.question('Instituição');
      const period = await this.inputHelper.question('Período (ex: 2018-2022)');
      
      this.builder.addEducation(degree, institution, period);
    }
  }

  private async saveResume(resume: any): Promise<void> {
    const fileName = resume.name.replace(/\s+/g, '_').toLowerCase();
    
    for (const formatter of this.formatters) {
      const content = formatter.format(resume);
      const fullFileName = `${fileName}.${formatter.getFileExtension()}`;
      
      fs.writeFileSync(fullFileName, content, 'utf-8');
      console.log(`Salvo: ${fullFileName}`);
    }
  }
}