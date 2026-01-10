/**
 * Script to import finance rules from JSON file to Supabase
 * Usage: node scripts/import-finance-rules.js [path-to-finance-rules.json]
 */

const fs = require('fs');
const path = require('path');

async function importFinanceRules() {
  // Get JSON file path from command line or use default
  const jsonPath = process.argv[2] || path.join(__dirname, '..', 'finance-rules.json');
  
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ File not found: ${jsonPath}`);
    process.exit(1);
  }

  const rulesJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  // Check if we have API endpoint URL
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const importUrl = `${apiUrl}/api/finance/rules/import`;

  console.log(`📤 Importing finance rules from ${jsonPath}...`);
  console.log(`   API URL: ${importUrl}`);
  
  try {
    const response = await fetch(importUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rulesJson),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log(`✅ Successfully imported ${result.imported} rules`);
      console.log(`   Balloon rules: ${result.balloon_rules?.length || 0}`);
      console.log(`   Installments rules: ${result.installments_rules?.length || 0}`);
      
      if (result.errors > 0) {
        console.warn(`⚠️  ${result.errors} errors occurred:`);
        result.errorDetails?.forEach((error, index) => {
          console.warn(`   ${index + 1}. ${error}`);
        });
      }
    } else {
      console.error(`❌ Import failed: ${result.error || 'Unknown error'}`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`❌ Error importing rules:`, error.message);
    
    if (error.message.includes('fetch')) {
      console.error(`   Make sure the server is running at ${apiUrl}`);
      console.error(`   You can start it with: npm run dev`);
    }
    
    process.exit(1);
  }
}

// For Node.js < 18, use node-fetch if available
if (typeof fetch === 'undefined') {
  try {
    global.fetch = require('node-fetch');
  } catch (e) {
    console.error('❌ This script requires Node.js 18+ or node-fetch package');
    console.error('   Install node-fetch: npm install node-fetch');
    process.exit(1);
  }
}

importFinanceRules();

