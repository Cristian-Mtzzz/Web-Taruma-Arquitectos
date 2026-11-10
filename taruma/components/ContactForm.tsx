"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { sendContact } from "@/app/actions/email";
import { contactReasons } from "@/data/editorial";
import { site } from "@/data/site";
import f from "./Form.module.css";

type Fields = {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  motivo: string;
  mensaje: string;
};

const empty: Fields = {
  nombre: "",
  apellido: "",
  correo: "",
  telefono: "",
  motivo: "",
  mensaje: "",
};

export default function ContactForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [trampa, setTrampa] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {}
  );
  const [failure, setFailure] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();

  const set = (key: keyof Fields) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setFailure("");
  };

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!values.nombre.trim()) next.nombre = "Escriba su nombre.";
    if (!values.apellido.trim()) next.apellido = "Escriba su apellido.";
    if (!values.correo.trim()) {
      next.correo = "Escriba su correo electrónico.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.correo.trim())) {
      next.correo = "Ese correo no parece válido. Revise el formato.";
    }
    if (!values.mensaje.trim()) {
      next.mensaje = "Cuéntenos brevemente en qué podemos ayudarle.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    startTransition(async () => {
      const result = await sendContact({ ...values, trampa });
      if (result.ok) {
        setSent(true);
      } else {
        setFailure(result.error);
      }
    });
  };

  if (sent) {
    return (
      <div className={f.success} role="status">
        <h2 className={f.successTitle}>Mensaje enviado</h2>
        <p className={f.successText}>
          Gracias, {values.nombre}. Recibimos su consulta y le responderemos al
          correo {values.correo}.
        </p>
        <dl className={f.successSteps}>
          <div className={f.successStep}>
            <dt>Respuesta</dt>
            <dd>Menos de 24 horas hábiles</dd>
          </div>
          <div className={f.successStep}>
            <dt>Siguiente paso</dt>
            <dd>
              Le contactamos para agendar la consulta inicial, que es gratuita y
              sin compromiso.
            </dd>
          </div>
        </dl>
        <div className={f.successActions}>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => {
              setValues(empty);
              setSent(false);
            }}
          >
            Escribir otro mensaje
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <div className={f.row}>
        <div className={f.field}>
          <label className={f.label} htmlFor="c-nombre">
            Nombre
          </label>
          <input
            id="c-nombre"
            className={f.control}
            value={values.nombre}
            onChange={(e) => set("nombre")(e.target.value)}
            aria-invalid={Boolean(errors.nombre)}
            aria-describedby={errors.nombre ? "c-nombre-error" : undefined}
            autoComplete="given-name"
          />
          {errors.nombre && (
            <span id="c-nombre-error" className={f.error}>
              {errors.nombre}
            </span>
          )}
        </div>

        <div className={f.field}>
          <label className={f.label} htmlFor="c-apellido">
            Apellido
          </label>
          <input
            id="c-apellido"
            className={f.control}
            value={values.apellido}
            onChange={(e) => set("apellido")(e.target.value)}
            aria-invalid={Boolean(errors.apellido)}
            aria-describedby={errors.apellido ? "c-apellido-error" : undefined}
            autoComplete="family-name"
          />
          {errors.apellido && (
            <span id="c-apellido-error" className={f.error}>
              {errors.apellido}
            </span>
          )}
        </div>
      </div>

      <div className={f.row}>
        <div className={f.field}>
          <label className={f.label} htmlFor="c-correo">
            Correo electrónico
          </label>
          <input
            id="c-correo"
            type="email"
            className={f.control}
            value={values.correo}
            onChange={(e) => set("correo")(e.target.value)}
            aria-invalid={Boolean(errors.correo)}
            aria-describedby={errors.correo ? "c-correo-error" : undefined}
            autoComplete="email"
          />
          {errors.correo && (
            <span id="c-correo-error" className={f.error}>
              {errors.correo}
            </span>
          )}
        </div>

        <div className={f.field}>
          <label className={f.label} htmlFor="c-telefono">
            Teléfono <span className={f.optional}>(opcional)</span>
          </label>
          <input
            id="c-telefono"
            type="tel"
            className={f.control}
            value={values.telefono}
            onChange={(e) => set("telefono")(e.target.value)}
            placeholder="+504 0000-0000"
            autoComplete="tel"
          />
        </div>
      </div>

      <div className={f.field}>
        <label className={f.label} htmlFor="c-motivo">
          Motivo de contacto <span className={f.optional}>(opcional)</span>
        </label>
        <select
          id="c-motivo"
          className={f.control}
          value={values.motivo}
          onChange={(e) => set("motivo")(e.target.value)}
        >
          <option value="">Seleccione una opción</option>
          {contactReasons.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </select>
      </div>

      <div className={f.field}>
        <label className={f.label} htmlFor="c-mensaje">
          Mensaje
        </label>
        <textarea
          id="c-mensaje"
          className={f.control}
          value={values.mensaje}
          onChange={(e) => set("mensaje")(e.target.value)}
          placeholder="Cuéntenos qué necesita, dónde está el proyecto y en qué etapa se encuentra."
          aria-invalid={Boolean(errors.mensaje)}
          aria-describedby={errors.mensaje ? "c-mensaje-error" : undefined}
        />
        {errors.mensaje && (
          <span id="c-mensaje-error" className={f.error}>
            {errors.mensaje}
          </span>
        )}
      </div>

      {/* Señuelo para bots: invisible y fuera del recorrido de teclado */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="c-sitio">No complete este campo</label>
        <input
          id="c-sitio"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trampa}
          onChange={(e) => setTrampa(e.target.value)}
        />
      </div>

      {failure && (
        <p className={f.error} role="alert" style={{ marginBottom: "1rem" }}>
          {failure}
        </p>
      )}

      <div className={f.actions}>
        <span className={f.hint}>
          Si prefiere una propuesta formal, use el{" "}
          <Link href="/cotizaciones" className="link">
            formulario de cotización
          </Link>
          .
        </span>
        <button type="submit" className="btn btn-accent" disabled={pending}>
          {pending ? "Enviando…" : "Enviar mensaje"}
        </button>
      </div>

      <p className={f.note}>
        También puede escribirnos directamente a {site.email}.
      </p>
    </form>
  );
}
