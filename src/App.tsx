import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Sparkles, 
  Dices, 
  Volume2, 
  VolumeX, 
  History, 
  Trash2, 
  Scroll, 
  Wand2, 
  RefreshCw, 
  ImageIcon, 
  FlaskConical,
  Feather,
  BookmarkPlus,
  BookmarkCheck,
  Layers
} from 'lucide-react';
import { 
  FantasyCharacter, 
  generateRandomCharacter, 
  getPortraitForCharacter,
  generateCharacterBackstory
} from './data/fantasyData';
import { CharacterCard } from './components/CharacterCard';
import { MyDeck } from './components/MyDeck';
import { playGenerateSound } from './utils/audio';

export default function App() {
  const [currentCharacter, setCurrentCharacter] = useState<FantasyCharacter | null>(null);
  const [history, setHistory] = useState<FantasyCharacter[]>([]);
  const [deck, setDeck] = useState<FantasyCharacter[]>(() => {
    try {
      const saved = localStorage.getItem('alchemy_fantasy_player_deck');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isRolling, setIsRolling] = useState(false);
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Sync deck to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('alchemy_fantasy_player_deck', JSON.stringify(deck));
    } catch {
      // Ignore quota errors
    }
  }, [deck]);

  // Initial character on mount
  useEffect(() => {
    const initial = generateRandomCharacter();
    const portrait = getPortraitForCharacter(initial.className, initial.name);
    initial.portraitUrl = portrait.url;
    initial.portraitTitle = portrait.title;
    setCurrentCharacter(initial);
    setHistory([initial]);
  }, []);

  // Check if current character is already in deck (to prevent accidental duplicate saves)
  const isCurrentCharacterSaved = useMemo(() => {
    if (!currentCharacter) return false;
    return deck.some(
      item => item.id === currentCharacter.id || 
        (item.name === currentCharacter.name && 
         item.className === currentCharacter.className && 
         item.backstory === currentCharacter.backstory)
    );
  }, [deck, currentCharacter]);

  // Generate Character handler (creates a brand new character with name, class, and NEW stats: Health, Mana, Strength)
  const handleGenerateCharacter = useCallback(() => {
    setIsRolling(true);

    setTimeout(() => {
      const newChar = generateRandomCharacter();
      setCurrentCharacter(newChar);
      setHistory(prev => [newChar, ...prev.slice(0, 24)]);
      setIsRolling(false);

      if (soundEnabled) {
        playGenerateSound(newChar.className);
      }
    }, 180);
  }, [soundEnabled]);

  // Generate Portrait handler (keeps existing name, class, AND stats unchanged)
  const handleGeneratePortrait = useCallback(() => {
    if (!currentCharacter || isGeneratingPortrait) return;

    setIsGeneratingPortrait(true);

    setTimeout(() => {
      const portrait = getPortraitForCharacter(
        currentCharacter.className,
        currentCharacter.name
      );

      const updatedCharacter: FantasyCharacter = {
        ...currentCharacter,
        portraitUrl: portrait.url,
        portraitTitle: portrait.title
        // Health, Mana, Strength, name, class strictly preserved
      };

      setCurrentCharacter(updatedCharacter);
      setHistory(prev => 
        prev.map(item => item.id === updatedCharacter.id ? updatedCharacter : item)
      );

      setIsGeneratingPortrait(false);

      if (soundEnabled) {
        playGenerateSound(currentCharacter.className);
      }
    }, 350);
  }, [currentCharacter, isGeneratingPortrait, soundEnabled]);

  // Regenerate Portrait handler (keeps existing name, class, AND stats unchanged)
  const handleRegeneratePortrait = useCallback(() => {
    if (!currentCharacter || isGeneratingPortrait) return;

    setIsGeneratingPortrait(true);

    setTimeout(() => {
      const portrait = getPortraitForCharacter(
        currentCharacter.className,
        currentCharacter.name,
        currentCharacter.portraitUrl
      );

      const updatedCharacter: FantasyCharacter = {
        ...currentCharacter,
        portraitUrl: portrait.url,
        portraitTitle: portrait.title
        // Health, Mana, Strength, name, class strictly preserved
      };

      setCurrentCharacter(updatedCharacter);
      setHistory(prev => 
        prev.map(item => item.id === updatedCharacter.id ? updatedCharacter : item)
      );

      setIsGeneratingPortrait(false);

      if (soundEnabled) {
        playGenerateSound(currentCharacter.className);
      }
    }, 350);
  }, [currentCharacter, isGeneratingPortrait, soundEnabled]);

  // Generate Backstory handler (keeps existing name, class, portrait, AND stats unchanged)
  const handleGenerateBackstory = useCallback(() => {
    if (!currentCharacter || isGeneratingBackstory) return;

    setIsGeneratingBackstory(true);

    setTimeout(() => {
      const newBackstory = generateCharacterBackstory(
        currentCharacter.name,
        currentCharacter.className
      );

      const updatedCharacter: FantasyCharacter = {
        ...currentCharacter,
        backstory: newBackstory
        // Health, Mana, Strength, portrait, name, class strictly preserved
      };

      setCurrentCharacter(updatedCharacter);
      setHistory(prev => 
        prev.map(item => item.id === updatedCharacter.id ? updatedCharacter : item)
      );

      setIsGeneratingBackstory(false);
    }, 280);
  }, [currentCharacter, isGeneratingBackstory]);

  // Save to Deck handler (prevents accidental duplicate saves)
  const handleSaveToDeck = useCallback(() => {
    if (!currentCharacter || isCurrentCharacterSaved) return;

    // Snapshot full character details (name, class, portrait, backstory, stats)
    const cardToSave: FantasyCharacter = { ...currentCharacter };

    setDeck(prev => [cardToSave, ...prev]);

    setSaveToast(`"${cardToSave.name}" added to My Deck!`);
    setTimeout(() => setSaveToast(null), 3000);

    if (soundEnabled) {
      playGenerateSound(cardToSave.className);
    }
  }, [currentCharacter, isCurrentCharacterSaved, soundEnabled]);

  // Remove from deck handler
  const handleRemoveFromDeck = useCallback((characterId: string) => {
    setDeck(prev => prev.filter(c => c.id !== characterId));
  }, []);

  // Clear deck handler
  const handleClearDeck = useCallback(() => {
    if (window.confirm('Clear all saved cards from My Deck?')) {
      setDeck([]);
    }
  }, []);

  // Select card from deck to inspect on workbench
  const handleSelectCharacterFromDeck = useCallback((character: FantasyCharacter) => {
    setCurrentCharacter(character);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }, []);

  // Keyboard shortcut: Space or Enter to generate new character
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === 'Space' && (e.target as HTMLElement)?.tagName !== 'BUTTON') {
        e.preventDefault();
        handleGenerateCharacter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGenerateCharacter]);

  const clearHistory = () => {
    if (currentCharacter) {
      setHistory([currentCharacter]);
    } else {
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-amber-50 flex flex-col selection:bg-amber-600 selection:text-white relative overflow-x-hidden font-sans pb-16">
      {/* Ancient Alchemist's Workbench Background Image with Moody Vignette */}
      <div 
        className="fixed inset-0 pointer-events-none bg-cover bg-center bg-no-repeat transition-all duration-1000 opacity-35"
        style={{
          backgroundImage: `url('/src/assets/images/alchemy_workbench_bg_1793691185668.jpg')`
        }}
      />
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-stone-950/85 via-stone-950/75 to-stone-950/95" />

      {/* Floating Alchemical Motes & Magical Embers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-2.5 h-2.5 rounded-full bg-amber-400 blur-xs animate-float-slow opacity-60" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-emerald-400 blur-xs animate-float-fast opacity-50" />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-purple-400 blur-xs animate-float-slow opacity-50" />
        <div className="absolute top-2/3 right-1/6 w-2.5 h-2.5 rounded-full bg-amber-300 blur-xs animate-float-fast opacity-70" />
      </div>

      {/* Toast Notification for Save to Deck */}
      {saveToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-2xl bg-amber-950/95 border-2 border-amber-400 text-amber-200 shadow-2xl font-arcane text-xs flex items-center gap-2 animate-bounce">
          <BookmarkCheck className="w-4 h-4 text-emerald-400" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Top Alchemical Navigation Bar */}
      <header className="relative z-10 border-b border-amber-900/50 bg-stone-950/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-700 via-stone-900 to-amber-900 flex items-center justify-center border-2 border-amber-500/60 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            <FlaskConical className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold font-arcane tracking-wider gold-gradient-text">
              The Alchemist&apos;s Workbench
            </h1>
            <p className="text-[11px] text-amber-400/70 font-fantasy-scribe hidden sm:block">
              Fantasy Player Card Transmutation &amp; Deck Grimoire
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Deck Quick Counter Link */}
          <button
            onClick={() => {
              const el = document.getElementById('my-deck-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-950/70 hover:bg-amber-900/70 border border-amber-600/50 text-amber-300 transition-all cursor-pointer text-xs font-arcane flex items-center gap-1.5 shadow-sm"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">My Deck</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-stone-950 font-mono text-amber-200 border border-amber-800">
              {deck.length}
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-amber-800/40 text-amber-300 hover:text-amber-100 transition-colors cursor-pointer shadow-sm"
            title={soundEnabled ? 'Mute alchemical chimes' : 'Enable alchemical chimes'}
            aria-label="Toggle audio"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-amber-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-500" />
            )}
          </button>

          {/* History Toggle */}
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold font-arcane flex items-center gap-2 transition-all cursor-pointer ${
              showHistory
                ? 'bg-amber-950/90 border-amber-500/80 text-amber-200 shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                : 'bg-stone-900/80 hover:bg-stone-800 border-amber-900/40 text-amber-300 hover:text-white'
            }`}
          >
            <History className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Roll Log</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-950/90 text-amber-300 border border-amber-700/60 font-mono">
              {history.length}
            </span>
          </button>
        </div>
      </header>

      {/* Main Alchemical Crucible Workspace */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center">
        {/* Mystic Headline & Alchemical Inscription */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-950/70 border border-amber-600/50 text-amber-300 text-xs font-arcane mb-3 shadow-[0_0_10px_rgba(212,175,55,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Mage • Warrior • Rogue • Player Cards</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black font-fantasy-name tracking-wider gold-gradient-text drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Transmute A Hero
          </h2>
          <p className="text-sm sm:text-base text-amber-200/80 font-fantasy-scribe mt-1.5">
            Conjure bordered fantasy player cards with Health, Mana &amp; Strength, and preserve them in your deck.
          </p>
        </div>

        {/* Primary Controls Toolbar */}
        <div className="flex flex-col items-center gap-3.5 mb-8 w-full max-w-2xl">
          {/* Primary Button: "Generate Character" */}
          <button
            onClick={handleGenerateCharacter}
            disabled={isRolling}
            className={`group relative w-full max-w-xs px-8 py-4 rounded-2xl font-black font-arcane text-lg sm:text-xl tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-2xl select-none gold-gradient-btn text-stone-950 ${
              isRolling 
                ? 'scale-98 opacity-90' 
                : 'hover:scale-[1.03] active:scale-95 hover:brightness-110'
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <Dices 
                className={`w-6 h-6 text-stone-950 transition-transform duration-500 ${
                  isRolling ? 'rotate-180 animate-spin text-amber-800' : 'group-hover:rotate-45'
                }`} 
              />
              <span>Generate Character</span>
            </div>
            
            {/* Golden Shimmer Light Effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:translate-x-[250%] transition-transform duration-1000" />
            </div>
          </button>

          {/* Secondary Buttons Row: "Generate Portrait", "Regenerate Portrait", "Generate Backstory", "Save to Deck" */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={handleGeneratePortrait}
              disabled={isGeneratingPortrait || !currentCharacter}
              className={`px-3.5 py-2 rounded-xl font-bold font-arcane text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                isGeneratingPortrait
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:scale-[1.02] active:scale-95'
              } bg-stone-900/90 hover:bg-stone-800 text-amber-300 border border-amber-600/50 shadow-md shadow-stone-950/60`}
            >
              <Wand2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Generate Portrait</span>
            </button>

            <button
              onClick={handleRegeneratePortrait}
              disabled={isGeneratingPortrait || !currentCharacter}
              className={`px-3.5 py-2 rounded-xl font-bold font-arcane text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                isGeneratingPortrait
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:scale-[1.02] active:scale-95'
              } bg-stone-900/90 hover:bg-stone-800 text-amber-200 border border-amber-600/50 shadow-md shadow-stone-950/60`}
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isGeneratingPortrait ? 'animate-spin' : ''}`} />
              <span>Regenerate Portrait</span>
            </button>

            <button
              onClick={handleGenerateBackstory}
              disabled={isGeneratingBackstory || !currentCharacter}
              className={`px-3.5 py-2 rounded-xl font-bold font-arcane text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                isGeneratingBackstory
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:scale-[1.02] active:scale-95'
              } bg-stone-900/90 hover:bg-stone-800 text-amber-200 border border-amber-600/50 shadow-md shadow-stone-950/60`}
            >
              <Feather className={`w-3.5 h-3.5 text-amber-400 ${isGeneratingBackstory ? 'animate-bounce' : ''}`} />
              <span>Generate Backstory</span>
            </button>

            {/* BUTTON: Save to Deck (with duplicate prevention) */}
            <button
              onClick={handleSaveToDeck}
              disabled={isCurrentCharacterSaved || !currentCharacter}
              className={`px-4 py-2 rounded-xl font-bold font-arcane text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                isCurrentCharacterSaved
                  ? 'bg-emerald-950/90 border border-emerald-500/80 text-emerald-300 cursor-default'
                  : 'gold-gradient-btn text-stone-950 hover:brightness-110 active:scale-95 shadow-md shadow-amber-950/50'
              }`}
            >
              {isCurrentCharacterSaved ? (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Saved to Deck</span>
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-3.5 h-3.5 text-stone-950" />
                  <span>Save to Deck</span>
                </>
              )}
            </button>
          </div>

          <span className="text-[11px] text-amber-400/60 font-fantasy-scribe">
            Press <kbd className="px-1.5 py-0.5 rounded bg-stone-900 border border-amber-800/60 text-amber-300 font-mono text-[10px]">Space</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-stone-900 border border-amber-800/60 text-amber-300 font-mono text-[10px]">Enter</kbd> to roll anytime
          </span>
        </div>

        {/* BORDERED FANTASY PLAYER CARD DISPLAY */}
        <div className="w-full flex justify-center">
          {currentCharacter ? (
            <div className={`w-full transition-opacity duration-200 ${isRolling ? 'opacity-60 blur-[1px]' : 'opacity-100'}`}>
              <CharacterCard 
                character={currentCharacter} 
                onGeneratePortrait={handleGeneratePortrait}
                onRegeneratePortrait={handleRegeneratePortrait}
                onGenerateBackstory={handleGenerateBackstory}
                onSaveToDeck={handleSaveToDeck}
                isSavedInDeck={isCurrentCharacterSaved}
                isGeneratingPortrait={isGeneratingPortrait}
                isGeneratingBackstory={isGeneratingBackstory}
              />
            </div>
          ) : (
            <div className="w-full max-w-lg p-10 rounded-3xl border-2 border-dashed border-amber-800/60 text-center bg-stone-950/80">
              <Scroll className="w-12 h-12 text-amber-700/60 mx-auto mb-3" />
              <h3 className="text-lg font-bold font-arcane text-amber-200">The Grimoire Lies Silent</h3>
              <p className="text-sm font-fantasy-scribe text-amber-400/60 mt-1">
                Touch &quot;Generate Character&quot; above to inscribe your first champion onto parchment.
              </p>
            </div>
          )}
        </div>

        {/* History Log Ledger Section */}
        {showHistory && (
          <div className="w-full max-w-2xl mt-10 p-5 rounded-3xl parchment-card backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/50 mb-4">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold font-arcane text-amber-200">
                  Transmutation Ledger ({history.length})
                </h3>
              </div>
              {history.length > 1 && (
                <button
                  onClick={clearHistory}
                  className="text-xs font-fantasy-scribe text-amber-400/80 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Archival Scrolls
                </button>
              )}
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {history.map((char) => {
                const isCurrent = currentCharacter?.id === char.id;
                const badgeColor = 
                  char.className === 'Mage' 
                    ? 'text-purple-300 bg-purple-950/80 border-purple-700/60' 
                    : char.className === 'Warrior' 
                    ? 'text-amber-300 bg-amber-950/80 border-amber-700/60' 
                    : 'text-emerald-300 bg-emerald-950/80 border-emerald-700/60';

                return (
                  <div
                    key={char.id}
                    onClick={() => setCurrentCharacter(char)}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      isCurrent
                        ? 'bg-amber-950/80 border-amber-500/80 ring-1 ring-amber-400/40'
                        : 'bg-stone-950/60 border-amber-900/40 hover:bg-stone-900/70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {char.portraitUrl ? (
                        <img 
                          src={char.portraitUrl} 
                          alt={char.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-lg object-cover border border-amber-700/50 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-stone-900 flex items-center justify-center border border-amber-900/50 shrink-0">
                          <ImageIcon className="w-5 h-5 text-amber-700" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase font-arcane ${badgeColor}`}>
                            {char.className}
                          </span>
                          <span className="text-sm font-bold font-fantasy-scribe text-amber-100">
                            {char.name}
                          </span>
                        </div>
                        <div className="text-xs text-amber-400/60 font-fantasy-scribe mt-0.5 line-clamp-1">
                          HP: {char.health} • MP: {char.mana} • STR: {char.strength}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      {isCurrent ? (
                        <span className="text-[10px] uppercase font-bold font-arcane text-amber-300 bg-amber-950/90 px-2 py-0.5 rounded-full border border-amber-600/50">
                          Active
                        </span>
                      ) : (
                        <span className="text-xs font-fantasy-scribe text-amber-400/60 hover:text-amber-200">
                          Inspect
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MY DECK SECTION - ALL SAVED CHARACTER CARDS */}
        <div id="my-deck-section" className="w-full">
          <MyDeck
            deck={deck}
            onSelectCharacter={handleSelectCharacterFromDeck}
            onRemoveFromDeck={handleRemoveFromDeck}
            onClearDeck={handleClearDeck}
            activeCharacterId={currentCharacter?.id}
          />
        </div>
      </main>

      {/* Alchemical Footer */}
      <footer className="relative z-10 border-t border-amber-900/40 bg-stone-950/90 py-4 px-4 text-center text-xs text-amber-400/50 font-fantasy-scribe">
        The Alchemist&apos;s Workbench • Forged with bordered player cards, Health, Mana, and Strength combat stats, and persistent Deck storage
      </footer>
    </div>
  );
}
