'use client';

import { useQueryState, parseAsInteger, parseAsArrayOf } from 'nuqs';
import { useState, useEffect, useMemo } from 'react';
import { questions } from '../db/dataFr';
import { calculatePoliticalScore, findBestIdeologyMatches } from '../lib/scoring';
import { PoliticalScore, IdeologyMatch, ResponseValue } from '../lib/types';

export function useQuestionState() {
  // URL state pour la question courante (1-based indexing)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useQueryState(
    'q',
    parseAsInteger.withDefault(0)
  );

  // URL state pour les réponses (array de 0-6)
  const [responses, setResponses] = useQueryState(
    'r',
    parseAsArrayOf(parseAsInteger).withDefault([])
  );

  // États locaux pour les calculs
  const [score, setScore] = useState<PoliticalScore | null>(null);
  const [ideologyMatches, setIdeologyMatches] = useState<IdeologyMatch[] | null>(null);

  // Déterminer l'état actuel
  const isLanding = currentQuestionIndex === 0;
  const isQuestionnaire = currentQuestionIndex > 0 && currentQuestionIndex <= questions.length;
  const isComplete = currentQuestionIndex > questions.length || responses.length >= questions.length;
  
  // Question courante (0-indexed pour l'array)
  const currentQuestion = useMemo(() => {
    if (!isQuestionnaire) return null;
    return questions[currentQuestionIndex - 1] || null;
  }, [currentQuestionIndex, isQuestionnaire]);

  // Réponse courante pour cette question
  const currentResponse = useMemo(() => {
    if (!isQuestionnaire) return 0;
    return responses[currentQuestionIndex - 1] || 0;
  }, [responses, currentQuestionIndex, isQuestionnaire]);

  // Calculer le score quand toutes les réponses sont données
  useEffect(() => {
    if (responses.length >= questions.length) {
      // Compléter avec des 0 si nécessaire
      const completeResponses = [...responses];
      while (completeResponses.length < questions.length) {
        completeResponses.push(0);
      }
      
      try {
        const calculatedScore = calculatePoliticalScore(completeResponses);
        const matches = findBestIdeologyMatches(calculatedScore);
        setScore(calculatedScore);
        setIdeologyMatches(matches);
      } catch (error) {
        console.error('Error calculating political score:', error);
      }
    } else {
      setScore(null);
      setIdeologyMatches(null);
    }
  }, [responses]);

  // Fonctions de navigation
  const startQuestionnaire = () => {
    setCurrentQuestionIndex(1);
    setResponses([]);
  };

  const setResponse = (value: ResponseValue) => {
    const newResponses = [...responses];
    const index = currentQuestionIndex - 1;
    
    // Étendre le tableau si nécessaire
    while (newResponses.length <= index) {
      newResponses.push(0);
    }
    
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Questionnaire terminé
      setCurrentQuestionIndex(questions.length + 1);
    }
  };

  const goToQuestion = (questionNumber: number) => {
    if (questionNumber >= 1 && questionNumber <= questions.length) {
      setCurrentQuestionIndex(questionNumber);
    }
  };

  const resetQuestionnaire = () => {
    setCurrentQuestionIndex(0);
    setResponses([]);
    setScore(null);
    setIdeologyMatches(null);
  };
  
  // Calculer le progrès
  const progress = Math.min(100, Math.round((responses.filter(r => r > 0).length / questions.length) * 100));
  const answeredQuestions = responses.filter(r => r > 0).length;

  return {
    // État actuel
    isLanding,
    isQuestionnaire,
    isComplete,
    
    // Navigation
    currentQuestionIndex,
    currentQuestion,
    currentResponse,
    
    // Données
    responses,
    score,
    ideologyMatches,
    
    // Métriques
    progress,
    answeredQuestions,
    totalQuestions: questions.length,
    
    // Actions
    startQuestionnaire,
    setResponse,
    nextQuestion,
    goToQuestion,
    resetQuestionnaire
  };
}