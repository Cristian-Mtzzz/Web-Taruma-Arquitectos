"use client";

import { useState, useTransition } from "react";
import { sendQuote } from "@/app/actions/email";
import { quoteOptions, quoteTimeline } from "@/data/editorial";
import { site } from "@/data/site";
import f from "./Form.module.css";
import styles from "./QuoteWizard.module.css";

const STEPS = [
  { name: "El proyecto", hint: "Tipo, servicio y ubicación" },
  { name: "El alcance", hint: "Área, niveles, presupuesto y plazo" },
  { name: "Sus datos", hint: "Contacto y disponibilidad" },
];

type State = {
  tipos: string[];
  servicio: string;
  ubicacion: string;
  area: string;
  niveles: string;
  presupuesto: number;
  plazo: string;
  extras: string[];
  descripcion: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  fuente: string;
  disponibilidad: string;
};

/* Rango del deslizador de presupuesto, en lempiras. Son cifras redondas
   pensadas para obra en Honduras, no la conversión de los topes que había en
   dólares. Va declarado antes de `initial`, que lo usa. */
const PRESUPUESTO = {
  min: 20_000,
  max: 300_000,
  paso: 5_000,
  inicial: 100_000,
};

const initial: State = {
  tipos: [],
  servicio: "",
  ubicacion: "",
  area: "",
  niveles: "",
  presupuesto: PRESUPUESTO.inicial,
  plazo: "",
  extras: [],
  descripcion: "",
  nombre: "",
  apellido: "",
  correo: "",
  telefono: "",
  fuente: "",
  disponibilidad: "",
};

/* Todo el dinero del sitio va en lempiras hondureños.
   Intl con es-HN da "L 1,500,000" sin decimales. */
const money = (n: number) =>
  new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency: "HNL",
    maximumFractionDigits: 0,
  }).format(n);

/* En el tope el deslizador deja de ser una cifra exacta y pasa a significar
   "esto o más", así que se dice con palabras y no solo con un signo: en el
   correo de la solicitud tiene que quedar sin ambigüedad. */
const presupuestoTexto = (n: number) =>
  n >= PRESUPUESTO.max ? `Más de ${money(PRESUPUESTO.max)}` : money(n);

export default function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<State>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [trampa, setTrampa] = useState("");
  const [failure, setFailure] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof State>(key: K, value: State[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const toggle = (key: "tipos" | "extras", value: string) => {
    setData((d) => ({
      ...d,
      [key]: d[key].includes(value)
        ? d[key].filter((v) => v !== value)
        : [...d[key], value],
    }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validateStep = (index: number) => {
    const next: Record<string, string> = {};
    if (index === 0) {
      if (data.tipos.length === 0)
        next.tipos = "Seleccione al menos un tipo de proyecto.";
      if (!data.servicio) next.servicio = "Indique el servicio que necesita.";
      if (!data.ubicacion) next.ubicacion = "Indique dónde está el proyecto.";
    }
    if (index === 2) {
      if (!data.nombre.trim()) next.nombre = "Escriba su nombre.";
      if (!data.apellido.trim()) next.apellido = "Escriba su apellido.";
      if (!data.correo.trim()) {
        next.correo = "Escriba su correo electrónico.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.correo.trim())) {
        next.correo = "Ese correo no parece válido. Revise el formato.";
      }
      if (!data.telefono.trim())
        next.telefono = "Escriba un teléfono o WhatsApp de contacto.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goTo = (index: number) => {
    if (index > step && !validateStep(step)) return;
    setStep(index);
    window.scrollTo({ top: 220, behavior: "smooth" });
  };

  const submit = () => {
    if (!validateStep(2)) return;
    startTransition(async () => {
      const result = await sendQuote({
        tipos: data.tipos,
        servicio: data.servicio,
        ubicacion: data.ubicacion,
        area: data.area ? `${data.area} m²` : "",
        niveles: data.niveles,
        presupuesto: presupuestoTexto(data.presupuesto),
        plazo: data.plazo,
        extras: data.extras,
        descripcion: data.descripcion,
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        telefono: data.telefono,
        fuente: data.fuente,
        disponibilidad: data.disponibilidad,
        trampa,
      });
      if (result.ok) {
        setSent(true);
        window.scrollTo({ top: 220, behavior: "smooth" });
      } else {
        setFailure(result.error);
      }
    });
  };

  if (sent) {
    return (
      <div className={f.success} role="status">
        <h2 className={f.successTitle}>Solicitud enviada</h2>
        <p className={f.successText}>
          Gracias, {data.nombre}. Esto es lo que sigue con su solicitud de
          cotización.
        </p>
        <dl className={f.successSteps}>
          {quoteTimeline.map((item) => (
            <div key={item.step} className={f.successStep}>
              <dt>
                {item.step} — {item.when}
              </dt>
              <dd>{item.text}</dd>
            </div>
          ))}
        </dl>
        <div className={f.successActions}>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => {
              setData(initial);
              setStep(0);
              setSent(false);
            }}
          >
            Hacer otra solicitud
          </button>
        </div>
        <p className={f.note}>
          Si necesita agregar algo, escríbanos a {site.email} citando su
          nombre.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      {/* Indicador de pasos */}
      <nav className={styles.rail} aria-label="Pasos de la cotización">
        <ol className={styles.railList}>
          {STEPS.map((item, i) => (
            <li key={item.name} className={styles.railItem}>
              <button
                type="button"
                className={`${styles.railBtn} ${
                  i === step ? styles.railCurrent : ""
                } ${i < step ? styles.railDone : ""}`}
                onClick={() => goTo(i)}
                disabled={i > step}
                aria-current={i === step ? "step" : undefined}
              >
                <span className={styles.railNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.railName}>
                  {item.name}
                  <span className={styles.railHint}>{item.hint}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div className={styles.progress}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
          <span className={styles.progressLabel}>
            Paso {step + 1} de {STEPS.length}
          </span>
        </div>
      </nav>

      {/* Panel activo */}
      <form
        className={styles.panel}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        {step === 0 && (
          <>
            <h2 className={styles.panelTitle}>Háblenos de su proyecto</h2>
            <p className={styles.panelSub}>
              Con esto sabemos a quién del equipo asignarle la consulta. Puede
              marcar más de un tipo si el proyecto es mixto.
            </p>

            <div className={f.field}>
              <span className={f.label}>Tipo de proyecto</span>
              <div className={f.optionGrid}>
                {quoteOptions.types.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`${f.option} ${
                      data.tipos.includes(type) ? f.optionActive : ""
                    }`}
                    onClick={() => toggle("tipos", type)}
                    aria-pressed={data.tipos.includes(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.tipos && <span className={f.error}>{errors.tipos}</span>}
            </div>

            <div className={f.field}>
              <label className={f.label} htmlFor="q-servicio">
                Servicio que necesita
              </label>
              <select
                id="q-servicio"
                className={f.control}
                value={data.servicio}
                onChange={(e) => set("servicio", e.target.value)}
                aria-invalid={Boolean(errors.servicio)}
              >
                <option value="">Seleccione</option>
                {quoteOptions.services.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              {errors.servicio && (
                <span className={f.error}>{errors.servicio}</span>
              )}
            </div>

            <div className={f.field}>
              <label className={f.label} htmlFor="q-ubicacion">
                Ubicación del proyecto
              </label>
              <select
                id="q-ubicacion"
                className={f.control}
                value={data.ubicacion}
                onChange={(e) => set("ubicacion", e.target.value)}
                aria-invalid={Boolean(errors.ubicacion)}
              >
                <option value="">Seleccione</option>
                {quoteOptions.locations.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              {errors.ubicacion && (
                <span className={f.error}>{errors.ubicacion}</span>
              )}
            </div>

            <div className={f.actions}>
              <span className={f.hint}>
                La consulta inicial es gratuita y sin compromiso.
              </span>
              <button
                type="button"
                className="btn btn-solid"
                onClick={() => goTo(1)}
              >
                Continuar al alcance
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className={styles.panelTitle}>Alcance y presupuesto</h2>
            <p className={styles.panelSub}>
              Los números aproximados nos sirven. Si todavía no los tiene,
              déjelos en blanco y los definimos en la reunión.
            </p>

            <div className={f.row}>
              <div className={f.field}>
                <label className={f.label} htmlFor="q-area">
                  Área estimada en m²{" "}
                  <span className={f.optional}>(opcional)</span>
                </label>
                <input
                  id="q-area"
                  type="number"
                  min="0"
                  className={f.control}
                  value={data.area}
                  onChange={(e) => set("area", e.target.value)}
                  placeholder="Por ejemplo: 120"
                />
              </div>

              <div className={f.field}>
                <label className={f.label} htmlFor="q-niveles">
                  Número de niveles{" "}
                  <span className={f.optional}>(opcional)</span>
                </label>
                <select
                  id="q-niveles"
                  className={f.control}
                  value={data.niveles}
                  onChange={(e) => set("niveles", e.target.value)}
                >
                  <option value="">Seleccione</option>
                  {quoteOptions.levels.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={f.field}>
              <div className={f.rangeHead}>
                <label className={f.label} htmlFor="q-presupuesto">
                  Presupuesto estimado
                </label>
                <span className={f.rangeValue}>
                  {presupuestoTexto(data.presupuesto)}
                </span>
              </div>
              <input
                id="q-presupuesto"
                type="range"
                className={f.range}
                min={PRESUPUESTO.min}
                max={PRESUPUESTO.max}
                step={PRESUPUESTO.paso}
                value={data.presupuesto}
                onChange={(e) => set("presupuesto", Number(e.target.value))}
              />
              <div className={f.rangeScale}>
                <span>{money(PRESUPUESTO.min)}</span>
                <span>{money(PRESUPUESTO.max)}+</span>
              </div>
              <span className={f.hint}>
                Es solo una referencia para dimensionar la propuesta. No es un
                compromiso.
              </span>
            </div>

            <div className={f.field}>
              <label className={f.label} htmlFor="q-plazo">
                Plazo deseado <span className={f.optional}>(opcional)</span>
              </label>
              <select
                id="q-plazo"
                className={f.control}
                value={data.plazo}
                onChange={(e) => set("plazo", e.target.value)}
              >
                <option value="">Seleccione</option>
                {quoteOptions.deadlines.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div className={f.field}>
              <span className={f.label}>
                Servicios adicionales de interés{" "}
                <span className={f.optional}>(opcional)</span>
              </span>
              <div className={f.checks}>
                {quoteOptions.extras.map((extra) => (
                  <label key={extra} className={f.check}>
                    <input
                      type="checkbox"
                      checked={data.extras.includes(extra)}
                      onChange={() => toggle("extras", extra)}
                    />
                    <span>{extra}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={f.field}>
              <label className={f.label} htmlFor="q-descripcion">
                Descripción del proyecto{" "}
                <span className={f.optional}>(opcional)</span>
              </label>
              <textarea
                id="q-descripcion"
                className={f.control}
                value={data.descripcion}
                onChange={(e) => set("descripcion", e.target.value)}
                placeholder="Indique el alcance, el tipo de espacio y cualquier detalle relevante del terreno."
              />
            </div>

            <div className={f.actions}>
              <button
                type="button"
                className="btn btn-line"
                onClick={() => goTo(0)}
              >
                Volver al proyecto
              </button>
              <button
                type="button"
                className="btn btn-solid"
                onClick={() => goTo(2)}
              >
                Continuar a sus datos
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className={styles.panelTitle}>Cómo lo contactamos</h2>
            <p className={styles.panelSub}>
              El arquitecto responsable le escribe en menos de 48 horas
              hábiles.
            </p>

            <div className={f.row}>
              <div className={f.field}>
                <label className={f.label} htmlFor="q-nombre">
                  Nombre
                </label>
                <input
                  id="q-nombre"
                  className={f.control}
                  value={data.nombre}
                  onChange={(e) => set("nombre", e.target.value)}
                  aria-invalid={Boolean(errors.nombre)}
                  autoComplete="given-name"
                />
                {errors.nombre && (
                  <span className={f.error}>{errors.nombre}</span>
                )}
              </div>

              <div className={f.field}>
                <label className={f.label} htmlFor="q-apellido">
                  Apellido
                </label>
                <input
                  id="q-apellido"
                  className={f.control}
                  value={data.apellido}
                  onChange={(e) => set("apellido", e.target.value)}
                  aria-invalid={Boolean(errors.apellido)}
                  autoComplete="family-name"
                />
                {errors.apellido && (
                  <span className={f.error}>{errors.apellido}</span>
                )}
              </div>
            </div>

            <div className={f.row}>
              <div className={f.field}>
                <label className={f.label} htmlFor="q-correo">
                  Correo electrónico
                </label>
                <input
                  id="q-correo"
                  type="email"
                  className={f.control}
                  value={data.correo}
                  onChange={(e) => set("correo", e.target.value)}
                  aria-invalid={Boolean(errors.correo)}
                  autoComplete="email"
                />
                {errors.correo && (
                  <span className={f.error}>{errors.correo}</span>
                )}
              </div>

              <div className={f.field}>
                <label className={f.label} htmlFor="q-telefono">
                  Teléfono o WhatsApp
                </label>
                <input
                  id="q-telefono"
                  type="tel"
                  className={f.control}
                  value={data.telefono}
                  onChange={(e) => set("telefono", e.target.value)}
                  placeholder="+504 0000-0000"
                  aria-invalid={Boolean(errors.telefono)}
                  autoComplete="tel"
                />
                {errors.telefono && (
                  <span className={f.error}>{errors.telefono}</span>
                )}
              </div>
            </div>

            <div className={f.row}>
              <div className={f.field}>
                <label className={f.label} htmlFor="q-disponibilidad">
                  Disponibilidad para la reunión{" "}
                  <span className={f.optional}>(opcional)</span>
                </label>
                <select
                  id="q-disponibilidad"
                  className={f.control}
                  value={data.disponibilidad}
                  onChange={(e) => set("disponibilidad", e.target.value)}
                >
                  <option value="">Seleccione</option>
                  {quoteOptions.availability.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div className={f.field}>
                <label className={f.label} htmlFor="q-fuente">
                  ¿Cómo nos conoció?{" "}
                  <span className={f.optional}>(opcional)</span>
                </label>
                <select
                  id="q-fuente"
                  className={f.control}
                  value={data.fuente}
                  onChange={(e) => set("fuente", e.target.value)}
                >
                  <option value="">Seleccione</option>
                  {quoteOptions.sources.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Resumen de lo capturado */}
            <div className={styles.summary}>
              <p className={styles.summaryTitle}>Resumen de su solicitud</p>
              <dl>
                <div className={styles.summaryRow}>
                  <dt>Tipo de proyecto</dt>
                  <dd>{data.tipos.join(", ") || "Sin especificar"}</dd>
                </div>
                <div className={styles.summaryRow}>
                  <dt>Servicio</dt>
                  <dd>{data.servicio || "Sin especificar"}</dd>
                </div>
                <div className={styles.summaryRow}>
                  <dt>Ubicación</dt>
                  <dd>{data.ubicacion || "Sin especificar"}</dd>
                </div>
                <div className={styles.summaryRow}>
                  <dt>Área</dt>
                  <dd>{data.area ? `${data.area} m²` : "Sin especificar"}</dd>
                </div>
                <div className={styles.summaryRow}>
                  <dt>Presupuesto</dt>
                  <dd>{presupuestoTexto(data.presupuesto)}</dd>
                </div>
                <div className={styles.summaryRow}>
                  <dt>Plazo</dt>
                  <dd>{data.plazo || "Sin especificar"}</dd>
                </div>
              </dl>
            </div>

            {/* Señuelo para bots: invisible y fuera del recorrido de teclado */}
            <div aria-hidden="true" className="sr-only">
              <label htmlFor="q-sitio">No complete este campo</label>
              <input
                id="q-sitio"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={trampa}
                onChange={(e) => setTrampa(e.target.value)}
              />
            </div>

            {failure && (
              <p
                className={f.error}
                role="alert"
                style={{ marginBottom: "1rem" }}
              >
                {failure}
              </p>
            )}

            <div className={f.actions}>
              <button
                type="button"
                className="btn btn-line"
                onClick={() => goTo(1)}
                disabled={pending}
              >
                Volver al alcance
              </button>
              <button
                type="submit"
                className="btn btn-accent"
                disabled={pending}
              >
                {pending ? "Enviando…" : "Enviar solicitud"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
