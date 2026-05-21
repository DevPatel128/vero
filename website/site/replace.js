const fs = require('fs');
const path = require('path');

function walk(dir, cb) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, cb);
    } else {
      if (/\.(tsx?|md|json)$/.test(fullPath)) {
        cb(fullPath);
      }
    }
  }
}

['./src', './content'].forEach(dir => {
  walk(dir, (file) => {
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Remove em-dashes
    content = content.replace(/ — /g, ' - ');
    content = content.replace(/—/g, '-');
    
    // 5. Use sophisticated word (Professionals)
    content = content.replace(/\bWorkers\b/g, 'Professionals');
    content = content.replace(/\bworkers\b/g, 'professionals');
    content = content.replace(/\bWorker\b/g, 'Professional');
    content = content.replace(/\bworker\b/g, 'professional');
    content = content.replace(/\bWorkers'\b/g, "Professionals'");
    content = content.replace(/\bworkers'\b/g, "professionals'");
    
    // Update URLs like /for-workers to /for-professionals? Yes!
    content = content.replace(/\/for-workers/g, '/for-professionals');
    
    fs.writeFileSync(file, content);
  });
});
console.log('Replacements completed successfully.');
