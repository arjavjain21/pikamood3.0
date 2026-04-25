// DatabaseService.jsx
// Wraps Supabase when configured, falls back to localStorage gracefully.
// Works offline — queues writes and syncs when back online.

const DB_QUEUE_KEY = 'pikamood_offline_queue';

const DatabaseService = (() => {
  let supabase = null;

  // Initialize Supabase client if config is present
  function init() {
    if (window.SUPABASE_ENABLED && window.supabase) {
      supabase = window.supabase.createClient(
        window.SUPABASE_CONFIG.url,
        window.SUPABASE_CONFIG.anonKey,
        {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
          }
        }
      );
      console.log('[PikaMood] Supabase connected');
    } else {
      console.log('[PikaMood] Running in localStorage mode');
    }
    return supabase;
  }

  // ── Auth ──────────────────────────────────────────────────────────
  async function signUp(email, password, username) {
    if (!supabase) return { error: null, data: { user: { id: 'local', email } } };
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { username } }
    });
    return { data, error };
  }

  async function signIn(email, password) {
    if (!supabase) return { error: null, data: { user: { id: 'local', email } } };
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  async function getSession() {
    if (!supabase) return null;
    const { data } = await supabase.auth.getSession();
    return data?.session;
  }

  function onAuthStateChange(callback) {
    if (!supabase) return () => {};
    const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
    return () => subscription.unsubscribe();
  }

  // ── Profile ───────────────────────────────────────────────────────
  async function getProfile(userId) {
    if (!supabase) {
      const saved = JSON.parse(localStorage.getItem('pikamood_v1') || '{}');
      return { data: saved.profile || null, error: null };
    }
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  }

  async function updateProfile(userId, updates) {
    if (!supabase) {
      const saved = JSON.parse(localStorage.getItem('pikamood_v1') || '{}');
      saved.profile = { ...(saved.profile || {}), ...updates };
      localStorage.setItem('pikamood_v1', JSON.stringify(saved));
      return { error: null };
    }
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: userId, ...updates, updated_at: new Date().toISOString() });
    return { error };
  }

  // ── Mood Entries ──────────────────────────────────────────────────
  async function getEntries(userId) {
    if (!supabase) {
      const saved = JSON.parse(localStorage.getItem('pikamood_v1') || '{}');
      const entries = (saved.entries || []).map(e => ({ ...e, timestamp: new Date(e.timestamp) }));
      return { data: entries, error: null };
    }
    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (data) {
      return {
        data: data.map(e => ({ ...e, timestamp: new Date(e.created_at) })),
        error: null,
      };
    }
    return { data: [], error };
  }

  async function addEntry(userId, entry) {
    if (!supabase) {
      // LocalStorage fallback
      const saved = JSON.parse(localStorage.getItem('pikamood_v1') || '{}');
      saved.entries = [entry, ...(saved.entries || [])];
      localStorage.setItem('pikamood_v1', JSON.stringify(saved));
      return { data: entry, error: null };
    }
    // If offline, queue it
    if (!navigator.onLine) {
      queueOfflineWrite({ type: 'insert', table: 'mood_entries', payload: { user_id: userId, ...entry } });
      return { data: entry, error: null };
    }
    const { data, error } = await supabase
      .from('mood_entries')
      .insert({
        user_id:   userId,
        mood:      entry.mood,
        note:      entry.note || '',
        tags:      entry.tags || [],
        intensity: entry.intensity || 0,
        created_at: entry.timestamp?.toISOString() || new Date().toISOString(),
      })
      .select()
      .single();
    return { data, error };
  }

  async function updateEntry(userId, entryId, updates) {
    if (!supabase) {
      const saved = JSON.parse(localStorage.getItem('pikamood_v1') || '{}');
      saved.entries = (saved.entries || []).map(e =>
        e.id === entryId ? { ...e, ...updates } : e
      );
      localStorage.setItem('pikamood_v1', JSON.stringify(saved));
      return { error: null };
    }
    const { error } = await supabase
      .from('mood_entries')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', entryId)
      .eq('user_id', userId);
    return { error };
  }

  async function deleteEntry(userId, entryId) {
    if (!supabase) {
      const saved = JSON.parse(localStorage.getItem('pikamood_v1') || '{}');
      saved.entries = (saved.entries || []).filter(e => e.id !== entryId);
      localStorage.setItem('pikamood_v1', JSON.stringify(saved));
      return { error: null };
    }
    const { error } = await supabase
      .from('mood_entries')
      .delete()
      .eq('id', entryId)
      .eq('user_id', userId);
    return { error };
  }

  // ── Offline Queue ─────────────────────────────────────────────────
  function queueOfflineWrite(operation) {
    const queue = JSON.parse(localStorage.getItem(DB_QUEUE_KEY) || '[]');
    queue.push({ ...operation, timestamp: Date.now() });
    localStorage.setItem(DB_QUEUE_KEY, JSON.stringify(queue));
    // Register background sync if available
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.ready.then(sw => sw.sync.register('sync-checkins'));
    }
  }

  async function flushOfflineQueue(userId) {
    if (!supabase || !navigator.onLine) return;
    const queue = JSON.parse(localStorage.getItem(DB_QUEUE_KEY) || '[]');
    if (queue.length === 0) return;
    for (const op of queue) {
      if (op.type === 'insert' && op.table === 'mood_entries') {
        await supabase.from('mood_entries').insert({ ...op.payload, user_id: userId });
      }
    }
    localStorage.removeItem(DB_QUEUE_KEY);
    console.log(`[PikaMood] Flushed ${queue.length} offline entries`);
  }

  // ── Realtime (Phase 2 ready) ──────────────────────────────────────
  function subscribeToPartnerMoods(partnerUserId, callback) {
    if (!supabase) return () => {};
    const channel = supabase
      .channel('partner-moods')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'mood_entries',
        filter: `user_id=eq.${partnerUserId}`,
      }, payload => callback(payload.new))
      .subscribe();
    return () => supabase.removeChannel(channel);
  }

  // ── Delete Account ────────────────────────────────────────────────
  async function deleteAccount(userId) {
    if (!supabase) {
      localStorage.removeItem('pikamood_v1');
      localStorage.removeItem(DB_QUEUE_KEY);
      return { error: null };
    }
    // Delete all entries (cascade handles the rest)
    await supabase.from('mood_entries').delete().eq('user_id', userId);
    await supabase.from('profiles').delete().eq('id', userId);
    await supabase.auth.signOut();
    localStorage.removeItem('pikamood_v1');
    return { error: null };
  }

  // Flush queue on coming back online
  window.addEventListener('online', () => {
    const session = supabase?.auth?.getSession?.();
    if (session) flushOfflineQueue(session?.user?.id);
    console.log('[PikaMood] Back online — syncing...');
  });

  return {
    init, signUp, signIn, signOut, getSession, onAuthStateChange,
    getProfile, updateProfile,
    getEntries, addEntry, updateEntry, deleteEntry,
    subscribeToPartnerMoods, deleteAccount, flushOfflineQueue,
  };
})();

window.DB = DatabaseService;
