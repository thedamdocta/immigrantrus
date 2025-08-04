#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 5173;

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.tsx': 'text/javascript',
  '.ts': 'text/javascript',
  '.jsx': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.woff2': 'font/woff2',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

function serveFile(filePath, res) {
  const extname = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Server error: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;

  console.log(`Request: ${req.method} ${pathname}`);

  // Handle staff portal routes
  if (pathname.startsWith('/staff-portal')) {
    const twentyBuildPath = path.join(__dirname, 'twenty-crm/packages/twenty-front/build');
    
    if (pathname === '/staff-portal' || pathname === '/staff-portal/') {
      // Serve the main TwentyCRM index.html with corrected paths
      serveFile(path.join(twentyBuildPath, 'index-staff-portal.html'), res);
      return;
    }
    
    // Handle SPA routing - any /staff-portal/* route should serve index.html
    if (pathname.startsWith('/staff-portal/') && !pathname.includes('.')) {
      serveFile(path.join(twentyBuildPath, 'index-staff-portal.html'), res);
      return;
    }
    
    // Serve static assets from TwentyCRM build
    const assetPath = pathname.replace('/staff-portal', '');
    const filePath = path.join(twentyBuildPath, assetPath);
    serveFile(filePath, res);
    return;
  }

  // Handle main website routes
  if (pathname === '/' || pathname === '/index.html') {
    serveFile(path.join(__dirname, 'index.html'), res);
    return;
  }

  // Serve static files from public directory
  if (pathname.startsWith('/public/')) {
    const filePath = path.join(__dirname, pathname);
    serveFile(filePath, res);
    return;
  }

  // Serve other static files from root
  const filePath = path.join(__dirname, pathname);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    serveFile(filePath, res);
    return;
  }

  // 404 for everything else
  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log('🚀 ImmigrantRUs with TwentyCRM Integration Demo');
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📊 Main website: http://localhost:${PORT}`);
  console.log(`🏢 Staff Portal: http://localhost:${PORT}/staff-portal`);
  console.log('');
  console.log('🎯 Testing the integration:');
  console.log('  1. Visit the main website');
  console.log('  2. Click "Staff Portal" link in footer');
  console.log('  3. Should redirect to TwentyCRM interface');
});
