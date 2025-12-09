/**
 * Página Inicial - Exibição e Filtragem de Escala
 * 
 * Filosofia de Design: Minimalismo Institucional Aquecido
 * - Layout assimétrico de duas colunas (painel de filtros + escala)
 * - Fundo creme quente com acentos terrosos
 * - Hierarquia tipográfica clara com Playfair Display + Lato
 * - Crachás com borda tracejada para filtros
 * - Interações sutis e respeitosas
 */

import { useState, useMemo } from "react";
import {
  parseScheduleData,
  getAllParticipants,
  getAvailableMonths,
  filterSchedule,
  getDayColor,
  getDayLabel,
  getShiftLabel,
  formatDateCompact,
  ScheduleEntry,
} from "@/lib/scheduleData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  // Parse schedule data
  const allEntries = useMemo(() => parseScheduleData(), []);
  const allParticipants = useMemo(() => getAllParticipants(allEntries), []);
  const allMonths = useMemo(() => getAvailableMonths(allEntries), []);

  // Filter state
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
  const [showStatsModal, setShowStatsModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Filter participants by search query
  const filteredParticipants = useMemo(() => {
    if (!searchQuery.trim()) return allParticipants;
    return allParticipants.filter(p => 
      p.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allParticipants, searchQuery]);

  // Filter entries based on selections
  const filteredEntries = useMemo(
    () => filterSchedule(allEntries, selectedParticipants, selectedMonths),
    [allEntries, selectedParticipants, selectedMonths]
  );

  // Group filtered entries by month
  const groupedByMonth = useMemo(() => {
    const groups = new Map<number, ScheduleEntry[]>();
    filteredEntries.forEach((entry) => {
      if (!groups.has(entry.month)) {
        groups.set(entry.month, []);
      }
      groups.get(entry.month)!.push(entry);
    });
    return groups;
  }, [filteredEntries]);

  // Get month names
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Toggle participant filter
  const toggleParticipant = (name: string) => {
    setSelectedParticipants((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  // Toggle month filter
  const toggleMonth = (month: number) => {
    setSelectedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedParticipants([]);
    setSelectedMonths([]);
  };
  
  // Calculate statistics for filtered data
  const getFilteredStats = () => {
    const shiftsMap = new Map<string, number>();
    const daysMap = new Map<string, number>();
    
    filteredEntries.forEach(e => {
      const shift = getShiftLabel(e.shift);
      shiftsMap.set(shift, (shiftsMap.get(shift) || 0) + 1);
      const day = getDayLabel(e.day);
      daysMap.set(day, (daysMap.get(day) || 0) + 1);
    });
    
    const monthsSet = new Set(filteredEntries.map(e => e.month));
    
    return {
      totalAppearances: filteredEntries.length,
      months: Array.from(monthsSet),
      shifts: Object.fromEntries(shiftsMap),
      days: Object.fromEntries(daysMap),
    };
  };
  
  // Export table to print/PDF with filters info
  const exportToJPEG = () => {
    try {
      // Get all tables from the filtered entries
      const tables = Array.from(document.querySelectorAll('table'));
      if (tables.length === 0) {
        alert('Nenhuma tabela encontrada para exportar');
        return;
      }
      
      const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
      
      // Create a more elegant header with better styling
      let headerInfo = '<div style="margin-bottom: 30px; padding: 25px; background: linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%); border-radius: 8px; border-left: 5px solid #1f2937;">';
      headerInfo += '<h1 style="margin: 0 0 15px 0; font-size: 24px; font-weight: 600; color: #1f2937; font-family: Georgia, serif;">Escala para Irmãos Porteiros - 2026</h1>';
      
      if (selectedParticipants.length > 0) {
        headerInfo += '<p style="margin: 8px 0; font-size: 14px; line-height: 1.6;"><strong style="color: #1f2937; font-size: 15px;">Irmãos Selecionados:</strong> <span style="color: #374151; font-weight: 500;">' + selectedParticipants.join(' - ') + '</span></p>';
      } else {
        headerInfo += '<p style="margin: 8px 0; font-size: 14px;"><strong style="color: #1f2937; font-size: 15px;">Irmãos:</strong> <span style="color: #374151; font-weight: 500;">Todos</span></p>';
      }
      
      if (selectedMonths.length > 0) {
        const monthLabels = selectedMonths.map(m => monthNames[m - 1]).join(', ');
        headerInfo += '<p style="margin: 8px 0; font-size: 14px; line-height: 1.6;"><strong style="color: #1f2937; font-size: 15px;">Meses:</strong> <span style="color: #374151; font-weight: 500;">' + monthLabels + '</span></p>';
      } else {
        headerInfo += '<p style="margin: 8px 0; font-size: 14px;"><strong style="color: #1f2937; font-size: 15px;">Meses:</strong> <span style="color: #374151; font-weight: 500;">Todos</span></p>';
      }
      
      headerInfo += '<p style="margin: 15px 0 0 0; font-size: 12px; color: #6b7280; border-top: 1px solid #d1d5db; padding-top: 10px;">Data de Exportação: ' + new Date().toLocaleDateString('pt-BR') + '</p>';
      headerInfo += '</div>';
      
      const printWindow = window.open('', '', 'height=800,width=1200');
      if (!printWindow) {
        alert('Não foi possível abrir a janela de impressão');
        return;
      }
      
      printWindow.document.write('<html><head><title>Escala Porteiros 2026</title>');
      printWindow.document.write('<style>');
      printWindow.document.write('body { font-family: "Segoe UI", Arial, sans-serif; margin: 20px; color: #1f2937; background-color: #fff; }');
      printWindow.document.write('h1, h2 { color: #1f2937; font-family: Georgia, serif; }');
      printWindow.document.write('h2 { font-size: 18px; margin: 25px 0 15px 0; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }');
      printWindow.document.write('p { margin: 8px 0; line-height: 1.6; }');
      printWindow.document.write('table { border-collapse: collapse; width: 100%; margin: 20px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }');
      printWindow.document.write('th { background-color: #2d3748; color: white; border: 1px solid #1a202c; padding: 12px; text-align: left; font-weight: 600; font-size: 13px; letter-spacing: 0.5px; }');
      printWindow.document.write('td { border: 1px solid #e5e7eb; padding: 12px; font-size: 13px; }');
      printWindow.document.write('tr:nth-child(even) { background-color: #f9fafb; }');
      printWindow.document.write('tr:hover { background-color: #f3f4f6; }');
      printWindow.document.write('.legend { margin-top: 30px; padding: 15px; background-color: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb; }');
      printWindow.document.write('.legend strong { color: #1f2937; font-size: 14px; }');
      printWindow.document.write('.legend-item { display: inline-block; margin-right: 25px; margin-top: 8px; font-size: 13px; }');
      printWindow.document.write('.legend-color { display: inline-block; width: 18px; height: 18px; margin-right: 8px; vertical-align: middle; border-radius: 3px; }');
      printWindow.document.write('.highlighted-participant { background-color: #fbbf24; color: #78350f; font-weight: 600; padding: 2px 6px; border-radius: 3px; margin-right: 4px; }');
      printWindow.document.write('</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(headerInfo);
      
      // Write all filtered tables with month headers
      let currentMonth = -1;
      tables.forEach(table => {
        // Extract month from the table's previous h2 if available
        const monthHeader = table.parentElement?.querySelector('h2');
        if (monthHeader) {
          const monthText = monthHeader.textContent;
          printWindow.document.write('<h2>' + monthText + '</h2>');
        }
        
        // Create a cleaner table HTML with proper formatting
        let tableHtml = '<table>';
        
        // Copy headers
        const thead = table.querySelector('thead');
        if (thead) {
          tableHtml += '<thead><tr>';
          thead.querySelectorAll('th').forEach(th => {
            tableHtml += '<th>' + th.textContent + '</th>';
          });
          tableHtml += '</tr></thead>';
        }
        
        // Copy body rows with proper formatting
        tableHtml += '<tbody>';
        const tbody = table.querySelector('tbody');
        if (tbody) {
          tbody.querySelectorAll('tr').forEach(tr => {
            tableHtml += '<tr>';
            tr.querySelectorAll('td').forEach((td, idx) => {
              // Special handling for the participants column (last column)
              if (idx === 3) { // Irmãos column
                const participantSpans = Array.from(td.querySelectorAll('span'));
                const participantHtml = participantSpans.map(span => {
                  const name = span.textContent;
                  if (selectedParticipants.includes(name)) {
                    return '<span class="highlighted-participant">' + name + '</span>';
                  } else {
                    return name;
                  }
                }).join(' - ');
                tableHtml += '<td>' + participantHtml + '</td>';
              } else {
                tableHtml += '<td>' + td.textContent + '</td>';
              }
            });
            tableHtml += '</tr>';
          });
        }
        tableHtml += '</tbody></table>';
        
        printWindow.document.write(tableHtml);
      });
      
      printWindow.document.write('<div class="legend"><strong>Legenda de Cores:</strong><br/>');
      printWindow.document.write('<span class="legend-item"><span class="legend-color" style="background-color: #fef3c7;"></span>Domingo</span>');
      printWindow.document.write('<span class="legend-item"><span class="legend-color" style="background-color: #d1fae5;"></span>Quarta-feira</span>');
      printWindow.document.write('<span class="legend-item"><span class="legend-color" style="background-color: #fed7aa;"></span>Sábado</span>');
      if (selectedParticipants.length > 0) {
        printWindow.document.write('<br/><span class="legend-item"><span class="legend-color" style="background-color: #fbbf24;"></span>Irmãos Selecionados</span>');
      }
      printWindow.document.write('</div>');
      
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      
      setTimeout(() => {
        printWindow.print();
      }, 250);
    } catch (error) {
      console.error('Erro ao exportar:', error);
      alert('Erro ao exportar. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "var(--font-body)" }}>
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h1
                className="text-4xl sm:text-5xl font-light text-foreground tracking-wide"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Escala para Irmãos Porteiros
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-light tracking-wider">
                Jardim São Luiz, Barueri, SP — 2026
              </p>
            </div>
            <img src="/logo-ccb.png" alt="CCB Logo" className="h-16 w-auto flex-shrink-0" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 sm:py-8">
        <div className="space-y-8">
          {/* Filters Section */}
          <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
            {/* Search Field */}
            <div className="mb-6 relative">
              <input
                type="text"
                placeholder="Buscar irmão..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground text-xl leading-none"
                  title="Limpar busca"
                >
                  ❌
                </button>
              )}
            </div>

            {/* Participant Filters */}
            <div className="mb-8">
              <h2
                className="text-2xl font-light text-foreground mb-5 tracking-wide"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Filtrar por Irmão
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {filteredParticipants.map((participant) => (
                  <button
                    key={participant}
                    onClick={() => toggleParticipant(participant)}
                    className={`px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all border-2 border-dashed text-center ${
                      selectedParticipants.includes(participant)
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-background text-foreground border-border hover:border-accent hover:bg-secondary"
                    }`}
                  >
                    {participant}
                  </button>
                ))}
              </div>
              {selectedParticipants.length > 0 && (
                <button
                  onClick={() => setSelectedParticipants([])}
                  className="mt-3 px-3 py-2 text-xs sm:text-sm font-medium bg-secondary text-foreground rounded-md hover:bg-muted transition-colors"
                >
                  Mostrar Todos os Irmãos
                </button>
              )}
            </div>

            {/* Month Filters */}
            <div className="mb-8">
              <h2
                className="text-2xl font-light text-foreground mb-5 tracking-wide"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Filtrar por Mês
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {allMonths.map((month) => (
                  <button
                    key={month}
                    onClick={() => toggleMonth(month)}
                    className={`px-2 py-2 rounded-md text-xs font-medium transition-all border-2 border-dashed text-center ${
                      selectedMonths.includes(month)
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-background text-foreground border-border hover:border-accent hover:bg-secondary"
                    }`}
                  >
                    {monthNames[month - 1].substring(0, 3)}
                  </button>
                ))}
              </div>
              {selectedMonths.length > 0 && (
                <button
                  onClick={() => setSelectedMonths([])}
                  className="mt-3 px-3 py-2 text-xs sm:text-sm font-medium bg-secondary text-foreground rounded-md hover:bg-muted transition-colors"
                >
                  Mostrar Todos os Meses
                </button>
              )}
            </div>

            {/* Day Legend and Clear Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-border">
              <div>
                <h3
                  className="text-sm font-light text-foreground mb-3 tracking-wide uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Legenda
                </h3>
                <div className="flex flex-wrap gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-yellow-100 border border-yellow-300"></div>
                    <span>Domingo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-green-100 border border-green-300"></div>
                    <span>Quarta-feira</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-orange-100 border border-orange-300"></div>
                    <span>Sábado</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {(selectedParticipants.length > 0 || selectedMonths.length > 0) && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-blue-900">
                      <span className="font-semibold">Filtros Ativos:</span>
                      {selectedParticipants.length > 0 && (
                        <span className="ml-2">Irmãos: <span className="font-semibold">{selectedParticipants.join(', ')}</span></span>
                      )}
                      {selectedParticipants.length > 0 && selectedMonths.length > 0 && <span className="mx-2">|</span>}
                      {selectedMonths.length > 0 && (
                        <span>Meses: <span className="font-semibold">{selectedMonths.map(m => ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][m - 1]).join(', ')}</span></span>
                      )}
                    </p>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {(selectedParticipants.length > 0 || selectedMonths.length > 0) && (
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                    >
                      Limpar Filtros
                    </button>
                  )}

                  <button
                    onClick={() => setShowStatsModal(true)}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    📊 Estatísticas
                  </button>

                  <button
                    onClick={exportToJPEG}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    📥 Exportar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Display */}
          <section>
            {filteredEntries.length === 0 ? (
              <Card className="p-8 text-center border border-border">
                <p className="text-muted-foreground">
                  Nenhuma escala encontrada com os filtros selecionados.
                </p>
              </Card>
            ) : (
              <div className="space-y-6">
                {allMonths.map((month) => {
                  const monthEntries = groupedByMonth.get(month) || [];
                  if (monthEntries.length === 0) return null;

                  return (
                    <div key={month} className="space-y-3">
                      {/* Month Header */}
                      <div className="border-b-2 border-border pb-3 mb-2">
                        <h2
                          className="text-3xl font-light text-foreground tracking-wide"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {monthNames[month - 1]}
                        </h2>
                      </div>

                      {/* Schedule Table */}
                      <div className="overflow-x-auto rounded-lg border border-border shadow-sm bg-card">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-background border-b-2 border-border">
                              <th className="px-4 py-3 text-left text-xs sm:text-sm font-light text-foreground tracking-wide uppercase">
                                Data
                              </th>
                              <th className="px-4 py-3 text-left text-xs sm:text-sm font-light text-foreground tracking-wide uppercase">
                                Dia
                              </th>
                              <th className="px-4 py-3 text-left text-xs sm:text-sm font-light text-foreground tracking-wide uppercase">
                                Turno
                              </th>
                              <th className="px-4 py-3 text-left text-xs sm:text-sm font-light text-foreground tracking-wide uppercase">
                                Irmãos
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {monthEntries.map((entry, idx) => (
                              <tr
                                key={idx}
                                className="border-b border-border hover:bg-secondary/50 transition-colors"
                              >
                                <td className="px-4 py-3 text-sm text-foreground font-light">
                                  {formatDateCompact(entry.date)}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  <span
                                    className={`inline-block px-3 py-1 rounded-full text-xs font-light ${getDayColor(entry.day)}`}
                                  >
                                    {getDayLabel(entry.day)}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-foreground font-light">
                                  {getShiftLabel(entry.shift)}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  <div className="flex flex-wrap gap-2">
                                    {entry.participants.map((participant) => (
                                      <span
                                        key={participant}
                                        className={`inline-block px-2.5 py-1 rounded-sm text-xs font-light transition-colors ${
                                          selectedParticipants.includes(participant)
                                            ? "bg-accent text-accent-foreground"
                                            : "bg-muted text-muted-foreground"
                                        }`}
                                      >
                                        {participant}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>


      {/* Statistics Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl border border-border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                  Estatísticas
                </h2>
                <button
                  onClick={() => setShowStatsModal(false)}
                  className="text-muted-foreground hover:text-foreground text-2xl leading-none"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <span className="font-medium">Filtros Ativos:</span> {selectedParticipants.length > 0 ? `Irmãos: ${selectedParticipants.join(', ')}` : 'Todos'} | {selectedMonths.length > 0 ? `Meses: ${selectedMonths.map(m => ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][m - 1]).join(', ')}` : 'Todos'}
                </p>
              </div>
              
              {(() => {
                const stats = getFilteredStats();
                return (
                  <div className="space-y-3 text-sm">
                    <p><span className="font-medium">Total de Aparições:</span> {stats.totalAppearances}</p>
                    <p><span className="font-medium">Meses Cobertos:</span> {stats.months.length}</p>
                    <div>
                      <p className="font-medium mb-2">Distribuição por Turno:</p>
                      <div className="pl-4 space-y-1">
                        {Object.entries(stats.shifts).map(([shift, count]) => (
                          <p key={shift}>{shift}: {count}</p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Distribuição por Dia:</p>
                      <div className="pl-4 space-y-1">
                        {Object.entries(stats.days).map(([day, count]) => (
                          <p key={day}>{day}: {count}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
