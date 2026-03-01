import { useState, useEffect} from "react";

const API_BASE = "https://lover-rate-api.onrender.com/api/Ratings";

/* ─── Tulip SVG ─── */
const TulipIcon = ({ size = 24, color = "#e8879a" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 21V11" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 14c0-2.5 1.5-5 3-5s3 2.5 3 5c0 1.5-1.343 3-3 3S9 15.5 9 14z" fill={color} opacity="0.25" stroke={color} strokeWidth="1.2"/>
    <path d="M6 11c0-3 1.8-5.5 3.5-5.5S12 8 12 11" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55"/>
    <path d="M18 11c0-3-1.8-5.5-3.5-5.5S12 8 12 11" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55"/>
    <path d="M12 11c0-3.5-.8-6.5-2-7.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.35"/>
    <path d="M12 11c0-3.5.8-6.5 2-7.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.35"/>
    <path d="M8 16c-1.5.5-3 .2-3-1.5 0-2 1.5-3 3-2" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.45"/>
    <path d="M16 16c1.5.5 3 .2 3-1.5 0-2-1.5-3-3-2" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.45"/>
  </svg>
);

/* ─── Half-star Rating ─── */
let _sid = 0;

const StarRating = ({ score, onChange, readonly = false, size = 22 }) => {
  const [hover, setHover] = useState(null);
  const [groupId] = useState(() => `sg-${++_sid}`);
  const display = hover !== null ? hover : score;

  const getFill = (idx) => {
    const val = display / 2;
    if (val >= idx + 1) return "full";
    if (val >= idx + 0.5) return "half";
    return "empty";
  };

  return (
    <div style={{ display: "flex", gap: 3 }} onMouseLeave={() => setHover(null)}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = getFill(i);
        const uid = `${groupId}-${i}`;
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" style={{ cursor: readonly ? "default" : "pointer", flexShrink: 0 }}>
            <defs>
              <clipPath id={uid}>
                <rect x="0" y="0" width="12" height="24" />
              </clipPath>
            </defs>
            {/* bg */}
            <path d="M12 2l2.9 6.1L22 9.2l-5 4.9 1.2 7L12 18l-6.2 3.1L7 14.1 2 9.2l7.1-1.1z" fill="#f5e4e9" />
            {/* half fill */}
            {fill === "half" && (
              <path d="M12 2l2.9 6.1L22 9.2l-5 4.9 1.2 7L12 18l-6.2 3.1L7 14.1 2 9.2l7.1-1.1z" fill="#f4a5b5" clipPath={`url(#${uid})`} />
            )}
            {/* full fill */}
            {fill === "full" && (
              <path d="M12 2l2.9 6.1L22 9.2l-5 4.9 1.2 7L12 18l-6.2 3.1L7 14.1 2 9.2l7.1-1.1z" fill="#f4a5b5" />
            )}
            {!readonly && (
              <>
                <rect x="0" y="0" width="12" height="24" fill="transparent"
                  onMouseEnter={() => setHover((i + 0.5) * 2)}
                  onClick={() => onChange && onChange((i + 0.5) * 2)} />
                <rect x="12" y="0" width="12" height="24" fill="transparent"
                  onMouseEnter={() => setHover((i + 1) * 2)}
                  onClick={() => onChange && onChange((i + 1) * 2)} />
              </>
            )}
          </svg>
        );
      })}
    </div>
  );
};

const scoreLabel = (s) => {
  if (s >= 9.5) return "Mükemmel ✨";
  if (s >= 8) return "Harikaydı";
  if (s >= 6) return "İyiydi";
  if (s >= 4) return "Fena değil";
  return "Bir daha gitmeyiz";
};

const formatDate = (d) =>
  new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

/* ─── CSS ─── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Nunito:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#fdf6f8;--white:#ffffff;--petal:#fce8ee;--blush:#f7d0da;
  --rose:#e8718a;--deep:#c94d68;--tulip:#f4a5b5;
  --text:#2d1a22;--muted:#9a7a84;--border:#f0dde3;
  --shadow:rgba(200,100,130,0.1);
}
html{-webkit-text-size-adjust:100%}
body{background:var(--bg);font-family:'Nunito',sans-serif;color:var(--text);min-height:100vh;overflow-x:hidden}
::-webkit-scrollbar{width:0}

/* bg */
.bg-orb{position:fixed;inset:0;pointer-events:none;z-index:0;
  background:
    radial-gradient(ellipse 60% 40% at 15% 15%, rgba(244,165,181,.13) 0%, transparent 70%),
    radial-gradient(ellipse 50% 35% at 85% 85%, rgba(244,165,181,.09) 0%, transparent 70%)}

.app{position:relative;z-index:1;max-width:430px;margin:0 auto;min-height:100vh;padding-bottom:110px}

/* HEADER */
.header{padding:52px 24px 26px;text-align:center}
.header-badge{
  display:inline-flex;align-items:center;gap:6px;
  background:var(--petal);border:1px solid var(--blush);border-radius:50px;
  padding:5px 14px 5px 10px;font-size:.68rem;letter-spacing:1.8px;
  text-transform:uppercase;color:var(--rose);font-weight:700;margin-bottom:14px}
.header h1{font-family:'Playfair Display',serif;font-size:2.5rem;font-weight:400;line-height:1.15;color:var(--text)}
.header h1 em{font-style:italic;color:var(--deep)}
.header-sub{margin-top:8px;color:var(--muted);font-size:.8rem;font-weight:300}
.header-sep{display:flex;align-items:center;gap:10px;margin:18px auto 0;width:140px}
.header-sep::before,.header-sep::after{content:'';flex:1;height:1px;background:var(--blush)}

/* STATS */
.stats{
  margin:0 20px 22px;
  background:var(--white);border-radius:20px;
  border:1px solid var(--border);
  box-shadow:0 4px 24px var(--shadow);
  display:flex;overflow:hidden}
.stat{flex:1;padding:16px 8px;text-align:center;position:relative}
.stat+.stat::before{content:'';position:absolute;left:0;top:20%;bottom:20%;width:1px;background:var(--border)}
.stat-v{font-family:'Playfair Display',serif;font-size:1.5rem;color:var(--deep);line-height:1;font-weight:600}
.stat-l{font-size:.6rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-top:4px;font-weight:600}

/* FEED */
.feed{padding:0 16px;display:flex;flex-direction:column;gap:16px}

/* CARD */
.card{
  background:var(--white);border-radius:22px;border:1px solid var(--border);
  box-shadow:0 4px 24px var(--shadow);overflow:hidden;
  animation:cardIn .4s ease both;transition:transform .2s,box-shadow .2s}
.card:active{transform:scale(.99);box-shadow:0 2px 10px var(--shadow)}
@keyframes cardIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

.card-img{position:relative;height:190px;overflow:hidden;background:linear-gradient(135deg,var(--petal),var(--blush))}
.card-img img{width:100%;height:100%;object-fit:cover;display:block}
.card-img-ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center}
.card-img-fade{position:absolute;bottom:0;left:0;right:0;height:55%;background:linear-gradient(to top,rgba(255,255,255,.88),transparent)}
.card-pill{
  position:absolute;top:12px;right:12px;
  background:rgba(255,255,255,.92);backdrop-filter:blur(8px);
  border:1px solid var(--border);border-radius:50px;
  padding:5px 12px;font-family:'Playfair Display',serif;
  font-size:.9rem;color:var(--deep);font-weight:600;
  box-shadow:0 2px 10px var(--shadow)}

.card-body{padding:15px 18px 13px}
.card-title{font-family:'Playfair Display',serif;font-size:1.2rem;color:var(--text);font-weight:400;line-height:1.25}
.card-stars{display:flex;align-items:center;gap:8px;margin-top:6px}
.card-label{font-size:.7rem;color:var(--rose);font-weight:700;letter-spacing:.3px}
.card-desc{margin-top:8px;font-size:.81rem;color:var(--muted);line-height:1.6;font-weight:300;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.card-footer{display:flex;align-items:center;justify-content:space-between;margin-top:11px;padding-top:11px;border-top:1px solid var(--border)}
.card-date{font-size:.68rem;color:#c0a8b0;font-weight:400}
.card-btns{display:flex;gap:6px}
.btn-sm{
  height:30px;padding:0 12px;border-radius:8px;border:1px solid var(--border);
  background:transparent;cursor:pointer;font-size:.72rem;font-family:'Nunito',sans-serif;
  color:var(--muted);font-weight:600;transition:all .15s;display:flex;align-items:center;gap:4px;
  -webkit-appearance:none}
.btn-sm:active,.btn-sm:hover{border-color:var(--rose);color:var(--rose);background:var(--petal)}
.btn-sm.del:active,.btn-sm.del:hover{border-color:#e04060;color:#e04060;background:#fff0f3}

/* EMPTY */
.empty{text-align:center;padding:60px 20px;animation:cardIn .4s ease both}
.empty-title{font-family:'Playfair Display',serif;font-size:1.35rem;font-style:italic;color:var(--text);margin:14px 0 8px}
.empty p{font-size:.82rem;color:var(--muted);line-height:1.7;font-weight:300}

/* FAB */
.fab{
  position:fixed;bottom:28px;left:50%;transform:translateX(-50%);
  background:linear-gradient(135deg,var(--rose),var(--deep));color:#fff;border:none;
  border-radius:50px;padding:15px 30px;font-family:'Nunito',sans-serif;
  font-size:.88rem;font-weight:700;letter-spacing:.4px;cursor:pointer;
  box-shadow:0 8px 28px rgba(200,77,104,.35);z-index:50;white-space:nowrap;
  transition:transform .15s,box-shadow .15s;-webkit-appearance:none;
  display:flex;align-items:center;gap:8px}
.fab:active{transform:translateX(-50%) scale(.97);box-shadow:0 4px 14px rgba(200,77,104,.3)}

/* OVERLAY */
.overlay{
  position:fixed;inset:0;background:rgba(45,26,34,.38);backdrop-filter:blur(5px);
  z-index:100;display:flex;align-items:flex-end;justify-content:center;
  animation:fadeIn .2s ease}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}

/* SHEET */
.sheet{
  background:var(--white);border-radius:28px 28px 0 0;
  width:100%;max-width:430px;max-height:92vh;overflow-y:auto;
  animation:sheetUp .3s cubic-bezier(.32,.72,0,1);
  border-top:1px solid var(--border);
  padding-bottom:env(safe-area-inset-bottom,20px)}
@keyframes sheetUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
.sheet-handle{width:36px;height:4px;background:var(--blush);border-radius:2px;margin:12px auto 0}
.sheet-head{padding:20px 24px 0;display:flex;align-items:center;justify-content:space-between}
.sheet-title{font-family:'Playfair Display',serif;font-size:1.4rem;font-style:italic;color:var(--text)}
.sheet-x{
  width:32px;height:32px;border-radius:50%;border:1px solid var(--border);
  background:var(--petal);color:var(--muted);cursor:pointer;font-size:.9rem;
  display:flex;align-items:center;justify-content:center;transition:all .15s}
.sheet-x:hover{background:var(--blush);color:var(--rose)}
.sheet-body{padding:22px 24px;display:flex;flex-direction:column;gap:18px}

/* FIELDS */
.field label{display:block;font-size:.67rem;letter-spacing:1.8px;text-transform:uppercase;color:var(--rose);margin-bottom:7px;font-weight:700}
.field input,.field textarea{
  width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:13px;
  padding:12px 15px;font-family:'Nunito',sans-serif;font-size:.92rem;color:var(--text);
  outline:none;transition:border-color .2s,background .2s;-webkit-appearance:none}
.field input:focus,.field textarea:focus{border-color:var(--tulip);background:var(--white)}
.field textarea{resize:none;height:82px;line-height:1.55}
.field input::placeholder,.field textarea::placeholder{color:#c8aab4}

/* SCORE BOX */
.score-box{
  background:var(--bg);border:1.5px solid var(--border);border-radius:13px;
  padding:14px 16px;display:flex;align-items:center;justify-content:space-between}
.score-right{text-align:right}
.score-num{font-family:'Playfair Display',serif;font-size:1.3rem;color:var(--deep);font-weight:600}
.score-txt{font-size:.7rem;color:var(--rose);font-weight:700;margin-top:2px}

/* UPLOAD */
.upload{
  border:1.5px dashed var(--blush);border-radius:14px;cursor:pointer;
  position:relative;min-height:110px;display:flex;align-items:center;justify-content:center;
  background:var(--petal);transition:border-color .2s,background .2s;overflow:hidden}
.upload:active{border-color:var(--rose);background:var(--blush)}
.upload input{position:absolute;inset:0;opacity:0;cursor:pointer}
.upload-hint{text-align:center;color:var(--muted);pointer-events:none}
.upload-hint-icon{font-size:1.6rem;margin-bottom:5px}
.upload-hint p{font-size:.78rem;font-weight:400}
.upload img{width:100%;max-height:180px;object-fit:cover;display:block}

/* SUBMIT */
.btn-submit{
  width:100%;padding:15px;background:linear-gradient(135deg,var(--rose),var(--deep));
  border:none;border-radius:14px;color:#fff;font-family:'Nunito',sans-serif;
  font-size:.9rem;font-weight:700;cursor:pointer;
  box-shadow:0 6px 20px rgba(200,77,104,.25);
  transition:opacity .2s,transform .1s;-webkit-appearance:none}
.btn-submit:active{opacity:.9;transform:scale(.99)}
.btn-submit:disabled{opacity:.55;cursor:not-allowed}

/* TOAST */
.toast{
  position:fixed;top:18px;left:50%;transform:translateX(-50%);
  background:var(--text);color:var(--white);padding:10px 20px;border-radius:50px;
  font-size:.82rem;font-weight:600;white-space:nowrap;z-index:200;
  box-shadow:0 6px 20px rgba(0,0,0,.18);animation:toastIn .25s ease}
@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(-8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

/* LOADING */
.loading{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 20px;gap:12px;color:var(--muted);font-size:.83rem;font-weight:300}
.spin{animation:rot 2s linear infinite;font-size:1.4rem;display:inline-block}
@keyframes rot{to{transform:rotate(360deg)}}
`;

export default function App() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", score: 8 });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2400); };

  const fetchAll = async () => {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setRatings(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch { showToast("API'ye bağlanılamadı 🌷"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const openAdd = () => {
    setEditing(null); setForm({ title: "", description: "", score: 8 });
    setImageFile(null); setPreview(null); setModal(true);
  };

  const openEdit = (r) => {
    setEditing(r);
    setForm({ title: r.title, description: r.description || "", score: r.score });
    setImageFile(null);
    setPreview(r.imageUrl ? `${API_BASE.replace("/api/Ratings", "")}${r.imageUrl}` : null);
    setModal(true);
  };

  const handleImage = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setImageFile(f); setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) { showToast("Mekan adı gerekli 🌷"); return; }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("score", Math.round(form.score));
      if (imageFile) fd.append("imageFile", imageFile);
      let res;
      if (editing) {
        fd.append("id", editing.id);
        res = await fetch(`${API_BASE}/${editing.id}`, { method: "PUT", body: fd });
      } else {
        res = await fetch(API_BASE, { method: "POST", body: fd });
      }
      if (res.ok) { showToast(editing ? "Güncellendi 🌷" : "Anı kaydedildi 🌸"); setModal(false); fetchAll(); }
      else showToast("Bir hata oluştu");
    } catch { showToast("Bağlantı hatası"); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Bu anıyı silmek istediğine emin misin?")) return;
    await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    showToast("Anı silindi"); fetchAll();
  };

  const avg = ratings.length
    ? (ratings.reduce((s, r) => s + r.score, 0) / ratings.length).toFixed(1) : "–";
  const best = ratings.length ? ratings.reduce((a, b) => a.score > b.score ? a : b) : null;

  return (
    <>
      <style>{css}</style>
      <div className="bg-orb" />
      <div className="app">

        {/* Header */}
        <div className="header">
          <h1>Askim<br /><em>İle Yemek Puanlamaca</em></h1>
          <div className="header-sub"> 🌸</div>
          <div className="header-sep"><TulipIcon size={12} /></div>
        </div>

        {/* Stats */}
        {!loading && ratings.length > 0 && (
          <div className="stats">
            <div className="stat">
              <div className="stat-v">{ratings.length}</div>
              <div className="stat-l">Mekan</div>
            </div>
            <div className="stat">
              <div className="stat-v">{avg}</div>
              <div className="stat-l">Ort. Puan</div>
            </div>
            <div className="stat">
              <div className="stat-v" style={{ fontSize: "0.8rem", paddingTop: 3 }}>
                {best ? (best.title.length > 9 ? best.title.slice(0, 9) + "…" : best.title) : "–"}
              </div>
              <div className="stat-l">En Güzel</div>
            </div>
          </div>
        )}

        {/* Feed */}
        <div className="feed">
          {loading ? (
            <div className="loading">
              <span className="spin">🌷</span>
              <span>Anılar yükleniyor...</span>
            </div>
          ) : ratings.length === 0 ? (
            <div className="empty">
              <TulipIcon size={54} />
              <div className="empty-title">Henüz bir anı yok</div>
              <p>Birlikte gittiğiniz ilk mekanı ekleyerek<br />bu güzel koleksiyonu başlatın.</p>
            </div>
          ) : ratings.map((r, i) => (
            <div className="card" key={r.id} style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="card-img">
                {r.imageUrl
                  ? <img src={`${API_BASE.replace("/api/Ratings", "")}${r.imageUrl}`} alt={r.title} />
                  : <div className="card-img-ph"><TulipIcon size={54} color="#e8879a" /></div>}
                <div className="card-img-fade" />
                <div className="card-pill">{r.score} / 10</div>
              </div>
              <div className="card-body">
                <div className="card-title">{r.title}</div>
                <div className="card-stars">
                  <StarRating score={r.score} readonly size={17} />
                  <span className="card-label">{scoreLabel(r.score)}</span>
                </div>
                {r.description && <div className="card-desc">{r.description}</div>}
                <div className="card-footer">
                  <div className="card-date">{formatDate(r.createdAt)}</div>
                  <div className="card-btns">
                    <button className="btn-sm" onClick={() => openEdit(r)}>✎ Düzenle</button>
                    <button className="btn-sm del" onClick={() => handleDelete(r.id)}>✕</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button className="fab" onClick={openAdd}>
        <TulipIcon size={16} color="#fff" />
        Mekan Ekle
      </button>

      {/* Sheet */}
      {modal && (
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && setModal(false)}>
          <div className="sheet">
            <div className="sheet-handle" />
            <div className="sheet-head">
              <div className="sheet-title">{editing ? "Düzenle" : "Yeni Mekan"}</div>
              <button className="sheet-x" onClick={() => setModal(false)}>✕</button>
            </div>
            <div className="sheet-body">

              <div className="field">
                <label>Mekan Adı</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Nasıldı?</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Puan — {form.score}/10</label>
                <div className="score-box">
                  <div>
                    <StarRating score={form.score} onChange={(v) => setForm({ ...form, score: v })} size={32} />
                    <div className="score-txt" style={{ marginTop: 6 }}>{scoreLabel(form.score)}</div>
                  </div>
                  <div className="score-right">
                    <div className="score-num">{form.score}</div>
                    <div className="score-txt">/ 10</div>
                  </div>
                </div>
              </div>

              <div className="field">
                <label>Fotoğraf</label>
                <label className="upload">
                  <input type="file" accept="image/*" onChange={handleImage} />
                  {preview
                    ? <img src={preview} alt="önizleme" />
                    : <div className="upload-hint">
                        <div className="upload-hint-icon">🌸</div>
                        <p>O güzel anı buraya ekle</p>
                      </div>}
                </label>
              </div>

              <button className="btn-submit" onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Kaydediliyor... 🌷" : editing ? "Güncelle 🌷" : "Anıyı Kaydet 🌸"}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}