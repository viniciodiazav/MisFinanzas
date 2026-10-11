# MisFinanzas 📱✨

Una aplicación web de control financiero personal minimalista, **enfocada en móviles**, 100% libre de backend y con persistencia completa en el almacenamiento local (`localStorage`). Diseñada para comportarse y sentirse como una **aplicación nativa** al agregarla a la pantalla de inicio del teléfono.

---

## 🎨 Características

- **Diseño Móvil Nativo:**
  - Menú de hamburguesa con animaciones suaves tipo iOS Spring y gesto táctil para cerrar (*swipe-to-close*).
  - Modal inferior (*Bottom sheet*) con soporte de **arrastre con el dedo (pull-to-dismiss)** y rebote elástico.
  - **Teclado numérico nativo** al registrar importes (sin letras ni estorbos).
- **Control por Meses:**
  - Navegador mensual interactivo (`< Octubre 2026 >`).
  - Filtrado automático de balance, ingresos y gastos según el mes seleccionado.
- **Resumen Visual y Gráfica de Líneas:**
  - Gráfica interactiva de tendencia diaria (flujo de ingresos en verde y gastos en rojo con gradientes suaves y tooltips táctiles).
  - Tasa de retención/ahorro y desglose por categorías.
- **Categorías 100% Personalizables:**
  - Crea tus propias categorías con **57 iconos** y **30 colores sólidos**.
  - Crear categorías sobre la marcha al registrar un movimiento.
- **100% Privada y Offline:**
  - Sin base de datos externa ni cuentas. Tus datos residen exclusivamente en tu dispositivo.
  - Exportación y descarga de copias de seguridad en formato JSON.

---

## 🚀 Despliegue en Producción (Deploy)

La aplicación está lista para desplegarse en cualquier servicio estático o contenedor:

### Opción 1: Vercel (Recomendado)
El proyecto ya incluye [vercel.json](file:///home/lvdiazav/Documents/Projects/FinanceApp/vercel.json).
1. Conecta tu repositorio de GitHub a [Vercel](https://vercel.com).
2. O ejecuta en tu terminal:
   ```bash
   npx vercel
   ```

### Opción 2: Netlify
El proyecto ya incluye [netlify.toml](file:///home/lvdiazav/Documents/Projects/FinanceApp/netlify.toml) y [_redirects](file:///home/lvdiazav/Documents/Projects/FinanceApp/public/_redirects).
1. Conecta tu repositorio a [Netlify](https://netlify.com).
2. O arrastra la carpeta `dist/` directamente a Netlify Drop.

### Opción 3: Docker / Servidor Propio (VPS)
El proyecto incluye un [Dockerfile](file:///home/lvdiazav/Documents/Projects/FinanceApp/Dockerfile) multi-etapa con [nginx.conf](file:///home/lvdiazav/Documents/Projects/FinanceApp/nginx.conf):
```bash
docker build -t misfinanzas .
docker run -d -p 80:80 misfinanzas
```

---

## 💻 Desarrollo Local

```bash
npm install
npm run dev -- --host
```

Abre en tu navegador o desde el móvil conectado a la misma red Wi-Fi:
👉 `http://<TU_IP_LOCAL>:5173`
