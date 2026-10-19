# Direcciones de artículos

Los títulos, textos, resúmenes y direcciones se editan en
`src/app/components/articles/articles.json`. Cada `slug` debe ser único.

`npm run build` compila Angular y genera un HTML por artículo en
`dist/agn-landing/browser/articulos`. Incluye los metadatos de redes sociales
y el texto del artículo para clientes que no ejecutan JavaScript. Al iniciar
Angular, se muestra la web completa con la tarjeta correspondiente abierta.
El logo existente se mantiene como imagen compartida hasta crear las portadas.

Vercel usa `vercel.json` para servir esos archivos en direcciones sin `.html`.
La configuración de compilación debe ejecutar `npm run build`, incluido el
paso que genera los artículos. Las direcciones canónicas conservan el dominio
de producción configurado en `src/index.html`.

Los artículos sin texto se generan para poder revisar su diseño, pero llevan
`noindex` y no se agregan al sitemap hasta que tengan contenido.

Para comprobar los metadatos y el sitemap después de compilar:

```sh
npm run build
npm run test:articles
```

`npm start` permite probar la navegación de las tarjetas. El servidor de
desarrollo no genera el HTML específico para rastreadores; ese HTML se genera
en la compilación de producción.
