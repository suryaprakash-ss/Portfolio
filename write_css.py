addition = """
/* PUBLICATIONS */
.publications{background:var(--bg2)}
.pub-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px}
.pub-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:28px;display:flex;flex-direction:column;gap:12px;transition:var(--tr);position:relative;overflow:hidden}
.pub-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--red),var(--gold));transform:scaleX(0);transform-origin:left;transition:var(--tr)}
.pub-card:hover{border-color:rgba(230,36,41,0.3);transform:translateY(-5px);box-shadow:0 12px 35px rgba(230,36,41,0.12)}
.pub-card:hover::after{transform:scaleX(1)}
.pub-year{display:inline-block;background:linear-gradient(135deg,var(--red),#c0392b);color:#fff;font-size:0.7rem;font-weight:700;padding:3px 12px;border-radius:50px;letter-spacing:1px;width:fit-content;box-shadow:0 0 12px var(--red-glow)}
.pub-icon{font-size:1.5rem;color:var(--red)}
.pub-card h3{font-size:0.9rem;font-weight:600;color:#fff;line-height:1.55}
.pub-card p{font-size:0.82rem;color:var(--muted);line-height:1.65}

/* ACHIEVEMENTS */
.achievements{background:var(--bg3)}
.ach-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
.ach-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:28px;transition:var(--tr);position:relative;overflow:hidden}
.ach-card::before{content:'';position:absolute;top:0;left:0;bottom:0;width:2px;background:linear-gradient(var(--gold),var(--red));transform:scaleY(0);transform-origin:top;transition:transform 0.4s ease}
.ach-card:hover::before{transform:scaleY(1)}
.ach-card:hover{border-color:rgba(255,215,0,0.2);transform:translateY(-5px);box-shadow:0 12px 35px rgba(255,215,0,0.06)}
.ach-icon{font-size:1.8rem;color:var(--gold);margin-bottom:12px;filter:drop-shadow(0 0 8px rgba(255,215,0,0.3))}
.ach-card h3{font-size:0.95rem;font-weight:700;color:#fff;margin-bottom:16px}
.ach-card ul{display:flex;flex-direction:column;gap:12px}
.ach-card li{display:flex;align-items:flex-start;gap:10px;font-size:0.85rem;color:var(--muted);line-height:1.55}
.ach-card li i{color:var(--red);margin-top:2px;flex-shrink:0}
.ach-card li strong{color:#fff}

/* CONTACT */
.contact{background:var(--bg2)}
.contact-grid{display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:start}
.contact-left h3{font-size:1.6rem;font-weight:800;color:#fff;margin-bottom:12px;line-height:1.3}
.contact-left h3 span{color:var(--red);text-shadow:0 0 20px rgba(230,36,41,0.3)}
.contact-left p{font-size:0.9rem;color:var(--muted);margin-bottom:28px;line-height:1.75}
.contact-links{display:flex;flex-direction:column;gap:12px}
.contact-link-card{display:flex;align-items:center;gap:14px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:14px 18px;transition:var(--tr);color:var(--text)}
.contact-link-card:hover{border-color:var(--red);transform:translateX(8px);box-shadow:0 0 24px rgba(230,36,41,0.1)}
.contact-link-card i{font-size:1.1rem;color:var(--red);width:20px;text-align:center}
.contact-link-card strong{display:block;font-size:0.83rem;color:#fff}
.contact-link-card span{font-size:0.76rem;color:var(--muted)}
.contact-form{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:32px;display:flex;flex-direction:column;gap:16px;position:relative;overflow:hidden}
.contact-form::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--red),var(--gold),var(--blue))}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.form-group{display:flex;flex-direction:column;gap:6px}
.form-group label{font-size:0.78rem;color:var(--muted);font-weight:500;letter-spacing:0.5px;text-transform:uppercase}
.form-group input,.form-group textarea{background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:12px 16px;color:var(--text);font-family:var(--font);font-size:0.88rem;outline:none;transition:var(--tr);resize:vertical}
.form-group input::placeholder,.form-group textarea::placeholder{color:rgba(104,104,160,0.5)}
.form-group input:focus,.form-group textarea:focus{border-color:var(--red);box-shadow:0 0 0 3px rgba(230,36,41,0.08)}
.form-status{font-size:0.83rem;min-height:1.2em;text-align:center}

/* FOOTER */
.footer{background:var(--bg);border-top:1px solid var(--border);padding:44px 0;position:relative;overflow:hidden;z-index:1}
.footer-web{position:absolute;bottom:-60px;left:50%;transform:translateX(-50%);width:400px;height:200px;background:radial-gradient(ellipse,rgba(230,36,41,0.05),transparent 70%);pointer-events:none}
.footer-inner{display:flex;flex-direction:column;align-items:center;gap:16px}
.footer-name{font-family:'Bebas Neue',sans-serif;font-size:1.8rem;color:#fff;letter-spacing:4px;text-shadow:0 0 20px rgba(230,36,41,0.2)}
.footer-socials{display:flex;gap:12px}
.footer-socials a{width:38px;height:38px;border-radius:50%;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:0.9rem;transition:var(--tr)}
.footer-socials a:hover{border-color:var(--red);color:var(--red);box-shadow:0 0 14px var(--red-glow);transform:translateY(-3px)}
.footer-copy{font-size:0.78rem;color:var(--muted)}

/* BACK TO TOP */
.back-to-top{position:fixed;bottom:28px;right:28px;width:46px;height:46px;background:linear-gradient(135deg,var(--red),#c0392b);color:#fff;border:none;border-radius:50%;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:var(--tr);z-index:999;box-shadow:0 0 20px var(--red-glow)}
.back-to-top.visible{opacity:1;pointer-events:all}
.back-to-top:hover{transform:translateY(-4px) scale(1.1);box-shadow:0 0 30px var(--red-glow)}

/* RESPONSIVE */
@media(max-width:960px){
  .hero{flex-direction:column;text-align:center;padding:130px 6% 80px;gap:48px}
  .hero-buttons,.hero-socials{justify-content:center}
  .about-grid,.contact-grid{grid-template-columns:1fr}
  .orbit-3{display:none}
  .spiderweb-br{display:none}
}
@media(max-width:640px){
  .nav-links{display:none;position:fixed;inset:0;background:rgba(4,4,14,0.97);flex-direction:column;align-items:center;justify-content:center;gap:28px;z-index:999}
  .nav-links.open{display:flex}
  .nav-link{font-size:1.3rem;color:#fff}
  .hamburger{display:flex;z-index:1000}
  .hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
  .hamburger.open span:nth-child(2){opacity:0}
  .hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
  .avatar-container{width:240px;height:240px}
  .avatar-ring-outer{width:190px;height:190px}
  .avatar-img{width:160px;height:160px;font-size:4rem}
  .orbit-2,.orbit-3{display:none}
  .form-row{grid-template-columns:1fr}
  .section-label{display:none}
  .stats-grid{grid-template-columns:1fr 1fr}
  .spiderweb{width:180px;height:180px}
  .spider-swing{right:60px}
  .hero-web-center{width:300px;height:300px}
}
"""
with open("style.css","a",encoding="utf-8") as f:
    f.write(addition)
print("chunk4 done")
