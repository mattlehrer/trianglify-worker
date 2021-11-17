const trianglify = require('trianglify');

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
async function handleRequest(request) {
  const url = request.url.split('/');

  let seed;

  let triangle;
  try {
    seed = url[url.length - 1].split('.')[0];
  } catch (error) {
    seed = '0x0000000000000000000000000000000000000000';
  }

  triangle = trianglify({
    width: 256,
    height: 256,
    seed,
  });
  const headers = { 'Content-Type': 'image/svg+xml' };
  const svg = triangle.toSVG();

  return new Response(svg, { headers });
}
