import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const docsDir = join(process.cwd(), 'docs');
const indexPath = join(docsDir, 'index.html');
const pathSegmentsToKeep = 1; // /biblia-verdade-guiada/

const spaRedirectScript = `<script type="text/javascript">
(function(l) {
  if (l.search[1] === '/') {
    var decoded = l.search.slice(1).split('&').map(function(s) {
      return s.replace(/~and~/g, '&');
    }).join('?');
    window.history.replaceState(null, null,
      l.pathname.slice(0, -1) + decoded + l.hash
    );
  }
}(window.location));
</script>`;

const spa404Script = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = ${pathSegmentsToKeep};
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>
`;

let indexHtml = readFileSync(indexPath, 'utf8');
if (!indexHtml.includes('l.search[1]')) {
  indexHtml = indexHtml.replace('<head>', `<head>\n    ${spaRedirectScript}`);
  writeFileSync(indexPath, indexHtml);
}

writeFileSync(join(docsDir, '.nojekyll'), '');
writeFileSync(join(docsDir, '404.html'), spa404Script);

console.log('Build pronta para GitHub Pages em /docs');
