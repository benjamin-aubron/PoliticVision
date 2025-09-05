'use client';

import { useState } from 'react';
import { Question, ResponseValue, RESPONSE_LABELS } from '../../lib/types';
import { cn } from '../../lib/utils';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  currentResponse?: ResponseValue;
  onResponse: (value: ResponseValue) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  currentResponse = 0,
  onResponse,
  onNext,
  isLastQuestion
}: QuestionCardProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleResponse = (value: ResponseValue) => {
    onResponse(value);
    setIsTransitioning(true);
    
    // Délai plus court pour "Ne se prononce pas" (300ms)
    // Délai normal pour les autres réponses (500ms)
    const delay = value === 0 ? 300 : 500;
    
    setTimeout(() => {
      onNext();
      setIsTransitioning(false);
    }, delay);
  };
  const responseOptions: ResponseValue[] = [1, 2, 3, 4, 5];

  const getButtonStyle = (value: ResponseValue) => {
    const isSelected = currentResponse === value;
    const baseStyle = "w-full p-4 rounded-lg border-2 transition-all duration-200 font-medium text-sm sm:text-base";
    
    if (isSelected) {
      switch (value) {
        case 0:
          return `${baseStyle} bg-gray-600 border-gray-600 text-white`;
        case 1:
          return `${baseStyle} bg-red-600 border-red-600 text-white`;
        case 2:
          return `${baseStyle} bg-red-500 border-red-500 text-white`;
        case 3:
          return `${baseStyle} bg-yellow-500 border-yellow-500 text-white`;
        case 4:
          return `${baseStyle} bg-green-500 border-green-500 text-white`;
        case 5:
          return `${baseStyle} bg-green-700 border-green-700 text-white`;
      }
    }

    // Style non sélectionné
    switch (value) {
      case 0:
        return `${baseStyle} bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400`;
      case 1:
        return `${baseStyle} bg-red-50 border-red-300 text-red-700 hover:bg-red-100 hover:border-red-400`;
      case 2:
        return `${baseStyle} bg-red-50 border-red-300 text-red-600 hover:bg-red-100 hover:border-red-400`;
      case 3:
        return `${baseStyle} bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100 hover:border-yellow-400`;
      case 4:
        return `${baseStyle} bg-green-50 border-green-300 text-green-700 hover:bg-green-100 hover:border-green-400`;
      case 5:
        return `${baseStyle} bg-green-50 border-green-500 text-green-800 hover:bg-green-100 hover:border-green-600`;
      default:
        return `${baseStyle} bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400`;
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 transition-all duration-300 ${isTransitioning ? 'opacity-75 scale-98' : ''}`}>
      {/* Header avec numéro de question */}
      <div className="text-center mb-8">
        <div className="text-sm text-gray-500 mb-2">
          Question {questionNumber} sur {totalQuestions}
        </div>
        <div className="flex flex-wrap gap-1 justify-center text-xs text-gray-400 mb-4">
          {question.categories.map((category, index) => (
            <span key={category} className="bg-gray-100 px-2 py-1 rounded">
              {category}
            </span>
          ))}
        </div>
      </div>

      {/* Question principale */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center leading-relaxed">
          {question.text}
        </h2>
      </div>

      {/* Options de réponse */}
      <div className="space-y-3">
        {/* Options 1-6 */}
        {responseOptions.map((value) => (
          <button
            key={value}
            onClick={() => handleResponse(value)}
            disabled={isTransitioning}
            className={getButtonStyle(value)}
          >
            <div className="flex items-center justify-between">
              <span className="text-left flex-1">
                {RESPONSE_LABELS[value]}
              </span>
              <span className="text-xs opacity-75 ml-2">
                {value}
              </span>
            </div>
          </button>
        ))}

        {/* Option "Ne se prononce pas" */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={() => handleResponse(0)}
            disabled={isTransitioning}
            className={getButtonStyle(0)}
          >
            <div className="flex items-center justify-center">
              <span>{RESPONSE_LABELS[0]}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Indicateur de transition */}
      {isTransitioning && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-700 font-medium">
              {isLastQuestion ? 'Calcul des résultats...' : 'Question suivante...'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}