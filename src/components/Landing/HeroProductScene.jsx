import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { FiActivity, FiArrowUpRight, FiCheck, FiChevronLeft, FiChevronRight, FiClock, FiShield, FiZap } from "react-icons/fi";

const scenes = [
  {
    eyebrow: "Live operations",
    title: "Every signal. One calm view.",
    gradient: "from-cyan-300 via-blue-400 to-indigo-500",
    tint: "cyan",
    metrics: [
      { label: "Open", value: "128", delta: "−12%" },
      { label: "SLA health", value: "94%", delta: "+4.2%" },
      { label: "Resolved", value: "1.8k", delta: "+18%" },
    ],
  },
  {
    eyebrow: "Incident control",
    title: "From alert to owner in seconds.",
    gradient: "from-violet-300 via-fuchsia-400 to-pink-500",
    tint: "violet",
    metrics: [
      { label: "P1 response", value: "4m", delta: "Fast" },
      { label: "Assigned", value: "98%", delta: "+7%" },
      { label: "Escalated", value: "06", delta: "−3" },
    ],
  },
  {
    eyebrow: "Customer clarity",
    title: "Updates people actually understand.",
    gradient: "from-emerald-300 via-teal-400 to-cyan-500",
    tint: "emerald",
    metrics: [
      { label: "CSAT", value: "4.9", delta: "+0.3" },
      { label: "Updated", value: "100%", delta: "Live" },
      { label: "Reopened", value: "1.2%", delta: "−8%" },
    ],
  },
];

const ticketRows = [
  { id: "INC-0142", title: "Identity provider outage", priority: "Critical", color: "rose" },
  { id: "INC-0138", title: "VPN latency in Sydney", priority: "High", color: "amber" },
  { id: "INC-0129", title: "New starter access", priority: "Normal", color: "cyan" },
];

const FloatingTicket = ({ className, id, title, status, icon }) => (
  <motion.div
    className={`hero-float-card absolute z-30 rounded-2xl border border-white/15 bg-slate-900/65 p-4 shadow-2xl backdrop-blur-xl ${className}`}
    animate={{ y: [0, -10, 0], rotateZ: [-1, 1, -1] }}
    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-300/15 text-cyan-200">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-cyan-200">{id}</p>
        <p className="mt-1 truncate text-xs font-medium text-white">{title}</p>
      </div>
    </div>
    <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-[10px]">
      <span className="text-slate-400">Live update</span>
      <span className="rounded-full bg-emerald-300/15 px-2 py-1 text-emerald-200">{status}</span>
    </div>
  </motion.div>
);

const HeroProductScene = () => {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 22 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % scenes.length), 7200);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  const move = (direction) => setActive((current) => (current + direction + scenes.length) % scenes.length);
  const scene = scenes[active];

  const handlePointerMove = (event) => {
    if (reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  return (
    <div
      id="product"
      className="hero-product-scene relative mx-auto w-full max-w-[760px] py-8 lg:py-14"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}
    >
      <div className="hero-scene-aura absolute inset-[8%] rounded-full bg-cyan-400/20 blur-[90px]" />
      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />
      <div className="hero-orbit-dot hero-orbit-dot-one" />
      <div className="hero-orbit-dot hero-orbit-dot-two" />

      <FloatingTicket className="-left-8 top-6 hidden w-52 xl:block" id="INC-0142" title="Identity service restored" status="Resolved" icon={<FiShield />} />
      <FloatingTicket className="-right-8 bottom-12 hidden w-52 xl:block" id="SLA · 03:42" title="Response target secured" status="On track" icon={<FiClock />} />

      <motion.div
        className="relative z-20"
        style={reducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 1300 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={scene.eyebrow}
            drag={reducedMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.38}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 70 || Math.abs(info.velocity.x) > 500) move(info.offset.x < 0 ? 1 : -1);
            }}
            initial={{ opacity: 0, rotateY: 25, x: 70, scale: 0.92 }}
            animate={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -25, x: -70, scale: 0.92 }}
            transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="hero-command-card cursor-grab overflow-hidden rounded-[28px] border border-white/15 bg-slate-950/80 shadow-[0_50px_100px_-30px_rgba(8,145,178,.42)] backdrop-blur-2xl active:cursor-grabbing"
          >
            <div className="hero-card-shine pointer-events-none absolute inset-0" />
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-rose-400" /><i className="h-2.5 w-2.5 rounded-full bg-amber-300" /><i className="h-2.5 w-2.5 rounded-full bg-emerald-400" /></div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-slate-400"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> Systems live</div>
            </div>

            <div className="grid min-h-[390px] grid-cols-[64px_1fr] sm:grid-cols-[82px_1fr]">
              <aside className="border-r border-white/10 bg-white/[.025] p-3 sm:p-4">
                <div className={`flex h-10 items-center justify-center rounded-xl bg-gradient-to-br ${scene.gradient} text-slate-950`}><FiCheck /></div>
                {[FiActivity, FiZap, FiShield].map((Icon, index) => <div key={index} className={`mt-5 flex h-9 items-center justify-center rounded-lg ${index === 0 ? "bg-white/10 text-cyan-200" : "text-slate-600"}`}><Icon /></div>)}
              </aside>

              <div className="min-w-0 p-4 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div><p className="text-[10px] font-bold uppercase tracking-[.24em] text-cyan-300">{scene.eyebrow}</p><h3 className="mt-2 max-w-md text-xl font-semibold leading-tight text-white sm:text-2xl">{scene.title}</h3></div>
                  <span className="hidden rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 sm:block"><FiArrowUpRight /></span>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                  {scene.metrics.map((metric) => <div key={metric.label} className="rounded-xl border border-white/10 bg-white/[.045] p-3 sm:p-4"><p className="truncate text-[9px] uppercase tracking-wider text-slate-500 sm:text-[10px]">{metric.label}</p><div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between"><strong className="text-lg text-white sm:text-xl">{metric.value}</strong><span className="text-[9px] text-emerald-300">{metric.delta}</span></div></div>)}
                </div>

                <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[.035]">
                  <div className="flex items-center justify-between border-b border-white/10 px-4 py-3"><p className="text-xs font-semibold text-white">Priority stream</p><span className="text-[10px] text-slate-500">Live</span></div>
                  {ticketRows.map((ticket, index) => <div key={ticket.id} className="flex items-center justify-between gap-3 border-b border-white/5 px-4 py-3 last:border-0"><div className="flex min-w-0 items-center gap-3"><span className={`h-8 w-1 rounded-full ${index === 0 ? "bg-rose-400" : index === 1 ? "bg-amber-300" : "bg-cyan-300"}`} /><div className="min-w-0"><p className="truncate text-xs font-medium text-slate-200 sm:text-sm">{ticket.title}</p><p className="mt-0.5 text-[9px] text-slate-600 sm:text-[10px]">{ticket.id} · updated now</p></div></div><span className={`shrink-0 rounded-full px-2 py-1 text-[9px] ${index === 0 ? "bg-rose-400/15 text-rose-300" : index === 1 ? "bg-amber-300/15 text-amber-200" : "bg-cyan-300/15 text-cyan-200"}`}>{ticket.priority}</span></div>)}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="relative z-40 mt-6 flex items-center justify-center gap-3">
        <button onClick={() => move(-1)} aria-label="Previous view" className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-300 backdrop-blur transition hover:border-cyan-300/50 hover:text-cyan-200"><FiChevronLeft /></button>
        {scenes.map((item, index) => <button key={item.eyebrow} onClick={() => setActive(index)} aria-label={`Show ${item.eyebrow}`} className={`h-2 rounded-full transition-all duration-500 ${index === active ? "w-10 bg-gradient-to-r from-cyan-300 to-violet-400" : "w-2 bg-white/20 hover:bg-white/40"}`} />)}
        <button onClick={() => move(1)} aria-label="Next view" className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-300 backdrop-blur transition hover:border-cyan-300/50 hover:text-cyan-200"><FiChevronRight /></button>
      </div>
      <p className="relative z-40 mt-3 text-center text-[10px] uppercase tracking-[.2em] text-slate-600">Swipe · drag · explore</p>
    </div>
  );
};

export default HeroProductScene;
