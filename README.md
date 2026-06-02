# Mi Tablero ✿ — Gestor de Tareas

Aplicación React + Vite + Tailwind para organizar tareas en un tablero
estilo Kanban, con un diseño suave en tonos rosa, lavanda y coral.

## Funcionalidades
- Crear, editar, borrar tareas.
- Tres columnas: Por hacer · En camino · Listo.
- Cambio de estado dinámico desde cada tarjeta.
- Prioridad, fecha de creación y fecha límite.
- Búsqueda en tiempo real, filtro por prioridad y ordenamientos.
- Panel de estadísticas con contadores y barra de progreso.
- Validaciones, mensajes de confirmación, animaciones y diseño responsive.
- Persistencia local (no se pierden los datos al recargar).

---

## Como ejecutarlo (modo desarrollo)

Necesitas Node.js 18+ instalado.

    cd kanban-rosa
    npm install
    npm run dev

Abre la URL que muestra la terminal (por defecto http://localhost:5173).

---

## Despliegue en VPS Debian 12 + dominio

    # 1. Instalar Node.js (si no lo tienes)
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs

    # 2. En la carpeta del proyecto
    cd kanban-rosa
    npm install
    npm run build          # genera la carpeta dist/

    # 3. Instalar nginx
    sudo apt install -y nginx

    # 4. Configurar el sitio (reemplaza tu_dominio.com)
    sudo nano /etc/nginx/sites-available/mitablero
    # pega:
    #   server {
    #     listen 80;
    #     server_name tu_dominio.com www.tu_dominio.com;
    #     root /home/usuario/kanban-rosa/dist;
    #     index index.html;
    #     location / { try_files $uri $uri/ /index.html; }
    #   }

    sudo ln -s /etc/nginx/sites-available/mitablero /etc/nginx/sites-enabled/
    sudo systemctl restart nginx

    # 5. Apunta el DNS (record A) de tu dominio a la IP de la VPS
    # 6. HTTPS gratis con Certbot:
    sudo apt install -y certbot python3-certbot-nginx
    sudo certbot --nginx -d tu_dominio.com -d www.tu_dominio.com
