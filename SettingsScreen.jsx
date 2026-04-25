// SettingsScreen.jsx — with theme, icons, working logout + delete account

function SettingsScreen({ username, email, setUsername, darkMode, setDarkMode, onLogout, onDeleteAccount, onViewProfile, entries, xp, streak }) {
  const [editingName, setEditingName] = React.useState(false);
  const [nameVal, setNameVal] = React.useState(username);
  const [reminders, setReminders] = React.useState(false);
  const [streakNudge, setStreakNudge] = React.useState(true);
  const [reminderTime, setReminderTime] = React.useState('09:00');
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);
  const [showPrivacy, setShowPrivacy] = React.useState(false);
  const [showTos, setShowTos] = React.useState(false);
  const [notifPermission, setNotifPermission] = React.useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'denied'
  );
  const t = useTheme();

  const requestNotifications = async () => {
    if (typeof Notification === 'undefined') return;
    const perm = await Notification.requestPermission();
    setNotifPermission(perm);
    if (perm === 'granted') {
      setReminders(true);
      new Notification('PikaMood ⚡', {
        body: "Pika pika! Reminders are on. I'll nudge you every day!",
        icon: ''
      });
    }
  };

  const handleReminderToggle = (val) => {
    if (val && notifPermission !== 'granted') {
      requestNotifications();
    } else {
      setReminders(val);
    }
  };

  const exportCSV = () => {
    const headers = ['Date','Time','Mood','Note','Tags','Intensity'];
    const rows = entries.map(e => {
      const d = new Date(e.timestamp);
      return [
        d.toLocaleDateString(),
        d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),
        MOOD_LABELS[e.mood]||e.mood,
        `"${(e.note||'').replace(/"/g,'""')}"`,
        `"${(e.tags||[]).join(', ')}"`,
        e.intensity||0,
      ].join(',');
    });
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `pikamood-${new Date().toISOString().split('T')[0]}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  React.useEffect(()=>setNameVal(username),[username]);

  const saveName = () => {
    if (nameVal.trim()) setUsername(nameVal.trim());
    setEditingName(false);
  };

  const Section = ({ title, children }) => (
    <div style={{ marginBottom:18 }}>
      <div style={{
        fontFamily:'Nunito', fontWeight:800, fontSize:11,
        color:t.textMuted, textTransform:'uppercase',
        letterSpacing:'0.07em', marginBottom:7, paddingLeft:4,
      }}>{title}</div>
      <div style={{
        background:t.surface, borderRadius:18, overflow:'hidden',
        border:`1.5px solid ${t.border}`,
      }}>{children}</div>
    </div>
  );

  const Row = ({ iconName, label, sub, right, onClick, danger, noBorder }) => (
    <div onClick={onClick} style={{
      display:'flex', alignItems:'center', gap:12, padding:'13px 15px',
      cursor: onClick?'pointer':'default',
      borderBottom: noBorder?'none':`1px solid ${t.border}`,
      transition: onClick?'background 0.1s':'none',
    }}
    onMouseEnter={e=>{ if(onClick) e.currentTarget.style.background=t.isDark?'#2D2210':'#FFFDE7'; }}
    onMouseLeave={e=>{ if(onClick) e.currentTarget.style.background=''; }}
    >
      {iconName && (
        <div style={{
          width:32, height:32, borderRadius:9,
          background: danger ? t.dangerBg : t.isDark?'#2D2210':'#FFF9DB',
          display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
        }}>
          <Icon name={iconName} size={16} color={danger?t.danger:'#F59E0B'}/>
        </div>
      )}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{
          fontFamily:'Nunito', fontWeight:700, fontSize:14,
          color: danger ? t.danger : t.textPrimary,
        }}>{label}</div>
        {sub && <div style={{ fontFamily:'Nunito', fontSize:11, color:t.textMuted, marginTop:1 }}>{sub}</div>}
      </div>
      {right || (onClick && !right && <Icon name="chevronRight" size={16} color={t.textMuted}/>)}
    </div>
  );

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:t.bg, position:'relative' }}>
      <div style={{
        padding:'14px 20px 10px', background:t.elevated,
        borderBottom:`1.5px solid ${t.border}`, flexShrink:0,
        display:'flex', alignItems:'center', gap:8,
      }}>
        <Icon name="settings" size={20} color="#F59E0B"/>
        <span style={{ fontFamily:'Nunito', fontWeight:900, fontSize:21, color:t.textPrimary }}>Settings</span>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'16px 15px 32px' }}>

        {/* Account */}
        <Section title="Account">
          <div style={{ padding:'15px', borderBottom:`1px solid ${t.border}` }}>
            <div style={{ display:'flex', alignItems:'center', gap:13 }}>
              <div style={{
                width:50, height:50, borderRadius:'50%',
                background:'linear-gradient(135deg,#FFD93D,#F59E0B)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:'Nunito', fontWeight:900, fontSize:20, color:'#7C5A00',
                border:'2.5px solid #F59E0B', flexShrink:0,
              }}>{(nameVal||'T').charAt(0).toUpperCase()}</div>
              <div style={{ flex:1, minWidth:0 }}>
                {editingName ? (
                  <div style={{ display:'flex', gap:7, alignItems:'center' }}>
                    <input value={nameVal} onChange={e=>setNameVal(e.target.value)}
                      onKeyDown={e=>e.key==='Enter'&&saveName()}
                      autoFocus
                      style={{
                        flex:1, minWidth:0, borderRadius:8, border:`2px solid #FFD93D`,
                        padding:'6px 9px', fontFamily:'Nunito', fontSize:14,
                        fontWeight:700, color:t.textPrimary, background:t.inputBg, outline:'none',
                      }}/>
                    <button onClick={saveName} style={{
                      background:'linear-gradient(135deg,#FFD93D,#F59E0B)', border:'none',
                      borderRadius:8, padding:'6px 11px', cursor:'pointer',
                      fontFamily:'Nunito', fontWeight:800, fontSize:13, color:'#7C5A00', flexShrink:0,
                    }}>Save</button>
                  </div>
                ) : (
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontFamily:'Nunito', fontWeight:800, fontSize:16, color:t.textPrimary }}>
                      {nameVal}
                    </span>
                    <button onClick={()=>setEditingName(true)} style={{
                      background:t.isDark?'#2D2210':'#FFF8DC', border:`1px solid ${t.border}`,
                      borderRadius:6, padding:'3px 8px', cursor:'pointer',
                      display:'flex', alignItems:'center', gap:4,
                      fontFamily:'Nunito', fontWeight:700, fontSize:11, color:t.textMuted,
                    }}>
                      <Icon name="edit" size={11} color={t.textMuted}/>
                      Edit
                    </button>
                  </div>
                )}
                <div style={{ fontFamily:'Nunito', fontSize:12, color:t.textMuted, marginTop:2 }}>
                  {email||'trainer@pikamood.app'}
                </div>
              </div>
            </div>
          </div>
          <Row iconName="user" label="View Profile" sub="Stats and achievements" onClick={onViewProfile} noBorder/>
        </Section>

        {/* Notifications */}
        <Section title="Notifications">
          <Row iconName="bell" label="Daily Reminders" sub={
            notifPermission === 'denied' ? "Tap to enable browser notifications" :
            notifPermission === 'granted' ? "Log your mood every day" : "Log your mood every day"
          }
            right={
              notifPermission === 'denied'
                ? <button onClick={requestNotifications} style={{
                    background:'linear-gradient(135deg,#FFD93D,#F59E0B)',
                    border:'none', borderRadius:8, padding:'5px 10px',
                    fontFamily:'Nunito', fontWeight:800, fontSize:11, color:'#7C5A00', cursor:'pointer',
                  }}>Enable</button>
                : <Toggle value={reminders} onChange={handleReminderToggle}/>
            }/>
          {reminders && notifPermission === 'granted' && (
            <Row iconName="clock" label="Reminder Time"
              right={
                <input type="time" value={reminderTime} onChange={e=>setReminderTime(e.target.value)} style={{
                  border:`1.5px solid ${t.border}`, borderRadius:8, padding:'4px 8px',
                  fontFamily:'Nunito', fontWeight:700, fontSize:13,
                  color:t.textPrimary, background:t.inputBg, outline:'none',
                }}/>
              }/>
          )}
          <Row iconName="lightning" label="Streak Nudges" sub="Alert when streak is at risk"
            right={<Toggle value={streakNudge} onChange={setStreakNudge}/>} noBorder/>
        </Section>

        {/* Appearance */}
        <Section title="Appearance">
          <Row iconName={darkMode?'moon':'sun'} label="Dark Mode" sub="Easier on the eyes at night"
            right={<Toggle value={darkMode} onChange={setDarkMode}/>} noBorder/>
        </Section>

        {/* Pro */}
        <Section title="PikaMood Pro">
          <div style={{ padding:'14px' }}>
            <div style={{
              background:t.isDark?'#2D2210':'#FFFDE7', borderRadius:12,
              padding:'11px 13px', marginBottom:12,
              border:`1.5px solid ${t.border}`,
            }}>
              <div style={{
                display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4px 16px',
              }}>
                {['Unlimited check-ins','All 30 moods','Full analytics','Ad-free'].map(b=>(
                  <div key={b} style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <Icon name="check" size={12} color="#F59E0B" strokeWidth={3}/>
                    <span style={{ fontFamily:'Nunito', fontWeight:700, fontSize:11, color:t.textSecondary }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <GoldButton style={{ width:'100%' }}>
              <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7 }}>
                <Icon name="star" size={15} color="#7C5A00"/>
                Upgrade to Pro
              </span>
            </GoldButton>
          </div>
        </Section>

        {/* Data */}
        <Section title="Data">
          <Row iconName="download" label="Export My Data" sub="Download all entries as CSV"
            onClick={exportCSV}/>
          <Row iconName="shield" label="Privacy Policy" onClick={()=>setShowPrivacy(true)}/>
          <Row iconName="info" label="Terms of Service" onClick={()=>setShowTos(true)} noBorder/>
        </Section>

        {/* Account actions */}
        <Section title="Account Actions">
          <Row iconName="logout" label="Log Out" sub="Sign out of your account"
            onClick={()=>setShowLogoutConfirm(true)}/>
          <Row iconName="trash" label="Delete Account" danger sub="Permanently remove all data"
            onClick={()=>setShowDeleteConfirm(true)} noBorder/>
        </Section>

        {/* About */}
        <div style={{
          background:t.isDark?'#2D2210':'#FFF9C4', borderRadius:12,
          padding:'11px 13px', border:`1px solid ${t.border}`,
        }}>
          <div style={{ fontFamily:'Nunito', fontWeight:700, fontSize:10, color:t.textMuted, lineHeight:1.6 }}>
            PikaMood v1.0.0 — A fan-made tribute app. Pokémon and Pikachu are trademarks of Nintendo/The Pokémon Company. Not affiliated with or endorsed by Nintendo or The Pokémon Company.
          </div>
        </div>

      </div>

      {/* Privacy Policy modal */}
      {showPrivacy && (
        <div style={{
          position:'absolute', inset:0, zIndex:60,
          background:t.overlay, display:'flex', alignItems:'flex-end',
          animation:'fadeIn 0.2s ease',
        }} onClick={()=>setShowPrivacy(false)}>
          <div onClick={e=>e.stopPropagation()} style={{
            width:'100%', height:'80%', background:t.surface,
            borderRadius:'24px 24px 0 0', border:`1.5px solid ${t.border}`,
            display:'flex', flexDirection:'column',
            animation:'sheetIn 0.3s cubic-bezier(0.32,0.72,0,1)',
          }}>
            <div style={{ display:'flex', justifyContent:'center', padding:'10px 0 6px' }}>
              <div style={{ width:36, height:4, borderRadius:2, background:t.border }}/>
            </div>
            <div style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'4px 18px 12px', borderBottom:`1px solid ${t.border}`,
            }}>
              <span style={{ fontFamily:'Nunito', fontWeight:900, fontSize:17, color:t.textPrimary }}>
                Privacy Policy
              </span>
              <button onClick={()=>setShowPrivacy(false)} style={{
                background:'none', border:'none', cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'center',
                width:32, height:32, borderRadius:'50%',
                background:t.isDark?'#3D2E10':'#FFF0A0',
              }}>
                <Icon name="close" size={14} color={t.textMuted} strokeWidth={2.5}/>
              </button>
            </div>
            <div style={{ flex:1, overflowY:'auto', padding:'16px 20px 28px' }}>
              {[
                ['Last updated', 'April 25, 2026'],
                ['1. Information We Collect', 'PikaMood collects mood entries, optional notes, tags, and intensity ratings you voluntarily submit. We also collect your trainer name and email address used during registration.'],
                ['2. How We Use Your Data', 'Your data is used solely to provide mood tracking features, analytics, and streak calculations within the app. We do not sell your personal data to any third parties.'],
                ['3. Data Storage', 'Your data is stored securely. In this prototype version, all data is stored locally in your browser session. In the production version, data will be encrypted at rest and in transit.'],
                ['4. Notifications', 'If you enable notifications, we use your browser\'s notification API to send you daily reminders. You can revoke this permission at any time in your browser settings.'],
                ['5. Data Export & Deletion', 'You have the right to export all your data as a CSV at any time. You may also delete your account and all associated data permanently from the Settings screen.'],
                ['6. Fan-Made Disclaimer', 'PikaMood is a fan-made tribute app. Pokémon and Pikachu are trademarks of Nintendo/The Pokémon Company. This app is not affiliated with or endorsed by Nintendo or The Pokémon Company.'],
                ['7. Contact', 'For privacy concerns, contact us at privacy@pikamood.app'],
              ].map(([title, body]) => (
                <div key={title} style={{ marginBottom:16 }}>
                  <div style={{ fontFamily:'Nunito', fontWeight:800, fontSize:13, color:t.textPrimary, marginBottom:4 }}>
                    {title}
                  </div>
                  <div style={{ fontFamily:'Nunito', fontWeight:600, fontSize:12, color:t.textMuted, lineHeight:1.7 }}>
                    {body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service modal */}
      {showTos && (
        <div style={{
          position:'absolute', inset:0, zIndex:60,
          background:t.overlay, display:'flex', alignItems:'flex-end',
          animation:'fadeIn 0.2s ease',
        }} onClick={()=>setShowTos(false)}>
          <div onClick={e=>e.stopPropagation()} style={{
            width:'100%', height:'80%', background:t.surface,
            borderRadius:'24px 24px 0 0', border:`1.5px solid ${t.border}`,
            display:'flex', flexDirection:'column',
            animation:'sheetIn 0.3s cubic-bezier(0.32,0.72,0,1)',
          }}>
            <div style={{ display:'flex', justifyContent:'center', padding:'10px 0 6px' }}>
              <div style={{ width:36, height:4, borderRadius:2, background:t.border }}/>
            </div>
            <div style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'4px 18px 12px', borderBottom:`1px solid ${t.border}`,
            }}>
              <span style={{ fontFamily:'Nunito', fontWeight:900, fontSize:17, color:t.textPrimary }}>
                Terms of Service
              </span>
              <button onClick={()=>setShowTos(false)} style={{
                background:t.isDark?'#3D2E10':'#FFF0A0', border:'none', borderRadius:'50%',
                width:32, height:32, cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <Icon name="close" size={14} color={t.textMuted} strokeWidth={2.5}/>
              </button>
            </div>
            <div style={{ flex:1, overflowY:'auto', padding:'16px 20px 28px' }}>
              {[
                ['Last updated', 'April 25, 2026'],
                ['1. Acceptance of Terms', 'By using PikaMood, you agree to these Terms of Service. If you do not agree, please do not use the app.'],
                ['2. Fan-Made App Disclaimer', 'PikaMood is an independent, fan-made tribute application. Pokémon and Pikachu are registered trademarks of Nintendo/The Pokémon Company. PikaMood is not affiliated with, endorsed by, or connected to Nintendo or The Pokémon Company in any way.'],
                ['3. User Accounts', 'You are responsible for maintaining the confidentiality of your account credentials. You must be 13 or older to create an account without parental consent. Users under 13 require verifiable parental consent.'],
                ['4. Acceptable Use', 'You agree to use PikaMood only for personal, non-commercial mood tracking purposes. You may not attempt to reverse engineer, copy, or redistribute the app.'],
                ['5. Your Content', 'Mood entries, notes, and data you create belong to you. We do not claim ownership of your personal data. You may export or delete your data at any time.'],
                ['6. No Medical Advice', 'PikaMood is a wellness companion tool for mood tracking only. It is not a medical device and does not provide medical, psychological, or clinical advice. If you are experiencing a mental health crisis, please contact a qualified professional.'],
                ['7. Termination', 'We reserve the right to terminate accounts that violate these terms. You may delete your account at any time from the Settings screen.'],
                ['8. Changes to Terms', 'We may update these terms periodically. Continued use of the app after changes constitutes acceptance of the new terms.'],
                ['9. Contact', 'For questions about these terms, contact us at legal@pikamood.app'],
              ].map(([title, body]) => (
                <div key={title} style={{ marginBottom:16 }}>
                  <div style={{ fontFamily:'Nunito', fontWeight:800, fontSize:13, color:t.textPrimary, marginBottom:4 }}>
                    {title}
                  </div>
                  <div style={{ fontFamily:'Nunito', fontWeight:600, fontSize:12, color:t.textMuted, lineHeight:1.7 }}>
                    {body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Logout confirm sheet */}
      {showLogoutConfirm && (
        <div style={{
          position:'absolute', inset:0, background:t.overlay, zIndex:50,
          display:'flex', alignItems:'flex-end',
        }} onClick={()=>setShowLogoutConfirm(false)}>
          <div onClick={e=>e.stopPropagation()} style={{
            width:'100%', background:t.surface, borderRadius:'22px 22px 0 0',
            padding:'24px 20px 36px', border:`1.5px solid ${t.border}`,
          }}>
            <div style={{ textAlign:'center', marginBottom:14 }}>
              <PikachuFace mood="sad" size={60}/>
            </div>
            <div style={{ fontFamily:'Nunito', fontWeight:900, fontSize:17, color:t.textPrimary, textAlign:'center', marginBottom:6 }}>
              Leaving so soon?
            </div>
            <div style={{ fontFamily:'Nunito', fontSize:13, color:t.textMuted, textAlign:'center', marginBottom:20, lineHeight:1.5 }}>
              Your streaks and data will be saved. Pikachu will wait for you!
            </div>
            <button onClick={onLogout} style={{
              width:'100%', padding:'13px', borderRadius:12, border:'none',
              background: t.isDark?'#3D2210':'#FFF0A0',
              color:t.textPrimary, cursor:'pointer',
              fontFamily:'Nunito', fontWeight:800, fontSize:15, marginBottom:10,
              display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            }}>
              <Icon name="logout" size={16} color={t.textSecondary}/>
              Yes, Log Out
            </button>
            <GoldButton onClick={()=>setShowLogoutConfirm(false)} style={{ width:'100%' }}>
              Stay on the journey!
            </GoldButton>
          </div>
        </div>
      )}

      {/* Delete confirm sheet */}
      {showDeleteConfirm && (
        <div style={{
          position:'absolute', inset:0, background:t.overlay, zIndex:50,
          display:'flex', alignItems:'flex-end',
        }} onClick={()=>setShowDeleteConfirm(false)}>
          <div onClick={e=>e.stopPropagation()} style={{
            width:'100%', background:t.surface, borderRadius:'22px 22px 0 0',
            padding:'24px 20px 36px', border:`1.5px solid ${t.border}`,
          }}>
            <div style={{ textAlign:'center', marginBottom:14 }}>
              <PikachuFace mood="lonely" size={60}/>
            </div>
            <div style={{ fontFamily:'Nunito', fontWeight:900, fontSize:17, color:t.textPrimary, textAlign:'center', marginBottom:6 }}>
              Delete your account?
            </div>
            <div style={{ fontFamily:'Nunito', fontSize:13, color:t.textMuted, textAlign:'center', marginBottom:20, lineHeight:1.5 }}>
              All your mood data, streaks, and your companion will be lost forever. This cannot be undone.
            </div>
            <button onClick={()=>{ setShowDeleteConfirm(false); onDeleteAccount(); }} style={{
              width:'100%', padding:'13px', borderRadius:12, border:`1.5px solid ${t.danger}`,
              background:t.dangerBg, color:t.danger, cursor:'pointer',
              fontFamily:'Nunito', fontWeight:800, fontSize:15, marginBottom:10,
              display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            }}>
              <Icon name="trash" size={16} color={t.danger}/>
              Delete Everything
            </button>
            <GoldButton onClick={()=>setShowDeleteConfirm(false)} style={{ width:'100%' }}>
              Never mind!
            </GoldButton>
          </div>
        </div>
      )}
    </div>
  );
}

window.SettingsScreen = SettingsScreen;
