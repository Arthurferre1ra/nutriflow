import { CalculadoraNutricional, DistribuicaoMacronutrientes } from '@nutriflow/core';
import React, { useState } from 'react';
import './index.css';

interface NutriResult {
  carboidratos: number;
  proteinas: number;
  gorduras: number;
  totalKcal: number;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calc' | 'history'>('calc');
  const [kcal, setKcal] = useState<string>('');
  const [atividade, setAtividade] = useState<string>('');
  const [result, setResult] = useState<NutriResult | null>(null);

  const handleCalculate = () => {
    if (!kcal || isNaN(Number(kcal))) return;

    try {
      const calculadora = new CalculadoraNutricional();
      const distribuicao = new DistribuicaoMacronutrientes(); 
      const macronutrientes = calculadora.calcular(Number(kcal), distribuicao);

      setResult({
        carboidratos: macronutrientes.carboidratos,
        proteinas: macronutrientes.proteinas,
        gorduras: macronutrientes.gorduras,
        totalKcal: Number(kcal)
      });
    } catch (error) {
      console.error("Erro ao calcular:", error);
    }
  };

  return (
    <div className="container">
      <header style={{ padding: '60px 0', textAlign: 'center' }}>
        <h1 className="animate-fade-in" style={{ fontSize: '3.5rem', marginBottom: '10px', background: 'linear-gradient(to right, #00ff88, #60efff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          NutriFlow
        </h1>
        <p className="animate-fade-in" style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
          Alta performance nutricional para sua rotina
        </p>
      </header>

      <main>
        <div className="glass animate-fade-in" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px' }}>
            <button 
              onClick={() => setActiveTab('calc')}
              style={{ background: 'none', border: 'none', color: activeTab === 'calc' ? 'var(--primary-color)' : 'var(--text-muted)', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 600 }}
            >
              Calculadora
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              style={{ background: 'none', border: 'none', color: activeTab === 'history' ? 'var(--primary-color)' : 'var(--text-muted)', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 600 }}
            >
              Histórico
            </button>
          </div>

          {activeTab === 'calc' ? (
            <div className="calc-view">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div className="input-group">
                  <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)' }}>Atividade Física</label>
                  <input 
                    type="text" 
                    value={atividade}
                    onChange={(e) => setAtividade(e.target.value)}
                    placeholder="Ex: Corrida, Ciclismo..." 
                    className="glass" 
                    style={{ width: '100%', padding: '15px', color: 'white' }} 
                  />
                </div>
                <div className="input-group">
                  <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)' }}>Gasto Calórico (kcal)</label>
                  <input 
                    type="number" 
                    value={kcal}
                    onChange={(e) => setKcal(e.target.value)}
                    placeholder="Ex: 500" 
                    className="glass" 
                    style={{ width: '100%', padding: '15px', color: 'white' }} 
                  />
                </div>
              </div>
              
              <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <button className="btn-primary" onClick={handleCalculate}>Calcular Reposição</button>
              </div>

              {result && (
                <div className="animate-fade-in" style={{ marginTop: '40px', padding: '30px', borderTop: '1px solid var(--glass-border)' }}>
                  <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px', textAlign: 'center' }}>Resultado da Reposição</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', textAlign: 'center' }}>
                    <div className="glass-interactive" style={{ padding: '20px', borderRadius: '15px' }}>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Carboidratos</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{result.carboidratos}g</div>
                    </div>
                    <div className="glass-interactive" style={{ padding: '20px', borderRadius: '15px' }}>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Proteínas</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{result.proteinas}g</div>
                    </div>
                    <div className="glass-interactive" style={{ padding: '20px', borderRadius: '15px' }}>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Gorduras</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{result.gorduras}g</div>
                    </div>
                  </div>
                  <div style={{ marginTop: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Total: <strong>{result.totalKcal} kcal</strong>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              Nenhum registro encontrado ainda.
            </div>
          )}
        </div>
      </main>

      <footer style={{ marginTop: '100px', textAlign: 'center', padding: '40px', borderTop: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
        NutriFlow © 2026
      </footer>
    </div>
  );
};

export default App;
