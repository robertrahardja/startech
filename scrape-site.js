const puppeteer = require('puppeteer');
const fs = require('fs').promises;

async function scrapeSite() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    // URLs to scrape
    const urls = [
      'https://www.startech-innovation.com/',
      'https://www.startech-innovation.com/solutions',
      'https://www.startech-innovation.com/clients'
    ];

    const pageData = {};

    for (let i = 0; i < urls.length; i++) {
      console.log(`Scraping ${urls[i]}...`);
      const page = await browser.newPage();

      // Set viewport for consistency
      await page.setViewport({ width: 1920, height: 1080 });

      // Navigate to page and wait for content
      await page.goto(urls[i], {
        waitUntil: ['networkidle0', 'domcontentloaded'],
        timeout: 30000
      });

      // Wait a bit for any dynamic content
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Take screenshot
      const pageName = urls[i].split('/').pop() || 'home';
      await page.screenshot({
        path: `screenshots/${pageName}-screenshot.jpg`,
        type: 'jpeg',
        quality: 90,
        fullPage: true
      });

      // Extract all text content and structure
      const content = await page.evaluate(() => {
        // Helper function to get clean text
        const getCleanText = (element) => {
          return element?.textContent?.trim().replace(/\s+/g, ' ') || '';
        };

        // Get main heading
        const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => ({
          level: h.tagName,
          text: getCleanText(h)
        }));

        // Get navigation items
        const navItems = Array.from(document.querySelectorAll('nav a, header a')).map(a => ({
          text: getCleanText(a),
          href: a.href
        }));

        // Get all paragraphs
        const paragraphs = Array.from(document.querySelectorAll('p')).map(p => getCleanText(p));

        // Get lists
        const lists = Array.from(document.querySelectorAll('ul, ol')).map(list => {
          return Array.from(list.querySelectorAll('li')).map(li => getCleanText(li));
        });

        // Get any buttons or CTAs
        const buttons = Array.from(document.querySelectorAll('button, a.button, [role="button"]')).map(btn => ({
          text: getCleanText(btn),
          href: btn.href || null
        }));

        // Get all visible text in sections
        const sections = Array.from(document.querySelectorAll('section, main, article')).map(section => {
          return {
            id: section.id,
            className: section.className,
            text: getCleanText(section)
          };
        });

        return {
          title: document.title,
          headings,
          navigation: navItems,
          paragraphs,
          lists,
          buttons,
          sections,
          // Get all text content as backup
          allText: document.body.innerText
        };
      });

      pageData[pageName] = content;

      // Save HTML
      const html = await page.content();
      await fs.writeFile(`captured/${pageName}.html`, html);

      // Save extracted content as JSON
      await fs.writeFile(`captured/${pageName}-content.json`, JSON.stringify(content, null, 2));

      console.log(`✓ Scraped ${pageName}`);
      await page.close();
    }

    // Save all data
    await fs.writeFile('captured/all-content.json', JSON.stringify(pageData, null, 2));
    console.log('✓ All pages scraped successfully!');

  } catch (error) {
    console.error('Error scraping site:', error);
  } finally {
    await browser.close();
  }
}

// Create directories if they don't exist
async function setup() {
  try {
    await fs.mkdir('screenshots', { recursive: true });
    await fs.mkdir('captured', { recursive: true });
    console.log('Directories created');
  } catch (err) {
    // Directories might already exist
  }
}

// Run the scraper
setup().then(() => {
  scrapeSite();
});