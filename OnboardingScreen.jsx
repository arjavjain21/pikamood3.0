// OnboardingScreen.jsx + LoginScreen.jsx — with icon system + theme

function OnboardingScreen({ onDone }) {
  const [slide, setSlide] = React.useState(0);
  const t = useTheme();

  const slides = [
    {
      face: 'hopeful',
      bubble: 'Pika pika?',
      headline: 'Track Your Mood',
      sub: 'Express how you feel with 30 unique Pikachu expressions',
    },
    {
      face: 'excited',
      headline: 'Watch Your Companion Grow',
      sub: 'Check in daily and your Pichu evolves into a Champion Pikachu',
      evolution: true,
    },
    {
      face: 'ecstatic',
      headline: "Gotta Track 'Em All",
      sub: 'Build the habit. See the patterns. Feel better.',
      cta: true,
    },
  ];

  const s = slides[slide];

  return (
    <div style={{
      height:'100%', display:'flex', flexDirection:'column',
      background: t.isDark
        ? 'linear-gradient(180deg,#1A1209 0%,#231A0B 60%,#3D2800 100%)'
        : 'linear-gradient(180deg,#FFFDE7 0%,#FFF8DC 60%,#FFD93D 100%)',
      position:'relative', overflow:'hidden',
    }}>
      {/* Lightning watermarks */}
      {[...Array(6)].map((_,i) => (
        <div key={i} style={{
          position:'absolute', left:`${10+i*16}%`, top:`${5+(i%3)*25}%`,
          opacity: t.isDark ? 0.06 : 0.04,
          transform:`rotate(${-20+i*15}deg)`, pointerEvents:'none',
        }}>
          <Icon name="lightning" size={48} color="#FFD93D"/>
        </div>
      ))}

      {slide < 2 && (
        <button onClick={onDone} style={{
          position:'absolute', top:14, right:16, background:'none', border:'none',
          cursor:'pointer', fontFamily:'Nunito', fontWeight:700, fontSize:13,
          color:t.textMuted, zIndex:2,
        }}>Skip</button>
      )}

      <div style={{
        flex:1, display:'flex', flexDirection:'column', alignItems:'center',
        justifyContent:'center', padding:'24px 32px', gap:24,
      }}>
        {/* Illustration */}
        <div style={{ position:'relative' }}>
          {s.evolution ? (
            <div style={{ display:'flex', alignItems:'flex-end', gap:14 }}>
              {[['🥚','Egg',44],['⚡','Pichu',54],['🌟','Pikachu',64],['👑','Champion',74]].map(([icon,lbl,sz],i) => (
                <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                  <div style={{
                    width:sz, height:sz, borderRadius:'50%',
                    background: i===3
                      ? 'linear-gradient(135deg,#FFD93D,#F59E0B)'
                      : t.isDark ? '#2D2210' : '#FFF9DB',
                    border:`2px solid ${i===3 ? '#F59E0B' : t.border}`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:sz*0.38,
                    boxShadow: i===3 ? '0 0 20px rgba(245,158,11,0.4)' : 'none',
                  }}>{icon}</div>
                  {i<3 && (
                    <div style={{ position:'absolute', bottom:28, left:`${20+i*72}px` }}>
                      <Icon name="chevronRight" size={14} color={t.textMuted}/>
                    </div>
                  )}
                  <span style={{ fontFamily:'Nunito', fontSize:9, fontWeight:700, color:t.textSecondary }}>{lbl}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ position:'relative' }}>
              <div style={{
                width:168, height:168, borderRadius:'50%',
                background: t.isDark ? 'rgba(255,217,61,0.08)' : 'rgba(255,217,61,0.15)',
                display:'flex', alignItems:'center', justifyContent:'center',
                animation:'pikaPulse 2.5s ease-in-out infinite',
              }}>
                <PikachuFace mood={s.face} size={136} animated/>
              </div>
              {s.bubble && (
                <div style={{
                  position:'absolute', top:-10, right:-32,
                  background:t.surface, border:`2px solid ${t.borderStrong}`,
                  borderRadius:'14px 14px 14px 4px',
                  padding:'6px 12px', whiteSpace:'nowrap',
                  boxShadow:'0 2px 8px rgba(0,0,0,0.08)',
                }}>
                  <span style={{ fontFamily:'Nunito', fontWeight:700, fontSize:13, color:t.textSecondary }}>
                    {s.bubble}
                  </span>
                </div>
              )}
              {s.cta && (
                <div style={{ position:'absolute', inset:-20, pointerEvents:'none' }}>
                  {[...Array(10)].map((_,i) => (
                    <div key={i} style={{
                      position:'absolute',
                      left:`${Math.sin(i*36*Math.PI/180)*110+80}px`,
                      top:`${Math.cos(i*36*Math.PI/180)*110+80}px`,
                      animation:`confettiFall ${0.8+i*0.2}s ease-in-out infinite`,
                      animationDelay:`${i*0.15}s`,
                    }}>
                      <Icon name="sparkle" size={10} color={['#FFD93D','#FF6B6B','#68D391','#63B3ED','#B794F4'][i%5]}/>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ textAlign:'center' }}>
          <h1 style={{
            fontFamily:'Nunito', fontWeight:900, fontSize:26, color:t.textPrimary,
            margin:'0 0 10px', lineHeight:1.2,
          }}>{s.headline}</h1>
          <p style={{
            fontFamily:'Nunito', fontWeight:600, fontSize:15, color:t.textSecondary,
            margin:0, lineHeight:1.6,
          }}>{s.sub}</p>
        </div>

        {s.cta ? (
          <GoldButton onClick={onDone} style={{ width:'100%', marginTop:8 }}>
            <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              <Icon name="lightning" size={16} color="#7C5A00"/>
              Get Started
            </span>
          </GoldButton>
        ) : (
          <button onClick={()=>setSlide(s=>s+1)} style={{
            background:'none', border:'none', cursor:'pointer',
            display:'flex', alignItems:'center', gap:6,
            fontFamily:'Nunito', fontWeight:800, fontSize:15, color:'#F59E0B',
          }}>
            Next
            <Icon name="chevronRight" size={18} color="#F59E0B"/>
          </button>
        )}
      </div>

      {/* Dots */}
      <div style={{ display:'flex', justifyContent:'center', gap:8, paddingBottom:36 }}>
        {slides.map((_,i) => (
          <div key={i} onClick={()=>setSlide(i)} style={{
            width: i===slide ? 22 : 8, height:8, borderRadius:4,
            background: i===slide ? '#F59E0B' : t.border,
            transition:'all 0.3s', cursor:'pointer',
          }}/>
        ))}
      </div>
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [mode, setMode] = React.useState('login');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [remember, setRemember] = React.useState(true);
  const t = useTheme();

  const inputStyle = {
    width:'100%', padding:'12px 12px 12px 42px', borderRadius:12,
    border:`2px solid ${t.border}`, fontFamily:'Nunito', fontSize:15,
    fontWeight:600, background:t.inputBg, outline:'none',
    boxSizing:'border-box', color:t.textPrimary,
    transition:'border-color 0.15s',
  };

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async () => {
    if (mode==='signup') {
      if (!username.trim()) { setError('Please choose a Trainer Name!'); return; }
      if (!email.trim() || !validateEmail(email)) { setError('Please enter a valid email address!'); return; }
    }
    if (!password.trim()) { setError('Please enter your password!'); return; }
    if (mode==='signup' && password.length < 6) { setError('Password must be at least 6 characters!'); return; }
    setError('');

    if (window.DB && window.SUPABASE_ENABLED) {
      if (mode === 'signup') {
        const { data, error } = await window.DB.signUp(email, password, username);
        if (error) { setError(error.message); return; }
        onLogin(username || 'Trainer', email);
      } else {
        const { data, error } = await window.DB.signIn(email || username, password);
        if (error) { setError('Incorrect email or password.'); return; }
        const displayName = data?.user?.user_metadata?.username || username || 'Trainer';
        onLogin(displayName, data?.user?.email || email);
      }
    } else {
      // localStorage mode — no real auth needed
      onLogin(username || 'Trainer', email || 'trainer@pikamood.app');
    }
  };

  return (
    <div style={{
      height:'100%', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', padding:'20px',
      background: t.isDark
        ? 'linear-gradient(180deg,#1A1209,#231A0B)'
        : 'linear-gradient(180deg,#FFFDE7,#FFF8DC)',
      position:'relative', overflow:'hidden',
    }}>
      {[...Array(8)].map((_,i) => (
        <div key={i} style={{
          position:'absolute', left:`${(i*23)%90}%`, top:`${(i*17)%85}%`,
          opacity: t.isDark ? 0.05 : 0.04,
          transform:`rotate(${i*40}deg)`, pointerEvents:'none',
        }}>
          <Icon name="lightning" size={36} color="#FFD93D"/>
        </div>
      ))}

      <div style={{
        width:'100%', maxWidth:360,
        background:t.surface, border:`3px solid ${t.borderStrong}`,
        borderRadius:28, padding:'28px 24px',
        boxShadow: t.isDark ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 32px rgba(245,158,11,0.12)',
        position:'relative', zIndex:1,
      }}>
        <div style={{ display:'flex', justifyContent:'center', marginBottom:12 }}>
          <PikachuFace mood="happy" size={88} animated/>
        </div>

        <div style={{ textAlign:'center', marginBottom:20 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            fontFamily:'Nunito', fontWeight:900, fontSize:27, color:t.textPrimary }}>
            <Icon name="lightning" size={24} color="#F59E0B"/>
            PikaMood
          </div>
          <div style={{ fontFamily:'Nunito', fontWeight:600, fontSize:12, color:t.textMuted, fontStyle:'italic', marginTop:4 }}>
            Your Pokémon-Powered Wellness Companion
          </div>
        </div>

        {/* Toggle */}
        <div style={{
          display:'flex', background:t.elevated, borderRadius:12,
          padding:4, marginBottom:20, border:`1.5px solid ${t.border}`,
        }}>
          {['login','signup'].map(m => (
            <button key={m} onClick={()=>{setMode(m);setError('');}} style={{
              flex:1, padding:'8px 0', border:'none', cursor:'pointer', borderRadius:8,
              fontFamily:'Nunito', fontWeight:800, fontSize:14,
              background: mode===m ? 'linear-gradient(135deg,#FFD93D,#F59E0B)' : 'transparent',
              color: mode===m ? '#7C5A00' : t.textMuted, transition:'all 0.2s',
            }}>
              {m==='login' ? 'Log In' : 'Sign Up'}
            </button>
          ))}
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:14 }}>
          {mode==='signup' && (
            <div style={{ position:'relative' }}>
              <div style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)' }}>
                <Icon name="user" size={17} color={t.textMuted}/>
              </div>
              <input value={username} onChange={e=>setUsername(e.target.value)}
                placeholder="Choose a trainer name" style={inputStyle}/>
            </div>
          )}
          {mode==='signup' && (
            <div style={{ position:'relative' }}>
              <div style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)' }}>
                <Icon name="info" size={17} color={t.textMuted}/>
              </div>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                placeholder="Your email address" style={inputStyle}/>
            </div>
          )}
          <div style={{ position:'relative' }}>
            <div style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)' }}>
              <Icon name="lock" size={17} color={t.textMuted}/>
            </div>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
              placeholder="Your secret password"
              onKeyDown={e=>e.key==='Enter'&&handleSubmit()}
              style={inputStyle}/>
          </div>
        </div>

        <label style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14, cursor:'pointer' }}>
          <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}
            style={{ accentColor:'#F59E0B', width:15, height:15 }}/>
          <span style={{ fontFamily:'Nunito', fontWeight:700, fontSize:13, color:t.textSecondary }}>
            Remember me
          </span>
        </label>

        {error && (
          <div style={{
            background:t.dangerBg, color:t.danger, borderRadius:8,
            padding:'8px 12px', fontFamily:'Nunito', fontWeight:700,
            fontSize:13, marginBottom:12, display:'flex', alignItems:'center', gap:6,
          }}>
            <Icon name="info" size={14} color={t.danger}/>
            {error}
          </div>
        )}

        <GoldButton onClick={()=>handleSubmit()} style={{ width:'100%', marginBottom:14 }}>
          <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            <Icon name="lightning" size={15} color="#7C5A00"/>
            {mode==='login' ? 'Log In' : 'Start Your Journey!'}
          </span>
        </GoldButton>

        <div style={{ textAlign:'center' }}>
          <button onClick={()=>{setMode(mode==='login'?'signup':'login');setError('');}} style={{
            background:'none', border:'none', cursor:'pointer',
            fontFamily:'Nunito', fontWeight:700, fontSize:13, color:'#F59E0B', textDecoration:'underline',
          }}>
            {mode==='login' ? 'New trainer? Sign up' : 'Already a trainer? Log in'}
          </button>
        </div>

        <div style={{
          textAlign:'center', marginTop:14,
          fontFamily:'Nunito', fontWeight:600, fontSize:11,
          color:t.textFaint, fontStyle:'italic',
        }}>Gotta Track 'Em All</div>
      </div>
    </div>
  );
}

Object.assign(window, { OnboardingScreen, LoginScreen });
