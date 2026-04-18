const fs = require('fs');
const content = fs.readFileSync('src/pages/ProductDetail.jsx', 'utf8');

let braceDepth = 0;
let parenDepth = 0;
let brakDepth = 0;

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  if (char === '{') braceDepth++;
  else if (char === '}') braceDepth--;
  else if (char === '(') parenDepth++;
  else if (char === ')') parenDepth--;
  else if (char === '[') brakDepth++;
  else if (char === ']') brakDepth--;
  
  if (braceDepth < 0 || parenDepth < 0 || brakDepth < 0) {
    console.log(`Unbalanced at index ${i}: ${char}. Brace: ${braceDepth}, Paren: ${parenDepth}, Brak: ${brakDepth}`);
    // Show some context
    console.log(content.substring(Math.max(0, i-20), Math.min(content.length, i+20)));
    process.exit(1);
  }
}

console.log(`Final counts: Brace: ${braceDepth}, Paren: ${parenDepth}, Brak: ${brakDepth}`);
if (braceDepth !== 0 || parenDepth !== 0 || brakDepth !== 0) {
  process.exit(1);
}
