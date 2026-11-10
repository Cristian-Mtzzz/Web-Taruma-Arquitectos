import Link from "next/link";

type Props = {
  title: string;
  lede?: string;
  children?: React.ReactNode;
};

export default function PageHeader({ title, lede, children }: Props) {
  return (
    <header className="pagehead">
      <div className="gridlines" aria-hidden="true" />
      <div className="shell" style={{ position: "relative" }}>
        <nav className="pagehead-crumb" aria-label="Ruta de navegación">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <span>{title}</span>
        </nav>
        <h1 className="display pagehead-title">{title}</h1>
        {lede && <p className="lede pagehead-lede">{lede}</p>}
        {children}
      </div>
    </header>
  );
}
