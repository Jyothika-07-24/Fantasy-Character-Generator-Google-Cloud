import React, { useState } from 'react';
import { 
  Sparkles, 
  Sword, 
  Trash2, 
  Eye, 
  Layers, 
  Heart, 
  Droplet, 
  Dumbbell, 
  ShieldAlert,
  ScrollText,
  Filter
} from 'lucide-react';
import { FantasyCharacter, CharacterClass, CLASS_DETAILS } from '../data/fantasyData';

const DaggerIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
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

interface MyDeckProps {
  deck: FantasyCharacter[];
  onSelectCharacter: (character: FantasyCharacter) => void;
  onRemoveFromDeck: (characterId: string) => void;
  onClearDeck: () => void;
  activeCharacterId?: string;
}

export const MyDeck: React.FC<MyDeckProps> = ({
  deck,
  onSelectCharacter,
  onRemoveFromDeck,
  onClearDeck,
  activeCharacterId
}) => {
  const [filterClass, setFilterClass] = useState<string>('All');

  const filteredDeck = deck.filter(c => filterClass === 'All' || c.className === filterClass);

  const getClassIcon = (className: CharacterClass) => {
    switch (className) {
      case 'Mage':
        return <Sparkles className="w-3.5 h-3.5 text-purple-300" />;
      case 'Warrior':
        return <Sword className="w-3.5 h-3.5 text-amber-300" />;
      case 'Rogue':
        return <DaggerIcon className="w-3.5 h-3.5 text-emerald-300" />;
    }
  };

  return (
    <section className="w-full max-w-5xl mx-auto mt-12 p-5 sm:p-8 rounded-3xl parchment-card border-2 border-amber-600/50 shadow-2xl">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-amber-900/50">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-950/80 border border-amber-500/60 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
            <Layers className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-bold font-fantasy-name gold-gradient-text tracking-wide">
                My Deck
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-950 border border-amber-600/60 text-amber-300">
                {deck.length} {deck.length === 1 ? 'Card' : 'Cards'}
              </span>
            </div>
            <p className="text-xs text-amber-400/70 font-fantasy-scribe mt-0.5">
              Saved alchemical player cards preserved in your grimoire
            </p>
          </div>
        </div>

        {/* Filter Controls & Clear Button */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex rounded-xl bg-stone-900/90 p-1 border border-amber-800/50 text-xs font-arcane">
            {['All', 'Mage', 'Warrior', 'Rogue'].map(c => (
              <button
                key={c}
                onClick={() => setFilterClass(c)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  filterClass === c
                    ? 'bg-amber-950 text-amber-200 border border-amber-600/60 font-bold shadow-sm'
                    : 'text-amber-400/60 hover:text-amber-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {deck.length > 0 && (
            <button
              onClick={onClearDeck}
              className="p-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-amber-900/40 text-amber-400/70 hover:text-red-400 transition-colors cursor-pointer text-xs flex items-center gap-1 font-fantasy-scribe"
              title="Clear all cards from My Deck"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear Deck</span>
            </button>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      {filteredDeck.length === 0 ? (
        <div className="py-12 px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-950/40 border border-amber-800/40 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Layers className="w-8 h-8 text-amber-700/60" />
          </div>
          <h4 className="text-base font-bold font-arcane text-amber-200">
            {deck.length === 0 ? 'Your Deck is Empty' : `No ${filterClass} Cards Found`}
          </h4>
          <p className="text-xs text-amber-400/60 font-fantasy-scribe max-w-md mx-auto mt-1">
            {deck.length === 0 
              ? "Touch 'Save to Deck' on the character card above to store your summoned champions here without duplicates." 
              : "Switch filter to 'All' or summon and save characters of this class to populate your deck."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {filteredDeck.map((card) => {
            const details = CLASS_DETAILS[card.className];
            const isActive = activeCharacterId === card.id;

            const healthPercent = Math.min(100, Math.round((card.health / card.maxStat) * 100));
            const manaPercent = Math.min(100, Math.round((card.mana / card.maxStat) * 100));
            const strengthPercent = Math.min(100, Math.round((card.strength / card.maxStat) * 100));

            return (
              <div
                key={card.id}
                className={`relative rounded-2xl p-4 transition-all duration-300 bg-stone-950/90 border-2 ${
                  isActive 
                    ? 'border-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.4)] ring-1 ring-amber-400' 
                    : `${details.borderColor} hover:border-amber-500/80 hover:shadow-xl`
                } flex flex-col justify-between`}
              >
                {/* Active Card Badge */}
                {isActive && (
                  <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold font-arcane uppercase bg-amber-950 border border-amber-400 text-amber-200 shadow-md">
                    Active On Table
                  </div>
                )}

                <div>
                  {/* Card Mini Header */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-900/40">
                    <div className="flex items-center gap-1.5">
                      {getClassIcon(card.className)}
                      <span className={`text-[11px] font-bold uppercase tracking-wider font-arcane ${details.badgeBg} px-2 py-0.5 rounded-full border`}>
                        {card.className}
                      </span>
                    </div>
                    <span className="text-[10px] text-amber-400/60 font-fantasy-scribe">
                      {card.race}
                    </span>
                  </div>

                  {/* Character Name */}
                  <h4 className="font-fantasy-name text-lg font-bold tracking-wide gold-gradient-text truncate mb-1">
                    {card.name}
                  </h4>

                  {/* Card Portrait & Stats Layout */}
                  <div className="flex gap-3 my-2.5">
                    {/* Portrait Frame */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-amber-600/50 bg-stone-950 shrink-0 shadow-md">
                      {card.portraitUrl ? (
                        <img 
                          src={card.portraitUrl} 
                          alt={card.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-amber-700 bg-amber-950/30">
                          <Layers className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    {/* Numeric Stats & Mini Bars */}
                    <div className="flex-1 space-y-1.5 justify-center flex flex-col">
                      {/* Health */}
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-arcane text-rose-300">
                          <span className="flex items-center gap-1">
                            <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500/40" /> HP
                          </span>
                          <span className="font-mono font-bold">{card.health}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-stone-900 overflow-hidden">
                          <div className="h-full bg-rose-500 rounded-full" style={{ width: `${healthPercent}%` }} />
                        </div>
                      </div>

                      {/* Mana */}
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-arcane text-sky-300">
                          <span className="flex items-center gap-1">
                            <Droplet className="w-2.5 h-2.5 text-sky-400 fill-sky-400/40" /> MP
                          </span>
                          <span className="font-mono font-bold">{card.mana}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-stone-900 overflow-hidden">
                          <div className="h-full bg-sky-400 rounded-full" style={{ width: `${manaPercent}%` }} />
                        </div>
                      </div>

                      {/* Strength */}
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-arcane text-amber-300">
                          <span className="flex items-center gap-1">
                            <Dumbbell className="w-2.5 h-2.5 text-amber-400" /> STR
                          </span>
                          <span className="font-mono font-bold">{card.strength}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-stone-900 overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${strengthPercent}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Backstory Inscription */}
                  <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-900/40 my-2">
                    <p className="text-[11px] font-fantasy-scribe text-amber-200/90 italic line-clamp-3 leading-relaxed">
                      &ldquo;{card.backstory}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 border-t border-amber-900/40 flex items-center justify-between gap-2 mt-2">
                  <button
                    onClick={() => onSelectCharacter(card)}
                    className="flex-1 py-1 px-2.5 rounded-lg text-xs font-bold font-arcane bg-amber-950 hover:bg-amber-900 border border-amber-600/50 text-amber-200 transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>

                  <button
                    onClick={() => onRemoveFromDeck(card.id)}
                    className="p-1.5 rounded-lg text-xs font-bold text-amber-400/70 hover:text-red-400 hover:bg-stone-900 border border-transparent hover:border-amber-900/60 transition-colors cursor-pointer"
                    title="Remove card from deck"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
