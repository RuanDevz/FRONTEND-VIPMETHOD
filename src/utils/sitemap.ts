// sitemap.js
import router from '../App'; 

export default function generateSitemap() {
  return new Promise((resolve, reject) => {
    const sitemap = require('react-router-sitemap').default;
    sitemap(router, { changefreq: 'monthly', priority: 0.8 }, (err: any, xml: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(xml);
      }
    });
  });
}