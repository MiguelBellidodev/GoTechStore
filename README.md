# GoTech

GoTech es una landing page de e-commerce enfocada en tecnología gamer y productos premium. La tienda presenta una experiencia moderna, responsive y con carrito de compras funcional, navegación móvil, catálogo dinámico y validación de formulario de contacto.

## Descripción del proyecto

Este proyecto fue desarrollado como una tienda online de productos tecnológicos con un enfoque premium y gamer. La aplicación permite:

- navegar por una landing page con secciones principales
- explorar productos renderizados dinámicamente desde JavaScript
- filtrar por categorías
- agregar productos al carrito
- persistir la información del carrito en localStorage
- validar el formulario de contacto
- visualizar un diseño responsive en móviles, tablets y desktop

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript ES6
- LocalStorage
- Fetch para cargar datos JSON

## Estructura del proyecto

```bash
ProyectoJS/
├── assets/
│   ├── css/
│   │   ├── includes/
│   │   ├── utils/
│   │   └── main.css
│   ├── img/
│   └── js/
│       ├── helpers/
│       ├── modules/
│       └── app.js
├── data/
│   └── productos.json
├── index.html
├── README.md
└── .gitignore
```

## Funcionalidades principales

### Hero y landing page

- Banner principal con propuesta de valor
- Diseño atractivo y enfocado en productos tecnológicos

### About Us

- Sección de presentación de la marca
- Mensaje premium y orientado a la tecnología

### Catálogo de productos

- Rendereado desde JavaScript
- Filtros por categorías
- Visualización de productos con imagen, precio y acción de compra

### Carrito de compras

- Agregar productos
- Aumentar o reducir cantidades
- Eliminar productos
- Persistencia con localStorage

### Contacto

- Formulario con validación de nombre, email y mensaje
- Feedback visual para cada campo
- Mensaje de éxito al completar correctamente

## Cómo ejecutar el proyecto

1. Cloná el repositorio:

```bash
git clone <url-del-repositorio>
```

2. Entrá en la carpeta del proyecto:

```bash
cd ProyectoJS
```

3. Abrí el archivo `index.html` en tu navegador.

Si querés una versión más dinámica, podés levantar un servidor local mediante VS Code Live Server o Python:

```bash
python -m http.server 8000
```

Y luego abrir:

```bash
http://localhost:8000
```

## Objetivo del proyecto

Este proyecto busca demostrar habilidades en:

- maquetado web responsive
- JavaScript modular
- manipulación del DOM
- consumo de datos JSON
- persistencia de información con localStorage
- lógica de e-commerce básica
- validación de formularios

## Autor

Proyecto desarrollado por GoTech.

## Estado

En desarrollo activo.

## Licencia

Este proyecto se distribuye con fines educativos y de portfolio.
