/**
 * Test script to debug Clerk OAuth data extraction
 * Run this to test if we can extract user data during SSO process
 */

import puppeteer from 'puppeteer';

async function testClerkOAuthExtraction() {
  console.log('🔍 Starting Clerk OAuth data extraction test...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false, // Show browser for debugging
    devtools: true,  // Open dev tools
    slowMo: 1000     // Slow down for visibility
  });
  
  const page = await browser.newPage();
  
  // Listen to console logs from the page
  page.on('console', msg => {
    if (msg.text().includes('OAuth') || msg.text().includes('Clerk') || msg.text().includes('user')) {
      console.log(`📝 PAGE LOG: ${msg.text()}`);
    }
  });
  
  try {
    console.log('🌐 Navigating to registration page...');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
    
    console.log('🎯 Clicking "Get Started" button...');
    await page.click('button:has-text("Get Started")');
    await page.waitForTimeout(2000);
    
    console.log('🔍 Checking if Google OAuth button exists...');
    const googleButton = await page.$('button:has-text("Continue with Google")');
    
    if (!googleButton) {
      console.log('❌ Google OAuth button not found - checking for Clerk configuration...');
      
      // Check if Clerk is loaded
      const clerkLoaded = await page.evaluate(() => {
        return typeof window.Clerk !== 'undefined';
      });
      
      console.log(`📊 Clerk loaded in window: ${clerkLoaded}`);
      
      if (!clerkLoaded) {
        console.log('❌ Clerk not loaded - checking configuration...');
        
        const clerkPubKey = await page.evaluate(() => {
          return import.meta?.env?.VITE_CLERK_PUBLISHABLE_KEY || 'Not found';
        });
        
        console.log(`🔑 Clerk publishable key: ${clerkPubKey}`);
      }
      
      await browser.close();
      return;
    }
    
    console.log('✅ Google OAuth button found! Testing OAuth flow...');
    
    // Click Google OAuth button
    console.log('🚀 Clicking "Continue with Google"...');
    await googleButton.click();
    
    // Wait for redirect or error
    console.log('⏳ Waiting for OAuth redirect...');
    await page.waitForTimeout(3000);
    
    const currentUrl = page.url();
    console.log(`📍 Current URL after OAuth click: ${currentUrl}`);
    
    if (currentUrl.includes('accounts.google.com')) {
      console.log('✅ Successfully redirected to Google OAuth!');
      console.log('🔐 Manual intervention required - complete Google login in browser');
      console.log('⏳ Waiting 30 seconds for manual OAuth completion...');
      
      // Wait for user to complete OAuth manually
      await page.waitForTimeout(30000);
      
      const finalUrl = page.url();
      console.log(`📍 Final URL: ${finalUrl}`);
      
      if (finalUrl.includes('sso-callback')) {
        console.log('🎯 OAuth callback detected! Testing data extraction...');
        
        // Test if Clerk user data is available
        const userData = await page.evaluate(() => {
          return new Promise((resolve) => {
            // Wait for Clerk to load
            const checkClerk = () => {
              if (window.Clerk && window.Clerk.user) {
                const user = window.Clerk.user;
                resolve({
                  isLoaded: true,
                  hasUser: true,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.emailAddresses?.[0]?.emailAddress,
                  id: user.id,
                  createdAt: user.createdAt
                });
              } else if (window.Clerk) {
                resolve({
                  isLoaded: true,
                  hasUser: false,
                  error: 'Clerk loaded but no user found'
                });
              } else {
                setTimeout(checkClerk, 500);
              }
            };
            checkClerk();
          });
        });
        
        console.log('👤 Extracted user data:');
        console.log(JSON.stringify(userData, null, 2));
        
      } else if (finalUrl.includes('success')) {
        console.log('🎉 Reached success page! Testing data extraction...');
        
        // Test data extraction on success page
        await page.waitForTimeout(5000); // Wait for useEffect to run
        
        const successPageData = await page.evaluate(() => {
          // Check if user data is in React components
          const debugButton = document.querySelector('button');
          if (debugButton && debugButton.textContent.includes('Debug')) {
            debugButton.click();
            
            // Wait a bit for logs to populate
            setTimeout(() => {
              const logs = document.querySelectorAll('.text-xs.font-mono div');
              return Array.from(logs).map(log => log.textContent);
            }, 1000);
          }
          
          return {
            hasDebugButton: !!debugButton,
            url: window.location.href,
            hasClerk: typeof window.Clerk !== 'undefined',
            hasUser: window.Clerk?.user ? true : false
          };
        });
        
        console.log('📊 Success page analysis:');
        console.log(JSON.stringify(successPageData, null, 2));
      }
      
    } else {
      console.log('❌ OAuth redirect failed or blocked');
      console.log(`🔍 Current page content preview:`);
      
      const pageContent = await page.evaluate(() => {
        return document.body.innerText.substring(0, 500);
      });
      
      console.log(pageContent);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    console.log('\n🏁 Test completed. Closing browser in 5 seconds...');
    await page.waitForTimeout(5000);
    await browser.close();
  }
}

async function main() {
  console.log('🧪 Clerk OAuth Data Extraction Test\n');
  
  // Puppeteer is already imported, so we can proceed directly
  await testClerkOAuthExtraction();
}

main().catch(console.error);
