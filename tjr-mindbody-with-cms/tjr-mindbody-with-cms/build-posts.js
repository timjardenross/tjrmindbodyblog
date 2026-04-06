#!/usr/bin/env node
/**
 * Build script: Generates posts.json index from markdown files
 * Runs during Netlify build — automatically discovers all posts in posts/ folder
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.join(__dirname, 'posts');
const outputFile = path.join(__dirname, 'data', 'posts.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

try {
  // Read all markdown files
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

  const posts = files
    .map(file => {
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data, content: body } = matter(content);

      return {
        title: data.title || '',
        date: data.date || '',
        category: data.category || 'General',
        summary: data.summary || '',
        image: data.image || '',
        body: body.trim()
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // newest first

  // Write posts.json
  fs.writeFileSync(
    outputFile,
    JSON.stringify({ posts }, null, 2)
  );

  console.log(`✓ Built posts.json with ${posts.length} post(s)`);
} catch (err) {
  console.error('✗ Error building posts.json:', err.message);
  process.exit(1);
}
