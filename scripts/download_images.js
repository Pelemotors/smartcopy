const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Use absolute path to avoid encoding issues
const BASE_DIR = path.resolve(__dirname, '..');
const DENTAL_DIR = path.join(BASE_DIR, 'public', 'images', 'dental');
const SERVICES_DIR = path.join(DENTAL_DIR, 'services');
const BEFORE_AFTER_DIR = path.join(DENTAL_DIR, 'before-after');

// Create directories
[ SERVICES_DIR, BEFORE_AFTER_DIR ].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const IMAGES = {
  // Main images
  [path.join(DENTAL_DIR, 'dental-lab-hero.jpg')]: 'https://images.pexels.com/photos/6502631/pexels-photo-6502631.jpeg?auto=compress&cs=tinysrgb&w=1920',
  [path.join(DENTAL_DIR, 'dental-lab-about.jpg')]: 'https://images.pexels.com/photos/12551732/pexels-photo-12551732.jpeg?auto=compress&cs=tinysrgb&w=1200',
  [path.join(DENTAL_DIR, 'dental-process.jpg')]: 'https://images.pexels.com/photos/13085186/pexels-photo-13085186.jpeg?auto=compress&cs=tinysrgb&w=1200',
  [path.join(DENTAL_DIR, 'dental-technician.jpg')]: 'https://images.pexels.com/photos/12551732/pexels-photo-12551732.jpeg?auto=compress&cs=tinysrgb&w=800',
  [path.join(DENTAL_DIR, 'dental-work.jpg')]: 'https://images.pexels.com/photos/6502631/pexels-photo-6502631.jpeg?auto=compress&cs=tinysrgb&w=1200',
  [path.join(DENTAL_DIR, 'dental-smile.jpg')]: 'https://images.pexels.com/photos/3771837/pexels-photo-3771837.jpeg?auto=compress&cs=tinysrgb&w=800',
  
  // Services images
  [path.join(SERVICES_DIR, 'crowns.jpg')]: 'https://images.pexels.com/photos/6502631/pexels-photo-6502631.jpeg?auto=compress&cs=tinysrgb&w=800',
  [path.join(SERVICES_DIR, 'dentures.jpg')]: 'https://images.pexels.com/photos/12551732/pexels-photo-12551732.jpeg?auto=compress&cs=tinysrgb&w=800',
  [path.join(SERVICES_DIR, 'bridges.jpg')]: 'https://images.pexels.com/photos/13085186/pexels-photo-13085186.jpeg?auto=compress&cs=tinysrgb&w=800',
  [path.join(SERVICES_DIR, 'implants.jpg')]: 'https://images.pexels.com/photos/6502631/pexels-photo-6502631.jpeg?auto=compress&cs=tinysrgb&w=800',
  [path.join(SERVICES_DIR, 'full-restoration.jpg')]: 'https://images.pexels.com/photos/12551732/pexels-photo-12551732.jpeg?auto=compress&cs=tinysrgb&w=800',
  
  // Before/After images
  [path.join(BEFORE_AFTER_DIR, 'before-1.jpg')]: 'https://images.pexels.com/photos/6502631/pexels-photo-6502631.jpeg?auto=compress&cs=tinysrgb&w=800',
  [path.join(BEFORE_AFTER_DIR, 'after-1.jpg')]: 'https://images.pexels.com/photos/3771837/pexels-photo-3771837.jpeg?auto=compress&cs=tinysrgb&w=800',
  [path.join(BEFORE_AFTER_DIR, 'before-2.jpg')]: 'https://images.pexels.com/photos/13085186/pexels-photo-13085186.jpeg?auto=compress&cs=tinysrgb&w=800',
  [path.join(BEFORE_AFTER_DIR, 'after-2.jpg')]: 'https://images.pexels.com/photos/3771837/pexels-photo-3771837.jpeg?auto=compress&cs=tinysrgb&w=800',
  [path.join(BEFORE_AFTER_DIR, 'before-3.jpg')]: 'https://images.pexels.com/photos/12551732/pexels-photo-12551732.jpeg?auto=compress&cs=tinysrgb&w=800',
  [path.join(BEFORE_AFTER_DIR, 'after-3.jpg')]: 'https://images.pexels.com/photos/3771837/pexels-photo-3771837.jpeg?auto=compress&cs=tinysrgb&w=800',
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const filename = path.basename(filepath);
    console.log(`Downloading ${filename}...`);
    
    // Ensure directory exists
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const file = fs.createWriteStream(filepath);
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, (response) => {
      if (response.statusCode === 200 || response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        if (response.statusCode === 301 || response.statusCode === 302) {
          const redirectUrl = response.headers.location;
          if (redirectUrl) {
            file.close();
            fs.unlinkSync(filepath);
            return downloadImage(redirectUrl, filepath).then(resolve).catch(reject);
          }
        }
        
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          try {
            const stats = fs.statSync(filepath);
            console.log(`OK: Downloaded ${filename} (${stats.size} bytes)`);
            resolve();
          } catch (err) {
            reject(err);
          }
        });
      } else {
        file.close();
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
        reject(new Error(`Failed with status ${response.statusCode}`));
      }
    });
    
    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) {
        try {
          fs.unlinkSync(filepath);
        } catch (e) {
          // Ignore
        }
      }
      reject(err);
    });
    
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function main() {
  console.log('Starting image downloads...');
  console.log(`Base directory: ${BASE_DIR}`);
  console.log(`Dental directory: ${DENTAL_DIR}\n`);
  
  let successCount = 0;
  const totalCount = Object.keys(IMAGES).length;
  
  for (const [filepath, url] of Object.entries(IMAGES)) {
    try {
      await downloadImage(url, filepath);
      successCount++;
    } catch (error) {
      console.log(`ERROR: Failed to download ${path.basename(filepath)}: ${error.message}`);
    }
  }
  
  console.log(`\nDownloaded ${successCount}/${totalCount} images successfully`);
}

main().catch(console.error);
