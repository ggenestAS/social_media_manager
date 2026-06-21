/* @ds-bundle: {"format":3,"namespace":"AlbertSchoolDesignSystem_019df2","components":[],"sourceHashes":{"ui_kits/website/App.jsx":"10cd5a4f3178","ui_kits/website/ApplyModal.jsx":"1a8d987c7cb8","ui_kits/website/EventCTA.jsx":"e91f76833862","ui_kits/website/Footer.jsx":"c25961518e57","ui_kits/website/Hero.jsx":"ee2e89064a57","ui_kits/website/NumberedTour.jsx":"4c0514873f1e","ui_kits/website/PartnerWall.jsx":"33b5a4dc2c0d","ui_kits/website/Primitives.jsx":"14ce0205f74e","ui_kits/website/Programs.jsx":"d87db7dbe16e","ui_kits/website/TestimonialCarousel.jsx":"dfc9a607a2a9","ui_kits/website/TopNav.jsx":"f929b5dfa822"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AlbertSchoolDesignSystem_019df2 = window.AlbertSchoolDesignSystem_019df2 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/website/App.jsx
try { (() => {
/* global React, ReactDOM, TopNav, Hero, ProgramsSection, PartnerWall, NumberedTour, TestimonialCarousel, EventCallout, FinalCTA, Footer, ApplyModal */

function App() {
  const [lang, setLang] = React.useState("EN");
  const [applyOpen, setApplyOpen] = React.useState(false);
  const onApply = () => setApplyOpen(true);
  const onBrochure = () => alert("Brochure download started.");
  const onMeet = () => {
    const el = document.getElementById("event");
    if (el) window.scrollTo({
      top: el.offsetTop - 80,
      behavior: "smooth"
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--shell)",
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement(TopNav, {
    lang: lang,
    setLang: setLang,
    onApply: onApply,
    onBrochure: onBrochure
  }), /*#__PURE__*/React.createElement(Hero, {
    onMeet: onMeet
  }), /*#__PURE__*/React.createElement(ProgramsSection, null), /*#__PURE__*/React.createElement(PartnerWall, null), /*#__PURE__*/React.createElement(NumberedTour, null), /*#__PURE__*/React.createElement(TestimonialCarousel, null), /*#__PURE__*/React.createElement("div", {
    id: "event"
  }, /*#__PURE__*/React.createElement(EventCallout, {
    onApply: onApply
  })), /*#__PURE__*/React.createElement(FinalCTA, {
    onApply: onApply
  }), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(ApplyModal, {
    open: applyOpen,
    onClose: () => setApplyOpen(false)
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ApplyModal.jsx
try { (() => {
/* global React, Button */

function ApplyModal({
  open,
  onClose
}) {
  if (!open) return null;
  const [step, setStep] = React.useState(0);
  const [program, setProgram] = React.useState("International Master Finance, Data, & AI");
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(32,36,72,0.55)",
      backdropFilter: "blur(4px)",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      animation: "fadeIn 220ms cubic-bezier(0.16,1,0.3,1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: "var(--paper)",
      borderRadius: 28,
      width: "min(620px, 100%)",
      padding: 48,
      boxShadow: "var(--shadow-3)",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      position: "absolute",
      top: 20,
      right: 20,
      background: "transparent",
      border: 0,
      fontSize: 22,
      cursor: "pointer",
      color: "var(--ink-900)"
    }
  }, "\xD7"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--accent-red)",
      marginBottom: 12
    }
  }, "Admissions \xB7 2026 intake"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 32,
      fontWeight: 500,
      lineHeight: 1.12,
      letterSpacing: "-0.02em",
      color: "var(--ink-900)",
      margin: "0 0 28px 0"
    }
  }, "Tell us about ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 700
    }
  }, "you")), step === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "First name",
    placeholder: "Your first name"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    placeholder: "you@example.com",
    type: "email"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--ink-900)",
      marginBottom: 6,
      display: "block"
    }
  }, "Program of interest"), /*#__PURE__*/React.createElement("select", {
    value: program,
    onChange: e => setProgram(e.target.value),
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 15,
      color: "var(--ink-900)",
      background: "var(--paper)",
      border: "1px solid var(--border-mid)",
      borderRadius: 14,
      padding: "13px 14px",
      width: "100%",
      outline: "none"
    }
  }, /*#__PURE__*/React.createElement("option", null, "International Master Finance, Data, & AI"), /*#__PURE__*/React.createElement("option", null, "Bachelor Business, Data, & AI"), /*#__PURE__*/React.createElement("option", null, "International BBA Business, Data, & AI"), /*#__PURE__*/React.createElement("option", null, "MSc Data & AI for Business"))), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 14,
      color: "var(--ink-900)",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    defaultChecked: true,
    style: {
      width: 18,
      height: 18,
      accentColor: "var(--ink-900)"
    }
  }), "I'd like to receive admission updates"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "md",
    onClick: () => setStep(1)
  }, "Continue ", /*#__PURE__*/React.createElement("span", null, "\u2192")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "md",
    onClick: onClose
  }, "Cancel"))) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: 22,
      lineHeight: 1.4,
      color: "var(--ink-900)",
      margin: "0 0 24px 0"
    }
  }, "Thank you for your interest in Albert School."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.6,
      color: "var(--fg-2)",
      margin: "0 0 24px 0"
    }
  }, "We've received your details for ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--ink-900)"
    }
  }, program), ". Our admissions team will reach out within 48 hours."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "md",
    onClick: onClose
  }, "Close"))));
}
function Field({
  label,
  placeholder,
  type = "text"
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--ink-900)",
      marginBottom: 6,
      display: "block"
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: type,
    placeholder: placeholder,
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 15,
      color: "var(--ink-900)",
      background: "var(--paper)",
      border: "1px solid var(--border-mid)",
      borderRadius: 14,
      padding: "13px 14px",
      width: "100%",
      outline: "none",
      boxSizing: "border-box"
    }
  }));
}
Object.assign(window, {
  ApplyModal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ApplyModal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/EventCTA.jsx
try { (() => {
/* global React, Button, ArrowLink */

function EventCallout({
  onApply
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "96px 48px",
      background: "var(--cream)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 56,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--fg-3)",
      marginBottom: 16
    }
  }, "What's new"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 44,
      fontWeight: 500,
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
      color: "var(--ink-900)",
      margin: 0,
      textWrap: "balance"
    }
  }, "Meet us ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 700
    }
  }, "directly"), " at our next event")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--paper)",
      border: "1px solid var(--border-soft)",
      borderRadius: 24,
      padding: 32,
      boxShadow: "var(--shadow-1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "5px 11px",
      borderRadius: 999,
      background: "var(--accent-red)",
      color: "#fff",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase"
    }
  }, "Geneva"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 28,
      fontWeight: 600,
      color: "var(--ink-900)",
      margin: "16px 0 24px 0",
      lineHeight: 1.2
    }
  }, "AI Discovery Day \u2014 Coll\xE8ges Genevois"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 16,
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement(Meta, {
    label: "Date",
    value: "May 9, 2026"
  }), /*#__PURE__*/React.createElement(Meta, {
    label: "Time",
    value: "10:00 \u2014 12:00"
  }), /*#__PURE__*/React.createElement(Meta, {
    label: "Location",
    value: "Geneva campus"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "md",
    onClick: onApply
  }, "Register ", /*#__PURE__*/React.createElement("span", null, "\u2192")))));
}
function Meta({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--fg-3)",
      marginBottom: 4
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "var(--ink-900)"
    }
  }, value));
}
function FinalCTA({
  onApply
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 48px 96px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto",
      background: "var(--ink-900)",
      color: "#fff",
      borderRadius: 32,
      overflow: "hidden",
      padding: "72px 64px",
      display: "grid",
      gridTemplateColumns: "1.3fr 1fr",
      gap: 56,
      alignItems: "center",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -40,
      right: -40,
      width: 220,
      height: 220,
      opacity: 0.08
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.svg",
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      filter: "invert(1)"
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      opacity: 0.6,
      marginBottom: 16
    }
  }, "Join the first AI- and data-driven business school"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 60,
      fontWeight: 500,
      lineHeight: 1.04,
      letterSpacing: "-0.02em",
      margin: "0 0 24px 0"
    }
  }, "Start ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 700
    }
  }, "your"), " journey"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.55,
      opacity: 0.8,
      margin: "0 0 36px 0",
      maxWidth: 480
    }
  }, "Unlock your potential with a transformative pathway at the world's first Data & AI-driven Business school."), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    onClick: onApply
  }, "Apply now ", /*#__PURE__*/React.createElement("span", null, "\u2192"))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 24,
      overflow: "hidden",
      aspectRatio: "4 / 5",
      boxShadow: "var(--shadow-3)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/photo-hero-students.avif",
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }))));
}
Object.assign(window, {
  EventCallout,
  FinalCTA
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/EventCTA.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
/* global React */

function Footer() {
  const cols = [{
    h: "About",
    links: ["About Albert School", "Diploma & Certifications", "Joint Diploma — Albert × Mines", "Life at Albert School", "Our Faculty", "Our Mentors", "FAQ"]
  }, {
    h: "Programs",
    links: ["Bachelor Business, Data, & AI", "International BBA Business, Data, & AI", "MSc Data & AI for Business", "MSc Data & AI for Finance", "International Master Finance, Data, & AI", "Master AI & Entrepreneurship — POLIMI"]
  }, {
    h: "Campus",
    links: ["Paris", "Marseille", "Milan", "Geneva", "Madrid", "Student life", "Housing partners"]
  }, {
    h: "Media & Opportunities",
    links: ["Press", "Events", "School Blog", "School Journal (ADD)", "Albert Ventures", "Join the team"]
  }];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--ink-900)",
      color: "#fff",
      padding: "72px 48px 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.2fr repeat(4, 1fr)",
      gap: 48,
      marginBottom: 64
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-albert.svg",
    alt: "Albert School",
    style: {
      height: 28,
      filter: "invert(1) brightness(2)",
      marginBottom: 24
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      lineHeight: 1.6,
      opacity: 0.7,
      margin: 0,
      maxWidth: 260
    }
  }, "The world's first Data & AI-driven Business school. Paris \xB7 Marseille \xB7 Milan \xB7 Geneva \xB7 Madrid.")), cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.h
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "#fff",
      margin: "0 0 18px 0"
    }
  }, c.h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, c.links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("a", {
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,0.65)",
      textDecoration: "none",
      borderBottom: 0,
      lineHeight: 1.4
    }
  }, l))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid rgba(255,255,255,0.12)",
      paddingTop: 24,
      display: "flex",
      justifyContent: "space-between",
      fontSize: 12,
      opacity: 0.55
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xAE 2026 Albert School. All rights reserved."), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("a", {
    style: {
      color: "inherit",
      borderBottom: 0
    }
  }, "Privacy Policy"), /*#__PURE__*/React.createElement("a", {
    style: {
      color: "inherit",
      borderBottom: 0
    }
  }, "Terms & Conditions")))));
}
Object.assign(window, {
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
/* global React, ArrowLink */
const {
  useState: useStateHero,
  useEffect: useEffectHero
} = React;
function Hero({
  onMeet
}) {
  const photos = ["../../assets/photo-geneva-city.jpg", "../../assets/photo-students-1.jpg", "../../assets/photo-students-2.jpg", "../../assets/photo-classroom.jpg", "../../assets/photo-conversation.avif"];
  const [i, setI] = useStateHero(0);
  useEffectHero(() => {
    const t = setInterval(() => setI(x => (x + 1) % photos.length), 4500);
    return () => clearInterval(t);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "32px 48px 96px",
      maxWidth: 1280,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--fg-3)",
      marginBottom: 24
    }
  }, "Geneva \u2014 Switzerland campus"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.1fr 1fr",
      gap: 64,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 76,
      fontWeight: 500,
      lineHeight: 1.04,
      letterSpacing: "-0.02em",
      color: "var(--ink-900)",
      margin: 0
    }
  }, "Experience student life in ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 700
    }
  }, "Geneva")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      lineHeight: 1.55,
      color: "var(--fg-2)",
      marginTop: 28,
      maxWidth: 480
    }
  }, "Switzerland's global cluster of finance, watchmaking, and international organizations \u2014 your campus, in the same building as Edmond de Rothschild."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement(ArrowLink, {
    onClick: onMeet
  }, "Meet us on campus"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "4 / 5",
      borderRadius: 28,
      overflow: "hidden",
      boxShadow: "var(--shadow-2)"
    }
  }, photos.map((src, idx) => /*#__PURE__*/React.createElement("img", {
    key: src,
    src: src,
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: idx === i ? 1 : 0,
      transition: "opacity 1200ms cubic-bezier(0.16,1,0.3,1)"
    }
  })), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/decoration-group669.svg",
    alt: "",
    style: {
      position: "absolute",
      top: -10,
      right: -10,
      width: 80,
      height: 80,
      opacity: 0.9,
      filter: "invert(1)"
    }
  }))));
}
Object.assign(window, {
  Hero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/NumberedTour.jsx
try { (() => {
/* global React */

function NumberedTour() {
  const items = [{
    n: "01",
    title: "Reception",
    desc: "Receive the best possible assistance and help by asking at the reception desk.",
    img: "../../assets/photo-classroom.jpg"
  }, {
    n: "02",
    title: "Student Lounge",
    desc: "Enjoy some relaxing time with your colleagues in our student lounge.",
    img: "../../assets/photo-lounge.jpeg"
  }, {
    n: "03",
    title: "Study spaces",
    desc: "Study in our beautiful dedicated spaces.",
    img: "../../assets/photo-study.jpg"
  }, {
    n: "04",
    title: "Classrooms",
    desc: "Enjoy quality courses in our top-notch classrooms.",
    img: "../../assets/photo-classroom.jpg"
  }, {
    n: "05",
    title: "Fitness area",
    desc: "Benefit from an exclusive fitness area calibrated for your needs.",
    img: "../../assets/photo-fitness.jpg"
  }];
  const [active, setActive] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "96px 48px",
      background: "var(--bone)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--fg-3)",
      marginBottom: 16
    }
  }, "Campus tour"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 44,
      fontWeight: 500,
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
      color: "var(--ink-900)",
      margin: "0 0 56px 0"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 700
    }
  }, "Facilities"), " on Campus"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.2fr",
      gap: 64,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, items.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: item.n,
    onMouseEnter: () => setActive(i),
    style: {
      display: "grid",
      gridTemplateColumns: "60px 1fr",
      gap: 20,
      alignItems: "baseline",
      padding: "20px 0",
      borderBottom: "1px solid var(--border-soft)",
      cursor: "pointer",
      opacity: active === i ? 1 : 0.55,
      transition: "opacity 220ms cubic-bezier(0.16,1,0.3,1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 32,
      fontWeight: 500,
      color: "var(--ink-900)",
      letterSpacing: "-0.02em"
    }
  }, item.n), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 22,
      fontWeight: 600,
      color: "var(--ink-900)",
      margin: 0,
      lineHeight: 1.2
    }
  }, item.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--fg-2)",
      margin: "6px 0 0 0",
      lineHeight: 1.5
    }
  }, item.desc))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "4 / 5",
      borderRadius: 28,
      overflow: "hidden",
      boxShadow: "var(--shadow-2)"
    }
  }, items.map((item, i) => /*#__PURE__*/React.createElement("img", {
    key: item.n,
    src: item.img,
    alt: item.title,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: active === i ? 1 : 0,
      transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1)"
    }
  }))))));
}
Object.assign(window, {
  NumberedTour
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/NumberedTour.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/PartnerWall.jsx
try { (() => {
/* global React */

function PartnerWall() {
  const partners = [{
    src: "../../assets/partner-edmond-rothschild.png",
    name: "Edmond de Rothschild"
  }, {
    src: "../../assets/partner-pictet.avif",
    name: "Pictet"
  }, {
    src: "../../assets/partner-bcg-x.avif",
    name: "BCG X"
  }, {
    src: "../../assets/partner-nestle.avif",
    name: "Nestlé"
  }, {
    src: "../../assets/partner-decathlon.avif",
    name: "Decathlon"
  }, {
    src: "../../assets/partner-ibm.png",
    name: "IBM"
  }, {
    src: "../../assets/partner-clubmed.avif",
    name: "Club Med"
  }, {
    src: "../../assets/partner-credit-agricole.avif",
    name: "Crédit Agricole"
  }, {
    src: "../../assets/partner-cmacgm.avif",
    name: "CMA CGM"
  }, {
    src: "../../assets/partner-capgemini.avif",
    name: "Capgemini"
  }, {
    src: "../../assets/partner-generali.avif",
    name: "Generali"
  }, {
    src: "../../assets/partner-emeria.avif",
    name: "Emeria"
  }, {
    src: "../../assets/partner-henkel.avif",
    name: "Henkel"
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "96px 48px",
      background: "var(--shell)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
      gap: 64,
      alignItems: "center",
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--fg-3)",
      marginBottom: 16
    }
  }, "Our partners"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 44,
      fontWeight: 500,
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
      color: "var(--ink-900)",
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 700
    }
  }, "Collaborate"), " with leading companies")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.55,
      color: "var(--fg-2)",
      margin: 0,
      maxWidth: 520,
      justifySelf: "end"
    }
  }, "From Swiss private banks to global consultancies \u2014 our students work on real briefs from the companies that shape Geneva's economy.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      gap: 1,
      background: "var(--border-soft)",
      border: "1px solid var(--border-soft)",
      borderRadius: 18,
      overflow: "hidden"
    }
  }, partners.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    style: {
      background: "var(--cream)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 120,
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: p.src,
    alt: p.name,
    style: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
      mixBlendMode: "multiply"
    }
  }))))));
}
Object.assign(window, {
  PartnerWall
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/PartnerWall.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Primitives.jsx
try { (() => {
/* global React */
const {
  useState,
  useEffect
} = React;
function ArrowLink({
  children,
  onClick,
  color = "ink"
}) {
  return /*#__PURE__*/React.createElement("a", {
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "baseline",
      gap: 8,
      fontFamily: "var(--font-body)",
      fontWeight: 600,
      fontSize: 14,
      color: color === "red" ? "var(--accent-red)" : "var(--ink-900)",
      cursor: "pointer",
      borderBottom: "0",
      textDecoration: "none"
    },
    className: "arrowlink"
  }, /*#__PURE__*/React.createElement("span", null, children), /*#__PURE__*/React.createElement("span", {
    className: "arrow",
    style: {
      transition: "transform 280ms cubic-bezier(0.16,1,0.3,1)",
      display: "inline-block"
    }
  }, "\u2192"));
}
function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  style
}) {
  const variants = {
    primary: {
      bg: "var(--ink-900)",
      fg: "#fff",
      border: "transparent"
    },
    accent: {
      bg: "var(--accent-red)",
      fg: "#fff",
      border: "transparent"
    },
    outline: {
      bg: "transparent",
      fg: "var(--ink-900)",
      border: "var(--ink-900)"
    },
    ghost: {
      bg: "transparent",
      fg: "var(--ink-900)",
      border: "transparent"
    }
  };
  const sizes = {
    sm: {
      pad: "10px 18px",
      fs: 13
    },
    md: {
      pad: "13px 22px",
      fs: 14
    },
    lg: {
      pad: "16px 28px",
      fs: 15
    }
  };
  const v = variants[variant];
  const s = sizes[size];
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    className: "btn",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      fontFamily: "var(--font-body)",
      fontWeight: 600,
      fontSize: s.fs,
      padding: s.pad,
      borderRadius: 999,
      background: v.bg,
      color: v.fg,
      border: `1.5px solid ${v.border}`,
      cursor: "pointer",
      transition: "all 220ms cubic-bezier(0.16,1,0.3,1)",
      ...style
    }
  }, children);
}
function LangSwitch({
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 12,
      fontWeight: 700,
      color: "var(--ink-900)",
      letterSpacing: "0.04em"
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => onChange("EN"),
    style: {
      cursor: "pointer",
      opacity: value === "EN" ? 1 : 0.45
    }
  }, "EN"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.3
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    onClick: () => onChange("FR"),
    style: {
      cursor: "pointer",
      opacity: value === "FR" ? 1 : 0.45
    }
  }, "FR"));
}
Object.assign(window, {
  ArrowLink,
  Button,
  LangSwitch
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Primitives.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Programs.jsx
try { (() => {
/* global React, ArrowLink */

function EyebrowHeader({
  eyebrow,
  children,
  align = "left"
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      textAlign: align,
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--fg-3)",
      marginBottom: 16
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 52,
      fontWeight: 500,
      lineHeight: 1.08,
      letterSpacing: "-0.02em",
      color: "var(--ink-900)",
      margin: 0,
      textWrap: "balance",
      maxWidth: 760
    }
  }, children));
}
function ProgramCard({
  eyebrow,
  title,
  body
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("article", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: "var(--paper)",
      border: "1px solid var(--border-soft)",
      borderRadius: 24,
      padding: 32,
      display: "flex",
      flexDirection: "column",
      gap: 14,
      boxShadow: hover ? "var(--shadow-2)" : "var(--shadow-1)",
      transform: hover ? "translateY(-3px)" : "translateY(0)",
      transition: "all 280ms cubic-bezier(0.16,1,0.3,1)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--accent-red)"
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 22,
      fontWeight: 600,
      lineHeight: 1.22,
      color: "var(--ink-900)",
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.55,
      color: "var(--fg-2)",
      margin: 0,
      flex: 1
    }
  }, body), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(ArrowLink, null, "Discover the program")));
}
function ProgramsSection() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "96px 48px",
      background: "var(--cream)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(EyebrowHeader, {
    eyebrow: "Programs in Geneva"
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 700
    }
  }, "Three pathways"), " shaped by Geneva's economy"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(ProgramCard, {
    eyebrow: "Bachelor",
    title: "Bachelor Business, Data, & AI",
    body: "A comprehensive 3-year post-bachelor program studying the fundamentals of Business, Data, & AI."
  }), /*#__PURE__*/React.createElement(ProgramCard, {
    eyebrow: "International BBA",
    title: "International BBA Business, Data, & AI",
    body: "Study the fundamentals while moving to a new international campus every year for 3 years."
  }), /*#__PURE__*/React.createElement(ProgramCard, {
    eyebrow: "Master",
    title: "International Master Finance, Data, & AI",
    body: "Learn and apply data and AI skills tailored to the world of international finance in Geneva."
  }))));
}
Object.assign(window, {
  EyebrowHeader,
  ProgramCard,
  ProgramsSection
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Programs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/TestimonialCarousel.jsx
try { (() => {
/* global React */

function TestimonialCarousel() {
  const items = [{
    quote: "At Albert School, the student council fosters community and learning through events. By bringing students together, we enhance campus life and create connections, contributing to develop new soft skills.",
    name: "Sulian",
    role: "Bachelor in Business, Data, & AI",
    img: "../../assets/student-sulian.png"
  }, {
    quote: "What I like best about Albert School is how the professors foster our ambition and encourage us to have an entrepreneurial mindset.",
    name: "Prisca",
    role: "International BBA — General Secretary of the Student Council",
    img: "../../assets/student-prisca.png"
  }, {
    quote: "The Business Deep Dives pushed me to grow beyond what I thought possible — turning lessons into real-world experience alongside inspiring companies.",
    name: "Samuel",
    role: "International BBA — Student from Rwanda",
    img: "../../assets/student-samuel.png"
  }];
  const [i, setI] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "96px 48px",
      background: "var(--shell)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--fg-3)",
      marginBottom: 16
    }
  }, "Engaged students"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 44,
      fontWeight: 500,
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
      color: "var(--ink-900)",
      margin: "0 0 56px 0",
      maxWidth: 720,
      textWrap: "balance"
    }
  }, "Hear from our students about their amazing ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 700
    }
  }, "journeys and achievements")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--paper)",
      border: "1px solid var(--border-soft)",
      borderRadius: 28,
      padding: 56,
      display: "grid",
      gridTemplateColumns: "180px 1fr",
      gap: 56,
      alignItems: "center",
      boxShadow: "var(--shadow-1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 180,
      height: 180,
      borderRadius: 999,
      overflow: "hidden",
      background: "var(--bone)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: items[i].img,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: 28,
      lineHeight: 1.32,
      color: "var(--ink-900)",
      margin: "0 0 28px 0"
    }
  }, "\"", items[i].quote, "\""), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 16,
      color: "var(--ink-900)"
    }
  }, items[i].name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--fg-3)",
      marginTop: 4
    }
  }, items[i].role), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 28
    }
  }, items.map((_, k) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setI(k),
    style: {
      width: k === i ? 28 : 10,
      height: 10,
      borderRadius: 999,
      background: k === i ? "var(--ink-900)" : "var(--ink-100)",
      border: 0,
      cursor: "pointer",
      transition: "all 280ms cubic-bezier(0.16,1,0.3,1)",
      padding: 0
    }
  })))))));
}
Object.assign(window, {
  TestimonialCarousel
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/TestimonialCarousel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/TopNav.jsx
try { (() => {
/* global React, Button, LangSwitch */
const {
  useState: useStateNav,
  useEffect: useEffectNav
} = React;
function TopNav({
  lang,
  setLang,
  onApply,
  onBrochure
}) {
  const [scrolled, setScrolled] = useStateNav(false);
  useEffectNav(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["About", "Programs", "Campuses", "Partners", "Media", "Tuition Fees"];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      padding: "16px 24px",
      display: "flex",
      justifyContent: "center",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      pointerEvents: "auto",
      background: scrolled ? "rgba(250,247,241,0.85)" : "rgba(250,247,241,0.6)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      border: "1px solid var(--border-soft)",
      borderRadius: 999,
      display: "flex",
      alignItems: "center",
      gap: 24,
      padding: "10px 12px 10px 22px",
      boxShadow: scrolled ? "var(--shadow-2)" : "var(--shadow-1)",
      width: "min(1180px, 100%)",
      transition: "all 280ms cubic-bezier(0.16,1,0.3,1)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-albert.svg",
    alt: "Albert School",
    style: {
      height: 22
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 22,
      fontSize: 13,
      fontWeight: 600,
      color: "var(--ink-900)"
    }
  }, links.map(l => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      cursor: "pointer",
      opacity: 0.85
    },
    onMouseEnter: e => e.currentTarget.style.opacity = 1,
    onMouseLeave: e => e.currentTarget.style.opacity = 0.85
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(LangSwitch, {
    value: lang,
    onChange: setLang
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    onClick: onBrochure
  }, "Brochure"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: onApply
  }, "Apply")));
}
Object.assign(window, {
  TopNav
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/TopNav.jsx", error: String((e && e.message) || e) }); }

})();
