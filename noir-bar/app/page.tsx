import Link from "next/link";

export const metadata = {
  title: "NOX Menu — Menú digital para bares y restaurantes",
  description:
    "Sistema de menú digital con QR, reservas, stock en tiempo real y panel admin. Para bares, cafés y restaurantes de Argentina.",
};

export default function LandingPage() {
  const whatsappUrl =
    "https://wa.me/541130863536?text=Hola%2C%20quiero%20m%C3%A1s%20info%20sobre%20NOX%20Menu";

  return (
    <main className="landing">
      {/* ── NAV ── */}
      <nav className="nav">
        <img src="https://nkpsojhxljlluzfinaoq.supabase.co/storage/v1/object/public/assets/transparente.png" alt="NOX Menu" className="nav-logo-img" />
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="nav-cta">
          Contactar →
        </a>
      </nav>

      {/* ── HERO DÍA / NOCHE ── */}
      <section className="hero">
        <div className="hero-night">
          <div className="hero-content">
            <span className="hero-tag tag-night">
              <span className="tag-dot dot-gold" />
              Para bares y pubs
            </span>
            <h1 className="hero-h1 h1-night">
              Tu carta,<br />
              en modo<br />
              noche.
            </h1>
            <p className="hero-sub sub-night">
              Menú digital premium para locales nocturnos. Reservas, stock y
              promociones en tiempo real.
            </p>
            <a href="https://noir-bar.vercel.app/noir-bar"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn btn-night"
            >
              Ver demo →
            </a>
            <span className="hero-hint hint-night">noir-bar.vercel.app</span>
          </div>
          <div className="hero-mockup-wrap">
            <img src="https://nkpsojhxljlluzfinaoq.supabase.co/storage/v1/object/public/assets/noche.png" alt="Demo modo noche" className="hero-mockup-img" />
          </div>
        </div>

        <div className="hero-divider" />

        <div className="hero-day">
          <div className="hero-content">
            <span className="hero-tag tag-day">
              <span className="tag-dot dot-brown" />
              Para cafés y restaurantes
            </span>
            <h1 className="hero-h1 h1-day">
              Tu carta,<br />
              en modo<br />
              día.
            </h1>
            <p className="hero-sub sub-day">
              El mismo sistema, estética clara y cálida. Perfecto para
              cafeterías y restaurantes diurnos.
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hero-btn btn-day">
              Pedir demo →
            </a>
            <span className="hero-hint hint-day">consultá por tu local</span>
          </div>
          <div className="hero-mockup-wrap">
            <img src="https://nkpsojhxljlluzfinaoq.supabase.co/storage/v1/object/public/assets/dia.png" alt="Demo modo día" className="hero-mockup-img" />
          </div>
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section className="problem-section">
        <div className="problem-inner">
          <h2 className="problem-h2">La carta en papel ya no alcanza.</h2>
          <div className="problem-grid">
            <div className="problem-item">
              <span className="problem-icon">📋</span>
              <p className="problem-text">Se desactualiza. Cambiás un precio y tenés que reimprimir todo.</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">📞</span>
              <p className="problem-text">Las reservas llegan por WhatsApp, te perdés algunas, el local se desordena.</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">❌</span>
              <p className="problem-text">El cliente pide algo que se acabó. Incomodidad, quejas, mala experiencia.</p>
            </div>
          </div>
          <p className="problem-cta-text">NOX Menu resuelve todo eso desde el día uno.</p>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="pricing-section">
        <h2 className="pricing-h2">Un solo plan. Todo incluido.</h2>
        <p className="pricing-sub">
          Sin sorpresas. Sin planes chicos con funciones recortadas.
        </p>
        <div className="price-card">
          <div className="price-badge">PLAN ÚNICO</div>
          <div className="price-amount">$35.000/mes</div>
          <div className="price-period">Setup inicial: $25.000 (única vez)</div>
          <div className="price-setup">Sin permanencia. Cancelás cuando querés.</div>
          <ul className="price-features">
            {[
              "Menú digital con QR",
              "Sistema de reservas completo",
              "Control de stock en tiempo real",
              "Panel admin sin conocimientos técnicos",
              "Modo claro y oscuro",
              "Soporte por WhatsApp",
            ].map((f) => (
              <li key={f} className="price-feat-item">
                <span className="price-check">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <a href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="price-cta"
          >
            Quiero mi menú digital →
          </a>
        </div>
      </section>

      {/* ── PRODUCTO ── */}
      <section className="product-section">
        <div className="product-text">
          <h2 className="product-h2">
            Todo desde el celular.<br />Sin saber tecnología.
          </h2>
          <p className="product-p">
            El dueño del local maneja todo desde un panel simple. Cambia
            precios, activa promociones y confirma reservas en segundos.
          </p>
          <ul className="feature-list">
            {[
              "Reservas con notificación por mail",
              "Control de stock en tiempo real",
              "Modo claro y oscuro incluidos",
              "Instagram y WhatsApp integrados",
              "Cargá tu logo, descripción y ubicación",
              "Categorías y productos sin límite",
            ].map((f) => (
              <li key={f} className="feature-item">
                <span className="feat-dot" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Phone mockup */}
        <div className="phone-mockup" aria-hidden="true">
          <div className="pm-header">
            <div className="pm-logo">NOX</div>
            <div className="pm-info">
              <div className="pm-name">Noir Bar</div>
              <div className="pm-sub">Cocktails &amp; Gastronomía</div>
            </div>
            <div className="pm-reservar">Reservar</div>
          </div>
          <div className="pm-promo">2X1 EN GIN TONIC · TODA LA NOCHE</div>
          <div className="pm-tabs">
            <span className="pm-tab pm-tab-active">Todos</span>
            <span className="pm-tab">Cocktails</span>
            <span className="pm-tab">Cerv…</span>
          </div>
          <div className="pm-cat">🍺 Cervezas</div>
          {[
            ["Imperial Lager", "$10.000"],
            ["Imperial IPA", "$10.000"],
            ["Imperial Stout", "$10.000"],
          ].map(([name, price]) => (
            <div key={name} className="pm-item">
              <span className="pm-item-name">{name}</span>
              <span className="pm-item-price">{price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section">
        <h2 className="features-h2">Todo lo que tu local necesita</h2>
        <p className="features-sub">
          Un solo sistema. Sin contratos. Sin complicaciones.
        </p>
        <div className="feat-grid">
          {[
            {
              icon: "📅",
              title: "Sistema de reservas",
              desc: "Los clientes reservan desde el menú. Te llega un mail al instante.",
            },
            {
              icon: "📦",
              title: "Control de stock",
              desc: "Marcá productos sin disponibilidad. Se actualiza en vivo.",
            },
            {
              icon: "📣",
              title: "Promociones",
              desc: "Happy hour, 2x1, descuentos. Activá y desactivá cuando quieras.",
            },
            {
              icon: "🌗",
              title: "Modo claro y oscuro",
              desc: "Elegí la estética que va con tu local. Cambiable desde el admin.",
            },
            {
              icon: "📱",
              title: "Redes integradas",
              desc: "WhatsApp e Instagram conectados directo en el menú.",
            },
            {
              icon: "☰",
              title: "Categorías flexibles",
              desc: "Creá, eliminá y reordenás categorías y productos como quieras.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="feat-card">
              <div className="feat-icon-wrap">{icon}</div>
              <div className="feat-card-title">{title}</div>
              <div className="feat-card-desc">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <img src="https://nkpsojhxljlluzfinaoq.supabase.co/storage/v1/object/public/assets/transparente.png" alt="NOX Menu" className="footer-logo-img" />
        <span className="footer-text">Buenos Aires, Argentina</span>
      </footer>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .landing { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; width: 100%; }
        a { text-decoration: none; }

        /* NAV */
        .nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 8px 48px; background: #0a0a0a;
          border-bottom: 0.5px solid #1e1e1e;
          position: sticky; top: 0; z-index: 50;
        }
        .nav-logo-img { height: 90px; width: auto; object-fit: contain; display: block; }
        .nav-cta {
          background: #d4a847; color: #0a0a0a;
          font-size: 13px; font-weight: 700;
          padding: 10px 22px; border-radius: 24px;
          letter-spacing: 0.04em; transition: opacity 0.15s;
        }
        .nav-cta:hover { opacity: 0.85; }

        /* HERO */
        .hero { display: grid; grid-template-columns: 1fr 0.5px 1fr; min-height: 520px; }
        .hero-night {
          background: #0a0a0a; padding: 56px 40px;
          display: flex; flex-direction: row; align-items: center; gap: 24px;
        }
        .hero-divider { background: #1e1e1e; }
        .hero-day {
          background: #f5f0e8; padding: 56px 40px;
          display: flex; flex-direction: row; align-items: center; gap: 24px;
        }
        .hero-content { flex: 1; display: flex; flex-direction: column; justify-content: center; }
        .hero-mockup-wrap {
          flex-shrink: 0; width: 220px;
          display: flex; align-items: center; justify-content: center;
        }
        .hero-mockup-img {
          width: 220px; height: auto; border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }
        .hero-tag {
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; margin-bottom: 20px;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .tag-night { color: #d4a847; }
        .tag-day { color: #7a5c1e; }
        .tag-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .dot-gold { background: #d4a847; }
        .dot-brown { background: #c49a30; }
        .hero-h1 {
          font-size: 52px; font-weight: 900;
          line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 18px;
        }
        .h1-night { color: #ffffff; }
        .h1-day { color: #1a1208; }
        .hero-sub { font-size: 14px; line-height: 1.65; margin-bottom: 32px; max-width: 280px; }
        .sub-night { color: #777; }
        .sub-day { color: #6b5b3e; }
        .hero-btn {
          display: inline-block; font-size: 13px; font-weight: 700;
          padding: 13px 26px; border-radius: 28px;
          letter-spacing: 0.04em; transition: opacity 0.15s; width: fit-content;
        }
        .hero-btn:hover { opacity: 0.85; }
        .btn-night { background: #d4a847; color: #0a0a0a; }
        .btn-day { background: #1a1208; color: #f5f0e8; }
        .hero-hint { font-size: 11px; margin-top: 12px; }
        .hint-night { color: #333; }
        .hint-day { color: #bbb0a0; }

        /* PROBLEMA */
        .problem-section {
          background: #0f0f0f; padding: 72px 56px;
          border-bottom: 0.5px solid #1e1e1e;
        }
        .problem-inner { max-width: 860px; margin: 0 auto; }
        .problem-h2 {
          font-size: 28px; font-weight: 800; color: #fff;
          letter-spacing: -0.02em; margin-bottom: 40px; text-align: center;
        }
        .problem-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
          margin-bottom: 40px;
        }
        .problem-item {
          background: #1a1a1a; border-radius: 14px;
          padding: 24px 20px; border: 0.5px solid #2a2a2a;
          display: flex; flex-direction: column; gap: 12px;
        }
        .problem-icon { font-size: 24px; }
        .problem-text { font-size: 13px; color: #888; line-height: 1.6; }
        .problem-cta-text {
          text-align: center; font-size: 15px; font-weight: 700;
          color: #d4a847; letter-spacing: 0.02em;
        }

        /* PRODUCTO */
        .product-section {
          background: #111; padding: 80px 56px;
          display: flex; align-items: center; gap: 64px;
        }
        .product-text { flex: 1; }
        .product-h2 {
          font-size: 32px; font-weight: 800; color: #fff;
          line-height: 1.2; letter-spacing: -0.02em; margin-bottom: 16px;
        }
        .product-p { font-size: 14px; color: #666; line-height: 1.7; margin-bottom: 28px; }
        .feature-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .feature-item { font-size: 13px; color: #999; display: flex; align-items: center; gap: 10px; }
        .feat-dot { width: 6px; height: 6px; border-radius: 50%; background: #d4a847; flex-shrink: 0; }

        /* PHONE MOCKUP */
        .phone-mockup {
          width: 280px; flex-shrink: 0;
          background: #1a1a1a; border-radius: 24px;
          border: 0.5px solid #2a2a2a; padding: 16px 14px;
        }
        .pm-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
        .pm-logo {
          width: 34px; height: 34px; background: #252525; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; color: #d4a847; font-weight: 800; letter-spacing: 0.05em;
        }
        .pm-info { flex: 1; }
        .pm-name { font-size: 11px; font-weight: 600; color: #f0f0f0; }
        .pm-sub { font-size: 9px; color: #555; margin-top: 1px; }
        .pm-reservar {
          background: #d4a847; border-radius: 12px;
          padding: 4px 8px; font-size: 8px; color: #111; font-weight: 700;
        }
        .pm-promo {
          background: #222; border-radius: 8px; padding: 7px 10px;
          margin-bottom: 10px; font-size: 8.5px; color: #d4a847;
          text-align: center; letter-spacing: 0.04em;
        }
        .pm-tabs { display: flex; gap: 5px; margin-bottom: 10px; }
        .pm-tab {
          font-size: 8.5px; padding: 4px 8px; border-radius: 12px;
          color: #666; background: #222; border: 0.5px solid #333;
        }
        .pm-tab-active { background: #d4a847 !important; color: #111 !important; font-weight: 700; border-color: #d4a847 !important; }
        .pm-cat { font-size: 10px; font-weight: 600; color: #d4a847; padding: 6px 2px 4px; border-bottom: 0.5px solid #252525; margin-bottom: 4px; }
        .pm-item { display: flex; justify-content: space-between; padding: 6px 2px; border-bottom: 0.5px solid #1e1e1e; }
        .pm-item-name { font-size: 9px; color: #ccc; }
        .pm-item-price { font-size: 9px; color: #d4a847; font-weight: 600; }

        /* FEATURES */
        .features-section { background: #f5f0e8; padding: 80px 56px; }
        .features-h2 {
          font-size: 28px; font-weight: 800; color: #1a1208;
          text-align: center; margin-bottom: 8px; letter-spacing: -0.02em;
        }
        .features-sub { font-size: 14px; color: #9a8060; text-align: center; margin-bottom: 40px; }
        .feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .feat-card {
          background: #fff; border-radius: 14px; padding: 22px 20px;
          border: 0.5px solid #e8dfc8;
        }
        .feat-icon-wrap { font-size: 22px; margin-bottom: 12px; }
        .feat-card-title { font-size: 13px; font-weight: 700; color: #1a1208; margin-bottom: 6px; }
        .feat-card-desc { font-size: 12px; color: #9a8060; line-height: 1.55; }

        /* PRICING */
        .pricing-section {
          background: #0a0a0a; padding: 80px 56px; text-align: center;
        }
        .pricing-h2 {
          font-size: 28px; font-weight: 800; color: #fff;
          margin-bottom: 8px; letter-spacing: -0.02em;
        }
        .pricing-sub { font-size: 14px; color: #555; margin-bottom: 40px; }
        .price-card {
          background: #111; border: 1px solid #d4a847;
          border-radius: 20px; padding: 40px 36px;
          max-width: 380px; margin: 0 auto 28px;
        }
        .price-badge {
          background: #d4a847; color: #0a0a0a;
          font-size: 10px; font-weight: 800;
          padding: 5px 14px; border-radius: 20px;
          display: inline-block; margin-bottom: 20px; letter-spacing: 0.1em;
        }
        .price-amount {
          font-size: 52px; font-weight: 900; color: #fff;
          letter-spacing: -0.03em; line-height: 1;
        }
        .price-period { font-size: 13px; color: #555; margin: 6px 0 4px; }
        .price-setup { font-size: 12px; color: #444; margin-bottom: 28px; }
        .price-features { list-style: none; text-align: left; display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
        .price-feat-item { font-size: 13px; color: #aaa; display: flex; align-items: center; gap: 10px; }
        .price-check { color: #4caf7d; font-size: 13px; font-weight: 700; flex-shrink: 0; }
        .price-cta {
          display: block; width: 100%;
          background: #d4a847; color: #0a0a0a;
          font-size: 14px; font-weight: 800;
          padding: 15px; border-radius: 28px;
          letter-spacing: 0.04em; transition: opacity 0.15s; text-align: center;
        }
        .price-cta:hover { opacity: 0.85; }

        /* FOOTER */
        .footer {
          background: #050505; padding: 28px 56px;
          display: flex; align-items: center; justify-content: space-between;
          border-top: 0.5px solid #1a1a1a;
        }
        .footer-logo-img { height: 40px; width: auto; object-fit: contain; display: block; }
        .footer-text { font-size: 12px; color: #333; }

        /* MOBILE */
        @media (max-width: 768px) {
          .nav { padding: 8px 24px; }
          .nav-logo-img { height: 85px; }

            .hero { grid-template-columns: 1fr; grid-template-rows: auto 0.5px auto; }
            .hero-divider { height: 0.5px; width: 100%; }
            .hero-night, .hero-day { padding: 48px 28px 40px; flex-direction: row; align-items: center; gap: 16px; }
            .hero-mockup-img { width: 100px; }.hero-h1 { font-size: 32px; }.hero-mockup-wrap { width: 100%; display: flex; justify-content: center; }
            .hero-mockup-img { width: 200px; }
            .hero-h1 { font-size: 40px; }
            .hero-sub { max-width: 100%; }

          .problem-section { padding: 56px 24px; }
          .problem-grid { grid-template-columns: 1fr; gap: 16px; }

          .product-section { flex-direction: column; padding: 56px 28px; gap: 40px; }
          .phone-mockup { width: 100%; max-width: 280px; margin: 0 auto; }
          .product-h2 { font-size: 24px; }

          .features-section { padding: 56px 24px; }
          .feat-grid { grid-template-columns: 1fr 1fr; }

          .pricing-section { padding: 56px 24px; }

          .footer { padding: 24px 24px; }
        }

        @media (max-width: 480px) {
          .feat-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
