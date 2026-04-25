// DiaryScreen.jsx — with theme + icons + edit modal

function EditEntryModal({ entry, onSave, onClose }) {
  const [note, setNote] = React.useState(entry.note || '');
  const [tags, setTags] = React.useState(entry.tags || []);
  const [intensity, setIntensity] = React.useState(entry.intensity || 0);
  const t = useTheme();
  const contextTags = ['Work','Personal','Health','Social'];

  return (
    <div style={{
      position:'absolute', inset:0, zIndex:70,
      background:t.overlay, display:'flex', alignItems:'flex-end',
      animation:'fadeIn 0.2s ease',
    }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        width:'100%', background:t.surface,
        borderRadius:'22px 22px 0 0',
        border:`1.5px solid ${t.border}`,
        animation:'sheetIn 0.3s cubic-bezier(0.32,0.72,0,1)',
        paddingBottom:32,
      }}>
        <div style={{ display:'flex', justifyContent:'center', padding:'10px 0 4px' }}>
          <div style={{ width:36, height:4, borderRadius:2, background:t.border }}/>
        </div>
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'6px 18px 14px', borderBottom:`1px solid ${t.border}`,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <PikachuFace mood={entry.mood} size={36}/>
            <span style={{ fontFamily:'Nunito', fontWeight:900, fontSize:17, color:t.textPrimary }}>
              Edit {MOOD_LABELS[entry.mood]}
            </span>
          </div>
          <button onClick={onClose} style={{
            background:t.isDark?'#3D2E10':'#FFF0A0', border:'none', borderRadius:'50%',
            width:30, height:30, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <Icon name="close" size={13} color={t.textMuted} strokeWidth={2.5}/>
          </button>
        </div>

        <div style={{ padding:'16px 20px' }}>
          <label style={{
            fontFamily:'Nunito', fontWeight:800, fontSize:11, color:t.textMuted,
            textTransform:'uppercase', letterSpacing:'0.05em',
            display:'flex', alignItems:'center', gap:5, marginBottom:7,
          }}>
            <Icon name="note" size={13} color={t.textMuted}/> Note
          </label>
          <textarea value={note} onChange={e=>setNote(e.target.value)} rows={3} style={{
            width:'100%', borderRadius:12, border:`2px solid ${t.border}`,
            padding:'10px 12px', fontFamily:'Nunito', fontSize:14,
            fontWeight:600, color:t.textPrimary, background:t.inputBg,
            resize:'none', outline:'none', boxSizing:'border-box', marginBottom:14,
          }}/>

          <label style={{
            fontFamily:'Nunito', fontWeight:800, fontSize:11, color:t.textMuted,
            textTransform:'uppercase', letterSpacing:'0.05em',
            display:'flex', alignItems:'center', gap:5, marginBottom:8,
          }}>
            <Icon name="tag" size={13} color={t.textMuted}/> Context
          </label>
          <div style={{ display:'flex', gap:7, flexWrap:'wrap', marginBottom:14 }}>
            {contextTags.map(tag=>(
              <button key={tag} onClick={()=>setTags(p=>p.includes(tag)?p.filter(x=>x!==tag):[...p,tag])} style={{
                background: tags.includes(tag) ? 'linear-gradient(135deg,#FFD93D,#F59E0B)' : t.surface,
                border:`2px solid ${tags.includes(tag)?'#F59E0B':t.border}`,
                color: tags.includes(tag) ? '#7C5A00' : t.textMuted,
                borderRadius:8, padding:'5px 13px',
                fontFamily:'Nunito', fontWeight:700, fontSize:13, cursor:'pointer',
              }}>{tag}</button>
            ))}
          </div>

          <label style={{
            fontFamily:'Nunito', fontWeight:800, fontSize:11, color:t.textMuted,
            textTransform:'uppercase', letterSpacing:'0.05em',
            display:'flex', alignItems:'center', gap:5, marginBottom:8,
          }}>
            <Icon name="lightning" size={13} color={t.textMuted}/> Intensity
          </label>
          <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:20 }}>
            {[1,2,3].map(v=>(
              <button key={v} onClick={()=>setIntensity(v===intensity?0:v)} style={{
                background:'none', border:'none', cursor:'pointer',
                opacity:intensity>=v?1:0.22, transition:'all 0.15s',
                transform:intensity===v?'scale(1.18)':'scale(1)',
              }}>
                <Icon name="lightning" size={22} color="#F59E0B"/>
              </button>
            ))}
            <span style={{ fontFamily:'Nunito', fontSize:12, color:t.textMuted, fontWeight:600 }}>
              {['Not set','Mild','Moderate','Intense'][intensity]}
            </span>
          </div>

          <GoldButton onClick={()=>{ haptic([10,5,10]); onSave({...entry,note,tags,intensity}); }} style={{ width:'100%' }}>
            <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7 }}>
              <Icon name="check" size={15} color="#7C5A00" strokeWidth={3}/>
              Save Changes
            </span>
          </GoldButton>
        </div>
      </div>
    </div>
  );
}

function DiaryScreen({ entries, onEditEntry }) {
  const [filter, setFilter] = React.useState('all');
  const [expanded, setExpanded] = React.useState(null);
  const [editingEntry, setEditingEntry] = React.useState(null);
  const t = useTheme();

  const filters = [
    { key:'all',     label:'All'        },
    { key:'hep',     label:'High+ ⬆️'   },
    { key:'lep',     label:'Low+ ⬇️'    },
    { key:'hen',     label:'Neg ⬆️'     },
    { key:'len',     label:'Neg ⬇️'     },
    { key:'complex', label:'Complex 🔮' },
  ];

  const filtered = filter==='all' ? entries
    : entries.filter(e=>window.MOODS[e.mood]?.quadrant===filter);

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:t.bg }}>
      <div style={{
        padding:'14px 20px 10px', background:t.elevated,
        borderBottom:`1.5px solid ${t.border}`, flexShrink:0,
        display:'flex', alignItems:'center', gap:8,
      }}>
        <Icon name="diary" size={20} color="#F59E0B"/>
        <span style={{ fontFamily:'Nunito', fontWeight:900, fontSize:21, color:t.textPrimary }}>
          PikaDiary
        </span>
      </div>

      {/* Filter bar */}
      <div style={{
        display:'flex', gap:7, overflowX:'auto', padding:'9px 14px',
        background:t.elevated, borderBottom:`1px solid ${t.border}`,
        flexShrink:0, scrollbarWidth:'none',
      }}>
        {filters.map(f=>(
          <button key={f.key} onClick={()=>setFilter(f.key)} style={{
            flexShrink:0,
            background: filter===f.key ? 'linear-gradient(135deg,#FFD93D,#F59E0B)' : t.surface,
            border:`1.5px solid ${filter===f.key ? '#F59E0B' : t.border}`,
            borderRadius:8, padding:'5px 11px',
            fontFamily:'Nunito', fontWeight:800, fontSize:12,
            color: filter===f.key ? '#7C5A00' : t.textMuted,
            cursor:'pointer', transition:'all 0.13s', whiteSpace:'nowrap',
          }}>{f.label}</button>
        ))}
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'12px 14px 24px' }}>
        {filtered.length===0 ? (
          <div style={{
            display:'flex', flexDirection:'column', alignItems:'center',
            justifyContent:'center', height:'60%', gap:14,
          }}>
            <PikachuFace mood="hopeful" size={96} animated/>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'Nunito', fontWeight:800, fontSize:16, color:t.textPrimary, marginBottom:6 }}>
                Your journey starts here!
              </div>
              <div style={{ fontFamily:'Nunito', fontWeight:600, fontSize:13, color:t.textMuted }}>
                Head to Home and log your first mood
              </div>
            </div>
          </div>
        ) : (
          <>
            <div style={{
              fontFamily:'Nunito', fontWeight:700, fontSize:12,
              color:t.textMuted, marginBottom:10,
              display:'flex', alignItems:'center', gap:5,
            }}>
              <Icon name="filter" size={13} color={t.textMuted}/>
              {filtered.length} {filtered.length===1?'entry':'entries'}
            </div>
            {filtered.map(e=>{
              const config = window.MOODS[e.mood]||window.MOODS['happy'];
              const qs = getQS(config?.quadrant, t.isDark);
              const isExpanded = expanded===e.id;
              return (
                <div key={e.id} onClick={()=>setExpanded(isExpanded?null:e.id)} style={{
                  background:t.surface, borderRadius:16, padding:'11px 13px',
                  marginBottom:9, border:`1.5px solid ${isExpanded?'#F59E0B':t.border}`,
                  cursor:'pointer', transition:'all 0.18s',
                  boxShadow: isExpanded ? (t.isDark?'none':'0 4px 16px rgba(245,158,11,0.1)') : 'none',
                }}>
                  <div style={{ display:'flex', alignItems:'center', gap:11 }}>
                    <PikachuFace mood={e.mood} size={42} animated={isExpanded}/>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:2 }}>
                        <span style={{ fontFamily:'Nunito', fontWeight:800, fontSize:14, color:t.textPrimary }}>
                          {MOOD_LABELS[e.mood]||e.mood}
                        </span>
                        <div style={{
                          width:7, height:7, borderRadius:'50%',
                          background:qs.border, flexShrink:0,
                        }}/>
                      </div>
                      {e.note ? (
                        <div style={{
                          fontFamily:'Nunito', fontSize:12, color:t.textMuted, fontWeight:600,
                          overflow:'hidden', textOverflow:'ellipsis',
                          whiteSpace: isExpanded?'normal':'nowrap',
                          lineHeight: 1.4,
                        }}>{e.note}</div>
                      ) : (
                        <div style={{ fontFamily:'Nunito', fontSize:12, color:t.textFaint, fontWeight:600, fontStyle:'italic' }}>
                          No note
                        </div>
                      )}
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4, flexShrink:0 }}>
                      <div style={{ fontFamily:'Nunito', fontSize:10, color:t.textFaint, fontWeight:600, textAlign:'right' }}>
                        {formatTimestamp(e.timestamp)}
                      </div>
                      <Icon name={isExpanded?'arrowUp':'arrowDown'} size={13} color={t.textMuted}/>
                    </div>
                  </div>

                  {isExpanded && (
                    <div style={{ marginTop:11, paddingTop:11, borderTop:`1px solid ${t.border}` }}>
                      {e.tags&&e.tags.length>0 && (
                        <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:9 }}>
                          {e.tags.map(tag=>(
                            <span key={tag} style={{
                              background:qs.bg, border:`1.5px solid ${qs.border}`,
                              borderRadius:7, padding:'3px 9px',
                              fontFamily:'Nunito', fontWeight:700, fontSize:11, color:qs.text,
                            }}>{tag}</span>
                          ))}
                        </div>
                      )}
                      {e.intensity>0 && (
                        <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:9 }}>
                          <span style={{ fontFamily:'Nunito', fontSize:12, color:t.textMuted, fontWeight:600 }}>Intensity</span>
                          {[1,2,3].map(v=>(
                            <Icon key={v} name="lightning" size={14}
                              color={e.intensity>=v?'#F59E0B':t.border}/>
                          ))}
                        </div>
                      )}
                      <button onClick={e2=>{e2.stopPropagation(); haptic([8]); setEditingEntry(e); setExpanded(null);}} style={{
                        background:'none', border:`1.5px solid ${t.border}`,
                        borderRadius:8, padding:'5px 13px', cursor:'pointer',
                        fontFamily:'Nunito', fontWeight:700, fontSize:12, color:t.textMuted,
                        display:'flex', alignItems:'center', gap:5,
                      }}>
                        <Icon name="edit" size={12} color={t.textMuted}/>
                        Edit entry
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>

      {editingEntry && (
        <EditEntryModal
          entry={editingEntry}
          onSave={(updated) => { onEditEntry(updated); setEditingEntry(null); }}
          onClose={() => setEditingEntry(null)}
        />
      )}
    </div>
  );
}

window.DiaryScreen = DiaryScreen;
