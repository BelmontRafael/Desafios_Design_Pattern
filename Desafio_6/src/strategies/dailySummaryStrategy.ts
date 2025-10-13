import { ILogOutputStrategy } from "../interfaces/iLogOutputStrategy";
import { LogEntry } from "../models/logEntry";

export class DailySummaryStrategy implements ILogOutputStrategy {
  public readonly name: string = "Resumo Diário";

  output(logs: LogEntry[]): void {
    console.log("\n=== RESUMO DIÁRIO DE LOGS ===");
    
    if (logs.length === 0) {
      console.log("Nenhum log registrado ainda.\n");
      return;
    }

    // Agrupar por data
    const groupedByDate = this.groupByDate(logs);
    
    // Ordenar datas (mais recente primeiro)
    const sortedDates = Array.from(groupedByDate.keys()).sort((a, b) => b.getTime() - a.getTime());
    
    sortedDates.forEach(date => {
      const dateLogs = groupedByDate.get(date)!;
      const dateStr = date.toISOString().substring(0, 10);
      
      console.log(`\nData: ${this.formatDate(date)}`);
      console.log(`   Total de logs: ${dateLogs.length}`);
      
      // Agrupar por nível
      const byLevel = this.groupByLevel(dateLogs);
      byLevel.forEach((count, level) => {
        console.log(`   - ${level}: ${count} log(s)`);
      });
      
      console.log("   Primeiros logs do dia:");
      dateLogs.slice(0, 3).forEach(log => {
        const timeStr = log.timestamp.toTimeString().substring(0, 8);
        console.log(`      • ${timeStr} - ${log.message}`);
      });
    });

    console.log(`\nESTATÍSTICAS GERAIS:`);
    console.log(`   Total geral: ${logs.length} log(s)`);
    
    const minDate = new Date(Math.min(...logs.map(l => l.timestamp.getTime())));
    const maxDate = new Date(Math.max(...logs.map(l => l.timestamp.getTime())));
    console.log(`   Período: ${this.formatDate(minDate)} até ${this.formatDate(maxDate)}\n`);
  }

  private groupByDate(logs: LogEntry[]): Map<Date, LogEntry[]> {
    const map = new Map<Date, LogEntry[]>();
    
    logs.forEach(log => {
      const dateKey = new Date(log.timestamp.toISOString().substring(0, 10));
      
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)!.push(log);
    });
    
    return map;
  }

  private groupByLevel(logs: LogEntry[]): Map<string, number> {
    const map = new Map<string, number>();
    
    logs.forEach(log => {
      map.set(log.level, (map.get(log.level) || 0) + 1);
    });
    
    return map;
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}