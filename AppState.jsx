// AppState.jsx — Theme system, shared state, data, utility components

const THEMES = {
  light: {
    bg:           '#FFF8DC',
    surface:      '#FFFFFF',
    elevated:     '#FFFDE7',
    border:       '#FFE082',
    borderStrong: '#FFD43B',
    textPrimary:  '#3D1C00',
    textSecondary:'#7C5A00',
    textMuted:    '#A08050',
    textFaint:    '#C8A96A',
    accent:       '#F59E0B',
    accentLight:  '#FFD93D',
    danger:       '#B91C1C',
    dangerBg:     '#FEE2E2',
    inputBg:      '#FFFACD',
    navBg:        'rgba(255,253,231,0.97)',
    statusBar:    '#FFFDE7',
    overlay:      'rgba(0,0,0,0.45)',
    isDark: false,
  },
  dark: {
    bg:           '#1A1209',
    surface:      '#231A0B',
    elevated:     '#2D2210',
    border:       '#4A3518',
    borderStrong: '#7A5020',
    textPrimary:  '#FFE082',
    textSecondary:'#D4A853',
    textMuted:    '#8C6830',
    textFaint:    '#5A3E18',
    accent:       '#F59E0B',
    accentLight:  '#FFD93D',
    danger:       '#FF6B6B',
    dangerBg:     '#3D1010',
    inputBg:      '#2A1E08',
    navBg:        'rgba(26,18,9,0.97)',
    statusBar:    '#1A1209',
    overlay:      'rgba(0,0,0,0.7)',
    isDark: true,
  },
};

const ThemeContext = React.createContext(THEMES.light);
const useTheme = () => React.useContext(ThemeContext);

const QUADRANT_STYLES = {
  hep:     { bg: '#FFF9DB', border: '#FFD43B', text: '#92710A', darkBg: '#2A2000', darkBorder: '#7A5A00', darkText: '#FFD43B', label: '⬆️ High Energy Positive' },
  lep:     { bg: '#F0FFF4', border: '#68D391', text: '#1E6B3C', darkBg: '#0A2010', darkBorder: '#2A7A40', darkText: '#68D391', label: '⬇️ Low Energy Positive' },
  hen:     { bg: '#FFF5F5', border: '#FC8181', text: '#B91C1C', darkBg: '#2A0A0A', darkBorder: '#8A2020', darkText: '#FC8181', label: '⬆️ High Energy Negative' },
  len:     { bg: '#EBF8FF', border: '#63B3ED', text: '#1E4E8C', darkBg: '#0A1A2A', darkBorder: '#205080', darkText: '#63B3ED', label: '⬇️ Low Energy Negative' },
  complex: { bg: '#FAF5FF', border: '#B794F4', text: '#5B21B6', darkBg: '#1A0A2A', darkBorder: '#6030A0', darkText: '#B794F4', label: '🔮 Complex & Nuanced' },
};

function getQS(quadrant, isDark) {
  const q = QUADRANT_STYLES[quadrant] || QUADRANT_STYLES.hep;
  return isDark
    ? { bg: q.darkBg, border: q.darkBorder, text: q.darkText }
    : { bg: q.bg, border: q.border, text: q.text };
}

const MOOD_LABELS = {
  ecstatic:'Ecstatic', excited:'Excited', happy:'Happy', playful:'Playful',
  loved:'Loved', proud:'Proud', calm:'Calm', cozy:'Cozy', grateful:'Grateful',
  sleepy:'Sleepy', hopeful:'Hopeful', angry:'Angry', stressed:'Stressed',
  annoyed:'Annoyed', frustrated:'Frustrated', sad:'Sad', lonely:'Lonely',
  exhausted:'Exhausted', guilty:'Guilty', anxious:'Anxious', confused:'Confused',
  determined:'Determined', nostalgic:'Nostalgic', surprised:'Surprised',
  mischievous:'Mischievous', bored:'Bored', hangry:'Hangry',
  caffeinated:'Caffeinated', monday:'Monday Mood', tgif:'TGIF',
};

const PIKACHU_RESPONSES = {
  ecstatic:"PIKA PIKA!! ⚡⚡ Your energy is off the charts!",
  excited:"Pi-KAAAA!! ⚡ Let's GO, Trainer!",
  happy:"Pika pika! That's what I like to hear!",
  playful:"Pikachu used Charm! It was super effective!",
  loved:"Pika~~ Spreading love like Thunderbolt!",
  proud:"Pikachu approves! You earned this!",
  calm:"Pika... Peaceful vibes today.",
  cozy:"Pikaaa~ So warm and snuggly!",
  grateful:"Pika pika! Gratitude is a superpower!",
  sleepy:"Pikaaaa... Rest up, Trainer...",
  hopeful:"Pika! Tomorrow looks bright!",
  angry:"PIKAAACHU! I feel that thunder...",
  stressed:"Pika pika... Let's breathe together, okay?",
  annoyed:"...Pika. I get it.",
  frustrated:"Pikachu! Let it out safely!",
  sad:"Pika... I'm right here with you.",
  lonely:"Pika pika... You're not alone. I'm here.",
  exhausted:"...pika. Rest mode: activated.",
  guilty:"Pika... It's okay. We all mess up sometimes.",
  anxious:"Pikaaa... One step at a time, okay?",
  confused:"Pika? Sometimes things don't make sense yet.",
  determined:"PIKA! Nothing can stop you now!",
  nostalgic:"Pika~~ Those memories are precious.",
  surprised:"PIKA?! Didn't see that coming!",
  mischievous:"Hehe, pika pika~ Up to something?",
  bored:"...pika. Wanna play a game?",
  hangry:"PIKA PIKA!! Feed the Trainer IMMEDIATELY!",
  caffeinated:"PIKAPIKAPIKAPIKA!! MAXIMUM VOLTAGE!",
  monday:"...pika. Mondays should be illegal.",
  tgif:"PIKAAAAA!! IT'S FRIDAYYY!!",
};

const QUADRANT_ORDER = [
  { key:'hep', moods:['ecstatic','excited','happy','playful','loved','proud'] },
  { key:'lep', moods:['calm','cozy','grateful','sleepy','hopeful'] },
  { key:'hen', moods:['angry','stressed','annoyed','frustrated'] },
  { key:'len', moods:['sad','lonely','exhausted','guilty','anxious'] },
  { key:'complex', moods:['confused','determined','nostalgic','surprised','mischievous','bored','hangry','caffeinated','monday','tgif'] },
];

const EVOLUTION_STAGES = [
  { name:'Egg',              icon:'🥚', xpRequired:0   },
  { name:'Baby Pichu',       icon:'⚡', xpRequired:50  },
  { name:'Young Pikachu',    icon:'🌟', xpRequired:150 },
  { name:'Mature Pikachu',   icon:'✨', xpRequired:300 },
  { name:'Champion Pikachu', icon:'👑', xpRequired:500 },
];

function getEvolutionStage(xp) {
  let s = EVOLUTION_STAGES[0];
  for (let i = EVOLUTION_STAGES.length-1; i >= 0; i--) {
    if (xp >= EVOLUTION_STAGES[i].xpRequired) { s = EVOLUTION_STAGES[i]; break; }
  }
  return s;
}
function getEvolutionProgress(xp) {
  let idx = 0;
  for (let i = EVOLUTION_STAGES.length-1; i >= 0; i--) {
    if (xp >= EVOLUTION_STAGES[i].xpRequired) { idx = i; break; }
  }
  if (idx >= EVOLUTION_STAGES.length-1) return 100;
  const cur = EVOLUTION_STAGES[idx].xpRequired;
  const nxt = EVOLUTION_STAGES[idx+1].xpRequired;
  return Math.round(((xp-cur)/(nxt-cur))*100);
}
function formatTimestamp(date) {
  const now = new Date(), diff = now - date, hours = diff/(1000*60*60);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `Today, ${date.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}`;
  if (hours < 48) return `Yesterday, ${date.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}`;
  return date.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
}
function getTimeGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

// ── Shared UI components ──────────────────────────────────────────────────────

function GoldButton({ children, onClick, style={}, small=false, outline=false, danger=false }) {
  const [pressed, setPressed] = React.useState(false);
  const [ripple, setRipple] = React.useState(null);
  const t = useTheme();

  const handlePress = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX||rect.left+rect.width/2) - rect.left;
    const y = (e.clientY||rect.top+rect.height/2) - rect.top;
    setRipple({x, y, id: Date.now()});
    setTimeout(() => setRipple(null), 500);
    setPressed(true);
  };

  return (
    <button
      onClick={onClick}
      onMouseDown={handlePress}
      onMouseUp={()=>setPressed(false)}
      onMouseLeave={()=>setPressed(false)}
      onTouchStart={handlePress}
      onTouchEnd={()=>setPressed(false)}
      style={{
        background: danger
          ? t.dangerBg
          : outline ? 'transparent'
          : 'linear-gradient(135deg,#FFD93D 0%,#F59E0B 100%)',
        border: danger ? `2px solid ${t.danger}` : outline ? `2px solid #F59E0B` : 'none',
        color: danger ? t.danger : outline ? '#7C5A00' : '#7C5A00',
        fontFamily:'Nunito,sans-serif', fontWeight:800,
        fontSize: small ? 13 : 15,
        borderRadius:12, padding: small ? '7px 14px' : '13px 22px',
        cursor:'pointer', width: style.width,
        transform: pressed ? 'scale(0.96)' : 'scale(1)',
        transition:'transform 0.12s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.12s',
        boxShadow: pressed||danger||outline ? 'none' : '0 3px 10px rgba(245,158,11,0.28)',
        position:'relative', overflow:'hidden',
        ...style,
      }}
    >
      {ripple && (
        <span style={{
          position:'absolute',
          left: ripple.x - 60, top: ripple.y - 60,
          width:120, height:120, borderRadius:'50%',
          background:'rgba(255,255,255,0.35)',
          animation:'rippleOut 0.5s ease-out forwards',
          pointerEvents:'none',
        }}/>
      )}
      {children}
    </button>
  );
}

function PillBadge({ icon, iconName, text, color1, color2, textColor='white' }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:5,
      background:`linear-gradient(135deg,${color1},${color2})`,
      borderRadius:20, padding:'5px 12px',
      fontFamily:'Nunito', fontWeight:900, fontSize:13, color:textColor,
      flexShrink:0,
    }}>
      {iconName ? <Icon name={iconName} size={14} color={textColor}/> : <span>{icon}</span>}
      <span>{text}</span>
    </div>
  );
}

function Toggle({ value, onChange }) {
  const t = useTheme();
  return (
    <button onClick={()=>onChange(!value)} style={{
      width:44, height:24, borderRadius:12, border:'none', cursor:'pointer',
      background: value ? 'linear-gradient(135deg,#FFD93D,#F59E0B)' : (t.isDark ? '#4A3518' : '#D1D5DB'),
      position:'relative', transition:'background 0.2s', flexShrink:0, padding:0,
    }}>
      <div style={{
        position:'absolute', top:2, left: value ? 22 : 2,
        width:20, height:20, borderRadius:'50%', background:'white',
        transition:'left 0.2s', boxShadow:'0 1px 3px rgba(0,0,0,0.2)',
      }}/>
    </button>
  );
}

function BottomNav({ activeTab, setActiveTab }) {
  const t = useTheme();
  const [tapped, setTapped] = React.useState(null);
  const tabs = [
    { key:'home',     iconName:'home',     label:'Home'     },
    { key:'diary',    iconName:'diary',    label:'Diary'    },
    { key:'stats',    iconName:'stats',    label:'Stats'    },
    { key:'settings', iconName:'settings', label:'Settings' },
  ];
  const handleTap = (key) => {
    setTapped(key);
    setTimeout(() => setTapped(null), 350);
    setActiveTab(key);
  };
  return (
    <div style={{
      display:'flex', borderTop:`1.5px solid ${t.border}`,
      background:t.navBg, backdropFilter:'blur(10px)',
      paddingBottom:6, paddingTop:4, flexShrink:0,
    }}>
      {tabs.map(tab => {
        const active = activeTab === tab.key;
        const popping = tapped === tab.key;
        return (
          <button key={tab.key} onClick={()=>handleTap(tab.key)} style={{
            flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:2,
            background:'none', border:'none', cursor:'pointer', padding:'6px 0',
            animation: popping ? 'tabPop 0.35s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
          }}>
            <Icon name={tab.iconName} size={22} color={active ? '#F59E0B' : t.textMuted}
              strokeWidth={active ? 2.5 : 1.8}/>
            <span style={{
              fontFamily:'Nunito', fontWeight:800, fontSize:10,
              color: active ? '#F59E0B' : t.textMuted,
              transition:'color 0.15s',
            }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// Screen header component
function ScreenHeader({ title, right, t }) {
  return (
    <div style={{
      padding:'14px 20px 10px', background:t.elevated,
      borderBottom:`1.5px solid ${t.border}`, flexShrink:0,
      display:'flex', alignItems:'center', justifyContent:'space-between',
    }}>
      <div style={{ fontFamily:'Nunito', fontWeight:900, fontSize:21, color:t.textPrimary }}>
        {title}
      </div>
      {right}
    </div>
  );
}

// Section card wrapper
function Card({ children, style={}, t }) {
  return (
    <div style={{
      background:t.surface, borderRadius:20,
      border:`1.5px solid ${t.border}`,
      boxShadow: t.isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',
      ...style,
    }}>{children}</div>
  );
}

// ── Achievements ─────────────────────────────────────────────────────────────
const ACHIEVEMENTS = [
  { id:'first_checkin',  icon:'⚡', title:'First Step',       desc:'Complete your first check-in',            xpBonus:20  },
  { id:'streak_3',       icon:'🔥', title:'On a Roll',        desc:'Reach a 3-day streak',                    xpBonus:30  },
  { id:'streak_7',       icon:'🔥', title:'Week Warrior',     desc:'Reach a 7-day streak',                    xpBonus:70  },
  { id:'streak_30',      icon:'🏆', title:'Monthly Master',   desc:'Reach a 30-day streak',                   xpBonus:300 },
  { id:'checkins_10',    icon:'📖', title:'Mood Explorer',    desc:'Log 10 check-ins',                        xpBonus:50  },
  { id:'checkins_50',    icon:'🌟', title:'Mood Veteran',     desc:'Log 50 check-ins',                        xpBonus:150 },
  { id:'all_moods',      icon:'👑', title:'Mood Master',      desc:'Try all 30 Pikachu expressions',          xpBonus:500 },
  { id:'early_bird',     icon:'🌅', title:'Early Bird',       desc:'Check in before 7 AM',                    xpBonus:25  },
  { id:'night_owl',      icon:'🌙', title:'Night Owl',        desc:'Check in after 10 PM',                    xpBonus:25  },
  { id:'note_writer',    icon:'📝', title:'Journaler',        desc:'Add a note to 5 check-ins',               xpBonus:40  },
  { id:'complex_mood',   icon:'🔮', title:'Deep Feeler',      desc:'Log a Complex & Nuanced mood',            xpBonus:15  },
  { id:'evolution_1',    icon:'⚡', title:'Pichu Hatched',    desc:'Reach Baby Pichu stage',                  xpBonus:0   },
  { id:'evolution_4',    icon:'👑', title:'Champion!',        desc:'Reach Champion Pikachu stage',            xpBonus:0   },
];

function checkAchievements(entries, streak, unlockedIds) {
  const newlyUnlocked = [];
  const uniqueMoods = new Set(entries.map(e=>e.mood));
  const notesCount = entries.filter(e=>e.note&&e.note.trim()).length;
  const hour = new Date().getHours();

  const checks = {
    first_checkin:  entries.length >= 1,
    streak_3:       streak >= 3,
    streak_7:       streak >= 7,
    streak_30:      streak >= 30,
    checkins_10:    entries.length >= 10,
    checkins_50:    entries.length >= 50,
    all_moods:      uniqueMoods.size >= 30,
    early_bird:     hour < 7,
    night_owl:      hour >= 22,
    note_writer:    notesCount >= 5,
    complex_mood:   entries.some(e=>window.MOODS[e.mood]?.quadrant==='complex'),
    evolution_1:    entries.length > 0,
    evolution_4:    false, // checked via XP externally
  };

  ACHIEVEMENTS.forEach(a => {
    if (!unlockedIds.includes(a.id) && checks[a.id]) {
      newlyUnlocked.push(a);
    }
  });
  return newlyUnlocked;
}

// Haptic helper
function haptic(pattern = [10]) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

Object.assign(window, {
  THEMES, ThemeContext, useTheme, QUADRANT_STYLES, getQS,
  MOOD_LABELS, PIKACHU_RESPONSES, QUADRANT_ORDER, EVOLUTION_STAGES,
  getEvolutionStage, getEvolutionProgress, formatTimestamp, getTimeGreeting,
  GoldButton, PillBadge, Toggle, BottomNav, ScreenHeader, Card,
  ACHIEVEMENTS, checkAchievements, haptic,
});
