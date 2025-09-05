
'use client';

import { useQuestionState } from '../hooks/useQuestionState';
import { QuestionCard } from '../components/questionnaire/QuestionCard';
import { ProgressBar } from '../components/questionnaire/ProgressBar';
import { ScoreDisplay } from '../components/results/ScoreDisplay';
import { IdeologyMatchComponent } from '../components/results/IdeologyMatch';

// Landing Page Component
function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          {/* Logo/Title */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4">
              🏛️ PoliticVision
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Découvrez votre positionnement politique à travers un questionnaire de 20 questions
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-4">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-800 mb-1">Analyse Multi-axe</h3>
              <p className="text-sm text-gray-600">Économique, social, autorité, environnement</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-800 mb-1">Correspondance Idéologique</h3>
              <p className="text-sm text-gray-600">Trouvez votre famille politique</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">🔗</div>
              <h3 className="font-semibold text-gray-800 mb-1">Partage de Résultats</h3>
              <p className="text-sm text-gray-600">Comparez avec vos proches</p>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={onStart}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Commencer le questionnaire
          </button>

          {/* Info */}
          <p className="text-sm text-gray-500 mt-4">
            ⏱️ Temps estimé : 5-10 minutes • 📱 Compatible mobile
          </p>
        </div>
      </div>
    </div>
  );
}

// Questionnaire Page Component
function QuestionnairePage({
  currentQuestion,
  currentQuestionIndex,
  currentResponse,
  totalQuestions,
  answeredQuestions,
  onResponse,
  onNext
}: {
  currentQuestion: any;
  currentQuestionIndex: number;
  currentResponse: number;
  totalQuestions: number;
  answeredQuestions: number;
  onResponse: (value: number) => void;
  onNext: () => void;
}) {
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❓</div>
          <h2 className="text-2xl font-bold text-gray-800">Question non trouvée</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec progression */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto p-4">
          <ProgressBar
            current={currentQuestionIndex}
            total={totalQuestions}
            answeredQuestions={answeredQuestions}
          />
        </div>
      </div>

      {/* Content */}
      <div className="py-8">
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex}
          totalQuestions={totalQuestions}
          currentResponse={currentResponse as any}
          onResponse={onResponse as any}
          onNext={onNext}
          isLastQuestion={currentQuestionIndex >= totalQuestions}
        />
      </div>
    </div>
  );
}

// Results Page Component
function ResultsPage({ 
  onReset, 
  score, 
  ideologyMatches 
}: { 
  onReset: () => void;
  score: any;
  ideologyMatches: any;
}) {
  if (!score || !ideologyMatches) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Calcul en cours...
          </h2>
          <p className="text-gray-600">
            Analyse de vos réponses en cours
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header de félicitations */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Félicitations !
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Vous avez terminé le questionnaire. Découvrez votre profil politique personnalisé.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Scores politiques */}
          <div className="lg:col-span-3">
            <ScoreDisplay score={score} />
          </div>

          {/* Correspondances idéologiques */}
          <div className="lg:col-span-2">
            <IdeologyMatchComponent 
              matches={ideologyMatches} 
              onRestart={onReset}
            />
          </div>
        </div>

        {/* Actions globales */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              🗳️ Et maintenant ?
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">📚 Approfondissez</h4>
                <p className="text-blue-700">
                  Explorez les idéologies politiques qui vous correspondent
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">🤝 Partagez</h4>
                <p className="text-green-700">
                  Comparez vos résultats avec vos proches et amis
                </p>
              </div>
            </div>
            
            <button
              onClick={onReset}
              className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              🔄 Refaire le questionnaire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function Home() {
  const {
    isLanding,
    isQuestionnaire,
    isComplete,
    currentQuestion,
    currentQuestionIndex,
    currentResponse,
    totalQuestions,
    answeredQuestions,
    score,
    ideologyMatches,
    startQuestionnaire,
    setResponse,
    nextQuestion,
    resetQuestionnaire
  } = useQuestionState();

  // Landing state
  if (isLanding) {
    return <LandingPage onStart={startQuestionnaire} />;
  }

  // Results state  
  if (isComplete) {
    return (
      <ResultsPage
        onReset={resetQuestionnaire}
        score={score}
        ideologyMatches={ideologyMatches}
      />
    );
  }

  // Questionnaire state
  if (isQuestionnaire) {
    return (
      <QuestionnairePage
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        currentResponse={currentResponse}
        totalQuestions={totalQuestions}
        answeredQuestions={answeredQuestions}
        onResponse={setResponse}
        onNext={nextQuestion}
      />
    );
  }

  // Fallback
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">⏳</div>
        <p>Chargement...</p>
      </div>
    </div>
  );
}
