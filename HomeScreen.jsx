// HomeScreen.jsx — with theme, icons, profile avatar tap, fixed interactions

function MoodCard({ moodKey, selected, onSelect, compact=false }) {
  const [pressed, setPressed] = React.useState(false);
  const t = useTheme();
  const config = window.MOODS[moodKey];
  const qs = getQS(config?.quadrant, t.isDark);
  const label = MOOD_LABELS[moodKey] || moodKey;

  return (
    <button
      onMouseDown={()=>setPressed(true)}
      onMouseUp={()=>{setPressed(false);onSelect(moodKey);}}
      onMouseLeave={()=>setPressed(false)}
      onTouchStart={()=>setPressed(true)}
      onTouchEnd={()=>{setPressed(false);onSelect(moodKey);}}
      style={{
        background: selected ? qs.bg : t.surface,
        border:`2px solid ${selected ? '#F59E0B' : qs.border}`,
        borderRadius:14, padding: compact ? '8px 4px' : '10px 6px',
        cursor:'pointer', display:'flex', flexDirection:'column',
        alignItems:'center', gap:4, minWidth:0,
        transform: pressed ? 'scale(0.92)' : selected ? 'scale(1.04)' : 'scale(1)',
        transition:'all 0.13s',
        boxShadow: selected ? `0 0 0 3px rgba(245,158,11,0.25)` : 'none',
        position:'relative',
      }}
    >
      <PikachuFace mood={moodKey} size={compact?44:52} animated={selected}/>
      <span style={{
        fontFamily:'Nunito', fontWeight:800, fontSize:10,
        color: selected ? (t.isDark?'#FFD93D':qs.text) : t.textSecondary,
        lineHeight:1.2, textAlign:'center',
      }}>{label}</span>
      {selected && (
        <div style={{
          position:'absolute', top:-6, right:-6,
          width:18, height:18, borderRadius:'50%',
          background:'linear-gradient(135deg,#FFD93D,#F59E0B)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <Icon name="check" size={10} color="#7C5A00" strokeWidth={3}/>
        </div>
      )}
    </button>
  );
}

function MoodModal({ onSubmit, onClose }) {
  const [step, setStep] = React.useState('select');
  const [selectedMood, setSelectedMood] = React.useState(null);
  const [note, setNote] = React.useState('');
  const [tags, setTags] = React.useState([]);
  const [intensity, setIntensity] = React.useState(0);
  const t = useTheme();

  const contextTags = ['Work','Personal','Health','Social'];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setTimeout(()=>setStep('note'), 280);
  };

  return (
    <div style={{
      position:'absolute', inset:0, zIndex:50,
      display:'flex', flexDirection:'column',
      background:t.bg,
      animation:'slideUp 0.32s cubic-bezier(0.32,0.72,0,1)',
    }}>
      {/* Header */}
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'14px 18px 12px', borderBottom:`1.5px solid ${t.border}`,
        background:t.elevated, flexShrink:0,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          {step==='note' && (
            <button onClick={()=>setStep('select')} style={{
              background:'none', border:'none', cursor:'pointer', padding:4,
              display:'flex', alignItems:'center',
            }}>
              <Icon name="chevronRight" size={20} color={t.textMuted}
                style={{ transform:'rotate(180deg)' }}/>
            </button>
          )}
          <span style={{ fontFamily:'Nunito', fontWeight:900, fontSize:17, color:t.textPrimary }}>
            {step==='select' ? 'How are you feeling?' : 'Tell me more...'}
          </span>
        </div>
        <button onClick={onClose} style={{
          background:t.isDark?'#3D2E10':'#FFF0A0', border:'none', borderRadius:'50%',
          width:32, height:32, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <Icon name="close" size={15} color={t.textMuted} strokeWidth={2.5}/>
        </button>
      </div>

      {step==='select' ? (
        <div style={{ flex:1, overflowY:'auto', padding:'12px 14px 24px' }}>
          {QUADRANT_ORDER.map(({key,moods})=>{
            const qs = getQS(key, t.isDark);
            const qlabel = QUADRANT_STYLES[key].label;
            return (
              <div key={key} style={{ marginBottom:18 }}>
                <div style={{
                  display:'inline-flex', alignItems:'center',
                  background:qs.bg, border:`1.5px solid ${qs.border}`,
                  borderRadius:8, padding:'4px 10px', marginBottom:9,
                }}>
                  <span style={{ fontFamily:'Nunito', fontWeight:800, fontSize:11, color:qs.text }}>
                    {qlabel}
                  </span>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:7 }}>
                  {moods.map(m=>(
                    <MoodCard key={m} moodKey={m} selected={selectedMood===m} onSelect={handleMoodSelect} compact/>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ flex:1, overflowY:'auto', padding:'20px 20px 28px' }}>
          {/* Pikachu response */}
          <div style={{ display:'flex', alignItems:'flex-start', gap:14, marginBottom:22 }}>
            <div style={{ flexShrink:0 }}>
              <PikachuFace mood={selectedMood} size={88} animated/>
            </div>
            <div style={{
              flex:1, background:t.surface, border:`2px solid ${t.border}`,
              borderRadius:'4px 16px 16px 16px',
              padding:'10px 12px', marginTop:8,
              boxShadow: t.isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
            }}>
              <p style={{
                margin:0, fontFamily:'Nunito', fontWeight:700, fontSize:12,
                color:t.textSecondary, lineHeight:1.5,
              }}>
                {PIKACHU_RESPONSES[selectedMood]||'Pika pika!'}
              </p>
            </div>
          </div>

          <div style={{
            fontFamily:'Nunito', fontWeight:900, fontSize:16, color:t.textPrimary,
            marginBottom:16, display:'flex', alignItems:'center', gap:6,
          }}>
            <PikachuFace mood={selectedMood} size={20}/>
            {MOOD_LABELS[selectedMood]}
          </div>

          {/* Note */}
          <div style={{ marginBottom:16 }}>
            <label style={{
              fontFamily:'Nunito', fontWeight:800, fontSize:12,
              color:t.textMuted, display:'flex', alignItems:'center', gap:5, marginBottom:7,
              textTransform:'uppercase', letterSpacing:'0.04em',
            }}>
              <Icon name="note" size={14} color={t.textMuted}/>
              Note (optional)
            </label>
            <textarea value={note} onChange={e=>setNote(e.target.value)}
              placeholder="Add a note for yourself..."
              rows={3}
              style={{
                width:'100%', borderRadius:12, border:`2px solid ${t.border}`,
                padding:'10px 12px', fontFamily:'Nunito', fontSize:14,
                fontWeight:600, color:t.textPrimary, background:t.inputBg,
                resize:'none', outline:'none', boxSizing:'border-box',
                transition:'border-color 0.15s',
              }}
            />
          </div>

          {/* Tags */}
          <div style={{ marginBottom:16 }}>
            <label style={{
              fontFamily:'Nunito', fontWeight:800, fontSize:12, color:t.textMuted,
              display:'flex', alignItems:'center', gap:5, marginBottom:8,
              textTransform:'uppercase', letterSpacing:'0.04em',
            }}>
              <Icon name="tag" size={14} color={t.textMuted}/>
              Context
            </label>
            <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
              {contextTags.map(tag=>(
                <button key={tag} onClick={()=>setTags(p=>p.includes(tag)?p.filter(x=>x!==tag):[...p,tag])} style={{
                  background: tags.includes(tag) ? 'linear-gradient(135deg,#FFD93D,#F59E0B)' : t.surface,
                  border:`2px solid ${tags.includes(tag) ? '#F59E0B' : t.border}`,
                  color: tags.includes(tag) ? '#7C5A00' : t.textMuted,
                  borderRadius:8, padding:'5px 13px',
                  fontFamily:'Nunito', fontWeight:700, fontSize:13, cursor:'pointer',
                  transition:'all 0.13s',
                }}>{tag}</button>
              ))}
            </div>
          </div>

          {/* Intensity */}
          <div style={{ marginBottom:24 }}>
            <label style={{
              fontFamily:'Nunito', fontWeight:800, fontSize:12, color:t.textMuted,
              display:'flex', alignItems:'center', gap:5, marginBottom:8,
              textTransform:'uppercase', letterSpacing:'0.04em',
            }}>
              <Icon name="lightning" size={14} color={t.textMuted}/>
              Intensity
            </label>
            <div style={{ display:'flex', gap:10, alignItems:'center' }}>
              {[1,2,3].map(v=>(
                <button key={v} onClick={()=>setIntensity(v===intensity?0:v)} style={{
                  background:'none', border:'none', cursor:'pointer',
                  opacity: intensity>=v ? 1 : 0.22,
                  transition:'all 0.15s', transform: intensity===v?'scale(1.18)':'scale(1)',
                }}>
                  <Icon name="lightning" size={22} color="#F59E0B"/>
                </button>
              ))}
              <span style={{ fontFamily:'Nunito', fontSize:12, color:t.textMuted, fontWeight:600 }}>
                {['Not set','Mild','Moderate','Intense'][intensity]}
              </span>
            </div>
          </div>

          <GoldButton onClick={()=>{ if(selectedMood) { onSubmit({mood:selectedMood,note,tags,intensity}); }}}
            style={{ width:'100%' }}>
            <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7 }}>
              <Icon name="check" size={16} color="#7C5A00" strokeWidth={2.5}/>
              Submit Check-In
            </span>
          </GoldButton>
        </div>
      )}
    </div>
  );
}

function SuccessOverlay({ mood, xpGained, onDone }) {
  React.useEffect(()=>{ const t=setTimeout(onDone,2600); return ()=>clearTimeout(t); },[]);
  const t = useTheme();
  return (
    <div style={{
      position:'absolute', inset:0, zIndex:60,
      background: t.isDark ? 'rgba(26,18,9,0.97)' : 'rgba(255,253,231,0.97)',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      animation:'fadeIn 0.25s ease',
    }}>
      {[...Array(18)].map((_,i)=>(
        <div key={i} style={{
          position:'absolute',
          left:`${10+Math.random()*80}%`, top:`${10+Math.random()*80}%`,
          animation:`confettiFall ${0.8+Math.random()*1.3}s ease-in-out infinite`,
          animationDelay:`${Math.random()*1.5}s`,
        }}>
          <Icon name={['sparkle','star','lightning','heart'][i%4]} size={8+Math.random()*8}
            color={['#FFD93D','#FF6B6B','#68D391','#63B3ED','#B794F4'][i%5]}/>
        </div>
      ))}
      <div style={{ animation:'bounceIn 0.45s cubic-bezier(0.34,1.56,0.64,1)' }}>
        <PikachuFace mood={mood} size={110} animated/>
      </div>
      <div style={{ fontFamily:'Nunito', fontWeight:900, fontSize:22, color:t.textPrimary, marginTop:16 }}>
        Check-in complete!
      </div>
      <div style={{ fontFamily:'Nunito', fontWeight:700, fontSize:14, color:t.textSecondary, marginTop:5 }}>
        Pika pika!
      </div>
      <div style={{
        marginTop:16, background:'linear-gradient(135deg,#FFD93D,#F59E0B)',
        borderRadius:20, padding:'8px 20px',
        display:'flex', alignItems:'center', gap:7,
        fontFamily:'Nunito', fontWeight:900, fontSize:16, color:'#7C5A00',
        animation:'floatUp 0.5s ease-out 0.3s both',
      }}>
        <Icon name="lightning" size={15} color="#7C5A00"/>
        +{xpGained} XP
      </div>
    </div>
  );
}

function HomeScreen({ username, entries, xp, streak, onCheckin, setActiveTab, onAvatarPress }) {
  const [showModal, setShowModal] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(null);
  const t = useTheme();

  const latestEntry = entries[0];
  const currentMood = latestEntry?.mood || 'happy';
  const stage = getEvolutionStage(xp);
  const progress = getEvolutionProgress(xp);

  const handleSubmit = (data) => {
    setShowModal(false);
    const xpGained = data.note ? 15 : 10;
    setShowSuccess({ mood:data.mood, xpGained });
    onCheckin(data, xpGained);
  };

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', position:'relative' }}>
      <div style={{ flex:1, overflowY:'auto', background:t.bg }}>
        {/* Header */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'14px 20px 10px', background:t.elevated,
          borderBottom:`1.5px solid ${t.border}`, flexShrink:0,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:7,
            fontFamily:'Nunito', fontWeight:900, fontSize:21, color:t.textPrimary }}>
            <Icon name="lightning" size={20} color="#F59E0B"/>
            PikaMood
          </div>
          <button onClick={onAvatarPress} style={{
            width:38, height:38, borderRadius:'50%',
            background:'linear-gradient(135deg,#FFD93D,#F59E0B)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:'Nunito', fontWeight:900, fontSize:15, color:'#7C5A00',
            border:`2.5px solid #F59E0B`, cursor:'pointer',
            transition:'transform 0.15s',
          }}>
            {username.charAt(0).toUpperCase()}
          </button>
        </div>

        <div style={{ padding:'18px 18px 28px' }}>
          {/* Greeting */}
          <div style={{ marginBottom:18 }}>
            <div style={{ fontFamily:'Nunito', fontWeight:900, fontSize:22, color:t.textPrimary }}>
              {getTimeGreeting()}, Trainer!
            </div>
            <div style={{ fontFamily:'Nunito', fontWeight:600, fontSize:14, color:t.textMuted, marginTop:2 }}>
              {username}
            </div>
          </div>

          {/* Companion card */}
          <div style={{
            background:t.elevated, borderRadius:22, padding:'22px 18px 16px',
            marginBottom:14, border:`1.5px solid ${t.border}`,
            boxShadow: t.isDark ? 'none' : '0 3px 16px rgba(245,158,11,0.07)',
            textAlign:'center',
          }}>
            <div style={{ display:'flex', justifyContent:'center', marginBottom:6 }}>
              <div style={{
                width:136, height:136, borderRadius:'50%',
                background: t.isDark ? 'rgba(255,217,61,0.06)' : 'radial-gradient(circle,rgba(255,217,61,0.18) 0%,transparent 70%)',
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <PikachuFace mood={currentMood} size={116} animated/>
              </div>
            </div>
            <div style={{ fontFamily:'Nunito', fontWeight:800, fontSize:15, color:t.textPrimary, marginBottom:3 }}>
              {stage.icon} {stage.name}
            </div>
            <div style={{ fontFamily:'Nunito', fontWeight:600, fontSize:12, color:t.textMuted, marginBottom:10 }}>
              {latestEntry ? `Feeling ${MOOD_LABELS[currentMood]}` : 'No check-in yet today'}
            </div>
            <div style={{ background:t.isDark?'#4A3518':'#FFE082', borderRadius:6, height:7, overflow:'hidden' }}>
              <div style={{
                height:'100%', width:`${progress}%`,
                background:'linear-gradient(90deg,#FFD93D,#F59E0B)',
                borderRadius:6, transition:'width 1s ease',
              }}/>
            </div>
            <div style={{ fontFamily:'Nunito', fontSize:11, color:t.textMuted, marginTop:5, fontWeight:600 }}>
              {xp} XP · {progress}% to next stage
            </div>
          </div>

          {/* Streak + XP */}
          <div style={{ display:'flex', gap:9, marginBottom:14 }}>
            <PillBadge iconName="flame" text={`${streak} day streak`} color1="#FF6B35" color2="#FF4444"/>
            <PillBadge iconName="lightning" text={`${xp} XP`} color1="#FFD93D" color2="#F59E0B" textColor="#7C5A00"/>
          </div>

          {/* Check-in card */}
          <div style={{
            background:t.surface, borderRadius:20, padding:'15px 18px',
            border:`1.5px solid ${t.border}`,
            boxShadow: t.isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',
          }}>
            <div style={{ fontFamily:'Nunito', fontWeight:800, fontSize:15, color:t.textPrimary, marginBottom:12 }}>
              How are you feeling today, Trainer?
            </div>
            <GoldButton onClick={()=>setShowModal(true)} style={{ width:'100%' }}>
              <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                <Icon name="lightning" size={16} color="#7C5A00"/>
                Check In
              </span>
            </GoldButton>
          </div>

          {/* Recent entries */}
          {entries.length>0 && (
            <div style={{ marginTop:16 }}>
              <div style={{
                fontFamily:'Nunito', fontWeight:800, fontSize:14, color:t.textPrimary,
                marginBottom:10, display:'flex', alignItems:'center', justifyContent:'space-between',
              }}>
                Recent Check-ins
                <button onClick={()=>setActiveTab('diary')} style={{
                  background:'none', border:'none', cursor:'pointer',
                  fontFamily:'Nunito', fontWeight:700, fontSize:12, color:'#F59E0B',
                  display:'flex', alignItems:'center', gap:3,
                }}>
                  See all <Icon name="chevronRight" size={13} color="#F59E0B"/>
                </button>
              </div>
              {entries.slice(0,2).map(e=>(
                <div key={e.id} style={{
                  display:'flex', alignItems:'center', gap:11,
                  background:t.surface, borderRadius:14, padding:'9px 13px',
                  marginBottom:7, border:`1.5px solid ${t.border}`,
                }}>
                  <PikachuFace mood={e.mood} size={38}/>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontFamily:'Nunito', fontWeight:800, fontSize:13, color:t.textPrimary }}>
                      {MOOD_LABELS[e.mood]}
                    </div>
                    {e.note && (
                      <div style={{
                        fontFamily:'Nunito', fontSize:12, color:t.textMuted,
                        fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                      }}>{e.note}</div>
                    )}
                  </div>
                  <div style={{ fontFamily:'Nunito', fontSize:11, color:t.textFaint, fontWeight:600, flexShrink:0 }}>
                    {formatTimestamp(e.timestamp)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && <MoodModal onSubmit={handleSubmit} onClose={()=>setShowModal(false)}/>}
      {showSuccess && (
        <SuccessOverlay mood={showSuccess.mood} xpGained={showSuccess.xpGained} onDone={()=>setShowSuccess(null)}/>
      )}
    </div>
  );
}

Object.assign(window, { HomeScreen, MoodCard });
