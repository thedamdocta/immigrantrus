const fs = require('fs-extra');
const path = require('path');

async function copyCRMAssets() {
  const source = path.join(__dirname, 'twenty-crm/packages/twenty-front/build');
  const destination = path.join(__dirname, 'public/staff-portal');
  
  try {
    console.log('🚀 Starting CRM asset copy process...');
    
    // Clean destination
    console.log('🧹 Cleaning destination directory...');
    await fs.remove(destination);
    
    // Copy all build assets
    console.log('📋 Copying CRM assets...');
    await fs.copy(source, destination);
    
    console.log('✅ CRM assets copied successfully');
    
    // Update asset paths for /staff-portal base
    await updateAssetPaths(destination);
    
    console.log('🎉 Phase 3 complete! CRM integration ready.');
    
  } catch (error) {
    console.error('❌ Error copying CRM assets:', error);
    process.exit(1);
  }
}

async function updateAssetPaths(directory) {
  const indexPath = path.join(directory, 'index.html');
  
  try {
    console.log('🔧 Updating asset paths for /staff-portal...');
    
    let content = await fs.readFile(indexPath, 'utf8');
    
    // Update asset paths to include /staff-portal prefix
    content = content.replace(
      /href="\/assets\//g, 
      'href="/staff-portal/assets/'
    );
    content = content.replace(
      /src="\/assets\//g, 
      'src="/staff-portal/assets/'
    );
    
    // Update any other absolute paths that might exist
    content = content.replace(
      /href="\/images\//g, 
      'href="/staff-portal/images/'
    );
    content = content.replace(
      /src="\/images\//g, 
      'src="/staff-portal/images/'
    );
    
    // Update manifest and service worker paths
    content = content.replace(
      /href="\/manifest\.json"/g, 
      'href="/staff-portal/manifest.json"'
    );
    content = content.replace(
      /src="\/mockServiceWorker\.js"/g, 
      'src="/staff-portal/mockServiceWorker.js"'
    );
    
    await fs.writeFile(indexPath, content);
    console.log('✅ Asset paths updated for /staff-portal');
    
  } catch (error) {
    console.error('❌ Error updating asset paths:', error);
    throw error;
  }
}

// Run the copy process
if (require.main === module) {
  copyCRMAssets();
}

module.exports = { copyCRMAssets, updateAssetPaths };
