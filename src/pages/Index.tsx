import { useState } from 'react';
import type { ReactNode } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/a59d8121-ebca-40a6-a3d5-afa3cc253d59/files/3c1b8b46-e563-46b8-8069-c0c3cf51c5b7.jpg';

const specs = [
  { value: '840', unit: 'м²', label: 'Общая площадь' },
  { value: '6.4', unit: 'м', label: 'Высота потолков' },
  { value: '2', unit: 'зоны', label: 'Склад + Архив' },
  { value: '+15…22', unit: '°C', label: 'Климат-контроль' },
];

const zones = [
  {
    num: '01',
    icon: 'Cylinder',
    title: 'Склад трубной продукции',
    desc: 'Левая половина помещения. Консольные стеллажи и металлические коники для горизонтального хранения труб разного диаметра и длины. Проезды для погрузчика.',
    tags: ['Коники', 'Консольные стеллажи', 'Разметка пола', 'Погрузчик'],
  },
  {
    num: '02',
    icon: 'Library',
    title: 'Двухярусный архив',
    desc: 'Правая половина помещения. Мезонинная конструкция с двумя уровнями архивных стеллажей для коробов, папок и документации. Металлическая лестница.',
    tags: ['2 яруса', 'Архивные стеллажи', 'Мезонин', 'Лестница'],
  },
  {
    num: '03',
    icon: 'Monitor',
    title: 'Рабочие места персонала',
    desc: 'Зона в правой части: рабочие столы для архивариусов, шкафы для текущей документации, зона отдыха и сантехнический узел.',
    tags: ['Рабочие столы', 'Шкафы', 'Зона отдыха'],
  },
  {
    num: '04',
    icon: 'DoorOpen',
    title: 'Входная зона и приёмка',
    desc: 'Вход и зона приёма-выдачи документов расположены в правой части. Буферная площадка, рампа и место для оформления заявок.',
    tags: ['Рампа', 'Буфер', 'Приёмка документов'],
  },
];

const systems = [
  { icon: 'Lightbulb', title: 'Промышленное освещение', desc: 'LED-панели по сетке потолка с расчётом освещённости для каждой зоны.' },
  { icon: 'Wind', title: 'Промышленная вентиляция', desc: 'Приточно-вытяжная система с воздуховодами по периметру помещения.' },
  { icon: 'Thermometer', title: 'Климат-контроль', desc: 'Поддержание оптимальной температуры и влажности для хранения документов.' },
  { icon: 'ShieldCheck', title: 'Безопасность', desc: 'Пожарная сигнализация, разметка эвакуации и зон погрузки.' },
];

const plan = [
  { id: 'pipe',    label: 'Склад труб',       icon: 'Cylinder',  area: '420 м²', detail: 'Консольные стеллажи + коники для трубной продукции', x: 2,  y: 2,  w: 46, h: 96 },
  { id: 'aisle',   label: 'Грузовой проход',  icon: 'Truck',     area: '—',      detail: 'Центральный проезд вдоль перегородки',                x: 48, y: 2,  w: 4,  h: 96 },
  { id: 'archive', label: 'Двухярусный архив',icon: 'Library',   area: '280 м²', detail: 'Мезонин · 2 уровня стеллажей для документации',       x: 52, y: 2,  w: 46, h: 62 },
  { id: 'staff',   label: 'Рабочие места',    icon: 'Monitor',   area: '80 м²',  detail: 'Зона персонала: столы, шкафы, зона отдыха',           x: 52, y: 64, w: 46, h: 20 },
  { id: 'entry',   label: 'Вход / Приёмка',   icon: 'DoorOpen',  area: '60 м²',  detail: 'Входная зона, рампа и буфер приёма-выдачи',           x: 52, y: 84, w: 46, h: 14 },
];

type LayerId = 'lighting' | 'ventilation' | 'climate' | 'safety';

const layers: { id: LayerId; label: string; icon: string; color: string }[] = [
  { id: 'lighting',    label: 'Освещение',   icon: 'Lightbulb',   color: '#f97316' },
  { id: 'ventilation', label: 'Вентиляция',  icon: 'Wind',        color: '#38bdf8' },
  { id: 'climate',     label: 'Климат',      icon: 'Thermometer', color: '#34d399' },
  { id: 'safety',      label: 'Безопасность',icon: 'ShieldCheck', color: '#f43f5e' },
];

const layerElements: Record<LayerId, ReactNode> = {
  lighting: (
    <g opacity="0.9">
      {/* Перегородка */}
      <line x1={50} y1={2} x2={50} y2={98} stroke="#555" strokeWidth={1} strokeDasharray="2 2"/>
      {/* LED-панели: склад — 3×5 сетка */}
      {[12,25,38].map(cx => [14,28,44,60,76,90].map(cy => (
        <g key={`ls-${cx}-${cy}`}>
          <rect x={cx-5} y={cy-2} width={10} height={3.5} rx={1} fill="#f97316" opacity="0.95"/>
          <ellipse cx={cx} cy={cy} rx={10} ry={10} fill="#f97316" opacity="0.1"/>
        </g>
      )))}
      {/* LED-панели: архив — 2 яруса, 3×4 */}
      {[62,75,88].map(cx => [10,24,38,52].map(cy => (
        <g key={`la-${cx}-${cy}`}>
          <rect x={cx-4} y={cy-2} width={8} height={3} rx={1} fill="#f97316" opacity="0.95"/>
          <ellipse cx={cx} cy={cy} rx={8} ry={8} fill="#f97316" opacity="0.1"/>
        </g>
      )))}
      {/* LED — рабочие места и вход */}
      {[62,75,88].map(cx => [70,82,92].map(cy => (
        <g key={`lw-${cx}-${cy}`}>
          <rect x={cx-4} y={cy-2} width={8} height={3} rx={1} fill="#f97316" opacity="0.8"/>
        </g>
      )))}
    </g>
  ),
  ventilation: (
    <g opacity="0.85">
      {/* Магистраль — склад, вдоль стены */}
      <rect x={3} y={49} width={45} height={3.5} rx={1.5} fill="#38bdf8" opacity="0.75"/>
      <text x={4} y={48} fontSize="3.5" fill="#38bdf8" fontFamily="monospace">▶ ПРИТОК</text>
      {[9,18,27,36,45].map(x => (
        <g key={`vs-${x}`}>
          <line x1={x} y1={49} x2={x} y2={5}  stroke="#38bdf8" strokeWidth={1.5} strokeDasharray="3 3"/>
          <line x1={x} y1={52} x2={x} y2={97} stroke="#38bdf8" strokeWidth={1.5} strokeDasharray="3 3"/>
          <circle cx={x} cy={5}  r={2.5} fill="#38bdf8" opacity="0.85"/>
          <circle cx={x} cy={97} r={2.5} fill="#38bdf8" opacity="0.85"/>
        </g>
      ))}
      {/* Магистраль — архив */}
      <rect x={52} y={33} width={46} height={3} rx={1.5} fill="#38bdf8" opacity="0.75"/>
      <text x={53} y={32} fontSize="3.5" fill="#38bdf8" fontFamily="monospace">▶ ПРИТОК</text>
      {[58,68,78,88,96].map(x => (
        <g key={`va-${x}`}>
          <line x1={x} y1={33} x2={x} y2={5}  stroke="#38bdf8" strokeWidth={1.5} strokeDasharray="3 3"/>
          <circle cx={x} cy={5} r={2.5} fill="#38bdf8" opacity="0.85"/>
        </g>
      ))}
      {/* Вытяжка архив нижняя */}
      <rect x={52} y={78} width={46} height={2.5} rx={1} fill="#38bdf8" opacity="0.5"/>
      {[60,74,88].map(x => (
        <g key={`vw-${x}`}>
          <line x1={x} y1={78} x2={x} y2={98} stroke="#38bdf8" strokeWidth={1} strokeDasharray="2 3"/>
          <circle cx={x} cy={98} r={2} fill="#38bdf8" opacity="0.7"/>
        </g>
      ))}
    </g>
  ),
  climate: (
    <g opacity="0.9">
      {/* Склад — промышленный режим */}
      <rect x={2} y={2} width={47} height={96} rx={2} fill="#34d399" opacity="0.07" stroke="#34d399" strokeWidth={2} strokeDasharray="6 3"/>
      <text x={5} y={11} fontSize="4" fill="#34d399" fontFamily="monospace">+8…16 °C</text>
      <text x={5} y={17} fontSize="3.5" fill="#34d399" fontFamily="monospace">влажность 50–70%</text>
      {/* Кондиционеры склад */}
      {[8,30].map(x => (
        <g key={`acs-${x}`}>
          <rect x={x} y={3} width={13} height={5} rx={1} fill="#34d399" opacity="0.75"/>
          <text x={x+1.5} y={7} fontSize="3.5" fill="#0a1a12" fontFamily="monospace">AC</text>
        </g>
      ))}
      {/* Архив — комфортный режим */}
      <rect x={52} y={2} width={46} height={62} rx={2} fill="#34d399" opacity="0.07" stroke="#34d399" strokeWidth={2} strokeDasharray="6 3"/>
      <text x={55} y={11} fontSize="4" fill="#34d399" fontFamily="monospace">+18…22 °C</text>
      <text x={55} y={17} fontSize="3.5" fill="#34d399" fontFamily="monospace">влажность 45–55%</text>
      {[57,78].map(x => (
        <g key={`aca-${x}`}>
          <rect x={x} y={3} width={13} height={5} rx={1} fill="#34d399" opacity="0.75"/>
          <text x={x+1.5} y={7} fontSize="3.5" fill="#0a1a12" fontFamily="monospace">AC</text>
        </g>
      ))}
      {/* Рабочие места */}
      <rect x={52} y={64} width={46} height={34} rx={2} fill="#34d399" opacity="0.04" stroke="#34d399" strokeWidth={1.5} strokeDasharray="4 4"/>
      <text x={55} y={76} fontSize="3.5" fill="#34d399" fontFamily="monospace">+20…24 °C</text>
    </g>
  ),
  safety: (
    <g opacity="0.88">
      {/* Пожарные датчики — склад */}
      {[10,23,36].map(x => [10,27,47,67,87].map(y => (
        <circle key={`fs-${x}-${y}`} cx={x} cy={y} r={2.5} fill="none" stroke="#f43f5e" strokeWidth={1.5}/>
      )))}
      {/* Пожарные датчики — архив и офис */}
      {[60,74,88].map(x => [10,26,42,72,86,95].map(y => (
        <circle key={`fa-${x}-${y}`} cx={x} cy={y} r={2} fill="none" stroke="#f43f5e" strokeWidth={1.5}/>
      )))}
      {/* Огнетушители */}
      {[3,46,52,97].map(x => [30,70].map(y => (
        <g key={`fe-${x}-${y}`}>
          <rect x={x-2} y={y-4} width={4} height={7} rx={1} fill="#f43f5e" opacity="0.85"/>
          <text x={x-3} y={y+6} fontSize="3" fill="#f43f5e" fontFamily="monospace">ОП</text>
        </g>
      )))}
      {/* Эвакуационные выходы */}
      <text x={4}  y={99} fontSize="4.5" fill="#f43f5e">↓ ВЫХОД</text>
      <text x={54} y={99} fontSize="4.5" fill="#f43f5e">↓ ВЫХОД</text>
      {/* Зона погрузки — штриховка */}
      <rect x={52} y={84} width={46} height={14} rx={1} fill="none" stroke="#f43f5e" strokeWidth={1.5} strokeDasharray="4 2"/>
      <text x={55} y={93} fontSize="3.5" fill="#f43f5e" fontFamily="monospace">ЗОНА ПРИЁМКИ</text>
      {/* Перегородка — противопожарная отметка */}
      <rect x={49} y={2} width={2} height={96} fill="#f43f5e" opacity="0.2"/>
      <text x={49.5} y={50} fontSize="3" fill="#f43f5e" fontFamily="monospace" transform="rotate(-90,49.5,50)">ПП ПЕРЕГОРОДКА</text>
    </g>
  ),
};

const Index = () => {
  const [active, setActive] = useState<string | null>('pipe');
  const [activeLayers, setActiveLayers] = useState<Set<LayerId>>(new Set());
  const activeZone = plan.find((p) => p.id === active);

  const toggleLayer = (id: LayerId) => {
    setActiveLayers(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground grid-bg">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/90 backdrop-blur">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 hazard-stripe rounded-sm" />
            <span className="font-display font-bold text-lg tracking-wider uppercase">
              Склад · Архив
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <a href="#plan" className="hover:text-primary transition-colors">План</a>
            <a href="#scheme" className="hover:text-primary transition-colors">Схема</a>
            <a href="#zones" className="hover:text-primary transition-colors">Зоны</a>
            <a href="#systems" className="hover:text-primary transition-colors">Системы</a>
          </nav>
          <button className="bg-primary text-primary-foreground font-display font-semibold uppercase tracking-wider text-sm px-5 py-2 rounded-sm hover:opacity-90 transition-opacity">
            Запросить смету
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="container pt-16 pb-20" id="plan">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-6 animate-fade-in">
          Дизайн-проект № DP-2026 / Промышленное помещение
        </div>
        <h1 className="font-display font-bold uppercase leading-[0.95] text-5xl md:text-7xl lg:text-8xl mb-8 animate-fade-in">
          Склад труб<br />
          <span className="text-stroke">и двухярусный</span><br />
          архив
        </h1>
        <p className="max-w-xl text-muted-foreground text-lg mb-12 animate-fade-in">
          Промышленное зонирование единого помещения: складская зона для трубной
          продукции и мезонинный архив документации с инженерными системами.
        </p>

        <div className="relative rounded-md overflow-hidden border border-border animate-scale-in">
          <img src={HERO_IMG} alt="Визуализация помещения" className="w-full aspect-[16/8] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-widest bg-primary text-primary-foreground px-3 py-1.5 rounded-sm">
            Изометрический разрез · концепт
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border mt-px border-x border-b border-border rounded-b-md overflow-hidden">
          {specs.map((s) => (
            <div key={s.label} className="metal-plate p-6">
              <div className="font-display font-bold text-4xl text-primary">
                {s.value}
                <span className="text-lg text-muted-foreground ml-1">{s.unit}</span>
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-2">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive plan */}
      <section className="container py-20 border-t border-border" id="scheme">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <h2 className="font-display font-bold uppercase text-4xl md:text-5xl">
            Схема планировки
          </h2>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Вид сверху · слои инженерных систем
          </span>
        </div>

        {/* Layer toggles */}
        <div className="flex flex-wrap gap-2 mb-4">
          {layers.map((l) => {
            const on = activeLayers.has(l.id);
            return (
              <button
                key={l.id}
                onClick={() => toggleLayer(l.id)}
                className={`flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-3 py-2 rounded-sm border transition-all duration-200 ${
                  on
                    ? 'border-transparent text-background font-semibold'
                    : 'border-border text-muted-foreground hover:border-foreground/40'
                }`}
                style={on ? { backgroundColor: l.color } : {}}
              >
                <Icon name={l.icon} size={14} />
                {l.label}
              </button>
            );
          })}
          {activeLayers.size > 0 && (
            <button
              onClick={() => setActiveLayers(new Set())}
              className="font-mono text-xs uppercase tracking-wider px-3 py-2 rounded-sm border border-border text-muted-foreground hover:border-destructive hover:text-destructive transition-colors"
            >
              Скрыть все
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-px bg-border border border-border rounded-md overflow-hidden">
          {/* Plan */}
          <div className="metal-plate p-5 sm:p-8">
            <div className="relative w-full aspect-[4/3] grid-bg border border-border rounded-sm overflow-hidden">
              {/* Zone buttons */}
              {plan.map((z) => {
                const isActive = active === z.id;
                return (
                  <button
                    key={z.id}
                    onMouseEnter={() => setActive(z.id)}
                    onFocus={() => setActive(z.id)}
                    className={`absolute rounded-sm border-2 flex flex-col items-center justify-center text-center p-2 transition-all duration-200 ${
                      isActive
                        ? 'border-primary bg-primary/20 z-10 shadow-[0_0_25px_hsl(var(--primary)/0.5)]'
                        : 'border-border bg-card/60 hover:border-primary/60'
                    }`}
                    style={{
                      left: `${z.x}%`,
                      top: `${z.y}%`,
                      width: `${z.w}%`,
                      height: `${z.h}%`,
                    }}
                  >
                    <Icon
                      name={z.icon}
                      size={22}
                      className={isActive ? 'text-primary' : 'text-muted-foreground'}
                    />
                    <span
                      className={`font-display font-semibold uppercase text-[10px] sm:text-xs tracking-wider mt-1 leading-tight ${
                        isActive ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {z.label}
                    </span>
                  </button>
                );
              })}

              {/* Permanent base SVG: partition wall + labels */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
              >
                {/* Капитальная перегородка по центру */}
                <rect x={49} y={0} width={2} height={100} fill="hsl(30,6%,30%)" />
                <rect x={49.3} y={0} width={1.4} height={100} fill="hsl(30,6%,50%)" opacity="0.4"/>
                {/* Проём-дверь в перегородке */}
                <rect x={49} y={42} width={2} height={16} fill="hsl(30,8%,11%)"/>
                <line x1={49} y1={42} x2={51} y2={50} stroke="#f97316" strokeWidth={0.7} opacity="0.8"/>
                <line x1={49} y1={58} x2={51} y2={50} stroke="#f97316" strokeWidth={0.7} opacity="0.8"/>
                {/* Надписи половин */}
                <text x={24} y={6} fontSize="3.2" fill="hsl(40,15%,50%)" fontFamily="monospace" textAnchor="middle" letterSpacing="1">СКЛАД · ТРУБНАЯ ПРОДУКЦИЯ</text>
                <text x={75} y={6} fontSize="3.2" fill="hsl(40,15%,50%)" fontFamily="monospace" textAnchor="middle" letterSpacing="1">АРХИВ · РАБОЧАЯ ЗОНА</text>
              </svg>

              {/* Engineering layer SVG overlay */}
              {activeLayers.size > 0 && (
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full pointer-events-none z-20"
                >
                  {layers.filter(l => activeLayers.has(l.id)).map(l => (
                    <g key={l.id}>{layerElements[l.id]}</g>
                  ))}
                </svg>
              )}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-4 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 hazard-stripe rounded-[2px] inline-block" />
                840 м² · масштаб условный
              </span>
              {layers.filter(l => activeLayers.has(l.id)).map(l => (
                <span key={l.id} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: l.color }} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div className="metal-plate p-8 flex flex-col">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
              Выбранная зона
            </span>
            {activeZone && (
              <div key={activeZone.id} className="animate-fade-in flex-1 flex flex-col">
                <div className="w-14 h-14 border border-primary rounded-sm flex items-center justify-center text-primary mb-6">
                  <Icon name={activeZone.icon} size={28} />
                </div>
                <h3 className="font-display font-bold uppercase text-2xl mb-2">
                  {activeZone.label}
                </h3>
                <p className="text-muted-foreground mb-8">{activeZone.detail}</p>
                <div className="mt-auto border-t border-border pt-6">
                  <div className="font-display font-bold text-4xl text-primary">
                    {activeZone.area}
                  </div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-1">
                    Площадь зоны
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Zones */}
      <section className="container py-20 border-t border-border" id="zones">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <h2 className="font-display font-bold uppercase text-4xl md:text-5xl">
            Зонирование
          </h2>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            4 функциональные зоны
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border border border-border rounded-md overflow-hidden">
          {zones.map((z) => (
            <div key={z.num} className="metal-plate p-8 group hover:bg-secondary transition-colors">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 border border-primary rounded-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon name={z.icon} size={24} />
                </div>
                <span className="font-display font-bold text-5xl text-border">{z.num}</span>
              </div>
              <h3 className="font-display font-semibold uppercase text-2xl mb-3">{z.title}</h3>
              <p className="text-muted-foreground mb-6">{z.desc}</p>
              <div className="flex flex-wrap gap-2">
                {z.tags.map((t) => (
                  <span key={t} className="font-mono text-xs uppercase tracking-wider border border-border px-2.5 py-1 rounded-sm text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Systems */}
      <section className="container py-20 border-t border-border" id="systems">
        <h2 className="font-display font-bold uppercase text-4xl md:text-5xl mb-3">
          Инженерные системы
        </h2>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-12">
          Климат · Вентиляция · Освещение · Безопасность
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {systems.map((s) => (
            <div key={s.title} className="border border-border rounded-md p-6 hover:border-primary transition-colors">
              <Icon name={s.icon} size={32} className="text-primary mb-5" />
              <h3 className="font-display font-semibold uppercase text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <div className="hazard-stripe rounded-md p-px">
          <div className="bg-card rounded-md p-10 md:p-16 text-center">
            <h2 className="font-display font-bold uppercase text-3xl md:text-5xl mb-4">
              Готовы запустить проект?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Подготовим детальную планировку, спецификацию стеллажного оборудования
              и расчёт инженерных систем под ваше помещение.
            </p>
            <button className="bg-primary text-primary-foreground font-display font-semibold uppercase tracking-wider px-8 py-3 rounded-sm hover:opacity-90 transition-opacity">
              Обсудить проект
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="container py-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span>© 2026 · Промышленные решения хранения</span>
          <span>Дизайн-проект DP-2026</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;