import React, { useState } from 'react';
import { 
  Sparkles, 
  Shield, 
  Sword, 
  Check, 
  Copy, 
  Zap, 
  Award,
  BookOpen,
  Image as ImageIcon,
  RefreshCw,
  Wand2,
  FlaskConical,
  ScrollText,
  Feather,
  Heart,
  Droplet,
  Dumbbell,
  BookmarkCheck,
  BookmarkPlus
} from 'lucide-react';
import { FantasyCharacter, CLASS_DETAILS } from '../data/fantasyData';

const DaggerIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
    <line x1="13" y1="19" x2="19" y2="13" />
    <line x1="16" y1="16" x2="20" y2="20" />
    <line x1="19" y1="21" x2="21" y2="19" />
  </svg>
);

const CardCornerGilding = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const rotation = {
    tl: '',
    tr: 'rotate-90',
    br: 'rotate-180',
    bl: '-rotate-90'
  }[position];

  return (
    <svg 
      className={`absolute w-7 h-7 text-amber-400 pointer-events-none transform ${rotation} ${
        position.includes('t') ? 'top-1.5' : 'bottom-1.5'
      } ${position.includes('l') ? 'left-1.5' : 'right-1.5'}`} 
      viewBox="0 0 28 28" 
      fill="currentColor"
    >
      <path d="M2 2h10v2H4v8H2V2zm0 14h2v8h8v2H2v-10zm14-14h10v10h-2V4h-8V2zm8 14h2v10H16v-2h8v-8z" opacity="0.8" />
      <circle cx="6" cy="6" r="2" fill="#ffd700" />
      <polygon points="4,4 12,4 4,12" fill="#d4af37" opacity="0.6" />
    </svg>
  );
};

interface CharacterCardProps {
  character: FantasyCharacter;
  onGeneratePortrait: () => void;
  onRegeneratePortrait: () => void;
  onGenerateBackstory: () => void;
  onSaveToDeck?: () => void;
  isSavedInDeck?: boolean;
  isGeneratingPortrait?: boolean;
  isGeneratingBackstory?: boolean;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ 
  character,
  onGeneratePortrait,
  onRegeneratePortrait,
  onGenerateBackstory,
  onSaveToDeck,
  isSavedInDeck = false,
  isGeneratingPortrait = false,
  isGeneratingBackstory = false
}) => {
  const [copied, setCopied] = useState(false);
  const details = CLASS_DETAILS[character.className];

  const handleCopy = () => {
    const text = `🃏 FANTASY PLAYER CARD
Name: ${character.name}
Class: ${character.className} (${character.race})
Stats: Health ${character.health} | Mana ${character.mana} | Strength ${character.strength}
Origin Story: ${character.backstory}
Armament: ${character.weapon}
Ability: ${character.ability}
Attributes: STR ${character.stats.strength} | DEX ${character.stats.dexterity} | INT ${character.stats.intelligence} | CON ${character.stats.constitution} | WIS ${character.stats.wisdom} | CHA ${character.stats.charisma}
Inscription: ${character.quote}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getClassIcon = () => {
    switch (character.className) {
      case 'Mage':
        return <Sparkles className="w-5 h-5 text-purple-300 animate-pulse" />;
      case 'Warrior':
        return <Sword className="w-5 h-5 text-amber-300" />;
      case 'Rogue':
        return <DaggerIcon className="w-5 h-5 text-emerald-300" />;
    }
  };

  // Percentage calculations for stat bars (out of maxStat = 150)
  const healthPercent = Math.min(100, Math.round((character.health / character.maxStat) * 100));
  const manaPercent = Math.min(100, Math.round((character.mana / character.maxStat) * 100));
  const strengthPercent = Math.min(100, Math.round((character.strength / character.maxStat) * 100));

  return (
    <div 
      className={`relative w-full max-w-lg mx-auto rounded-3xl p-5 sm:p-7 parchment-card transition-all duration-500 text-amber-50 shadow-2xl overflow-hidden border-4 ${details.cardBorder}`}
    >
      {/* Gilded Double Border & Ornate Corners */}
      <div className="absolute inset-1.5 rounded-[22px] border border-amber-500/40 pointer-events-none" />
      <CardCornerGilding position="tl" />
      <CardCornerGilding position="tr" />
      <CardCornerGilding position="bl" />
      <CardCornerGilding position="br" />

      {/* Decorative Card Header with Class Badge & Rarity Seal */}
      <div className="relative flex items-center justify-between pb-3 mb-2 border-b border-amber-900/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-stone-900/90 border border-amber-500/60 shadow-inner flex items-center justify-center">
            {getClassIcon()}
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-widest border font-arcane ${details.badgeBg}`}>
            {character.className}
          </span>
          <span className="text-xs font-fantasy-scribe text-amber-300/80">
            • {character.race}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Save to Deck Quick Button */}
          {onSaveToDeck && (
            <button
              onClick={onSaveToDeck}
              disabled={isSavedInDeck}
              title={isSavedInDeck ? 'Already in your deck' : 'Save to Deck'}
              className={`px-3 py-1 rounded-xl text-xs font-arcane font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isSavedInDeck
                  ? 'bg-emerald-950/80 border border-emerald-500/80 text-emerald-300 cursor-default'
                  : 'gold-gradient-btn text-stone-950 hover:brightness-110 active:scale-95'
              }`}
            >
              {isSavedInDeck ? (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>In Deck</span>
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-3.5 h-3.5 text-stone-950" />
                  <span>Save to Deck</span>
                </>
              )}
            </button>
          )}

          {/* Transcribe Button */}
          <button
            onClick={handleCopy}
            title="Transcribe card text"
            className="p-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/60 border border-amber-700/50 text-amber-300 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* CHARACTER NAME - PROMINENTLY DISPLAYED IN FANTASY FONT */}
      <div className="relative text-center my-3">
        <h2 className="font-fantasy-name text-2xl sm:text-4xl font-extrabold tracking-wider gold-gradient-text drop-shadow-[0_4px_10px_rgba(0,0,0,0.95)]">
          {character.name}
        </h2>
        <p className="text-xs text-amber-400/80 font-fantasy-scribe italic mt-0.5">
          {character.title}
        </p>
      </div>

      {/* PORTRAIT DISPLAY INSIDE CARD FRAME */}
      <div className="relative my-3 flex flex-col items-center">
        <div className="w-full max-w-[280px] sm:max-w-[320px] relative">
          {character.portraitUrl ? (
            <div className="relative group rounded-2xl overflow-hidden border-2 border-amber-500/80 bg-stone-950 shadow-[0_0_20px_rgba(212,175,55,0.25)] ring-1 ring-amber-400/30">
              <div className="aspect-square w-full relative overflow-hidden bg-stone-950 flex items-center justify-center">
                <img
                  src={character.portraitUrl}
                  alt={`${character.name} fantasy player card portrait`}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                    isGeneratingPortrait ? 'scale-105 blur-xs opacity-40' : 'opacity-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20 pointer-events-none" />

                {isGeneratingPortrait && (
                  <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2 text-amber-300">
                    <RefreshCw className="w-7 h-7 animate-spin text-amber-400" />
                    <span className="text-xs font-fantasy-scribe tracking-wider">
                      Transmuting Visage...
                    </span>
                  </div>
                )}
              </div>

              {/* Portrait Caption */}
              <div className="py-1 px-3 bg-stone-950/95 border-t border-amber-700/50 text-center flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-200 font-arcane truncate max-w-[190px]">
                  {character.portraitTitle || `${character.className} Visage`}
                </span>
                <span className="text-[10px] text-amber-400/70 font-fantasy-scribe">
                  Card Art
                </span>
              </div>
            </div>
          ) : (
            <div className="aspect-square w-full rounded-2xl border-2 border-dashed border-amber-800/60 bg-stone-950/80 flex flex-col items-center justify-center p-4 text-center">
              <ImageIcon className="w-8 h-8 text-amber-500/60 mb-2" />
              <p className="text-xs font-fantasy-scribe text-amber-300/70">
                Generate a portrait for this player card.
              </p>
            </div>
          )}
        </div>

        {/* Card Portrait Action Controls */}
        <div className="flex items-center justify-center gap-2 mt-2.5">
          <button
            onClick={onGeneratePortrait}
            disabled={isGeneratingPortrait}
            className="px-3 py-1 rounded-lg text-[11px] font-bold font-arcane uppercase tracking-wider bg-stone-900/90 hover:bg-stone-800 text-amber-300 border border-amber-600/50 flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Wand2 className="w-3 h-3 text-amber-400" />
            <span>Generate Portrait</span>
          </button>
          <button
            onClick={onRegeneratePortrait}
            disabled={isGeneratingPortrait}
            className="px-3 py-1 rounded-lg text-[11px] font-bold font-arcane uppercase tracking-wider bg-stone-900/90 hover:bg-stone-800 text-amber-200 border border-amber-600/50 flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <RefreshCw className={`w-3 h-3 text-amber-400 ${isGeneratingPortrait ? 'animate-spin' : ''}`} />
            <span>Regenerate Portrait</span>
          </button>
        </div>
      </div>

      {/* THREE RANDOMLY GENERATED CHARACTER STATS: HEALTH, MANA, STRENGTH WITH VISUAL BARS */}
      <div className="my-4 p-3.5 rounded-2xl bg-stone-950/80 border border-amber-800/50 shadow-inner">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider font-arcane text-amber-400 mb-2.5 pb-1 border-b border-amber-900/40">
          <span className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-400" /> Card Combat Stats
          </span>
          <span className="text-[10px] text-amber-500/70 font-mono">Max 150</span>
        </div>

        <div className="space-y-2.5">
          {/* 1. HEALTH STAT */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1 font-arcane">
              <span className="flex items-center gap-1.5 font-bold text-rose-300">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/30" />
                Health
              </span>
              <span className="font-mono font-extrabold text-rose-200">
                {character.health} <span className="text-stone-500 text-[10px]">/ 150 HP</span>
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-stone-900 border border-rose-950 overflow-hidden p-0.5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-red-400 transition-all duration-700 shadow-[0_0_8px_rgba(244,63,94,0.6)]"
                style={{ width: `${healthPercent}%` }}
              />
            </div>
          </div>

          {/* 2. MANA STAT */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1 font-arcane">
              <span className="flex items-center gap-1.5 font-bold text-sky-300">
                <Droplet className="w-3.5 h-3.5 text-sky-400 fill-sky-400/30" />
                Mana
              </span>
              <span className="font-mono font-extrabold text-sky-200">
                {character.mana} <span className="text-stone-500 text-[10px]">/ 150 MP</span>
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-stone-900 border border-sky-950 overflow-hidden p-0.5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 transition-all duration-700 shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                style={{ width: `${manaPercent}%` }}
              />
            </div>
          </div>

          {/* 3. STRENGTH STAT */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1 font-arcane">
              <span className="flex items-center gap-1.5 font-bold text-amber-300">
                <Dumbbell className="w-3.5 h-3.5 text-amber-400" />
                Strength
              </span>
              <span className="font-mono font-extrabold text-amber-200">
                {character.strength} <span className="text-stone-500 text-[10px]">/ 150 STR</span>
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-stone-900 border border-amber-950 overflow-hidden p-0.5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-300 transition-all duration-700 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                style={{ width: `${strengthPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* GENERATED BACKSTORY / ORIGIN STORY SECTION */}
      <div className="relative p-3.5 sm:p-4 rounded-2xl bg-amber-950/40 border border-amber-700/50 shadow-inner my-3">
        <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-amber-900/40">
          <div className="flex items-center gap-1.5 text-amber-300">
            <ScrollText className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider font-arcane text-amber-200">
              Origin Lore
            </span>
          </div>

          <button
            onClick={onGenerateBackstory}
            disabled={isGeneratingBackstory}
            className="px-2.5 py-1 rounded-lg text-[11px] font-bold font-arcane uppercase tracking-wider bg-amber-900/60 hover:bg-amber-800/80 text-amber-200 border border-amber-600/50 flex items-center gap-1 cursor-pointer transition-all"
          >
            <Feather className={`w-3 h-3 ${isGeneratingBackstory ? 'animate-bounce text-amber-400' : 'text-amber-300'}`} />
            <span>Generate Backstory</span>
          </button>
        </div>

        <p className={`text-xs sm:text-sm font-fantasy-scribe text-amber-100/95 leading-relaxed italic border-l-2 border-amber-500/60 pl-3 transition-opacity ${
          isGeneratingBackstory ? 'opacity-40 blur-[0.5px]' : 'opacity-100'
        }`}>
          &ldquo;{character.backstory}&rdquo;
        </p>
      </div>

      {/* Card Footer: Weapon & Ability Tag */}
      <div className="mt-3 pt-2.5 border-t border-amber-900/40 flex items-center justify-between text-[11px] text-amber-400/70 font-fantasy-scribe">
        <span className="flex items-center gap-1 truncate max-w-[200px]">
          <Shield className="w-3 h-3 text-amber-500" />
          {character.weapon}
        </span>
        <span className="flex items-center gap-1 truncate max-w-[180px]">
          <Zap className="w-3 h-3 text-amber-500" />
          {character.ability}
        </span>
      </div>
    </div>
  );
};
