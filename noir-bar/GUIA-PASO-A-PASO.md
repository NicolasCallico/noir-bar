# 🍸 GUÍA COMPLETA: Sistema QR Gastronómico
## De cero a online en Windows — Sin experiencia técnica

---

## ÍNDICE
1. Instalar las herramientas
2. Crear las cuentas gratuitas
3. Configurar Supabase (base de datos)
4. Configurar el proyecto
5. Probarlo en tu computadora
6. Publicarlo online con Vercel
7. Generar el código QR
8. Cómo actualizar el menú día a día

---

## PASO 1: INSTALAR LAS HERRAMIENTAS
**Tiempo estimado: 15 minutos**

### 1.1 — Instalar Node.js
Node.js es el motor que hace funcionar el proyecto.

1. Abrí tu navegador y entrá a: **https://nodejs.org**
2. Hacé clic en el botón verde grande que dice **"LTS"** (la versión recomendada)
3. Descargá el instalador `.msi`
4. Ejecutá el instalador → Siguiente → Siguiente → Instalar
5. Cuando termine, hacé clic en Finalizar

**Verificar que funcionó:**
1. Apretá las teclas `Windows + R`
2. Escribí `cmd` y presioná Enter
3. En la ventana negra que se abre, escribí:
   ```
   node --version
   ```
4. Deberías ver algo como `v20.11.0` ✅

---

### 1.2 — Instalar Git
Git es para guardar y subir el código.

1. Entrá a: **https://git-scm.com/download/win**
2. Se descarga automáticamente el instalador
3. Ejecutalo → Next → Next → (dejá todo por defecto) → Install
4. Al final, dejá marcado "Launch Git Bash" → Finish

**Verificar:**
```
git --version
```
Deberías ver: `git version 2.x.x` ✅

---

### 1.3 — Instalar VS Code (editor de código)
Es donde vas a ver y editar los archivos.

1. Entrá a: **https://code.visualstudio.com**
2. Hacé clic en **"Download for Windows"**
3. Ejecutá el instalador → Aceptar → Next → Next → Install
4. Al finalizar, abrí VS Code

---

## PASO 2: CREAR LAS CUENTAS GRATUITAS
**Tiempo estimado: 10 minutos**

### 2.1 — GitHub (para guardar el código)
1. Entrá a **https://github.com**
2. Clic en **"Sign up"**
3. Ingresá tu email, elegí una contraseña y un nombre de usuario
4. Verificá tu email cuando te llegue el correo
5. En el plan, elegí **Free** ✅

### 2.2 — Supabase (base de datos gratuita)
1. Entrá a **https://supabase.com**
2. Clic en **"Start your project"**
3. Clic en **"Continue with GitHub"** (usá la cuenta que recién creaste)
4. Autorizá Supabase en GitHub

### 2.3 — Vercel (para publicar el sitio gratis)
1. Entrá a **https://vercel.com**
2. Clic en **"Sign Up"**
3. Elegí **"Continue with GitHub"**
4. Autorizá Vercel ✅

---

## PASO 3: CONFIGURAR SUPABASE (BASE DE DATOS)
**Tiempo estimado: 10 minutos**

### 3.1 — Crear el proyecto en Supabase
1. En **supabase.com**, clic en **"New project"**
2. Completá los campos:
   - **Name:** `noir-bar` (o el nombre que quieras)
   - **Database Password:** anotá esta contraseña en un papel 📝
   - **Region:** elegí `South America (São Paulo)`
3. Clic en **"Create new project"**
4. Esperá 1-2 minutos mientras se crea ⏳

### 3.2 — Crear las tablas (copiar y pegar SQL)
1. En el menú izquierdo de Supabase, hacé clic en **"SQL Editor"**
2. Clic en **"New query"**
3. Abrí el archivo `supabase/schema.sql` de la carpeta del proyecto
4. Copiá TODO el contenido
5. Pegalo en el editor de Supabase
6. Clic en el botón **"Run"** (o presioná `Ctrl + Enter`)
7. Deberías ver: **"Success. No rows returned"** ✅

### 3.3 — Obtener las claves de API
1. En Supabase, clic en el ícono de engranaje ⚙️ en el menú izquierdo → **"Settings"**
2. Clic en **"API"**
3. Copiá y anotá estos dos valores:
   - **Project URL:** `https://abcdefg.supabase.co`
   - **anon public key:** una clave larga que empieza con `eyJ...`

---

## PASO 4: CONFIGURAR EL PROYECTO
**Tiempo estimado: 10 minutos**

### 4.1 — Abrir la carpeta del proyecto
1. Copiá la carpeta `noir-bar` al Escritorio (o donde quieras)
2. Abrí VS Code
3. Menú **File → Open Folder**
4. Seleccioná la carpeta `noir-bar`
5. Clic en **"Select Folder"**

### 4.2 — Crear el archivo de variables de entorno
Este archivo conecta tu proyecto con Supabase. ¡NUNCA lo subas a internet!

1. En VS Code, en el panel izquierdo vas a ver los archivos del proyecto
2. Buscá el archivo llamado `.env.local.example`
3. Hacé clic derecho sobre él → **"Copy"**
4. Hacé clic derecho en el panel izquierdo → **"Paste"**
5. Renombrá el archivo copiado a `.env.local` (sin `.example`)
6. Abrí `.env.local` y reemplazá los valores:

```
NEXT_PUBLIC_SUPABASE_URL=https://TU_URL.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...tu_clave_larga...
NEXT_PUBLIC_ADMIN_EMAIL=tumail@gmail.com
```

Usá los valores que copiaste en el Paso 3.3.

### 4.3 — Personalizar con tu local
Abrí el archivo `supabase/schema.sql` y buscá la sección **"DATOS DE EJEMPLO"**.
Cambiá estos valores por los de tu local:
- `'Noir Bar'` → el nombre de tu bar/restaurante
- `'noir-bar'` → el slug (sin espacios, todo minúscula, ej: `mi-restaurante`)
- `'Cocktails artesanales...'` → tu tagline
- El número de WhatsApp (sin el `+`, solo números)
- Tu usuario de Instagram

### 4.4 — Instalar las dependencias del proyecto
1. En VS Code, abrí la terminal:
   - Menú **Terminal → New Terminal**
2. Se abre una ventana abajo. Escribí:
   ```
   npm install
   ```
3. Esperá 1-2 minutos. Verás muchos mensajes aparecer ✅

---

## PASO 5: PROBARLO EN TU COMPUTADORA
**Tiempo estimado: 2 minutos**

1. En la terminal de VS Code, escribí:
   ```
   npm run dev
   ```
2. Cuando veas `✓ Ready in ...ms`, abrí tu navegador
3. Entrá a: **http://localhost:3000**
4. Deberías ver el menú de tu local 🎉

**Para ver el panel admin:**
- Entrá a: **http://localhost:3000/admin**

Para detener el servidor: en la terminal presioná `Ctrl + C`

---

## PASO 6: PUBLICARLO ONLINE CON VERCEL
**Tiempo estimado: 15 minutos**

### 6.1 — Subir el código a GitHub
1. En la terminal de VS Code, ejecutá estos comandos uno por uno:
   ```
   git init
   git add .
   git commit -m "mi primer menu qr"
   ```

2. Andá a **github.com** → **"New repository"** (botón verde)
3. Nombre: `noir-bar` → clic en **"Create repository"**
4. GitHub te va a mostrar unos comandos. Copiá y ejecutá en la terminal:
   ```
   git remote add origin https://github.com/TU_USUARIO/noir-bar.git
   git branch -M main
   git push -u origin main
   ```

### 6.2 — Conectar con Vercel
1. Andá a **vercel.com**
2. Clic en **"Add New Project"**
3. Buscá y seleccioná tu repositorio `noir-bar`
4. Clic en **"Import"**

### 6.3 — Agregar las variables de entorno en Vercel
**¡Paso importante!** Antes de hacer deploy:
1. En Vercel, expandí la sección **"Environment Variables"**
2. Agregá estas dos variables (una por una):
   - **Name:** `NEXT_PUBLIC_SUPABASE_URL` | **Value:** tu URL de Supabase
   - **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **Value:** tu anon key

3. Clic en **"Deploy"**
4. Esperá 2-3 minutos ⏳
5. Vercel te va a dar una URL tipo: `noir-bar.vercel.app` 🎉

---

## PASO 7: GENERAR EL CÓDIGO QR
**Tiempo estimado: 5 minutos**

1. Entrá a **https://www.qr-code-generator.com** (gratis)
2. En el campo URL, pegá tu URL de Vercel: `https://noir-bar.vercel.app`
3. Personalizá el color (usá `#C8A96B` para el dorado)
4. Hacé clic en **"Download"**
5. Imprimí el QR en alta calidad 🖨️

**TIP:** El QR siempre va a llevar a la misma URL aunque cambies el menú. Solo cambiá el contenido en el panel admin, no el QR.

---

## PASO 8: USO DIARIO — CÓMO ACTUALIZAR EL MENÚ

### Agregar un producto
1. Entrá a `tuurl.vercel.app/admin/login`
2. Logueate con tu email y contraseña
3. Clic en **"Productos"** → **"+ Agregar"**
4. Completá nombre, precio, descripción, emoji
5. Guardá → aparece instantáneamente en el menú ✅

### Marcar sin stock
1. En el panel Admin → Productos
2. Tocá el switch al lado del producto
3. Listo — se muestra grisado en el menú

### Activar Happy Hour
1. Admin → Promociones
2. Activá el switch de "Happy Hour"
3. La barra dorada aparece arriba del menú automáticamente

### Ver nuevas reservas
1. Admin → Reservas
2. Las nuevas aparecen con badge verde "Nuevo"
3. Tocá "Confirmar" para confirmar, o "Cancelar"

---

## CREAR EL USUARIO ADMIN EN SUPABASE

Para poder loguearte en el panel admin:

1. Andá a **supabase.com** → tu proyecto
2. En el menú izquierdo → **"Authentication"** → **"Users"**
3. Clic en **"Add user"** → **"Create new user"**
4. Email: tu email | Password: tu contraseña segura
5. Clic en **"Create User"**

Ahora podés entrar con esos datos en `/admin/login`.

---

## DOMINIO PERSONALIZADO (Opcional, recomendado)

Para tener `menu.tubar.com` en lugar de `tubar.vercel.app`:

1. Comprá un dominio en **https://nic.ar** (para .com.ar) o **Namecheap/GoDaddy** (para .com)
2. En Vercel → tu proyecto → **"Settings"** → **"Domains"**
3. Agregá tu dominio y seguí las instrucciones

---

## ESTRUCTURA DE ARCHIVOS (Para entender qué es qué)

```
noir-bar/
│
├── app/                          ← Páginas de la app
│   ├── [slug]/                   ← Menú público (lo que ve el cliente)
│   │   ├── page.tsx              ← Página principal del menú
│   │   └── components/
│   │       ├── Hero.tsx          ← Portada con nombre y botones
│   │       ├── PromoBar.tsx      ← Barra de promociones dorada
│   │       ├── CategoryFilter.tsx ← Filtros de categoría
│   │       ├── ProductList.tsx   ← Lista de productos
│   │       ├── ProductCard.tsx   ← Tarjeta individual de producto
│   │       ├── ReservaModal.tsx  ← Formulario de reserva
│   │       └── WhatsAppFAB.tsx   ← Botón flotante WhatsApp
│   │
│   └── admin/                    ← Panel administrativo (solo vos)
│       ├── page.tsx              ← Dashboard con stats
│       ├── products/page.tsx     ← Gestión de productos
│       ├── reservations/page.tsx ← Ver y gestionar reservas
│       ├── promotions/page.tsx   ← Activar/desactivar promos
│       └── login/page.tsx        ← Login del admin
│
├── lib/
│   ├── supabase.ts               ← Conexión con la base de datos
│   ├── types.ts                  ← Definición de tipos de datos
│   └── utils.ts                  ← Funciones útiles (formatear precios, etc.)
│
├── supabase/
│   └── schema.sql                ← Estructura de la base de datos
│
├── .env.local                    ← TUS CLAVES PRIVADAS (no compartir)
├── package.json                  ← Lista de dependencias
└── tailwind.config.ts            ← Colores y estilos globales
```

---

## PREGUNTAS FRECUENTES

**¿Cuánto cuesta todo esto?**
- GitHub: Gratis
- Supabase: Gratis (hasta 500MB de datos y 50,000 lecturas/mes)
- Vercel: Gratis (para proyectos personales/pequeños negocios)
- Dominio personalizado: desde $500 ARS/año en nic.ar
- **Total mínimo: $0** ✅

**¿El QR cambia si actualizo el menú?**
No. El QR apunta a tu URL. El contenido cambia pero el QR queda igual.

**¿Puedo tener varios locales?**
Sí. Cada local tiene su propio `slug`. Podés agregar más venues en la base de datos.

**¿Cómo subo fotos de los productos?**
En Supabase → Storage → creá un bucket llamado `products`. Subí las fotos y copiá la URL pública al campo `image_url` del producto.

**¿Qué pasa si algo no funciona?**
La mayoría de errores aparecen en la terminal. El error más común es haber olvidado configurar las variables de entorno en Vercel.

---

## PARA ESCALAR EN EL FUTURO

Cuando tu negocio crezca, podés agregar:
- **Pagos online:** Stripe o MercadoPago
- **Notificaciones:** Email/SMS cuando llega una reserva
- **Analytics:** Cuántos scans, qué productos se ven más
- **Multi-local:** Gestionar varios bares desde un panel
- **App nativa:** Con Expo/React Native

---

**¡Listo! Tu menú QR premium está funcionando.** 🍸

Para cualquier duda, revisá los mensajes de error en la terminal o en la consola del navegador (F12).
