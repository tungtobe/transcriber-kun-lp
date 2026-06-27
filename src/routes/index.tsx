import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import appIcon from "@/assets/app-icon.png.asset.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Transcriberくん — Transcript live & ghi memo họp offline" },
      {
        name: "description",
        content:
          "Transcript trực tiếp từ âm thanh máy tính, ghi 議事録 buổi họp và chạy Whisper AI offline để bảo mật tuyệt đối dữ liệu.",
      },
      { property: "og:title", content: "Transcriberくん — Trợ thủ ghi memo họp" },
      {
        property: "og:description",
        content:
          "Bắt mọi keyword khó khi họp với khách, tạo memo nhanh từ mọi nguồn video (Meet, Teams, offline) — chạy Whisper local, riêng tư 100%.",
      },
      { property: "og:image", content: appIcon.url },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: appIcon.url },
    ],
    links: [
      { rel: "icon", href: appIcon.url, type: "image/png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  component: Landing,
});

function Waveform({ active = true }: { active?: boolean }) {
  const heights = [40, 70, 30, 90, 55, 80, 35, 65, 45, 75, 50, 85, 30, 60];
  return (
    <div className="flex items-end gap-[3px] h-10">
      {heights.map((h, i) => (
        <span
          key={i}
          className={active ? "animate-wave" : ""}
          style={{
            height: `${h}%`,
            width: 3,
            background: "var(--color-accent)",
            borderRadius: 2,
            animationDelay: `${i * 0.07}s`,
          }}
        />
      ))}
    </div>
  );
}

const LIVE_LINES = [
  { s: "EN", t: "Let's align on the Q3 roadmap before deciding on the migration plan." },
  { s: "JP", t: "次のスプリントで認証周りのリファクタを優先したいです。" },
  { s: "VI", t: "Mình nghĩ nên chốt deadline cuối tháng 8 cho phần tích hợp Stripe." },
  { s: "EN", t: "Action item: send the API spec by Friday EOD." },
];

function LiveTranscriptDemo() {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  useEffect(() => {
    const line = LIVE_LINES[idx].t;
    let i = 0;
    setTyped("");
    const id = setInterval(() => {
      i++;
      setTyped(line.slice(0, i));
      if (i >= line.length) {
        clearInterval(id);
        setTimeout(() => setIdx((p) => (p + 1) % LIVE_LINES.length), 1400);
      }
    }, 28);
    return () => clearInterval(id);
  }, [idx]);

  return (
    <div className="rounded-3xl border bg-card shadow-[var(--shadow-glow)] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b bg-secondary/60">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-[oklch(0.65_0.2_25)]" />
          <span className="size-2.5 rounded-full bg-[oklch(0.82_0.16_85)]" />
          <span className="size-2.5 rounded-full bg-[oklch(0.65_0.15_150)]" />
          <span className="ml-3 text-xs font-mono text-muted-foreground">
            transcriber-kun · live session
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-mono text-primary">
            <span className="size-2 rounded-full bg-[oklch(0.65_0.2_25)] animate-pulse" />
            REC 00:14:32
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-dashed">
          <Waveform />
          <div className="flex-1 text-sm text-muted-foreground font-mono">
            âm thanh hệ thống + mic · 16kHz
          </div>
          <span className="text-xs px-2 py-1 rounded-md bg-accent/30 text-accent-foreground font-semibold">
            offline · whisper-large-v3
          </span>
        </div>

        {LIVE_LINES.slice(0, idx).map((l, i) => (
          <TranscriptLine key={i} src={l.s} text={l.t} />
        ))}
        <TranscriptLine src={LIVE_LINES[idx].s} text={typed} live />
      </div>
    </div>
  );
}

function TranscriptLine({ src, text, live }: { src: string; text: string; live?: boolean }) {
  return (
    <div className="flex gap-4">
      <span className="mt-1 text-[10px] font-mono font-bold tracking-wider text-primary border border-primary/30 rounded px-1.5 py-0.5 h-fit">
        {src}
      </span>
      <p className="text-[15px] leading-relaxed text-foreground">
        {text}
        {live && <span className="inline-block w-[2px] h-4 ml-0.5 bg-primary align-middle animate-caret" />}
      </p>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background bg-grain">
      <Header />
      <main>
        <Hero />
        <Trust />
        <Story />
        <Features />
        <HowItWorks />
        <Privacy />
        <Install />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <img src={appIcon.url} alt="" className="size-9 rounded-xl shadow-sm" />
          <span className="font-display font-extrabold tracking-tight text-lg">
            Transcriber<span className="text-primary">くん</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Tính năng</a>
          <a href="#how" className="hover:text-foreground transition">Cách hoạt động</a>
          <a href="#privacy" className="hover:text-foreground transition">Bảo mật</a>
          <a href="#install" className="hover:text-foreground transition">Cài đặt</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <a
          href="#download"
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition shadow-sm"
        >
          Tải về
          <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-mono text-muted-foreground">
            <span className="size-1.5 rounded-full bg-[oklch(0.65_0.2_140)]" />
            v1.0 · macOS · Whisper local
          </span>
          <h1 className="mt-5 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight text-balance">
            Bắt từng <span className="relative inline-block">
              <span className="relative z-10">keyword</span>
              <span className="absolute inset-x-0 bottom-1 h-3 bg-accent/60 -z-0 rounded-sm" />
            </span>,
            <br />
            tạo memo họp <em className="not-italic text-primary">tức thì</em>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            transcriber-kun ghi lại trực tiếp âm thanh máy tính khi bạn họp với khách —
            Meet, Teams, Zoom hay offline — rồi tạo 議事録 chỉ trong vài giây.
            Toàn bộ chạy bằng <strong className="text-foreground">Whisper local</strong>, không upload dữ liệu.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/tungtobe/transcriber-kun-lp/releases/latest/download/Transcriber-kun.dmg"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm font-semibold hover:opacity-90 transition shadow-[var(--shadow-glow)]"
              download
            >
              <DownloadIcon /> Tải cho macOS
            </a>
            <a
              href="https://github.com/tungtobe/transcriber-kun-lp/releases/latest/download/Transcriber-kun_x64_en-US.msi.zip"
              className="inline-flex items-center gap-2 rounded-full border bg-card px-6 py-3.5 text-sm font-semibold hover:bg-secondary transition"
              download
            >
              <DownloadIcon /> Tải cho Windows
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            {[
              { k: "100%", v: "Offline & riêng tư" },
              { k: "<2s", v: "Độ trễ live" },
              { k: "60+", v: "Ngôn ngữ" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="font-display text-3xl font-extrabold text-primary">{s.k}</dt>
                <dd className="text-xs text-muted-foreground mt-1">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 bg-gradient-to-br from-accent/30 via-transparent to-primary/20 blur-3xl -z-10" />
          <LiveTranscriptDemo />
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const items = ["Google Meet", "Microsoft Teams", "Zoom", "Discord", "Họp trực tiếp", "File video/audio"];
  return (
    <section className="border-y bg-surface/60">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Hoạt động với
        </span>
        {items.map((i) => (
          <span key={i} className="text-sm font-semibold text-muted-foreground/80">
            {i}
          </span>
        ))}
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <span className="font-mono text-xs uppercase tracking-widest text-primary">Vì sao có app này</span>
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
          Tôi mệt mỏi với việc mỗi khách họp một chỗ, transcript thì lúc được lúc không.
        </h2>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            Sau mỗi buổi họp online với khách, mình đều phải ghi memo và 議事録. Nhưng khách hàng
            mỗi người dùng một nền tảng — Google Meet, Teams, Zoom, có khi gặp trực tiếp — nguồn
            video lung tung, công cụ transcript có sẵn lúc thì không tải được, lúc thì chất lượng kém.
          </p>
          <p>
            Tệ hơn, khi đang họp live, có những keyword nghiệp vụ mình không bắt kịp — chỉ cần
            "đá hình" một dòng transcript là sẽ theo nhịp được ngay. Vậy nên mình tự xây
            <strong className="text-foreground"> transcriber-kun</strong>: chạy offline bằng Whisper,
            transcript live ngay trên máy, và xuất memo gọn gàng — không phụ thuộc nền tảng nào cả.
          </p>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: <MicIcon />,
      title: "Transcript live ngay khi họp",
      desc: "Đá hình transcript trực tiếp từ âm thanh máy tính + mic, giúp bạn bắt keyword khó và theo nhịp khách hàng.",
      tag: "Live",
    },
    {
      icon: <LockIcon />,
      title: "Tuỳ chọn chạy offline với Whisper local",
      desc: "Bật chế độ offline khi cần — mô hình Whisper chạy hoàn toàn trên máy bạn, không upload, không cloud. Phù hợp dữ liệu khách hàng nhạy cảm.",
      tag: "Optional offline",
    },

    {
      icon: <FileIcon />,
      title: "Memo & 議事録 tự động",
      desc: "Tóm tắt buổi họp, action items, người phụ trách và deadline — xuất Markdown/Notion/Docs trong một cú click.",
      tag: "AI Summary",
    },
    {
      icon: <SourceIcon />,
      title: "Mọi nguồn video, một workflow",
      desc: "Meet, Teams, Zoom, file mp4/m4a, hay ghi âm phòng họp — kéo thả vào là xong, không lệ thuộc nền tảng.",
      tag: "Universal",
    },
    {
      icon: <GlobeIcon />,
      title: "Đa ngôn ngữ, code-switching",
      desc: "Nhận diện tiếng Việt, English, 日本語 trong cùng câu. Tốt cho cuộc họp song ngữ với khách Nhật / global.",
      tag: "60+ langs",
    },


  ];
  return (
    <section id="features" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">Tính năng</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
            Mọi thứ một consultant cần sau buổi họp.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <article
              key={f.title}
              className="group relative rounded-2xl border bg-card p-6 hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition">
                  {f.icon}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-accent/30 text-accent-foreground">
                  {f.tag}
                </span>
              </div>
              <h3 className="mt-5 font-display font-bold text-lg leading-tight">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Bật transcriber-kun trước cuộc họp",
      d: "App tự bắt audio loopback từ Meet / Teams / Zoom — không cần plugin, không cần bot vào phòng.",
    },
    {
      n: "02",
      t: "Đá hình transcript live khi cần",
      d: "Một phím tắt mở overlay nổi, theo nhịp khách hàng, highlight keyword & thuật ngữ nghiệp vụ.",
    },
    {
      n: "03",
      t: "Xuất memo & 議事録 sau cuộc họp",
      d: "Whisper local chạy lại full audio, AI tóm tắt action items rồi export sang Notion / Docs / Markdown.",
    },
  ];
  return (
    <section id="how" className="py-24 bg-surface border-y">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">Workflow</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
            Ba bước, không thay đổi thói quen họp của bạn.
          </h2>
        </div>
        <ol className="mt-14 grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <li key={s.n} className="relative rounded-2xl border bg-card p-7">
              <div className="font-mono text-sm text-accent-foreground bg-accent inline-block px-2 py-0.5 rounded">
                {s.n}
              </div>
              <h3 className="mt-4 font-display font-bold text-xl">{s.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Privacy() {
  return (
    <section id="privacy" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-3xl border bg-primary text-primary-foreground p-10 md:p-14 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 size-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-10 items-start">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                Bảo mật là mặc định · Chế độ offline
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
                File ghi âm của khách hàng không bao giờ rời khỏi máy bạn.
              </h2>
              <p className="mt-5 text-primary-foreground/80 leading-relaxed">
                Khi transcript <strong className="text-accent">file offline</strong> (video họp đã ghi,
                audio export từ Meet / Teams / Zoom), transcriber-kun chạy Whisper hoàn toàn local.
                Không server, không telemetry, không API key — rút mạng app vẫn hoạt động,
                kiểm chứng được bằng Little Snitch / Lulu.
              </p>
              <p className="mt-4 text-sm text-primary-foreground/60 leading-relaxed">
                * Chế độ <strong className="text-primary-foreground/90">live transcript</strong> dùng
                engine streaming riêng để đảm bảo độ trễ thấp, không áp dụng các cam kết offline
                bên dưới. Bạn có thể chọn engine local hoặc cloud tuỳ buổi họp.
              </p>
            </div>
            <ul className="space-y-3">
              <li className="text-xs font-mono uppercase tracking-widest text-accent/80 pb-1">
                Áp dụng cho transcript file offline
              </li>
              {[
                "Không gửi audio lên cloud",
                "Không lưu transcript trên server",
                "Mã hoá file local bằng macOS Keychain",
                "Mã nguồn engine: open & auditable",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm">
                  <CheckIcon />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const qa = [
    {
      q: "App có thực sự chạy offline không?",
      a: "Có. Mô hình Whisper được đóng gói sẵn, sau lần tải đầu tiên bạn có thể rút mạng hoàn toàn. Không có endpoint nào được gọi trong runtime khi transcribe. Nhớ setting trong cài đặt là 'Local' để đảm bảo.",
    },
    {
      q: "Hỗ trợ Windows không?",
      a: "Có. Nhưng ko chắc là chạy ổn được trên mọi cấu hình. Mình chỉ test trên mac thôi.",
    },
    {
      q: "Có capture được audio của Google Meet / Teams không?",
      a: "Có. App dùng audio loopback ở mức hệ thống nên capture mọi nguồn — không cần cài plugin riêng cho từng nền tảng.",
    },
    {
      q: "Transcript tiếng Việt, Nhật có chính xác không?",
      a: "Nếu chạy local, chọn Whisper large thì chính xác hơn nhưng sẽ nặng và lâu hơn. Nếu chạy online với Gemini, accuracy sẽ cao hơn nhưng cần setup API key trước.",
    },
    {
      q: "Có miễn phí không?",
      a: "Free dùng vô thời hạn cho anh chị em thiện lành.",
    },
  ];
  return (
    <section id="faq" className="py-24 bg-surface border-y">
      <div className="max-w-3xl mx-auto px-6">
        <span className="font-mono text-xs uppercase tracking-widest text-primary">FAQ</span>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight">Câu hỏi thường gặp</h2>
        <div className="mt-10 divide-y border-y">
          {qa.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex items-center justify-between cursor-pointer list-none gap-6">
                <span className="font-semibold text-foreground">{item.q}</span>
                <span className="size-7 rounded-full border flex items-center justify-center text-muted-foreground group-open:rotate-45 transition shrink-0">
                  +
                </span>
              </summary>
              <p className="mt-3 text-muted-foreground leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="download" className="py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <img src={appIcon.url} alt="" className="mx-auto size-20 rounded-2xl shadow-lg" />
        <h2 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
          Sẵn sàng không bỏ lỡ keyword nào nữa?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Tải transcriber-kun, dùng miễn phí cho buổi họp đầu tiên — không cần đăng ký.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://github.com/tungtobe/transcriber-kun-lp/releases/latest/download/Transcriber-kun.dmg"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-4 text-sm font-semibold hover:opacity-90 transition shadow-[var(--shadow-glow)]"
            download
          >
            <DownloadIcon /> Tải cho macOS
          </a>
          <a
            href="https://github.com/tungtobe/transcriber-kun-lp/releases/latest/download/Transcriber-kun_x64_en-US.msi.zip"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-7 py-4 text-sm font-semibold hover:bg-secondary transition"
            download
          >
            <DownloadIcon /> Tải cho Windows
          </a>
        </div>
        <p className="mt-5 text-xs font-mono text-muted-foreground">
          v1.0.0 · macOS 12+ · Windows 10+ · 480MB (kèm Whisper large-v3)
        </p>
      </div>
    </section>
  );
}

function Install() {
  return (
    <section id="install" className="py-24 bg-surface border-y">
      <div className="max-w-3xl mx-auto px-6">
        <span className="font-mono text-xs uppercase tracking-widest text-primary">Cài đặt</span>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight">Hướng dẫn cài đặt</h2>
        <p className="mt-3 text-muted-foreground">
          Cài đặt transcriber-kun trên macOS và Windows chỉ trong vài bước đơn giản.
        </p>

        {/* Security notice */}
        <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex gap-3">
          <ShieldAlertIcon />
          <div>
            <p className="text-sm font-semibold text-foreground">Lưu ý quan trọng</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Ứng dụng <strong>chưa được ký chứng chỉ bảo mật (code signing)</strong>, vì vậy hệ điều hành có thể hiển thị cảnh báo an toàn.
              Đây là hành vi <strong>bình thường</strong> đối với các ứng dụng chưa phát hành chính thức.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="macos" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger value="macos" className="flex items-center gap-2 text-sm font-semibold">
                <AppleIcon /> macOS
              </TabsTrigger>
              <TabsTrigger value="windows" className="flex items-center gap-2 text-sm font-semibold">
                <WindowsIcon /> Windows
              </TabsTrigger>
            </TabsList>

            {/* macOS Tab */}
            <TabsContent value="macos" className="mt-6 space-y-4">
              <InstallStep step={1} title="Tải file cài đặt">
                <p className="text-sm text-muted-foreground">
                  Tải file: <code className="rounded bg-muted px-2 py-0.5 text-xs font-mono text-foreground">Transcriber-kun.dmg</code>
                </p>
              </InstallStep>

              <InstallStep step={2} title="Mở file DMG">
                <ol className="space-y-1.5">
                  <InstallStepItem>Double-click vào file <code className="rounded bg-muted px-2 py-0.5 text-xs font-mono text-foreground">Transcriber-kun.dmg</code></InstallStepItem>
                  <InstallStepItem>Một cửa sổ cài đặt sẽ hiện ra</InstallStepItem>
                  <InstallStepItem>Kéo biểu tượng <strong>Transcriber-kun.app</strong> vào thư mục <strong>Applications</strong></InstallStepItem>
                </ol>
              </InstallStep>

              <InstallStep step={3} title="Cảnh báo bảo mật có thể gặp">
                <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground italic">
                  "Transcriber-kun.app cannot be opened because it is from an unidentified developer"
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Đây là cảnh báo mặc định do ứng dụng chưa được ký chứng chỉ bảo mật.
                </p>
              </InstallStep>

              <InstallStep step={4} title="Cách cho phép mở ứng dụng">
                <div className="space-y-5">
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-2">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-xs font-bold text-primary mr-2">1</span>
                      Mở bằng chuột phải (đơn giản &amp; an toàn nhất)
                    </h5>
                    <ol className="space-y-1.5 ml-7">
                      <InstallStepItem>Mở <strong>Applications</strong></InstallStepItem>
                      <InstallStepItem>Chuột phải vào <strong>Transcriber-kun.app</strong></InstallStepItem>
                      <InstallStepItem>Chọn <strong>Open</strong></InstallStepItem>
                      <InstallStepItem>Khi hộp thoại cảnh báo hiện ra → chọn <strong>Open</strong></InstallStepItem>
                    </ol>
                    <p className="mt-2 ml-7 text-xs text-primary font-medium">
                      ➡️ Sau thao tác này, ứng dụng sẽ mở bình thường ở các lần sau.
                    </p>
                  </div>

                  <div className="border-t border-border" />

                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-2">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-xs font-bold text-primary mr-2">2</span>
                      Cho phép trong System Settings
                    </h5>
                    <ol className="space-y-1.5 ml-7">
                      <InstallStepItem>Mở <strong>System Settings</strong></InstallStepItem>
                      <InstallStepItem>Vào <strong>Privacy &amp; Security</strong></InstallStepItem>
                      <InstallStepItem>Kéo xuống phần <strong>Security</strong></InstallStepItem>
                      <InstallStepItem>Tại thông báo chặn ứng dụng → bấm <strong>Allow Anyway</strong></InstallStepItem>
                      <InstallStepItem>Mở lại ứng dụng từ <strong>Applications</strong></InstallStepItem>
                    </ol>
                  </div>

                  <div className="border-t border-border" />

                  <div>
                    <h5 className="text-sm font-semibold text-muted-foreground mb-2">
                      Tuỳ chọn nâng cao (dành cho người dùng kỹ thuật)
                    </h5>
                    <p className="text-sm text-muted-foreground mb-2 ml-6">Mở Terminal và chạy lệnh:</p>
                    <div className="ml-6 rounded-lg bg-[hsl(220,20%,12%)] p-4 overflow-x-auto">
                      <code className="text-sm font-mono text-[hsl(140,60%,70%)]">
                        xattr -rd com.apple.quarantine /Applications/Transcriber-kun.app
                      </code>
                    </div>
                  </div>
                </div>
              </InstallStep>
            </TabsContent>

            {/* Windows Tab */}
            <TabsContent value="windows" className="mt-6 space-y-4">
              <InstallStep step={1} title="Tải file cài đặt">
                <p className="text-sm text-muted-foreground">
                  Tải file: <code className="rounded bg-muted px-2 py-0.5 text-xs font-mono text-foreground">Transcriber-kun_x64_en-US.msi.zip</code>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Giải nén file zip để lấy file <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">.msi</code> rồi chạy cài đặt.</p>
              </InstallStep>

              <InstallStep step={2} title="Cảnh báo bảo mật có thể gặp">
                <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground italic">
                  "Windows protected your PC"
                </div>
              </InstallStep>

              <InstallStep step={3} title="Cách cho phép cài đặt">
                <ol className="space-y-1.5">
                  <InstallStepItem>Click <strong>More info</strong></InstallStepItem>
                  <InstallStepItem>Click <strong>Run anyway</strong></InstallStepItem>
                  <InstallStepItem>Tiếp tục quá trình cài đặt như bình thường</InstallStepItem>
                </ol>
              </InstallStep>

              <InstallStep step={4} title="Trường hợp bị chặn tải trên trình duyệt">
                <p className="text-sm text-muted-foreground mb-2">
                  Chrome / Edge có thể hiển thị cảnh báo khi tải file.
                </p>
                <ol className="space-y-1.5">
                  <InstallStepItem>Chọn <strong>Keep</strong> hoặc <strong>Keep anyway</strong> để tiếp tục tải</InstallStepItem>
                </ol>
              </InstallStep>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

function InstallStep({ step, title, children }: { step: number; title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
          {step}
        </div>
        <h4 className="font-semibold text-card-foreground">{title}</h4>
      </div>
      <div className="ml-12">{children}</div>
    </div>
  );
}

function InstallStepItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-muted-foreground">
      <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2.5">
          <img src={appIcon.url} alt="" className="size-7 rounded-md" />
          <span className="font-display font-bold text-foreground">transcriber-kun</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Changelog</a>
          <a href="mailto:hello@transcriber-kun.app" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}

/* --- Inline icons (no extra deps) --- */
function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" />
    </svg>
  );
}
function MicIcon() {
  return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2"/><path d="M12 19v3"/></svg>);
}
function LockIcon() {
  return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>);
}
function FileIcon() {
  return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M8 13h8M8 17h6"/></svg>);
}
function SourceIcon() {
  return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="m10 9 5 3-5 3z" fill="currentColor"/></svg>);
}
function GlobeIcon() {
  return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>);
}
function BoltIcon() {
  return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>);
}
function ShieldAlertIcon() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/>
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.15-2.18 1.27-2.16 3.8.03 3.02 2.65 4.03 2.68 4.04l-.07.28zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}
function WindowsIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 12V6.75l6-1.032V12H3zm0 .75h6v6.282L3 17.998V12.75zm7 .75v6.6l10 1.65V13.5H10zm0-8.1V12h10V2.7L10 5.4z"/>
    </svg>
  );
}
function CheckIcon() {
  return (
    <span className="mt-0.5 size-5 shrink-0 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5 9-11"/></svg>
    </span>
  );
}
