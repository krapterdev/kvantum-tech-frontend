import express from 'express';

const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

app.get('/api/assets', (req, res) => {
  res.json([]);
});

app.post('/api/media/remove', (req, res) => {
  res.json({ success: true, name: req.body?.name || 'file' });
});

app.post('/api/assets/remove', (req, res) => {
  res.json({ success: true, name: req.body?.name || 'file' });
});

app.use((req, res) => {
  res.json({ ok: true, url: req.url });
});

export default function handler(req, res) {
  return app(req, res);
}
