# 🏢 DIC VR – Experiencia 3D con Babylon.js

[Live Demo](https://dic3dbabylonjs.vercel.app/)  
[![Código en GitHub](https://img.shields.io/badge/GitHub-dicvr--printer--info-181717?logo=github)](https://github.com/albertoguinda/dicvr-printer-info)  
[![Documentación PDF](https://img.shields.io/badge/Documentación-PDF-FF5722?logo=adobepdf)](./docs/DOCUMENTACIÓN%20OFICIAL%20DIC%20BABYLON.pdf)

---

## 📋 Contenido

1. [Descripción](#descripción)
2. [Documentación](#documentación)
3. [Instalación & Despliegue](#instalación--despliegue)
4. [Stack Tecnológico](#stack-tecnológico)
5. [Estructura](#estructura)
6. [Licencia & Créditos](#licencia--créditos)

---

## 🔭 Descripción

DIC VR combina un modelo GLB del edificio DIC (exportado desde Blender/IFC) con una aplicación web en Babylon.js que permite:

- Navegación libre y teletransporte por el escenario 3D.
- Selección de elementos para mostrar datos de sensórica real (temp., humedad, CO₂, luz, ruido).
- Panel interactivo que muestra información de las impresoras 3D instaladas al pulsar un botón.
- UI minimalista en HTML/CSS con iconografía Heroicons.

---

## 📄 Documentación

Descarga y consulta la documentación oficial completa (diagramas, manual de usuario, despliegue):

[DOCUMENTACIÓN OFICIAL DIC BABYLON (PDF)](./docs/DOCUMENTACIÓN%20OFICIAL%20DIC%20BABYLON.pdf)

---

## ⚙️ Instalación & Despliegue

Clona, instala y ejecuta localmente:

```bash
git clone https://github.com/albertoguinda/dicvr-printer-info.git
cd dicvr-printer-info

git lfs install
npm install

npm run dev
# Abre http://localhost:5173

Para producción en Vercel:

npm run build
npx vercel --prod
```

🛠️ Stack Tecnológico
3D & VR: Babylon.js · GLB/GLTF (Blender)

Frontend: Vite · JavaScript (ES6) · CSS3

UI: HTML/CSS · Heroicons

Despliegue: Vercel (sitio estático)

Activos grandes: Git LFS para modelos .glb

📂 Estructura

```bash
/
├── docs/                  # PDF’s y manual oficial
├── models/                # Modelos GLB (Git LFS)
├── public/                # Texturas, iconos, imágenes
├── src/
│   ├── index.html         # Entrada principal
│   ├── main.js            # Babylon.js + lógica UI
│   └── style.css          # Estilos globales
├── .gitattributes         # Git LFS track *.glb
├── package.json
├── vite.config.js
└── README.md
```

---

## Licencia & Créditos

MIT © Alberto Guinda Sevilla

[![GitHub](https://img.shields.io/badge/GitHub-albertoguinda-181717?logo=github)](https://github.com/albertoguinda)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-albertoguindasevilla-0A66C2?logo=linkedin)](https://www.linkedin.com/in/albertoguindasevilla/)
