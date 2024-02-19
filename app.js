const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express()
const port = 8080

app.use('/', createProxyMiddleware({
    target: 'https://api.openai.com',
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.removeHeader('x-forwarded-for');
        proxyReq.removeHeader('x-real-ip');
    },
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

app.listen(port, () => {
    console.log(`Proxy agent started: http://localhost:${port}`)
})
