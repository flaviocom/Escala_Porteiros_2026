/**
 * Dados da Escala - 2026
 * 
 * Este arquivo contém a escala completa de 2026
 * Importado do arquivo JSON
 */

import scheduleJson from './schedule_2026.json';

export interface ScheduleEntry {
  date: string;
  day: string;
  shift: string;
  participants: string[];
  month: number;
}

export function parseScheduleData(): ScheduleEntry[] {
  const entries: ScheduleEntry[] = [];
  
  for (const entry of scheduleJson) {
    const date = entry.date;
    // Format: DD/MM/AAAA
    const [dayStr, monthStr, yearStr] = date.split('/');
    const month = parseInt(monthStr, 10);
    
    entries.push({
      date: date,
      day: entry.day,
      shift: entry.shift,
      participants: entry.people,
      month: month
    });
  }
  
  console.log(`Escala parseada com ${entries.length} entradas`);
  return entries;
}

export function getAllParticipants(entries: ScheduleEntry[]): string[] {
  const participants = new Set<string>();
  entries.forEach(entry => {
    entry.participants.forEach(p => participants.add(p));
  });
  return Array.from(participants).sort();
}

export function getAvailableMonths(entries: ScheduleEntry[]): number[] {
  const months = new Set<number>();
  entries.forEach(entry => months.add(entry.month));
  return Array.from(months).sort((a, b) => a - b);
}

export function filterSchedule(
  entries: ScheduleEntry[],
  selectedParticipants: string[],
  selectedMonths: number[]
): ScheduleEntry[] {
  return entries.filter(entry => {
    // If no filters selected, show all
    if (selectedParticipants.length === 0 && selectedMonths.length === 0) {
      return true;
    }
    
    // If filters selected, apply them
    const matchesParticipant = selectedParticipants.length === 0 || 
      selectedParticipants.some(p => entry.participants.includes(p));
    const matchesMonth = selectedMonths.length === 0 || 
      selectedMonths.includes(entry.month);
    
    return matchesParticipant && matchesMonth;
  });
}

export function getDayColor(day: string): string {
  switch (day) {
    case 'Domingo':
      return 'bg-yellow-100 text-yellow-800';
    case 'Quarta-feira':
      return 'bg-green-100 text-green-800';
    case 'Sábado':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getDayLabel(day: string): string {
  return day;
}

export function formatDateCompact(dateStr: string): string {
  // Input format: DD/MM/AAAA
  // Output format: D Mon (e.g., "3 Jan")
  const [dayStr, monthStr] = dateStr.split('/');
  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10);
  
  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return `${day} ${monthNames[month - 1]}`;
}

export function getShiftLabel(shift: string): string {
  switch (shift) {
    case 'Morning':
      return 'Manhã';
    case 'Night':
      return 'Noite';
    case 'Afternoon':
      return 'Tarde';
    default:
      return shift;
  }
}
