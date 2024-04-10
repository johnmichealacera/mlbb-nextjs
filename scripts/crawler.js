const puppeteer = require('puppeteer');

async function fetchFullPageHTML() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://mobile-legends.fandom.com/wiki/List_of_heroes', {
      waitUntil: 'networkidle0', // waits for the network to be idle
    });
    // const pageHTML = await page.evaluate(() => document.documentElement.outerHTML);
    const element = await page.$('.fandom-table.sortable.jquery-tablesorter');

    if (element) {
      const heroes = await page.evaluate((element) => {
        const rows = element.querySelectorAll('tr');
        const heroesArray = [];
    
        rows.forEach((row) => {
            const td = row.querySelector('td');
            if (td) {
                const anchor = td.querySelector('a');
                const img = td.querySelector('img');
                if (anchor && img) {
                    heroesArray.push({
                        name: anchor.getAttribute('title'),
                        url: img.getAttribute('data-src')
                    });
                }
            }
        });
    
        return heroesArray;
    }, element);
    
    //   const rowData = await page.evaluate((element: any) => {
    //     const rows = element.querySelectorAll('tr');
    //     const rowDataArray: any = [];
    //     rows.forEach((row: any) => {
    //         const firstTd = row.querySelector('td');
    //         if (firstTd) {
    //             rowDataArray.push(firstTd.innerHTML);
    //         }
    //     });
    
    //     return rowDataArray;
    // }, element);
    return heroes;
  } else {
      console.log('Element not found');
  }

  await browser.close();
  } catch (error) {
    console.log('error', JSON.stringify(error));
    
  }
}

module.exports = fetchFullPageHTML;
