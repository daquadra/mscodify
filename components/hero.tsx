export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 pt-16 md:pb-24 md:pt-28">
      <h1 className="rise max-w-4xl text-[clamp(2.75rem,8.5vw,6.5rem)] font-extrabold leading-[0.95] tracking-tight">
        Pequenos produtos web que resolvem{" "}
        <span className="text-primary underline decoration-wavy decoration-[0.06em] underline-offset-[0.12em]">
          uma coisa bem.
        </span>
      </h1>
      <p
        className="rise mt-8 max-w-md text-xl leading-snug text-muted-foreground"
        style={{ "--i": 1 } as React.CSSProperties}
      >
        Ferramentas para usar hoje, direto no navegador. Escolha uma e abra.
      </p>
    </section>
  );
}
