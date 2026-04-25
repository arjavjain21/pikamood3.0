// StatsScreen.jsx — with theme + icons

function StatsScreen({ entries, xp, streak }) {
  const [energyTab, setEnergyTab] = React.useState('high');
  const t = useTheme();

  const today = new Date();
  const weekDayLabels = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const last7 = [...Array(7)].map((_,i)=>{
    const d = new Date(today); d.setDate(today.getDate()-(6-i));
    const entry = entries.find(e=>{
      const ed = new Date(e.timestamp);
      return ed.getDate()===d.getDate()&&ed.getMonth()===d.getMonth();
    });
    return { date:d, label:weekDayLabels[d.getDay()], entry:entry||null, isToday:i===6 };
  });

  const moodCounts = {};
  entries.forEach(e=>{ moodCounts[e.mood]=(moodCounts[e.mood]||0)+1; });
  const sortedMoods = Object.entries(moodCounts).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const maxCount = sortedMoods[0]?.[1]||1;

  const quadCounts={hep:0,lep:0,hen:0,len:0,complex:0};
  entries.forEach(e=>{const q=window.MOODS[e.mood]?.quadrant;if(q)quadCounts[q]++;});
  const total=entries.length||1;
  const highPct=Math.round(((quadCounts.hep+quadCounts.hen)/total)*100);
  const lowPct=100-highPct;

  const uniqueDays=new Set(entries.map(e=>new Date(e.timestamp).toDateString())).size;
  const readiness=Math.min(100,Math.round((uniqueDays/30)*60+(streak/14)*40));

  const year=today.getFullYear(), month=today.getMonth();
  const daysInMonth=new Date(year,month+1,0).getDate();
  const firstDow=new Date(year,month,1).getDay();
  const calCells=[...Array(firstDow).fill(null),...Array(daysInMonth).fill(0).map((_,i)=>i+1)];
  function getDayQ(day){
    if(!day)return null;
    const e=entries.find(e=>{const ed=new Date(e.timestamp);return ed.getDate()===day&&ed.getMonth()===month;});
    return e?window.MOODS[e.mood]?.quadrant:null;
  }

  const cardStyle = {
    background:t.surface, borderRadius:20,
    border:`1.5px solid ${t.border}`,
    boxShadow: t.isDark?'none':'0 2px 8px rgba(0,0,0,0.04)',
    marginBottom:18,
  };
  const sectionTitle = (icon, label) => (
    <div style={{
      display:'flex', alignItems:'center', gap:7,
      fontFamily:'Nunito', fontWeight:800, fontSize:14,
      color:t.textPrimary, marginBottom:11,
    }}>
      <Icon name={icon} size={16} color="#F59E0B"/>
      {label}
    </div>
  );

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:t.bg }}>
      <div style={{
        padding:'14px 20px 10px', background:t.elevated,
        borderBottom:`1.5px solid ${t.border}`, flexShrink:0,
        display:'flex', alignItems:'center', gap:8,
      }}>
        <Icon name="stats" size={20} color="#F59E0B"/>
        <span style={{ fontFamily:'Nunito', fontWeight:900, fontSize:21, color:t.textPrimary }}>PokeStats</span>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'16px 15px 28px' }}>

        {/* 7-day map */}
        <div>
          {sectionTitle('calendar','This Week')}
          <div style={{ ...cardStyle, padding:'14px 10px' }}>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              {last7.map(({label,entry,isToday},i)=>(
                <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                  {entry ? (
                    <div style={{
                      borderRadius:'50%', border: isToday ? '2px solid #F59E0B' : 'none',
                      padding: isToday ? 2 : 0,
                    }}>
                      <PikachuFace mood={entry.mood} size={36}/>
                    </div>
                  ) : (
                    <div style={{
                      width:36, height:36, borderRadius:'50%',
                      background: t.isDark?'#2D2210':'#F3F4F6',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      border: isToday?`2px solid ${t.border}`:'none',
                    }}>
                      <PikachuFace mood="bored" size={26}/>
                    </div>
                  )}
                  <span style={{
                    fontFamily:'Nunito', fontWeight:700, fontSize:10,
                    color: isToday ? '#F59E0B' : entry ? t.textSecondary : t.textMuted,
                  }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mood breakdown */}
        <div>
          {sectionTitle('stats','Mood Breakdown')}
          <div style={{ ...cardStyle, padding:'14px' }}>
            {sortedMoods.length===0 ? (
              <div style={{ fontFamily:'Nunito', fontSize:13, color:t.textMuted, textAlign:'center', padding:'10px 0' }}>
                No data yet — start checking in!
              </div>
            ) : sortedMoods.map(([mood,count])=>{
              const config=window.MOODS[mood];
              const qs=getQS(config?.quadrant, t.isDark);
              const pct=Math.round((count/total)*100);
              return (
                <div key={mood} style={{ display:'flex', alignItems:'center', gap:9, marginBottom:11 }}>
                  <PikachuFace mood={mood} size={30}/>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                      <span style={{ fontFamily:'Nunito', fontWeight:700, fontSize:12, color:t.textPrimary }}>
                        {MOOD_LABELS[mood]}
                      </span>
                      <span style={{ fontFamily:'Nunito', fontWeight:700, fontSize:11, color:t.textMuted }}>
                        {count}× · {pct}%
                      </span>
                    </div>
                    <div style={{ background:t.isDark?'#4A3518':'#F3F4F6', borderRadius:4, height:6, overflow:'hidden' }}>
                      <div style={{
                        height:'100%', width:`${(count/maxCount)*100}%`,
                        background:qs.border, borderRadius:4, transition:'width 0.6s ease',
                      }}/>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Streaks */}
        <div>
          {sectionTitle('flame','Streak Collection')}
          <div style={{ display:'flex', gap:10, marginBottom:18 }}>
            <div style={{
              flex:1, background:'linear-gradient(135deg,#FF6B35,#FF4444)',
              borderRadius:20, padding:'16px 12px', textAlign:'center',
            }}>
              <Icon name="flame" size={26} color="white"/>
              <div style={{ fontFamily:'Nunito', fontWeight:900, fontSize:26, color:'white', marginTop:4 }}>{streak}</div>
              <div style={{ fontFamily:'Nunito', fontWeight:700, fontSize:11, color:'rgba(255,255,255,0.85)' }}>Current Streak</div>
            </div>
            <div style={{
              flex:1, background:'linear-gradient(135deg,#FFD93D,#F59E0B)',
              borderRadius:20, padding:'16px 12px', textAlign:'center',
            }}>
              <Icon name="trophy" size={26} color="#7C5A00"/>
              <div style={{ fontFamily:'Nunito', fontWeight:900, fontSize:26, color:'#7C5A00', marginTop:4 }}>14</div>
              <div style={{ fontFamily:'Nunito', fontWeight:700, fontSize:11, color:'#92710A' }}>Best Streak</div>
            </div>
          </div>
        </div>

        {/* Energy balance */}
        <div>
          {sectionTitle('lightning','Energy Balance')}
          <div style={{ ...cardStyle, padding:'14px' }}>
            <div style={{ display:'flex', gap:6, marginBottom:14 }}>
              {[{key:'high',label:'High ⬆️'},{key:'low',label:'Low ⬇️'}].map(tab=>(
                <button key={tab.key} onClick={()=>setEnergyTab(tab.key)} style={{
                  flex:1, padding:'7px 0', borderRadius:8, cursor:'pointer',
                  border:'none', fontFamily:'Nunito', fontWeight:700, fontSize:12,
                  background: energyTab===tab.key ? 'linear-gradient(135deg,#FFD93D,#F59E0B)' : (t.isDark?'#2D2210':'#F3F4F6'),
                  color: energyTab===tab.key ? '#7C5A00' : t.textMuted, transition:'all 0.13s',
                }}>{tab.label}</button>
              ))}
            </div>
            <div style={{ fontFamily:'Nunito', fontWeight:900, fontSize:34, color:t.textPrimary, textAlign:'center' }}>
              {energyTab==='high'?highPct:lowPct}%
            </div>
            <div style={{ fontFamily:'Nunito', fontSize:12, color:t.textMuted, textAlign:'center', marginBottom:10 }}>
              {energyTab==='high'?'high':'low'} energy days this month
            </div>
            <div style={{ background:t.isDark?'#4A3518':'#F3F4F6', borderRadius:8, height:12, overflow:'hidden' }}>
              <div style={{
                height:'100%',
                width:`${energyTab==='high'?highPct:lowPct}%`,
                background: energyTab==='high'
                  ? 'linear-gradient(90deg,#FFD93D,#F59E0B)'
                  : 'linear-gradient(90deg,#63B3ED,#4299E1)',
                borderRadius:8, transition:'width 0.6s ease',
              }}/>
            </div>
          </div>
        </div>

        {/* Monthly calendar */}
        <div>
          {sectionTitle('calendar','Monthly View')}
          <div style={{ ...cardStyle, padding:'13px 11px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:3, marginBottom:5 }}>
              {['S','M','T','W','T','F','S'].map((d,i)=>(
                <div key={i} style={{ textAlign:'center', fontFamily:'Nunito', fontWeight:700, fontSize:10, color:t.textMuted }}>{d}</div>
              ))}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:3 }}>
              {calCells.map((day,i)=>{
                const q=getDayQ(day);
                const qs=q?getQS(q,t.isDark):null;
                const isToday=day===today.getDate();
                return (
                  <div key={i} style={{
                    aspectRatio:'1', borderRadius:6,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:10, fontFamily:'Nunito', fontWeight:700,
                    background: !day?'transparent': q?qs.bg: t.isDark?'#2D2210':'#F9FAFB',
                    color: !day?'transparent': q?qs.text: t.textMuted,
                    border: isToday?`2px solid #F59E0B`:'none',
                    position:'relative',
                  }}>
                    {day||''}
                    {q&&<div style={{
                      position:'absolute', bottom:2, right:2,
                      width:4, height:4, borderRadius:'50%', background:qs.border,
                    }}/>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Battle readiness */}
        <div>
          {sectionTitle('shield','Battle Readiness')}
          <div style={{ ...cardStyle, padding:'16px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:8 }}>
              <span style={{ fontFamily:'Nunito', fontWeight:700, fontSize:11, color:t.textMuted }}>0%</span>
              <span style={{ fontFamily:'Nunito', fontWeight:900, fontSize:28, color:t.textPrimary }}>{readiness}%</span>
              <span style={{ fontFamily:'Nunito', fontWeight:700, fontSize:11, color:t.textMuted }}>100%</span>
            </div>
            <div style={{ background:t.isDark?'#4A3518':'#F3F4F6', borderRadius:8, height:13, overflow:'hidden', marginBottom:10 }}>
              <div style={{
                height:'100%', width:`${readiness}%`,
                background:'linear-gradient(90deg,#FF4444 0%,#FFD93D 50%,#68D391 100%)',
                borderRadius:8, transition:'width 0.8s ease',
              }}/>
            </div>
            <div style={{ fontFamily:'Nunito', fontWeight:700, fontSize:12, color:t.textSecondary }}>
              Your emotional consistency this month
            </div>
            <div style={{ fontFamily:'Nunito', fontSize:11, color:t.textMuted, marginTop:3 }}>
              Higher = more consistent check-ins
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

window.StatsScreen = StatsScreen;
