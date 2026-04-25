// PikachuFace.jsx — Original fan-art style Pikachu face SVG component
// 30 mood expressions. Tribute only — not affiliated with Nintendo/TPC.

const MOODS = {
  // High Energy Positive
  ecstatic: {
    eyes: 'star', mouth: 'big-open', ears: 'up', cheeks: 'bright', extras: ['sparks','hearts'],
    color: '#92710A', quadrant: 'hep'
  },
  excited: {
    eyes: 'wide-open', mouth: 'open-smile', ears: 'up', cheeks: 'bright', extras: ['sparks'],
    color: '#92710A', quadrant: 'hep'
  },
  happy: {
    eyes: 'happy-arc', mouth: 'smile', ears: 'up', cheeks: 'bright', extras: [],
    color: '#92710A', quadrant: 'hep'
  },
  playful: {
    eyes: 'wink', mouth: 'smirk', ears: 'one-up', cheeks: 'bright', extras: ['spark-one'],
    color: '#92710A', quadrant: 'hep'
  },
  loved: {
    eyes: 'heart', mouth: 'smile', ears: 'up', cheeks: 'pink', extras: ['hearts'],
    color: '#92710A', quadrant: 'hep'
  },
  proud: {
    eyes: 'half-closed-up', mouth: 'confident-smile', ears: 'up', cheeks: 'bright', extras: ['star'],
    color: '#92710A', quadrant: 'hep'
  },
  // Low Energy Positive
  calm: {
    eyes: 'soft-closed', mouth: 'soft-smile', ears: 'relax', cheeks: 'soft', extras: [],
    color: '#1E6B3C', quadrant: 'lep'
  },
  cozy: {
    eyes: 'sleepy-happy', mouth: 'soft-smile', ears: 'down', cheeks: 'soft', extras: ['zzz-small'],
    color: '#1E6B3C', quadrant: 'lep'
  },
  grateful: {
    eyes: 'teary-happy', mouth: 'smile', ears: 'relax', cheeks: 'soft', extras: ['sparkle'],
    color: '#1E6B3C', quadrant: 'lep'
  },
  sleepy: {
    eyes: 'very-sleepy', mouth: 'yawn', ears: 'down', cheeks: 'dim', extras: ['zzz'],
    color: '#1E6B3C', quadrant: 'lep'
  },
  hopeful: {
    eyes: 'wide-soft', mouth: 'soft-smile', ears: 'up', cheeks: 'soft', extras: ['sparkle'],
    color: '#1E6B3C', quadrant: 'lep'
  },
  // High Energy Negative
  angry: {
    eyes: 'angry', mouth: 'angry-open', ears: 'angry', cheeks: 'red', extras: ['anger-mark'],
    color: '#B91C1C', quadrant: 'hen'
  },
  stressed: {
    eyes: 'stressed', mouth: 'stressed-open', ears: 'back', cheeks: 'dim', extras: ['sweat', 'lines'],
    color: '#B91C1C', quadrant: 'hen'
  },
  annoyed: {
    eyes: 'flat-annoyed', mouth: 'flat', ears: 'back', cheeks: 'dim', extras: ['lines'],
    color: '#B91C1C', quadrant: 'hen'
  },
  frustrated: {
    eyes: 'frustrated', mouth: 'grimace', ears: 'angry', cheeks: 'dim', extras: ['sweat'],
    color: '#B91C1C', quadrant: 'hen'
  },
  // Low Energy Negative
  sad: {
    eyes: 'sad', mouth: 'frown', ears: 'down', cheeks: 'dim', extras: ['tear'],
    color: '#1E4E8C', quadrant: 'len'
  },
  lonely: {
    eyes: 'lonely', mouth: 'small-frown', ears: 'down', cheeks: 'dim', extras: ['tear-small'],
    color: '#1E4E8C', quadrant: 'len'
  },
  exhausted: {
    eyes: 'x-eyes', mouth: 'flat', ears: 'down', cheeks: 'dim', extras: ['zzz'],
    color: '#1E4E8C', quadrant: 'len'
  },
  guilty: {
    eyes: 'guilty', mouth: 'small-frown', ears: 'down', cheeks: 'dim', extras: ['sweat-small'],
    color: '#1E4E8C', quadrant: 'len'
  },
  anxious: {
    eyes: 'anxious', mouth: 'wavy', ears: 'back', cheeks: 'dim', extras: ['sweat', 'shake-lines'],
    color: '#1E4E8C', quadrant: 'len'
  },
  // Complex & Nuanced
  confused: {
    eyes: 'confused', mouth: 'wavy', ears: 'one-up', cheeks: 'soft', extras: ['question'],
    color: '#5B21B6', quadrant: 'complex'
  },
  determined: {
    eyes: 'determined', mouth: 'tight-smile', ears: 'up', cheeks: 'bright', extras: ['spark-one'],
    color: '#5B21B6', quadrant: 'complex'
  },
  nostalgic: {
    eyes: 'dreamy', mouth: 'soft-smile', ears: 'relax', cheeks: 'soft', extras: ['sparkle'],
    color: '#5B21B6', quadrant: 'complex'
  },
  surprised: {
    eyes: 'wide-surprise', mouth: 'o-mouth', ears: 'up', cheeks: 'bright', extras: ['sparks'],
    color: '#5B21B6', quadrant: 'complex'
  },
  mischievous: {
    eyes: 'mischievous', mouth: 'grin', ears: 'one-up', cheeks: 'bright', extras: ['spark-one'],
    color: '#5B21B6', quadrant: 'complex'
  },
  bored: {
    eyes: 'bored', mouth: 'flat', ears: 'down', cheeks: 'dim', extras: ['zzz-small'],
    color: '#5B21B6', quadrant: 'complex'
  },
  hangry: {
    eyes: 'angry', mouth: 'open-hungry', ears: 'angry', cheeks: 'red', extras: ['drool', 'anger-mark'],
    color: '#5B21B6', quadrant: 'complex'
  },
  caffeinated: {
    eyes: 'jittery', mouth: 'big-open', ears: 'up', cheeks: 'bright', extras: ['sparks', 'lines'],
    color: '#5B21B6', quadrant: 'complex'
  },
  monday: {
    eyes: 'very-sleepy', mouth: 'flat', ears: 'down', cheeks: 'dim', extras: ['zzz', 'lines'],
    color: '#5B21B6', quadrant: 'complex'
  },
  tgif: {
    eyes: 'star', mouth: 'big-open', ears: 'up', cheeks: 'bright', extras: ['hearts', 'sparks'],
    color: '#5B21B6', quadrant: 'complex'
  },
};

window.MOODS = MOODS;

function drawEyes(type, size) {
  const s = size / 100;
  const cx = 50, eyeY = 42;
  const lx = cx - 16 * s * (100/size), rx = cx + 16 * s * (100/size);
  const adjY = eyeY;

  const eyeConfigs = {
    'happy-arc': (x) => <path key={x} d={`M${x-8},${adjY} Q${x},${adjY-7} ${x+8},${adjY}`} stroke="#3D1C00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
    'wide-open': (x) => <ellipse key={x} cx={x} cy={adjY} rx="7" ry="8" fill="#3D1C00"/>,
    'star': (x) => (
      <g key={x}>
        <polygon points={`${x},${adjY-9} ${x+2.5},${adjY-3} ${x+9},${adjY-3} ${x+3.5},${adjY+1} ${x+5},${adjY+8} ${x},${adjY+4} ${x-5},${adjY+8} ${x-3.5},${adjY+1} ${x-9},${adjY-3} ${x-2.5},${adjY-3}`} fill="#FFD700" stroke="#F59E0B" strokeWidth="0.5"/>
      </g>
    ),
    'heart': (x) => (
      <g key={x}>
        <path d={`M${x},${adjY+5} C${x-10},${adjY-5} ${x-15},${adjY-8} ${x-6},${adjY-10} C${x-2},${adjY-11} ${x},${adjY-7} ${x},${adjY-7} C${x},${adjY-7} ${x+2},${adjY-11} ${x+6},${adjY-10} C${x+15},${adjY-8} ${x+10},${adjY-5} ${x},${adjY+5}`} fill="#FF6B6B"/>
      </g>
    ),
    'soft-closed': (x) => <path key={x} d={`M${x-7},${adjY} Q${x},${adjY+5} ${x+7},${adjY}`} stroke="#3D1C00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
    'sleepy-happy': (x) => <path key={x} d={`M${x-7},${adjY+2} Q${x},${adjY-3} ${x+7},${adjY+2}`} stroke="#3D1C00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
    'very-sleepy': (x) => <line key={x} x1={x-7} y1={adjY+1} x2={x+7} y2={adjY+1} stroke="#3D1C00" strokeWidth="3" strokeLinecap="round"/>,
    'teary-happy': (x) => (
      <g key={x}>
        <path d={`M${x-7},${adjY+1} Q${x},${adjY-6} ${x+7},${adjY+1}`} stroke="#3D1C00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <ellipse cx={x+5} cy={adjY+8} rx="2" ry="2.5" fill="#60B4FF" opacity="0.8"/>
      </g>
    ),
    'wide-soft': (x) => <ellipse key={x} cx={x} cy={adjY} rx="6" ry="7" fill="#3D1C00"/>,
    'half-closed-up': (x) => (
      <g key={x}>
        <ellipse cx={x} cy={adjY} rx="7" ry="8" fill="#3D1C00"/>
        <rect x={x-8} y={adjY-9} width="16" height="8" fill="#FFD93D" rx="1"/>
      </g>
    ),
    'wink': null, // special case handled below
    'angry': (x, side) => (
      <g key={x}>
        <ellipse cx={x} cy={adjY+2} rx="6" ry="7" fill="#3D1C00"/>
        <line x1={x+(side==='l'?-9:9)} y1={adjY-7} x2={x+(side==='l'?5:-5)} y2={adjY-1} stroke="#3D1C00" strokeWidth="3" strokeLinecap="round"/>
      </g>
    ),
    'stressed': (x) => (
      <g key={x}>
        <ellipse cx={x} cy={adjY} rx="6" ry="8" fill="#3D1C00"/>
        <line x1={x-7} y1={adjY-8} x2={x+7} y2={adjY-4} stroke="#3D1C00" strokeWidth="2.5"/>
      </g>
    ),
    'flat-annoyed': (x) => <ellipse key={x} cx={x} cy={adjY+2} rx="7" ry="4" fill="#3D1C00"/>,
    'frustrated': (x) => (
      <g key={x}>
        <path d={`M${x-7},${adjY+2} Q${x},${adjY-7} ${x+7},${adjY+2}`} fill="#3D1C00"/>
      </g>
    ),
    'sad': (x) => (
      <g key={x}>
        <ellipse cx={x} cy={adjY} rx="6" ry="7" fill="#3D1C00"/>
        <path d={`M${x-5},${adjY+8} Q${x},${adjY+4} ${x+5},${adjY+8}`} stroke="#3D1C00" strokeWidth="1.5" fill="none"/>
      </g>
    ),
    'lonely': (x) => (
      <g key={x}>
        <path d={`M${x-7},${adjY+1} Q${x},${adjY-7} ${x+7},${adjY+1}`} fill="#3D1C00"/>
      </g>
    ),
    'x-eyes': (x) => (
      <g key={x}>
        <line x1={x-6} y1={adjY-6} x2={x+6} y2={adjY+6} stroke="#3D1C00" strokeWidth="3" strokeLinecap="round"/>
        <line x1={x+6} y1={adjY-6} x2={x-6} y2={adjY+6} stroke="#3D1C00" strokeWidth="3" strokeLinecap="round"/>
      </g>
    ),
    'guilty': (x) => (
      <g key={x}>
        <ellipse cx={x} cy={adjY+1} rx="5" ry="6" fill="#3D1C00"/>
        <path d={`M${x-7},${adjY-4} Q${x},${adjY-8} ${x+7},${adjY-4}`} stroke="#3D1C00" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </g>
    ),
    'anxious': (x) => (
      <g key={x}>
        <ellipse cx={x} cy={adjY} rx="5" ry="7" fill="#3D1C00"/>
        <line x1={x-8} y1={adjY-8} x2={x-2} y2={adjY-3} stroke="#3D1C00" strokeWidth="2.5"/>
      </g>
    ),
    'confused': (x, side) => (
      <g key={x}>
        {side === 'l' ? <path d={`M${x-7},${adjY} Q${x},${adjY-7} ${x+7},${adjY}`} fill="#3D1C00"/> : <path d={`M${x-7},${adjY+3} Q${x},${adjY-4} ${x+7},${adjY+3}`} fill="#3D1C00"/>}
      </g>
    ),
    'determined': (x) => (
      <g key={x}>
        <ellipse cx={x} cy={adjY+1} rx="6" ry="7" fill="#3D1C00"/>
        <line x1={x-8} y1={adjY-5} x2={x+4} y2={adjY-2} stroke="#3D1C00" strokeWidth="2.5" strokeLinecap="round"/>
      </g>
    ),
    'dreamy': (x) => <path key={x} d={`M${x-7},${adjY+2} Q${x},${adjY-5} ${x+7},${adjY+2}`} stroke="#3D1C00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
    'wide-surprise': (x) => (
      <g key={x}>
        <ellipse cx={x} cy={adjY} rx="8" ry="9" fill="#3D1C00"/>
        <ellipse cx={x} cy={adjY} rx="4" ry="4.5" fill="white"/>
      </g>
    ),
    'mischievous': (x, side) => (
      <g key={x}>
        {side === 'l' 
          ? <path d={`M${x-7},${adjY+2} Q${x},${adjY-8} ${x+7},${adjY+2}`} fill="#3D1C00"/>
          : <>
              <path d={`M${x-7},${adjY+2} Q${x},${adjY-8} ${x+7},${adjY+2}`} fill="#3D1C00"/>
              <rect x={x-8} y={adjY-9} width="16" height="8" fill="#FFD93D" rx="1"/>
            </>
        }
      </g>
    ),
    'bored': (x) => (
      <g key={x}>
        <ellipse cx={x} cy={adjY+2} rx="6" ry="5" fill="#3D1C00"/>
        <rect x={x-7} y={adjY-4} width="14" height="7" fill="#FFD93D" rx="1"/>
      </g>
    ),
    'jittery': (x) => (
      <g key={x}>
        <ellipse cx={x} cy={adjY} rx="8" ry="9" fill="#3D1C00"/>
        <ellipse cx={x-2} cy={adjY-1} rx="3" ry="3.5" fill="white"/>
      </g>
    ),
  };

  const rightEyeConfigs = {
    'wink': () => [
      <path key="l" d={`M${lx-7},${adjY+1} Q${lx},${adjY-6} ${lx+7},${adjY+1}`} stroke="#3D1C00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
      <line key="r" x1={rx-7} y1={adjY} x2={rx+7} y2={adjY} stroke="#3D1C00" strokeWidth="3" strokeLinecap="round"/>
    ],
  };

  if (type === 'wink') return rightEyeConfigs['wink']();

  const fn = eyeConfigs[type];
  if (!fn) return [
    <ellipse key="l" cx={lx} cy={adjY} rx="6" ry="7" fill="#3D1C00"/>,
    <ellipse key="r" cx={rx} cy={adjY} rx="6" ry="7" fill="#3D1C00"/>
  ];
  return [fn(lx, 'l'), fn(rx, 'r')];
}

function drawMouth(type, size) {
  const mx = 50, my = 62;
  const configs = {
    'smile': <path d={`M${mx-10},${my} Q${mx},${my+10} ${mx+10},${my}`} stroke="#3D1C00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
    'big-open': <g><path d={`M${mx-13},${my-2} Q${mx},${my+16} ${mx+13},${my-2}`} fill="#3D1C00"/><path d={`M${mx-12},${my-1} Q${mx},${my+5} ${mx+12},${my-1}`} fill="#FF6B6B"/></g>,
    'open-smile': <g><path d={`M${mx-11},${my} Q${mx},${my+12} ${mx+11},${my}`} fill="#3D1C00"/><path d={`M${mx-9},${my+1} Q${mx},${my+6} ${mx+9},${my+1}`} fill="#FF6B6B"/></g>,
    'smirk': <path d={`M${mx-6},${my+2} Q${mx+2},${my-2} ${mx+10},${my+4}`} stroke="#3D1C00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
    'confident-smile': <path d={`M${mx-9},${my+1} Q${mx},${my+9} ${mx+9},${my+1}`} stroke="#3D1C00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
    'soft-smile': <path d={`M${mx-8},${my+1} Q${mx},${my+8} ${mx+8},${my+1}`} stroke="#3D1C00" strokeWidth="2" fill="none" strokeLinecap="round"/>,
    'yawn': <g><ellipse cx={mx} cy={my+4} rx="9" ry="7" fill="#3D1C00"/><ellipse cx={mx} cy={my+5} rx="6" ry="4.5" fill="#CC3333"/></g>,
    'flat': <line x1={mx-9} y1={my+2} x2={mx+9} y2={my+2} stroke="#3D1C00" strokeWidth="2.5" strokeLinecap="round"/>,
    'frown': <path d={`M${mx-10},${my+4} Q${mx},${my-4} ${mx+10},${my+4}`} stroke="#3D1C00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
    'small-frown': <path d={`M${mx-7},${my+3} Q${mx},${my-2} ${mx+7},${my+3}`} stroke="#3D1C00" strokeWidth="2" fill="none" strokeLinecap="round"/>,
    'angry-open': <g><path d={`M${mx-10},${my+2} Q${mx},${my-6} ${mx+10},${my+2}`} fill="#3D1C00"/><path d={`M${mx-7},${my+1} Q${mx},${my-2} ${mx+7},${my+1}`} fill="#CC3333"/></g>,
    'grimace': <g><path d={`M${mx-11},${my+1} Q${mx},${my+5} ${mx+11},${my+1}`} fill="none" stroke="#3D1C00" strokeWidth="2.5"/><line x1={mx-8} y1={my+2} x2={mx-4} y2={my+4} stroke="#3D1C00" strokeWidth="1.5"/><line x1={mx-2} y1={my+4} x2={mx+2} y2={my+4} stroke="#3D1C00" strokeWidth="1.5"/><line x1={mx+4} y1={my+4} x2={mx+8} y2={my+2} stroke="#3D1C00" strokeWidth="1.5"/></g>,
    'stressed-open': <g><path d={`M${mx-10},${my+1} Q${mx},${my-8} ${mx+10},${my+1}`} fill="#3D1C00"/></g>,
    'wavy': <path d={`M${mx-9},${my+3} Q${mx-4},${my-2} ${mx},${my+3} Q${mx+4},${my+8} ${mx+9},${my+3}`} stroke="#3D1C00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
    'tight-smile': <path d={`M${mx-8},${my+2} Q${mx},${my+7} ${mx+8},${my+2}`} stroke="#3D1C00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
    'o-mouth': <ellipse cx={mx} cy={my+3} rx="7" ry="8" fill="#3D1C00"/>,
    'grin': <g><path d={`M${mx-12},${my} Q${mx},${my+14} ${mx+12},${my}`} fill="#3D1C00"/><path d={`M${mx-10},${my+1} Q${mx-5},${my+5} ${mx-2},${my+6}`} stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/><path d={`M${mx+2},${my+6} Q${mx+5},${my+5} ${mx+10},${my+1}`} stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/></g>,
    'open-hungry': <g><path d={`M${mx-11},${my-1} Q${mx},${my+15} ${mx+11},${my-1}`} fill="#3D1C00"/><path d={`M${mx-9},${my} Q${mx},${my+6} ${mx+9},${my}`} fill="#CC3333"/></g>,
  };
  return configs[type] || configs['smile'];
}

function drawExtras(extras, size) {
  const elements = [];
  extras.forEach((e, i) => {
    if (e === 'sparks') {
      elements.push(
        <g key={`sp${i}`} className="pika-sparks">
          <polygon points="18,22 20,17 22,22 17,19 23,19" fill="#FFD93D" opacity="0.9"/>
          <polygon points="78,22 80,17 82,22 77,19 83,19" fill="#FFD93D" opacity="0.9"/>
          <polygon points="14,35 16,30 18,35 13,32 19,32" fill="#FFD93D" opacity="0.7"/>
          <polygon points="82,35 84,30 86,35 81,32 87,32" fill="#FFD93D" opacity="0.7"/>
        </g>
      );
    } else if (e === 'spark-one') {
      elements.push(<polygon key={`sp1${i}`} points="85,20 87,14 89,20 83,16 91,16" fill="#FFD93D"/>);
    } else if (e === 'hearts') {
      elements.push(
        <g key={`ht${i}`}>
          <path d="M20,18 C18,14 12,14 12,19 C12,23 20,28 20,28 C20,28 28,23 28,19 C28,14 22,14 20,18Z" fill="#FF6B6B" opacity="0.8" transform="scale(0.5) translate(10,5)"/>
          <path d="M80,15 C78,11 74,11 74,15 C74,18 80,22 80,22 C80,22 86,18 86,15 C86,11 82,11 80,15Z" fill="#FF6B6B" opacity="0.7" transform="scale(0.6) translate(-8,2)"/>
        </g>
      );
    } else if (e === 'star') {
      elements.push(<polygon key={`star${i}`} points="85,18 86.5,14 88,18 92,16 89,19 91,23 87,21 83,23 85,19 81,16" fill="#FFD700" opacity="0.9"/>);
    } else if (e === 'sparkle') {
      elements.push(
        <g key={`sparkle${i}`} opacity="0.7">
          <line x1="15" y1="25" x2="15" y2="18" stroke="#FFD93D" strokeWidth="1.5"/>
          <line x1="12" y1="21.5" x2="18" y2="21.5" stroke="#FFD93D" strokeWidth="1.5"/>
          <line x1="13" y1="23" x2="17" y2="20" stroke="#FFD93D" strokeWidth="1"/>
          <line x1="17" y1="23" x2="13" y2="20" stroke="#FFD93D" strokeWidth="1"/>
        </g>
      );
    } else if (e === 'zzz') {
      elements.push(
        <g key={`zzz${i}`} opacity="0.8">
          <text x="80" y="25" fontSize="12" fill="#6B7280" fontWeight="bold" fontFamily="Nunito">z</text>
          <text x="85" y="18" fontSize="9" fill="#6B7280" fontWeight="bold" fontFamily="Nunito">z</text>
          <text x="89" y="13" fontSize="7" fill="#6B7280" fontWeight="bold" fontFamily="Nunito">z</text>
        </g>
      );
    } else if (e === 'zzz-small') {
      elements.push(<text key={`zs${i}`} x="82" y="23" fontSize="9" fill="#9CA3AF" fontWeight="bold" fontFamily="Nunito" opacity="0.8">z</text>);
    } else if (e === 'tear') {
      elements.push(
        <g key={`tear${i}`}>
          <ellipse cx="30" cy="60" rx="3.5" ry="5" fill="#60B4FF" opacity="0.8"/>
          <ellipse cx="68" cy="60" rx="3.5" ry="5" fill="#60B4FF" opacity="0.8"/>
        </g>
      );
    } else if (e === 'tear-small') {
      elements.push(<ellipse key={`ts${i}`} cx="65" cy="58" rx="2.5" ry="3.5" fill="#60B4FF" opacity="0.8"/>);
    } else if (e === 'sweat') {
      elements.push(
        <g key={`sw${i}`}>
          <path d="M83,25 C83,20 88,15 88,22 C88,26 85,28 83,25Z" fill="#60B4FF" opacity="0.7"/>
        </g>
      );
    } else if (e === 'sweat-small') {
      elements.push(<path key={`sws${i}`} d="M83,28 C83,25 86,22 86,27 C86,30 84,30 83,28Z" fill="#60B4FF" opacity="0.7"/>);
    } else if (e === 'anger-mark') {
      elements.push(
        <g key={`am${i}`} opacity="0.8">
          <line x1="13" y1="18" x2="19" y2="24" stroke="#FF4444" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="19" y1="18" x2="13" y2="24" stroke="#FF4444" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
      );
    } else if (e === 'lines') {
      elements.push(
        <g key={`ln${i}`} opacity="0.4">
          <line x1="10" y1="40" x2="5" y2="50" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="14" y1="42" x2="9" y2="52" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
      );
    } else if (e === 'shake-lines') {
      elements.push(
        <g key={`sl${i}`} opacity="0.5">
          <line x1="8" y1="35" x2="4" y2="42" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="12" y1="38" x2="8" y2="45" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="88" y1="35" x2="92" y2="42" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="84" y1="38" x2="88" y2="45" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
      );
    } else if (e === 'question') {
      elements.push(<text key={`q${i}`} x="80" y="22" fontSize="14" fill="#7C3AED" fontWeight="bold" fontFamily="Nunito">?</text>);
    } else if (e === 'drool') {
      elements.push(<path key={`dr${i}`} d="M58,72 C58,72 56,78 57,82 C58,86 62,86 63,82 C64,78 62,72 62,72Z" fill="#60B4FF" opacity="0.6"/>);
    }
  });
  return elements;
}

function PikachuFace({ mood = 'happy', size = 100, animated = false, className = '' }) {
  const config = MOODS[mood] || MOODS['happy'];
  const cheekOpacity = { bright: 0.9, soft: 0.6, dim: 0.3, red: 1.0, pink: 0.8 }[config.cheeks] || 0.7;
  const cheekColor = config.cheeks === 'pink' ? '#FF6B6B' : '#FF4444';

  const earUp = config.ears === 'up' || config.ears === 'one-up';
  const earLeft = config.ears !== 'angry' && config.ears !== 'back';

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`pikachu-face ${animated ? 'pika-animated' : ''} ${className}`}
      style={{ display: 'block', overflow: 'visible' }}
    >
      {/* Ears */}
      <g>
        {/* Left ear */}
        <polygon
          points={config.ears === 'angry' ? "22,12 16,2 28,2 30,15" : config.ears === 'back' ? "22,14 15,6 27,4 30,16" : config.ears === 'down' ? "22,16 18,8 28,6 30,18" : "22,14 18,4 28,2 30,16"}
          fill="#FFD93D"
          stroke="#F59E0B"
          strokeWidth="1"
        />
        <polygon
          points={config.ears === 'angry' ? "22,12 19,6 26,5 27,13" : config.ears === 'down' ? "22,16 20,10 26,8 27,16" : "22,14 20,7 26,5 27,14"}
          fill="#3D1C00"
          opacity="0.85"
        />
        {/* Right ear */}
        <polygon
          points={config.ears === 'angry' ? "78,12 72,2 84,2 70,15" : config.ears === 'back' ? "78,14 73,4 85,6 70,16" : config.ears === 'down' ? "78,16 72,6 82,8 70,18" : "78,14 72,2 82,4 70,16"}
          fill="#FFD93D"
          stroke="#F59E0B"
          strokeWidth="1"
        />
        <polygon
          points={config.ears === 'angry' ? "78,12 74,5 81,6 73,13" : config.ears === 'down' ? "78,16 74,8 80,10 73,16" : "78,14 74,5 80,7 73,14"}
          fill="#3D1C00"
          opacity="0.85"
        />
      </g>

      {/* Face circle */}
      <circle cx="50" cy="52" r="40" fill="#FFD93D" stroke="#F59E0B" strokeWidth="1.5"/>

      {/* Cheeks */}
      <ellipse cx="22" cy="62" rx="12" ry="8" fill={cheekColor} opacity={cheekOpacity} className={animated && config.cheeks === 'bright' ? 'pika-cheek-pulse' : ''}/>
      <ellipse cx="78" cy="62" rx="12" ry="8" fill={cheekColor} opacity={cheekOpacity} className={animated && config.cheeks === 'bright' ? 'pika-cheek-pulse' : ''}/>

      {/* Eyes */}
      {drawEyes(config.eyes, size)}

      {/* Nose */}
      <ellipse cx="50" cy="54" rx="3" ry="2" fill="#3D1C00" opacity="0.6"/>

      {/* Mouth */}
      <g>{drawMouth(config.mouth, size)}</g>

      {/* Extras (sparks, tears, etc.) */}
      {drawExtras(config.extras, size)}
    </svg>
  );
}

window.PikachuFace = PikachuFace;
window.MOODS = MOODS;
