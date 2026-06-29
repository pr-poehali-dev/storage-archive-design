import { useState } from 'react';
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
    desc: 'Консольные стеллажи и металлические коники для горизонтального хранения труб разного диаметра и длины.',
    tags: ['Коники', 'Консольные стеллажи', 'Маркировка ячеек'],
  },
  {
    num: '02',
    icon: 'Library',
    title: 'Двухярусный архив',
    desc: 'Мезонинная конструкция с двумя уровнями стеллажей для коробов и папок. Лестница и подъёмная зона.',
    tags: ['2 яруса', 'Архивные стеллажи', 'Мезонин'],
  },
  {
    num: '03',
    icon: 'Truck',
    title: 'Грузовые проезды',
    desc: 'Размеченные проходы и проезды для погрузчиков с зонированием безопасности и радиусами разворота.',
    tags: ['Проезды', 'Разметка пола', 'Зоны безопасности'],
  },
  {
    num: '04',
    icon: 'DoorOpen',
    title: 'Входная зона и приёмка',
    desc: 'Зона приёма-отправки товара с буферной площадкой, рампой и местом для оформления документов.',
    tags: ['Рампа', 'Буфер', 'Приёмка'],
  },
];

const systems = [
  { icon: 'Lightbulb', title: 'Промышленное освещение', desc: 'LED-панели по сетке потолка с расчётом освещённости для каждой зоны.' },
  { icon: 'Wind', title: 'Промышленная вентиляция', desc: 'Приточно-вытяжная система с воздуховодами по периметру помещения.' },
  { icon: 'Thermometer', title: 'Климат-контроль', desc: 'Поддержание оптимальной температуры и влажности для хранения документов.' },
  { icon: 'ShieldCheck', title: 'Безопасность', desc: 'Пожарная сигнализация, разметка эвакуации и зон погрузки.' },
];

const plan = [
  { id: 'pipe', label: 'Склад труб', icon: 'Cylinder', area: '420 м²', detail: 'Консольные стеллажи + коники', x: 4, y: 4, w: 56, h: 92 },
  { id: 'archive', label: 'Двухярусный архив', icon: 'Library', area: '280 м²', detail: 'Мезонин · 2 уровня стеллажей', x: 64, y: 4, w: 32, h: 60 },
  { id: 'lane', label: 'Грузовой проезд', icon: 'Truck', area: '90 м²', detail: 'Разметка · радиус разворота', x: 64, y: 68, w: 32, h: 16 },
  { id: 'entry', label: 'Вход / Приёмка', icon: 'DoorOpen', area: '50 м²', detail: 'Рампа · буферная зона', x: 64, y: 88, w: 32, h: 8 },
];

const Index = () => {
  const [active, setActive] = useState<string | null>('pipe');
  const activeZone = plan.find((p) => p.id === active);

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
            Вид сверху · наведите на зону
          </span>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-px bg-border border border-border rounded-md overflow-hidden">
          {/* Plan */}
          <div className="metal-plate p-5 sm:p-8">
            <div className="relative w-full aspect-[4/3] grid-bg border border-border rounded-sm">
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
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-4 flex items-center gap-2">
              <span className="w-3 h-3 hazard-stripe rounded-[2px] inline-block" />
              Масштаб условный · 840 м² общая площадь
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