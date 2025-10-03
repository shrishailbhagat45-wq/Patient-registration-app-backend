import { createNestApp } from './main';

let cachedApp: any = null;

export default async function handler(req, res) {
  if (!cachedApp) {
    const app = await createNestApp();
    cachedApp = app;
  }
  return cachedApp(req, res);
}