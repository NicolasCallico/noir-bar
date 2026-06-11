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
          Quiero mi menú →
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-night">
          <div className="hero-content">
            <span className="hero-tag tag-night">
              <span className="tag-dot dot-gold" />
              Para bares, pubs y cafés
            </span>
            <h1 className="hero-h1 h1-night">
              Tu menú digital,<br />
              listo en<br />
              48 horas.
            </h1>
            <p className="hero-sub sub-night">
              Tus clientes escanean un QR, ven tu carta actualizada y hasta pueden reservar una mesa. Vos manejás todo desde el celular o computadora. Sin papeles, sin llamadas.
            </p>
            <div className="hero-btns">
              <a href="https://noir-bar.vercel.app/noir-bar"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn btn-night"
              >
                Ver demo en vivo →
              </a>
              <a href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-ghost"
              >
                Hablar por WhatsApp
              </a>
            </div>
            <span className="hero-hint hint-night">noir-bar.vercel.app</span>
          </div>
          <div className="hero-mockup-wrap">
            <img src="https://nkpsojhxljlluzfinaoq.supabase.co/storage/v1/object/public/assets/noche.png" alt="Demo modo noche" className="hero-mockup-img" />
          </div>
        </div>

        <div className="hero-day-strip">
          <div className="hero-day-inner">
            <span className="hero-tag tag-day">
              <span className="tag-dot dot-brown" />
              Para cafeterías y restaurantes
            </span>
            <p className="hero-day-text">El mismo sistema con estética cálida y clara. Perfecto para el servicio diurno.</p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hero-btn btn-day">
              Ver demo modo día →
            </a>
          </div>
          <div className="hero-mockup-wrap hero-mockup-day">
            <img src="https://nkpsojhxljlluzfinaoq.supabase.co/storage/v1/object/public/assets/dia.png" alt="Demo modo día" className="hero-mockup-img" />
          </div>
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section className="problem-section">
        <div className="problem-inner">
          <h2 className="problem-h2">¿Cuánto te cuesta hoy<br />no tener un menú digital?</h2>
          <p className="problem-sub">Cada semana que pasa con la carta de papel, estás perdiendo plata.</p>
          <div className="problem-grid">
            <div className="problem-item">
              <div className="problem-item-header">
                <span className="problem-icon">📋</span>
                <p className="problem-item-title">Precios desactualizados</p>
              </div>
              <p className="problem-text">Cambiás un precio y tenés que reimprimir todo. Cada vez. Las cartas cuestan, se manchan, se pierden.</p>
            </div>
            <div className="problem-item">
              <div className="problem-item-header">
                <span className="problem-icon">📞</span>
                <p className="problem-item-title">Reservas que se pierden</p>
              </div>
              <p className="problem-text">Te llegan por WhatsApp, por teléfono, alguna por Instagram. Te perdés alguna. El local se desordena. El cliente se enoja.</p>
            </div>
            <div className="problem-item">
              <div className="problem-item-header">
                <span className="problem-icon">❌</span>
                <p className="problem-item-title">Stock sin control</p>
              </div>
              <p className="problem-text">El cliente pide algo que se acabó. Incomodidad, quejas, mala experiencia. Y encima tenés que explicar en cada mesa.</p>
            </div>
          </div>
          <p className="problem-cta-text">NOX Menu resuelve los tres desde el día uno.</p>
        </div>
      </section>

      {/* ── DEMO / PRODUCTO ── */}
      <section className="product-section">
        <div className="product-text">
          <span className="section-tag">El producto</span>
          <h2 className="product-h2">
            Un sistema completo.<br />Desde el celular, o desde la computadora.
          </h2>
          <p className="product-p">
            El dueño del local tiene un panel simple donde cambia precios, activa promociones, confirma reservas y ve el stock en tiempo real. Todo desde el celular, en segundos.
          </p>
          <ul className="feature-list">
            {[
              { icon: "📅", text: "Reservas con confirmación automática por mail" },
              { icon: "📦", text: "Stock en tiempo real: marcás lo que se agotó y se actualiza al instante" },
              { icon: "📣", text: "Promociones y happy hour: activás y desactivás cuando querés" },
              { icon: "🌗", text: "Modo claro y oscuro incluidos según la estética de tu local" },
              { icon: "📱", text: "WhatsApp e Instagram integrados directo en el menú" },
              { icon: "☰", text: "Categorías y productos sin límite, sin restricciones" },
            ].map((f) => (
              <li key={f.text} className="feature-item">
                <span className="feat-icon">{f.icon}</span>
                <span>{f.text}</span>
              </li>
            ))}
          </ul>
          <a href="https://noir-bar.vercel.app/noir-bar" target="_blank" rel="noopener noreferrer" className="product-demo-btn">
            Ver el demo en vivo →
          </a>
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
          <div className="pm-promo">🔥 2X1 EN GIN TONIC · TODA LA NOCHE</div>
          <div className="pm-tabs">
            <span className="pm-tab pm-tab-active">Todos</span>
            <span className="pm-tab">Cocktails</span>
            <span className="pm-tab">Cerv…</span>
          </div>
          <div className="pm-cat">🍺 Cervezas</div>
{[
            { name: "Imperial Lager", price: "$10.000", available: true },
            { name: "Imperial IPA", price: "$10.000", available: true },
            { name: "Imperial Stout", price: "$10.000", available: false },
          ].map(({ name, price, available }) => (
            <div key={name} className={`pm-item ${!available ? "pm-item-out" : ""}`}>
              <span className="pm-item-name">{name} {!available && <span className="pm-out-badge">sin stock</span>}</span>
              <span className="pm-item-price">{price}</span>
            </div>
          ))}
          <div className="pm-admin-pill">⚙️ Panel admin activo</div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section className="how-section">
        <h2 className="how-h2">De cero a online en 48 horas</h2>
        <p className="how-sub">Te encargamos nosotros de todo. Vos solo aprobás y empezás a usarlo.</p>
        <div className="how-grid">
          <div className="how-step">
            <div className="how-number">1</div>
            <div className="how-step-content">
              <h3 className="how-step-title">Nos mandás tu carta</h3>
              <p className="how-step-desc">Por WhatsApp o mail. Tu logo, los precios, las categorías. Nada más que eso.</p>
            </div>
          </div>
          <div className="how-connector" aria-hidden="true">→</div>
          <div className="how-step">
            <div className="how-number">2</div>
            <div className="how-step-content">
              <h3 className="how-step-title">Nosotros lo cargamos todo</h3>
              <p className="how-step-desc">Configuramos tu menú, tu panel admin y tu QR personalizado. En 48 hs está listo.</p>
            </div>
          </div>
          <div className="how-connector" aria-hidden="true">→</div>
          <div className="how-step">
            <div className="how-number">3</div>
            <div className="how-step-content">
              <h3 className="how-step-title">Empezás a usarlo</h3>
              <p className="how-step-desc">Imprimís el QR, lo ponés en las mesas y listo. Desde ese momento manejás todo vos.</p>
            </div>
          </div>
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
              desc: "Los clientes reservan desde el menú. Te llega un mail al instante con todos los datos. Sin WhatsApp desorganizado.",
            },
            {
              icon: "📦",
              title: "Control de disponibilidad del stock en vivo",
              desc: "Marcás un producto sin disponibilidad y se visualiza en el menú al instante. Cero incomodidad con el cliente.",
            },
            {
              icon: "📣",
              title: "Promociones que se ven",
              desc: "Happy hour, 2x1, descuentos especiales. Aparecen en un banner rotativo que nadie ignora.",
            },
            {
              icon: "🌗",
              title: "Modo claro y oscuro",
              desc: "Elegís la estética que va con tu local. Bar nocturno o cafetería diurna, ambas versiones están incluidas.",
            },
            {
              icon: "📱",
              title: "Redes sociales integradas",
              desc: "WhatsApp e Instagram conectados directamente en el menú. Un tap y el cliente ya te escribe.",
            },
            {
              icon: "☰",
              title: "Control total de categorías de productos",
              desc: "Creás, eliminás y reordenás categorías y productos cuando quieras. Sin llamar a nadie.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="feat-card">
              <div className="feat-card-header">
                <div className="feat-icon-wrap">{icon}</div>
                <div className="feat-card-title">{title}</div>
              </div>
              <div className="feat-card-desc">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="pricing-section">
        <h2 className="pricing-h2">Menos de lo que gastás<br />en reimprimir cartas al mes.</h2>
        <p className="pricing-sub">
          Sin sorpresas. Sin planes chicos con funciones recortadas. Todo incluido desde el día uno.
        </p>
        <div className="price-card">
          <div className="price-badge">PLAN ÚNICO · TODO INCLUIDO</div>
          <div className="price-amount">$35.000<span className="price-mes">/mes</span></div>
          <div className="price-period">Configuración inicial: +$25.000 (única vez)</div>
          <div className="price-setup">Sin permanencia. Cancelás cuando querés, sin preguntas.</div>
          <ul className="price-features">
            {[
              "Menú digital con QR personalizado",
              "Sistema de reservas completo con notificaciones",
              "Control de stock en tiempo real",
              "Panel admin desde el celular, o computadora",
              "Modo claro y oscuro incluidos",
              "Soporte directo por WhatsApp",
              "Cargamos tu carta nosotros en el "Setup" inicial",
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
          <p className="price-footer-note">Respondemos en menos de 2 horas en horario comercial.</p>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="final-cta-section">
        <div className="final-cta-inner">
          <h2 className="final-cta-h2">Arrancamos esta semana.</h2>
          <p className="final-cta-p">
            Mandanos los datos de tu local por WhatsApp y en 48 horas tu menú está online, con tu carta cargada y el QR listo para imprimir. Sin burocracia. Sin contratos. Sin vueltas.
          </p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="final-cta-btn">
            Escribirnos por WhatsApp →
          </a>
          <p className="final-cta-sub">+54 11 3086-3536 · Buenos Aires, Argentina</p>
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
        .hero { display: flex; flex-direction: column; }

        .hero-night {
          background: #0a0a0a; padding: 72px 56px;
          display: flex; flex-direction: row; align-items: center; gap: 48px;
        }
        .hero-content { flex: 1; display: flex; flex-direction: column; justify-content: center; }
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
          font-size: 58px; font-weight: 900;
          line-height: 1.02; letter-spacing: -0.03em; margin-bottom: 22px;
        }
        .h1-night { color: #ffffff; }
        .hero-sub { font-size: 16px; line-height: 1.7; margin-bottom: 36px; max-width: 420px; color: #888; }
        .hero-btns { display: flex; flex-direction: row; align-items: center; gap: 14px; flex-wrap: wrap; }
        .hero-btn {
          display: inline-block; font-size: 13px; font-weight: 700;
          padding: 13px 26px; border-radius: 28px;
          letter-spacing: 0.04em; transition: opacity 0.15s;
        }
        .hero-btn:hover { opacity: 0.85; }
        .btn-night { background: #d4a847; color: #0a0a0a; }
        .btn-day { background: #1a1208; color: #f5f0e8; }
        .hero-btn-ghost {
          display: inline-block; font-size: 13px; font-weight: 600;
          padding: 13px 22px; border-radius: 28px;
          border: 1px solid #333; color: #aaa;
          letter-spacing: 0.02em; transition: all 0.15s;
        }
        .hero-btn-ghost:hover { border-color: #555; color: #eee; }
        .hero-hint { font-size: 11px; margin-top: 14px; color: #333; }
        .hero-mockup-wrap {
          flex-shrink: 0; width: 240px;
          display: flex; align-items: center; justify-content: center;
        }
        .hero-mockup-img {
          width: 240px; height: auto; border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          max-width: 100%;
        }

        /* HERO DAY STRIP */
        .hero-day-strip {
          background: #f5f0e8; padding: 40px 56px;
          display: flex; flex-direction: row; align-items: center;
          gap: 40px; border-top: 0.5px solid #e0d8c8;
        }
        .hero-day-inner { flex: 1; }
        .hero-day-text { font-size: 14px; color: #6b5b3e; line-height: 1.6; margin: 10px 0 20px; max-width: 360px; }
        .hero-mockup-day { width: 140px; }
        .hero-mockup-day .hero-mockup-img { width: 140px; }

        /* SECTION TAG */
        .section-tag {
          display: inline-block; font-size: 10px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #d4a847; margin-bottom: 14px;
        }

        /* PROBLEMA */
        .problem-section {
          background: #0d0d0d; padding: 80px 56px;
          border-bottom: 0.5px solid #1e1e1e;
        }
        .problem-inner { max-width: 900px; margin: 0 auto; }
        .problem-h2 {
          font-size: 34px; font-weight: 800; color: #fff;
          letter-spacing: -0.02em; margin-bottom: 12px; text-align: center; line-height: 1.2;
        }
        .problem-sub {
          font-size: 15px; color: #555; text-align: center; margin-bottom: 48px;
        }
        .problem-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
          margin-bottom: 48px;
        }
        .problem-item {
          background: #141414; border-radius: 14px;
          padding: 28px 22px; border: 0.5px solid #2a2a2a;
        }
        .problem-item-header {
          display: flex; align-items: center; gap: 12px; margin-bottom: 10px;
        }
        .problem-icon { font-size: 22px; flex-shrink: 0; line-height: 1; }
        .problem-item-title { font-size: 13px; font-weight: 700; color: #fff; }
        .problem-text { font-size: 13px; color: #777; line-height: 1.65; }
        .problem-cta-text {
          text-align: center; font-size: 16px; font-weight: 700;
          color: #d4a847; letter-spacing: 0.02em;
        }

        /* PRODUCTO */
        .product-section {
          background: #111; padding: 88px 56px;
          display: flex; align-items: center; gap: 72px;
        }
        .product-text { flex: 1; }
        .product-h2 {
          font-size: 34px; font-weight: 800; color: #fff;
          line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 16px;
        }
        .product-p { font-size: 15px; color: #666; line-height: 1.7; margin-bottom: 28px; }
        .feature-list { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 36px; }
        .feature-item { font-size: 13px; color: #999; display: flex; align-items: flex-start; gap: 10px; line-height: 1.55; }
        .feat-icon { flex-shrink: 0; font-size: 15px; margin-top: 1px; }
        .product-demo-btn {
          display: inline-block; font-size: 13px; font-weight: 700;
          padding: 12px 24px; border-radius: 24px;
          background: transparent; border: 1px solid #d4a847;
          color: #d4a847; letter-spacing: 0.04em; transition: all 0.15s;
        }
        .product-demo-btn:hover { background: #d4a847; color: #0a0a0a; }

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
          background: #1e1a10; border: 0.5px solid #3a2e10; border-radius: 8px; padding: 7px 10px;
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
        .pm-item { display: flex; justify-content: space-between; padding: 6px 2px; border-bottom: 0.5px solid #1e1e1e; align-items: center; }
        .pm-item-out { opacity: 0.45; }
        .pm-item-name { font-size: 9px; color: #ccc; display: flex; align-items: center; gap: 5px; }
        .pm-item-price { font-size: 9px; color: #d4a847; font-weight: 600; }
        .pm-out-badge { font-size: 7px; background: #2a1a1a; color: #c0392b; padding: 1px 4px; border-radius: 4px; font-weight: 600; }
        .pm-admin-pill {
          margin-top: 10px; background: #1e1e1e; border-radius: 8px;
          padding: 6px 8px; font-size: 8px; color: #555; text-align: center;
        }

        /* CÓMO FUNCIONA */
        .how-section {
          background: #0a0a0a; padding: 80px 56px;
          border-top: 0.5px solid #1e1e1e;
        }
        .how-h2 {
          font-size: 28px; font-weight: 800; color: #fff;
          text-align: center; margin-bottom: 10px; letter-spacing: -0.02em;
        }
        .how-sub { font-size: 14px; color: #555; text-align: center; margin-bottom: 48px; }
        .how-grid {
          display: flex; align-items: flex-start; justify-content: center;
          gap: 0; max-width: 820px; margin: 0 auto;
        }
        .how-step {
          flex: 1; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 20px;
        }
        .how-number {
          width: 44px; height: 44px; border-radius: 50%;
          background: transparent; border: 1px solid #d4a847;
          color: #d4a847; font-size: 16px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px;
        }
        .how-step-title { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .how-step-desc { font-size: 13px; color: #666; line-height: 1.65; }
        .how-connector {
          color: #2a2a2a; font-size: 24px; margin-top: 10px; flex-shrink: 0;
        }

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
          display: flex; flex-direction: column; gap: 8px;
        }
        .feat-card-header { display: flex; align-items: center; gap: 10px; }
        .feat-icon-wrap { font-size: 20px; flex-shrink: 0; line-height: 1; }
        .feat-card-title { font-size: 13px; font-weight: 700; color: #1a1208; }
        .feat-card-desc { font-size: 12px; color: #9a8060; line-height: 1.6; }

        /* PRICING */
        .pricing-section {
          background: #0a0a0a; padding: 88px 56px; text-align: center;
        }
        .pricing-h2 {
          font-size: 34px; font-weight: 800; color: #fff;
          margin-bottom: 12px; letter-spacing: -0.02em; line-height: 1.15;
        }
        .pricing-sub { font-size: 14px; color: #555; margin-bottom: 48px; }
        .price-card {
          background: #111; border: 1px solid #d4a847;
          border-radius: 20px; padding: 44px 40px;
          max-width: 420px; margin: 0 auto;
        }
        .price-badge {
          background: #d4a847; color: #0a0a0a;
          font-size: 10px; font-weight: 800;
          padding: 5px 14px; border-radius: 20px;
          display: inline-block; margin-bottom: 24px; letter-spacing: 0.1em;
        }
        .price-amount {
          font-size: 56px; font-weight: 900; color: #fff;
          letter-spacing: -0.03em; line-height: 1;
        }
        .price-mes { font-size: 22px; font-weight: 500; color: #666; }
        .price-period { font-size: 13px; color: #555; margin: 8px 0 4px; }
        .price-setup { font-size: 12px; color: #3a3a3a; margin-bottom: 28px; }
        .price-features { list-style: none; text-align: left; display: flex; flex-direction: column; gap: 11px; margin-bottom: 28px; }
        .price-feat-item { font-size: 13px; color: #aaa; display: flex; align-items: flex-start; gap: 10px; line-height: 1.5; }
        .price-check { color: #4caf7d; font-size: 13px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
        .price-cta {
          display: block; width: 100%;
          background: #d4a847; color: #0a0a0a;
          font-size: 14px; font-weight: 800;
          padding: 16px; border-radius: 28px;
          letter-spacing: 0.04em; transition: opacity 0.15s; text-align: center;
          margin-bottom: 14px;
        }
        .price-cta:hover { opacity: 0.85; }
        .price-footer-note { font-size: 11px; color: #3a3a3a; }

        /* CTA FINAL */
        .final-cta-section {
          background: #0d0d0d; padding: 88px 56px;
          border-top: 0.5px solid #1e1e1e; text-align: center;
        }
        .final-cta-inner { max-width: 580px; margin: 0 auto; }
        .final-cta-h2 {
          font-size: 38px; font-weight: 900; color: #fff;
          letter-spacing: -0.03em; margin-bottom: 16px;
        }
        .final-cta-p { font-size: 15px; color: #666; line-height: 1.7; margin-bottom: 36px; }
        .final-cta-btn {
          display: inline-block; background: #d4a847; color: #0a0a0a;
          font-size: 15px; font-weight: 800; padding: 16px 36px;
          border-radius: 32px; letter-spacing: 0.04em; transition: opacity 0.15s;
          margin-bottom: 16px;
        }
        .final-cta-btn:hover { opacity: 0.85; }
        .final-cta-sub { font-size: 12px; color: #333; }

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
          .nav-logo-img { height: 70px; }

          .hero-night { padding: 48px 28px; flex-direction: column; gap: 32px; }
          .hero-h1 { font-size: 36px; }
          .hero-sub { font-size: 14px; }
          .hero-btns { flex-direction: column; align-items: flex-start; }
          .hero-mockup-wrap { width: 100%; justify-content: center; }
          .hero-mockup-img { width: 180px; }

          .hero-day-strip { flex-direction: column; padding: 36px 28px; gap: 24px; }
          .hero-mockup-day { width: 100%; justify-content: center; }
          .hero-mockup-day .hero-mockup-img { width: 120px; }

          .problem-section { padding: 56px 24px; }
          .problem-h2 { font-size: 26px; }
          .problem-grid { grid-template-columns: 1fr; gap: 14px; }

          .product-section { flex-direction: column; padding: 56px 28px; gap: 40px; }
          .phone-mockup { width: 100%; max-width: 280px; margin: 0 auto; }
          .product-h2 { font-size: 26px; }

          .how-section { padding: 56px 24px; }
          .how-grid { flex-direction: column; align-items: center; gap: 32px; }
          .how-connector { display: none; }
          .how-step { padding: 0; }

          .features-section { padding: 56px 24px; }
          .feat-grid { grid-template-columns: 1fr 1fr; }

          .pricing-section { padding: 56px 24px; }
          .pricing-h2 { font-size: 26px; }
          .price-card { padding: 32px 24px; }
          .price-amount { font-size: 44px; }

          .final-cta-section { padding: 64px 24px; }
          .final-cta-h2 { font-size: 28px; }
          .final-cta-p { font-size: 14px; }

          .footer { padding: 24px; }
        }

        @media (max-width: 480px) {
          .feat-grid { grid-template-columns: 1fr; }
          .hero-h1 { font-size: 30px; }
        }
      `}</style>
    </main>
  );
}
