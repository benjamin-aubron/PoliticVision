'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  answeredQuestions?: number;
  className?: string;
}

export function ProgressBar({ 
  current, 
  total, 
  answeredQuestions = current,
  className = "" 
}: ProgressBarProps) {
  const progressPercentage = Math.min(100, Math.max(0, (answeredQuestions / total) * 100));
  const questionPercentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className={`w-full ${className}`}>
      {/* Texte de progression */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium text-gray-700">
          Progression
        </div>
        <div className="text-sm text-gray-500">
          {answeredQuestions} / {total} répondues ({Math.round(progressPercentage)}%)
        </div>
      </div>
      
      {/* Barre de progression principale */}
      <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
        {/* Progression des réponses (vert) */}
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
        
        {/* Indicateur de position actuelle (bleu) */}
        {current > 0 && current <= total && (
          <div 
            className="absolute top-0 h-full w-1 bg-blue-600 shadow-lg transition-all duration-300"
            style={{ left: `${questionPercentage}%` }}
          />
        )}
      </div>
      
      {/* Détails supplémentaires */}
      <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
        <span>Question {Math.max(1, current)} / {total}</span>
        <span>
          {total - answeredQuestions} restantes
        </span>
      </div>
      
      {/* Mini indicateur de completion */}
      {progressPercentage === 100 && (
        <div className="mt-2 flex items-center justify-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-green-600 font-medium">
            Questionnaire terminé !
          </span>
        </div>
      )}
    </div>
  );
}